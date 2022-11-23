import mongoose from 'mongoose';
import logger from './winston';

class MongooseOdm {
  // Constructor de la clase
  constructor(url) {
    this.url = url;
  }

  // Metodo para conectar a la BD
  async connect() {
    try {
      // Configuraciones que requiere mongoose
      mongoose.Promise = global.Promise;
      logger.info(`Conexion exitosa 😈: ${this.url}`);
      // Intento de conexión
      const connection = await mongoose.connect(this.url);
      return connection;
    } catch (error) {
      logger.error(
        `😢 No se pudo conectar por: ${error.message}`
      );
      return false;
    }
  }
}

export default MongooseOdm;