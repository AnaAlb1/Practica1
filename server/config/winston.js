/*
Winston ofrece 3 tipos de transportes:
1.Console
2.File
3.Http
*/
//Importar Winston
import Winston, { format } from 'winston';

//Se obtiene la ruta a la raiz del proyecto
import appRootPath from 'app-root-path';
import { reduce } from 'core-js/core/array';
import { options } from '../routes';

//Desestructurando modulos utiles de format
const { combine, timestamp, label, printf, colorize } = format;

//Definiendo colores para cada tipo de error "System colors"
const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'blue'
};

//Agregando el esquema de colores a Winston
Winston.addColors(colors);

//Creando los formatos para la consola
const MyConsoleFormat = combine(
    //colores
    colorize({ all: true }),
    //Agregar una etiqueta para identificar el winston
    label({ label: 'Registrador '}),
    //Agregando fecha
    timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
    //Funcion de imprension, como presentar la información
    printf((info) => `${info.label}: ${info.level}: ${info.timestamp}: ${info.message}`)
);

//Creando el formato para archivo
const myFileFormat = combine{
    //Quitando el color de texto de salida
    format.uncolorize(),
    //Agregamos fecha
    timestamp({ format: 'DD-MM-YY HH-mm-ss' }),
    //Formato de archivo de salida
    format.jscon()

};

//Creando el objeto de opciones de Winston

const optiones = {
    //Seguira las siguientes reglas
    infoFile: {
        level: 'info',
        filename: `${appRoot}/server/logs/info.log`, //Van ir creciendo mientras se agreguen cosas
        handleExceptions: false,
        maxSize: 1048576, //1MB de tamaño maximo para guardar en logs, revasando el maximo, se creara una nueva hoja
        maxFiles: 5, //Solo crear 5 archivos de 1MB
        format: myFileFormat,
    },
    warnFile: {
        level: 'warn',
        filename: `${appRoot}/server/logs/info.log`, //Van ir creciendo mientras se agreguen cosas
        handleExceptions: false,
        maxSize: 1048576, //1MB de tamaño maximo para guardar en logs, revasando el maximo, se creara una nueva hoja
        maxFiles: 5, //Solo crear 5 archivos de 1MB
        format: myFileFormat,
    },
    errorFile: {
        level: 'error',
        filename: `${appRoot}/server/logs/info.log`, //Van ir creciendo mientras se agreguen cosas
        handleExceptions: false,
        maxSize: 1048576, //1MB de tamaño maximo para guardar en logs, revasando el maximo, se creara una nueva hoja
        maxFiles: 5, //Solo crear 5 archivos de 1MB
        format: myFileFormat,
    },
    console: {
        level: 'debug',
        handleExceptions: true,
        format: MyConsoleFormat,
    },
};

//Creamos una instancia de logger
const logger = Winston.createLogger({
    transports: [
        new Winston.transport.File(options.infoFile),
        new Winston.transport.File(options.warnFile),
        new Winston.transport.File(options.errorFile),
        new Winston.transport.Console(options.console),
    ],
    exitOnError: false, //No finaliza en excepciones no manejadas
});

//Esto sirve para acomplar morgan a winston
/*
morgan --> Winston --> [transport info] (Asi funcionaran los strings)
*/
logger.stream = {
    write(message){ logger.info(message) },
}

//Exportando el logger por defecto

import default logger;