export type InsertBatchResponse = {
    unprocessedItems: Record<string, number | string | boolean | object | Array<any>>[]
    processedItems: Record<string, number | string | boolean | object | Array<any>>[]
}

export interface IDatabaseRepository {
    insertBatch(_items: Array<Record<string, unknown>>): Promise<InsertBatchResponse>
}
