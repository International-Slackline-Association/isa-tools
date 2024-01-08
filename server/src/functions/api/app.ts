import { default as express, Express, urlencoded, json } from 'express';
import cors from 'cors';
import { certificateApi } from './endpoints/certificate-api';
import { errorMiddleware, injectCommonlyUsedHeadersMiddleware, notFoundMiddleware } from './middlewares';
import { signApi } from './endpoints/sign-api';
import { listingsApi } from './endpoints/listings-api';

const app = express();

const setupExpressApp = (app: Express) => {
  app.use(cors());
  app.use(json());
  app.use(
    urlencoded({
      extended: true,
    }),
  );
};

const setupRoutes = (app: Express) => {
  app.use('/certificate', certificateApi);
  app.use('/list', listingsApi);
  app.use('/sign', signApi);
};

const registerStartingMiddlewares = (app: Express) => {
  app.use(injectCommonlyUsedHeadersMiddleware);
};

const registerEndingMiddlewares = (app: Express) => {
  app.use(errorMiddleware);
  app.use(notFoundMiddleware);
};

setupExpressApp(app);
registerStartingMiddlewares(app);
setupRoutes(app);
registerEndingMiddlewares(app);

export default app;
