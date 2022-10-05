import * as jsonServer from 'json-server';
import { db } from './db';

const server      = jsonServer.create();
const middlewares = jsonServer.defaults();
const router      = jsonServer.router(db);
const port        = 3001;

server.use(middlewares);
server.use(router);
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});