import { Router } from 'express';

import projectController from './projectController';

import ValidateFactory from '../../services/validateFactory';

import projectValidator from './projectValidator';

const router = new Router();

router.get(['/', '/list'], projectController.list);

router.get(['/add', '/create'], projectController.showAddProjectForm);

router.post(['/add', '/create'], ValidateFactory({ schema: projectValidator.projectSchema, getObject: projectValidator.getProject, }), projectController.addProject);

export default router;