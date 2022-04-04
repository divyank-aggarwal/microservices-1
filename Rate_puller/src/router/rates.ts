import { Router } from 'express';
import RatesController from '../controller/rates_controller';

export const RatesRouter: Router = Router();
const rate = RatesController.getInstance();

RatesRouter.get('/find', rate.GetRates);
