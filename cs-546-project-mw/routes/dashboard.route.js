import { Router } from 'express';
import { getByDepartments, getSalesGraph } from '../controllers/dashboard.controller.js';
import { requireToken } from '../middlewares/token.js';
import { validateDashboard } from '../utils/validation.js';

const dashboardRouter = Router();

dashboardRouter.get('/sales', requireToken(), validateDashboard.salesGraph, getSalesGraph);
dashboardRouter.get('/group', requireToken(), validateDashboard.group, getByDepartments);

export default dashboardRouter;
