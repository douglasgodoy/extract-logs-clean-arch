type DatabaseType = {
  runMigrations?(dbInstance: T): Promise<unknown>;
  startDatabase: () => Promise<unknown>;
  createTableIfNotExists: (dbInstance: T) => Promise<void>;
  createIndexes?: (dbInstance: T) => Promise<void>;
};
