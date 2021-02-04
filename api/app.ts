import 'nexus-typegen';

import {server, apollo} from './server';

// server.listen().then(({url}) => {
//   console.log(`🚀 Server ready at ${url}`);
// });

server.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${apollo.graphqlPath}`)
);