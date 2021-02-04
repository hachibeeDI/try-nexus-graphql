import {ApolloServerExpressConfig} from 'apollo-server-express';

import {db} from './db';

export interface Context {
  db: typeof db;
  token?: string;
}

export const context: ApolloServerExpressConfig['context'] = async ({req}) => {
  const {authorization: token} = req.headers;
  return {db, token};
};
