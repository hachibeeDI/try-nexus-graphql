import {ApolloServer} from 'apollo-server-express';
import express from 'express';

import {schema} from './schema';
import {context} from './context';

export const apollo = new ApolloServer({schema, context});

export const server = express();

apollo.applyMiddleware({app: server});
