import { FileManager, LogEntry, PathManager } from './ExtractDataLogsUseCase.d';
import { IUseCase } from '../IUseCase';

class ExtractDataLogsUseCase implements IUseCase {
  constructor(
    private fileManager: FileManager,
    private pathManager: PathManager,
  ) { }

  parsedLines: LogEntry[] = [];

  async execute(directoryPath: string) {
    this.fileManager.readdir(directoryPath, (err, files) => {
      if (err) {
        console.error('Error reading directory:', err);
        return;
      }

      files.forEach((file) => this.readFile(file, directoryPath));
    });

    return this.parsedLines;
  }

  readFile(file: string, directoryPath: string) {
    const filePath = this.pathManager.join(directoryPath, file);

    this.fileManager.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error(`Error reading ${filePath}:`, err);
        return;
      }

      const lines = (<string>(<unknown>data)).split('\n');

      const result: LogEntry[] = lines.map((dataLine) => {
        const [ipAddress, date, time, appName, version, id, description] =
          dataLine.split(';');

        const parsedDate = new Date(date);
        const formattedDate = `${parsedDate
          .getDate()
          .toString()
          .padStart(2, '0')}-${(parsedDate.getMonth() + 1)
            .toString()
            .padStart(2, '0')}-${parsedDate.getFullYear()}`;

        return {
          ipAddress,
          date: formattedDate,
          time,
          appName,
          version,
          id,
          description,
        } as LogEntry;
      });

      this.parsedLines.push(...result);
    });
  }
}

export default ExtractDataLogsUseCase;
