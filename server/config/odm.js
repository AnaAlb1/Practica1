import mongoose, { Mongoose } from "mongoose";
import logger from './winston';

class mongooseOdm {
    // Constructor de la clase
    constructor(url) {
        this.url = url;
    }

// Metodo para conectar a la BD
    async connect() {
        try{
            // Configuraciones que requiere mongoose
            mongoose.Promise = global.Promise;
            logger.info('Conectado a la BD en: ${this.url}');
            // Intento de conexion
            const connection = await mongoose.connect(this.url);
            return connection;
        } catch (error){
            logger.error(
                `No se pudo realizar la conexion debido a: ${error.message}`
            );
            return false;
        }
    }
}

export default MongooseOdm;