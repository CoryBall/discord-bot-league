import { createConnection, useContainer } from 'typeorm';
import { Container } from 'typeorm-typedi-extensions';
import { Service } from 'typedi';

@Service()
class OrmService {
  public init = async (): Promise<void> => {
    useContainer(Container);
    try {
      const connection = await createConnection();

      await connection.runMigrations({
        transaction: 'none',
      });
    } catch (error) {
      console.error('📌 Could not connect to the database', error);
      throw Error(error);
    }
  };
}

export default OrmService;
