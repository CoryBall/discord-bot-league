import { Service } from 'typedi';
import OrmConfig from './orm.config';
import { Connection, IDatabaseDriver, MikroORM } from '@mikro-orm/core';

@Service()
class OrmService {
  private orm: MikroORM<IDatabaseDriver<Connection>>;

  public init = async (): Promise<void> => {
    try {
      this.orm = await MikroORM.init(OrmConfig);
      const migrator = this.orm.getMigrator();
      const migrations = await migrator.getPendingMigrations();
      if (migrations?.length > 0) await migrator.up();
    } catch (error) {
      console.error('📌 Could not connect to the database', error);
      throw Error(error);
    }
  };
}

export default OrmService;
