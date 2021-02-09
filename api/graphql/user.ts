import {extendType, objectType} from 'nexus';

import {isAuthorized, parseToken} from '~/auth';

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
        const credential = await parseToken(ctx.token);
        if (credential == null) {
          throw Error('TODO: なんかmiddlewareとかで認証と認可はやるべきなのでがんばって');
        }

        const authorized = isAuthorized(credential, ['read:messages']);
        if (authorized === false) {
          throw Error('TODO: 認可エラーに関する処理とかintercepter的なのを探していれてね');
        }

        return ctx.db.user.findMany();
      },
    });
  },
});
