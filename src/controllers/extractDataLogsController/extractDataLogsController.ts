import { ExtractDataLogsUseCase, StoreParsedLogsUseCase } from 'src/useCases';
import fs from 'fs';
import path from 'path';
import { Request, Response } from 'express';
import { internalServerError, noContent, ok } from 'src/commons/http';
import { DynamoDbRepository } from 'src/repositories/dynamo/DynamoDbRepository';
import { DbClient } from 'src/repositories/dynamo/DynamoDbRepository.d';
import { DynamoDBSingleton } from 'src/adapters/database/dynamo/DynamoSingleton';

const extractDataLogsController = async (_: Request, res: Response) => {
  try {
    const dbClient = DynamoDBSingleton.getInstance() as DbClient
    const dbRepository = new DynamoDbRepository(dbClient);

    const extractDataUseCase = new ExtractDataLogsUseCase(fs, path);
    const dataToStore = await extractDataUseCase.execute('Logs');

    const storeParsedLogsUseCase = new StoreParsedLogsUseCase(dbRepository)
    const responseUseCase = await storeParsedLogsUseCase.execute(dataToStore)

    return ok(res, responseUseCase.body!, responseUseCase.message!)
  } catch (error) {
    console.error("error", error);
    return internalServerError(res)
  }
};



export default extractDataLogsController;
