"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const axios_1 = __importDefault(require("axios"));
const utils_1 = __importDefault(require("../utils"));
const http_status_codes_1 = require("http-status-codes");
// const urls = { rateService: 'localhost:8091/api/v1/rates/find' };
class UserController {
    constructor() {
        this.FindRateAndMail = async (req, res, next) => {
            try {
                const { email } = req.params;
                const getRates = await axios_1.default.request({
                    baseURL: 'http://localhost:8091/api/v1',
                    url: '/rates/find',
                });
                const sendToKafKa = JSON.stringify({ email, rates: getRates.data.data });
                await index_1.kafkaProducer.send({
                    topic: 'orderCreated',
                    messages: [{ value: sendToKafKa }],
                });
                utils_1.default.RespondJSON(res, getRates.data, http_status_codes_1.StatusCodes.OK);
                return;
            }
            catch (e) {
                next(e);
            }
        };
    }
    static getInstance() {
        if (!UserController.instance) {
            UserController.instance = new UserController();
        }
        return UserController.instance;
    }
}
exports.default = UserController;
//# sourceMappingURL=user_controller.js.map