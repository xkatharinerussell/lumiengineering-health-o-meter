import { Router } from 'express';
import * as LoansController from '../controllers/loans.controller';
const router = new Router();

// Get all Posts
router.route('/loans/:page').get(LoansController.getLoans);

export default router;
