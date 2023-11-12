import express from 'express';
import { routes } from './routes';
import { HttpApp } from './models/http';

const app = express() as HttpApp;
app.use(express.json());
// app.use("/api-docs", swagger.serve, swagger.setup(swaggerDocs));
routes(app);

export default app;
