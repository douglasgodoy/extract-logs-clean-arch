import app from './app';

export const startApp = (): void => {
  const port = process.env || 3000;
  app.listen(port, () => console.log(`server is running in port ${port}`));
};
