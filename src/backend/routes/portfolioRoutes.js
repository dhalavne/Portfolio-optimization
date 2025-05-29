import { Router } from 'express';
const router = Router();
import portfolioController from '../controllers/portfolioController.js';


router.post('/stats', portfolioController.getPortfolioStats);

export default router;
