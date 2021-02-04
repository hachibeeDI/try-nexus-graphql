const env = process.env;

const declareEnvField = (path: string): string => {
  const val = env[path];
  if (val === undefined) {
    throw Error(`Error: ".env field ${path} is not declared!"`);
  }

  return val;
}

export const ENV = {
  AUTH0_DOMAIN: declareEnvField('AUTH0_DOMAIN'),
  API_AUDIENCE: declareEnvField('API_AUDIENCE'),
};