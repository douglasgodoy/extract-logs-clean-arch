import { extractDataLogsController } from 'src/controllers';
import { HttpApp } from 'src/models/http';

const routes = (app: HttpApp): void => {
  app.post('/extract-data', extractDataLogsController);
};

export default routes;
