import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { Service } from 'typedi';

@Service()
class AppService {
  private app: Application;

  public init = async (): Promise<void> => {
    this.app = express();
    this.app.use(cors());

    try {
      this.app.use(
        (
          error: Error,
          _req: Request,
          res: Response,
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          _next: NextFunction
        ): void => {
          console.error('📌 Something went wrong', error);
          res.status(400).send(error);
        }
      );

      const port = parseInt(process.env.SERVER_PORT ?? '4000');
      this.app.listen(port, () => {
        console.log(`🚀 http://localhost:${port}/graphql`);
      });
    } catch (error) {
      console.error('📌 Could not start server', error);
    }
  };
}

export default AppService;
