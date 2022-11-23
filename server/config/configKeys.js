/* eslint-disable no-undef */
import dotEnv from 'dotenv';

dotEnv.config();

// eslint-disable-next-line no-unused-vars
const defaultConfig = {
  port: process.env.PORT || '3000',
  appVersion: process.env.APP_VERSION,
};

const devConfig = {
  env: 'development',
  mongoUrl:process.env.DEV_DATABASE_URL,
  debug: process.env.DEBUG,
};

const prodConfig = {
  env: 'production',
  mongoUlr: 'cloud url',
};

function envCofig(env) {
  switch (env) {
    case 'development':
      return devConfig;
    case 'production':
      return prodConfig;
    default:
      return prodConfig;
  }
}

export default { ...defaultConfig, ...envCofig(process.env.NODE_ENV) };
