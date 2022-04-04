"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const options = [
    {
        baseURL: 'https://rest.coinapi.io',
        url: '/v1/exchangerate/BTC/USD',
        headers: { 'X-CoinAPI-Key': '3EEF8645-3A03-4B37-B3C3-A44C21559493' },
    },
    {},
];
class RatesController {
    constructor() {
        this.GetRates = async (req, res, next) => {
            try {
                await index_1.kafkaProducer.send({
                    topic: 'orderCreated',
                    messages: [{ value: 'konichiwa' }],
                });
            }
            catch (e) {
                next(e);
            }
        };
    }
    static getInstance() {
        if (!RatesController.instance) {
            RatesController.instance = new RatesController();
        }
        return RatesController.instance;
    }
}
exports.default = RatesController;
//# sourceMappingURL=rates_controller.js.map