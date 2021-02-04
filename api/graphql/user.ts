import {extendType, objectType} from 'nexus';

import {parseToken} from '~/auth';

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
        const {decoded} = await parseToken(ctx.token);
        if (decoded == null) {
          throw Error('TODO: なんかmiddlewareとかで認証と認可はやるべきなのでがんばって');
        }
        console.log(decoded);

        return ctx.db.user.findMany();
      },
    });
  },
});
