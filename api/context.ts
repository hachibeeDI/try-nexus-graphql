import {db} from './db';

export interface Context {
  db: typeof db;
}

export const context = {
  db,
};
