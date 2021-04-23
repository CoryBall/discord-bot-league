import { MikroORM } from '@mikro-orm/core';
import { Container } from 'typedi';

async function LoadOrm() {
  const ormConfig: OrmConfig = Container.get(OrmConfig);
  const orm = await MikroORM.init({});
}

export default LoadOrm;
