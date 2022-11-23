import { Router } from 'express';
import homeController from './homeController';
// crear instancia
const router = new Router();

// enrutamos
router.get(['/', '/home', '/index'], homeController.home);
router.get(['/about'], homeController.about);

export default router;
