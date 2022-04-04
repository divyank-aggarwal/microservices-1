import { Router } from 'express';
import UserController from '../controller/user_controller';

export const UserRouter: Router = Router();
const find = UserController.getInstance();

UserRouter.get('/find/:email', find.FindRateAndMail);
