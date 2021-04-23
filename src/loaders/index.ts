import 'reflect-metadata';
import expressLoader from './express';
import { Application } from 'express';

async function LoadServer(app: Application) {
  expressLoader(app);
  console.log('Express Initialized');

  console.log('Loaders Complete');
}

export default LoadServer;
