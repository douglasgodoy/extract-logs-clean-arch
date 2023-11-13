type DatabaseType = {
  runMigrations?(dbInstance: T): Promise<unknown>;
  startDatabase: () => Promise<unknown>;
  createTableIfNotExists: () => Promise<void>;
  createIndexes?: (dbInstance: T) => Promise<void>;
};
