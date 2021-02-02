import 'nexus-typegen';

import {server} from './server';

server.listen().then(({url}) => {
  console.log(`🚀 Server ready at ${url}`);
});
