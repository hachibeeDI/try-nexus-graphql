/** https://auth0.com/docs/quickstart/backend/nodejs */

// import jwt from 'express-jwt';
// import jwksRsa from 'jwks-rsa';
//
// // TODO: use .env
// const AUTH0_DOMAIN = 'dev-nsnjcdq3.jp.auth0.com';
// const API_AUDIENCE = 'https://dev-nsnjcdq3.jp.auth0.com/api/v2/';
//
// // Authorization middleware. When used, the
// // Access Token must exist and be verified against
// // the Auth0 JSON Web Key Set
// export const checkJwt = jwt({
//   // Dynamically provide a signing key
//   // based on the kid in the header and
//   // the signing keys provided by the JWKS endpoint.
//   secret: jwksRsa.expressJwtSecret({
//     cache: true,
//     rateLimit: true,
//     jwksRequestsPerMinute: 5,
//     jwksUri: `https://${AUTH0_DOMAIN}/.well-known/jwks.json`,
//   }),
//
//   // Validate the audience and the issuer.
//   audience: API_AUDIENCE,
//   issuer: `https://${AUTH0_DOMAIN}/`,
//   algorithms: ['RS256'],
// });

// https://auth0.com/blog/build-and-secure-a-graphql-server-with-node-js/

import {GetPublicKeyOrSecret, verify} from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';

import {ENV} from '~/env';

const client = jwksClient({
  jwksUri: `https://${ENV.AUTH0_DOMAIN}/.well-known/jwks.json`,
});

const getKey: GetPublicKeyOrSecret = (header, callback) => {
  client.getSigningKey(header.kid ?? '' /** FIXME: need throw if undefined? */, (error, key) => {
    const signingKey = key.getPublicKey(); // NOTE: `key.publicKey || key.rsaPublicKey;` in the doc
    callback(error, signingKey);
  });
};

const OPTIONS = {
  audience: ENV.API_AUDIENCE,
  issuer: `https://${ENV.AUTH0_DOMAIN}/`,
  algorithms: ['RS256' as const],
};

/**
 * Those fields are depends on how you configured in Auth0 (?)
 */
type ParsedCredential = {
  iss: string;
  sub: string;
  aud: [string, string]; // ['https://dev-nsnjcdq3.jp.auth0.com/api/v2/', 'https://dev-nsnjcdq3.jp.auth0.com/userinfo'];
  iat: number;
  exp: number;
  azp: string;
  scope: ReadonlyArray<string>; // 'openid profile email read:current_user update:current_user_metadata';
};

/**
 * TODO: adress authentication and authorization functionality both
 */
export async function parseToken(token?: string): Promise<ParsedCredential | null> {
  if (!token) {
    return null;
  }
  console.log('token: ', token);

  return new Promise((resolve, reject) => {
    verify(token, getKey, OPTIONS, (error, decoded) => {
      console.log('Parsing token....');
      console.log(error, decoded);
      // TODO: iindesuka?
      if (error) {
        return reject(error);
      }
      if (decoded) {
        const scopes = (decoded as any)['scope'].split(' ');
        const cred: ParsedCredential = {...decoded, scope: scopes} as any;
        return resolve(cred);
      }
      return reject(null);
    });
  });
}


export function isAuthorized(credential: ParsedCredential, expectedScopes: ReadonlyArray<string>): boolean {
  return expectedScopes.every(s => credential.scope.includes(s));
}