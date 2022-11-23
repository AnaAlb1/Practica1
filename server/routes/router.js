import homeRouter from '../domains/home/homeRouter';

const addRoutes = (app) => {
  // agregando ruta home
  app.use('/', homeRouter);
};

export default { addRoutes };
