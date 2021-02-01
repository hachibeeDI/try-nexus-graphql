import {join} from 'path';

import {makeSchema} from 'nexus';

import * as types from '~/graphql';

export const schema = makeSchema({
  types,

  outputs: {
    typegen: join(__dirname, '..', 'nexus-typegen.ts'), // 2
    schema: join(__dirname, '..', 'schema.graphql'), // 3
  },
});
