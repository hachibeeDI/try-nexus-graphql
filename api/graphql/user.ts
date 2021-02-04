import {extendType, objectType} from 'nexus';

import {isTokenValid} from '~/auth';

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
      async resolve(_, __, ctx) {
        if ((await isTokenValid(ctx.token)) === false) {
          throw Error('TODO: なんかmiddlewareとかで認証と認可はやるべきなのでがんばって');
        }

        return ctx.db.user.findMany();
      },
    });
  },
});
