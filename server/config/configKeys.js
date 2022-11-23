// Importamos la dependencia dotEnv
import dotEnv from 'dotenv';

// Cargar las variables de entorno
dotEnv.config();

// Creando objeto de configuracion

// Creando configuración por defecto
const defaultConfig = {
  port: process.env.PORT || '3000',
  appVersion: process.env.APP_VERSION,
};

// Configuración para desarrollo
const devConfig = {
  env: 'development',
  mongoUrl: process.env.DEV_DATABASE_URL,
  debug: process.env.DEBUG,
};

// Configuración para producción
const prodConfig = {
  env: 'production',
  mongoUrl: 'cloud url',
};

// Función dado al entorno de ejecucuión
// nos retorne el objeto de configuración adecuado
function envConfig(env) {
  switch (env) {
    case 'development':
      return devConfig;
    case 'production':
      return prodConfig;
    default:
      return prodConfig;
  }
}

// Exportar la configuración
export default {
  ...defaultConfig,
  ...envConfig(process.env.NODE_ENV),
};
