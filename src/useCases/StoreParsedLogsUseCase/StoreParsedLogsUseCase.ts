import { IUseCase, UseCaseResponse } from '../IUseCase';
import { IDatabaseRepository } from 'src/repositories/IDatabaseRepository';
import { LogEntry } from '../ExtractDataLogsUseCase/ExtractDataLogsUseCase.d';

class StoreParsedLogsUseCase implements IUseCase {
    constructor(
        private dbRepository: IDatabaseRepository,
    ) { }


    async execute(data: LogEntry[]): Promise<UseCaseResponse<Record<string, any>[]>> {
        const responsefromDatabase = await this.dbRepository.insertBatch(data)

        if (responsefromDatabase.unprocessedItems?.length) {
            return {
                statusCode: 500,
                message: "Some data has not been success",
                body: responsefromDatabase.unprocessedItems
            }
        }

        return {
            statusCode: 200,
            message: `${responsefromDatabase.processedItems?.length} data has been stored with success`,
            body: responsefromDatabase.processedItems
        }
    }
}

export default StoreParsedLogsUseCase;
