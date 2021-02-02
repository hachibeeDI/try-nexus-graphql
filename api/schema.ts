import {join} from 'path';

import {makeSchema} from 'nexus';
import {nexusPrisma} from 'nexus-plugin-prisma';

import * as types from '~/graphql';

export const schema = makeSchema({
  types,
  plugins: [
    nexusPrisma({
      experimentalCRUD: true,
    }),
  ],

  sourceTypes: {
    modules: [
      {
        module: require.resolve('.prisma/client/index.d.ts'),
        alias: 'prisma',
      },
    ],
  },
  contextType: {
    module: join(__dirname, './context.ts'),
    export: 'Context',
  },
  nonNullDefaults: {
    input: true,
    output: true,
  },

  outputs: {
    typegen: join(__dirname, '..', 'nexus-typegen.ts'),
    schema: join(__dirname, '..', 'schema.graphql'),
  },
});
