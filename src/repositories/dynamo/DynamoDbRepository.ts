import { IDatabaseRepository, InsertBatchResponse } from "../IDatabaseRepository";
import { BatchInsertResponse, DbClient, DynamoDBBatchWriteItem } from './DynamoDbRepository.d'

export type Items = Record<string, unknown>

export class DynamoDbRepository implements IDatabaseRepository {
    constructor(private dbClient: DbClient) { }

    async insertBatch(items: Items[]): Promise<InsertBatchResponse> {
        const params = this.parseItemsToInsertBatch(items);
        const response = await this.dbClient.batchWrite(params).promise();
        const parsedResponse = this.responseAdapter(response as BatchInsertResponse);

        return parsedResponse
    }

    private responseAdapter(data: BatchInsertResponse): InsertBatchResponse {
        return {
            processedItems: data.ItemCollectionMetrics,
            unprocessedItems: data.UnprocessedItems
        }
    }

    private parseItemsToInsertBatch(items: Items[]): DynamoDBBatchWriteItem {
        //NOTE - .env also can be abstract but I dont will do to this test
        const tableName = <string>process.env.TABLE_NAME

        const parsedItems = items.map(item => ({
            PutRequest: {
                Item: item
            }
        }))

        return {
            RequestItems: {
                [tableName]: parsedItems
            }
        }

    }

}
