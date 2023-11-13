import { FileManager, LogEntry, PathManager } from './ExtractDataLogsUseCase.d';
import { IUseCase } from '../IUseCase';
import { debug } from 'console';

class ExtractDataLogsUseCase implements IUseCase {
  constructor(
    private fileManager: FileManager,
    private pathManager: PathManager,
  ) { }

  parsedLines: LogEntry[] = [];

  async execute(directoryPath: string) {
    const files = await this.fileManager.readdirSync(directoryPath)
    for await (const file of files) {
      const result = await this.readFile(file, directoryPath)
      this.parsedLines.push(...result)
    }

    return {
      statusCode: 200,
      body: this.parsedLines
    };
  }

  async readFile(file: string, directoryPath: string) {
    const filePath = this.pathManager.join(directoryPath, file);

    const data = await this.fileManager.readFileSync(filePath, 'utf8')
    const lines = (<string>(<unknown>data)).split('\n');
    let result: LogEntry[] = [];

    for (const dataLine of lines) {
      const [ipAddress, date, time, appName, version, id, description] =
        dataLine.split(';');

      if (!ipAddress || !description) {
        continue
      }

      const parsedDate = new Date(date);
      const formattedDate = `${parsedDate
        .getDate()
        .toString()
        .padStart(2, '0')}-${(parsedDate.getMonth() + 1)
          .toString()
          .padStart(2, '0')}-${parsedDate.getFullYear()}`;

      const sanitizedData = {
        ipAddress,
        date: formattedDate,
        time,
        appName,
        version,
        id,
        description,
      } as LogEntry;

      result.push(sanitizedData)
    }

    return result;
  }
}

export default ExtractDataLogsUseCase;
