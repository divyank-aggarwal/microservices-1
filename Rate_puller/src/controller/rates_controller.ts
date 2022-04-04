import { NextFunction, Request, Response } from 'express';
import https from 'https';
import Utils from '../utils';
import { StatusCodes } from 'http-status-codes';
import { URL } from 'url';
import axios from 'axios';

const options = [
    {
        baseURL: 'https://rest.coinapi.io',
        url: '/v1/exchangerate/BTC/USD',
        headers: { 'X-CoinAPI-Key': '3EEF8645-3A03-4B37-B3C3-A44C21559493' },
    },
    {
        baseURL: 'https://rest.coinapi.io',
        url: '/v1/exchangerate/ETH/USD',
        headers: { 'X-CoinAPI-Key': '3EEF8645-3A03-4B37-B3C3-A44C21559493' },
    },
    {
        baseURL: 'http://api.coinlayer.com/api',
        url: '/live?access_key=5e3dcbfaacbcc3b9ea16521d7cd6c48b&target=USD&symbols=BTC,ETH',
    },
];

export default class RatesController {
    private static instance: RatesController;

    private constructor() {}

    public static getInstance(): RatesController {
        if (!RatesController.instance) {
            RatesController.instance = new RatesController();
        }
        return RatesController.instance;
    }

    public GetRates = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const coinAPIDataBTC = await axios.request(options[0]);
            const coinLayerData = await axios.request(options[2]);
            const coinAPIDataETH = await axios.request(options[1]);
            const coinAPIBTCRate = coinAPIDataBTC.data.rate;
            const coinAPIETHRate = coinAPIDataETH.data.rate;
            const coinLayerBTCRate = coinLayerData.data.rates.BTC;
            const coinLayerETHRate = coinLayerData.data.rates.ETH;
            const sendData = {
                BTC: {
                    place: coinAPIBTCRate < coinLayerBTCRate ? 'CoinAPI' : 'CoinLayer',
                    value: coinAPIBTCRate < coinLayerBTCRate ? coinAPIBTCRate : coinLayerBTCRate,
                },
                ETH: {
                    place: coinAPIETHRate < coinLayerETHRate ? 'CoinAPI' : 'CoinLayer',
                    value: coinAPIETHRate < coinLayerETHRate ? coinAPIETHRate : coinLayerETHRate,
                },
            };
            Utils.RespondJSON(res, sendData, StatusCodes.OK);
            return;
        } catch (e) {
            next(e);
        }
    };
}
