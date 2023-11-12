import { Application } from 'express';
import { extractDataLogsController } from 'src/controllers';

const routes = (app: Application): void => {
  app.post('/extract-data', extractDataLogsController);
};
export default routes;
