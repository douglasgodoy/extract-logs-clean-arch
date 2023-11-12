export type PathLike = string | Buffer | URL;
export type PathOrFileDescriptor = PathLike | number;

export type FileManager = {
  readdir(
    path: string,
    callback: (err: NodeJS.ErrnoException | null, files: string[]) => void,
  ): void;

  readFile(
    path: PathOrFileDescriptor,
    options:
      | ({
          encoding?: null | undefined;
          flag?: string | undefined;
        } & Abortable)
      | undefined
      | null,
    callback: (err: NodeJS.ErrnoException | null, data: Buffer) => void,
  ): void;
};

export type PathManager = {
  join(...paths: string[]): string;
};

export type LogEntry = {
  ipAddress: string;
  date: string;
  time: string;
  appName: string;
  version: string;
  id: string;
  description: string;
};
