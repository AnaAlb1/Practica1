import expHbs from 'express-handlebars';
import path from 'path';

export default (app)=>{
// configuracion motor de plantillas de express usando ExpressHandlebars
// 1-motor de plantillas
   app.engine('hbs', expHbs({
      extname: '.hbs',
      defaultLayout: 'main',
   })
   );
   // seleccionar el motor de plantilla
   app.set('view engine','hbs');
   app.set('views', path.join(__dirname,'..','views'));

   // retornar la instancia de express
   return app;
};