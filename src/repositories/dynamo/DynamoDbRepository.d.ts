export type DbClient = {
    batchWrite: (params: DynamoDBBatchWriteItem, callback?: DynamoDBBatchWriteItemCallback) => CustomPromiseResponse
}

interface DynamoDBBatchWriteItem {
    RequestItems: Record<string, DynamoDBWriteRequest[]>;
}

interface DynamoDBWriteRequest {
    PutRequest?: {
        Item: DynamoDBItem;
    };
}

interface DynamoDBItem {
    [key: string]: AttributeValue;
}


type DynamoDBAttributeValue = string | number | boolean | null | undefined | DynamoDBItem | DynamoDBAttributeValue[];

interface DynamoDBBatchWriteItemOutput {
    exampleProperty?: string;
}

interface DynamoDBBatchWriteItemCallback {
    (err: CustomError | null, data: DynamoDBBatchWriteItemOutput | undefined): void;
}

export type AttributeValue = unknown;

type CustomError = Error & {
    code: string;
    message: string;
    retryable?: boolean;
    statusCode?: number;
    time: Date;
    hostname?: string;
    region?: string;
    retryDelay?: number;
    requestId?: string;
    extendedRequestId?: string;
    cfId?: string;
    originalError?: Error
}


export type BatchInsertResponse = {
    UnprocessedItems?: BatchWriteItemRequestMap;
    ItemCollectionMetrics?: ItemCollectionMetricsPerTable;
    ConsumedCapacity?: ConsumedCapacityMultiple;
}

export type CustomPromiseResponse = {
    promise(): Promise<BatchInsertResponse | CustomError>
}
