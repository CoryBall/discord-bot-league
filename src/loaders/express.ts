import express, { Application } from 'express';
import cors from 'cors';

function ExpressLoader(app: Application) {
  app.use(express.json());
  app.use(cors());

  return app;
}

export default ExpressLoader;
