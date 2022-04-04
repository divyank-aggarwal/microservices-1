"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const utils_1 = __importDefault(require("../utils"));
const http_status_codes_1 = require("http-status-codes");
const user_1 = require("./user");
// all your route goes here
const _routes = [['/user', user_1.UserRouter]];
// export configured routes
const routes = (app) => {
    app.use(body_parser_1.default.json());
    const corsOptions = {
        allowedHeaders: [
            'Origin',
            'X-Requested-With',
            'Content-Type',
            'Accept',
            'X-Access-Token',
            'x-api-key',
        ],
        credentials: true,
        methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
        origin: '*',
        preflightContinue: false,
        optionsSuccessStatus: 204,
    };
    app.use((0, cors_1.default)(corsOptions));
    const parentController = (0, express_1.Router)();
    // every route will go under api/v1
    app.use('/api/v1', parentController);
    _routes.forEach((route) => {
        const [url, controller] = route;
        parentController.use(url, controller);
    });
    // finally add route to catch errors
    app.use((err, req, res, next) => {
        if (err.statusCode) {
            utils_1.default.RespondError(res, err, err.statusCode);
            return;
        }
        utils_1.default.RespondError(res, err.message, http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
    });
};
exports.routes = routes;
//# sourceMappingURL=index.js.map