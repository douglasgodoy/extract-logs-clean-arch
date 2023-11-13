export type PathLike = string | Buffer | URL;
export type PathOrFileDescriptor = PathLike | number;

export type FileManager = {
  readdirSync(
    path: string,
  ): any;

  readFileSync(
    path: PathOrFileDescriptor,
    options:
      | ({
        encoding?: null | undefined;
        flag?: string | undefined;
      } & Abortable)
      | undefined
      | null,
  ): any;
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
