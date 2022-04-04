import { NextFunction, Request, Response } from 'express';
import { kafkaProducer } from '../index';
import axios from 'axios';
import Utils from '../utils';
import { StatusCodes } from 'http-status-codes';

// const urls = { rateService: 'localhost:8091/api/v1/rates/find' };
export default class UserController {
  private static instance: UserController;

  private constructor() {}

  public static getInstance(): UserController {
    if (!UserController.instance) {
      UserController.instance = new UserController();
    }
    return UserController.instance;
  }

  public FindRateAndMail = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { email } = req.params;
      const getRates = await axios.request({
        baseURL: 'http://localhost:8091/api/v1',
        url: '/rates/find',
      });
      const sendToKafKa = JSON.stringify({ email, rates: getRates.data.data });
      await kafkaProducer.send({
        topic: 'orderCreated',
        messages: [{ value: sendToKafKa }],
      });
      Utils.RespondJSON(res, getRates.data, StatusCodes.OK);
      return;
    } catch (e) {
      next(e);
    }
  };
}
