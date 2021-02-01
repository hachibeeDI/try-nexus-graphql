import {extendType, objectType} from 'nexus';

export const User = objectType({
  name: 'User',

  definition(t) {
    t.string('id');
    t.string('name');
  },
});

export const UserQuery = extendType({
  type: 'Query',

  definition(t) {
    t.nonNull.list.field('users', {
      type: 'User',
      resolve() {
        return [{id: 'test', name: 'aaa'}];
      }
    });
  },
});
