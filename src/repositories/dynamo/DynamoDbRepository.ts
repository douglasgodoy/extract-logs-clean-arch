import { debug } from "console";
import { IDatabaseRepository, InsertBatchResponse } from "../IDatabaseRepository";
import { BatchInsertResponse, DbClient } from './DynamoDbRepository.d'

//NOTE - .env also can be abstract but I dont will do to this test
const tableName = <string>process.env.TABLE_NAME

export type Items = Record<string, unknown>
type BatchItem = Array<{
    PutRequest: {
        Item: Items
    }
}[]>

export class DynamoDbRepository implements IDatabaseRepository {
    constructor(private dbClient: DbClient) { }
    private batches: BatchItem = [];
    private processedItems: any = [];
    private unprocessedItems: any = [];

    async insertBatch(items: Items[]): Promise<InsertBatchResponse> {
        this.parseItemsToInsertBatch(items);
        // Perform BatchWriteItem for each batch
        const promises = this.batches.map(async (batch) => {
            const params = {
                RequestItems: {
                    [tableName]: batch
                }
            };
            return await this.dbClient.batchWrite(params).promise();
        });

        const results = await Promise.allSettled(promises)

        debug('length', items.length)


        results.forEach(result => {
            //@ts-ignore
            this.countItems(result.value)

        })

        const parsedResponse = this.responseAdapter();

        return parsedResponse
    }

    private responseAdapter(): InsertBatchResponse {
        return {
            processedItems: this.processedItems,
            unprocessedItems: this.unprocessedItems
        }
    }

    private countItems(data: BatchInsertResponse) {
        this.processedItems.push(data.ItemCollectionMetrics);
        this.unprocessedItems.push(data.UnprocessedItems);
    }

    private parseItemsToInsertBatch(items: Items[]): void {
        const parsedItems = items.map(item => ({
            PutRequest: {
                Item: item
            }
        }))

        while (parsedItems.length > 0) {
            this.batches.push(parsedItems.splice(0, 25));
        }
    }
}
