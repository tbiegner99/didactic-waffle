import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import { router } from './routes';

import bodyParser from 'body-parser';
import { HTTPStatus } from './utils/constants';

const app = express();
app.use(bodyParser.json());

app.use('/api', router);

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err, err.message);
  res
    .status(err.status ? err.status : HTTPStatus.SERVER_ERROR)
    .send(err.message || 'Internal Server Error');
};
app.use(errorHandler);
app.listen(process.env.APP_PORT || 8080, () => {
  console.log('App started on port 8080');
});
