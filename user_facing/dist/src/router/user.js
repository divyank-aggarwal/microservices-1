"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../controller/user_controller"));
exports.UserRouter = (0, express_1.Router)();
const find = user_controller_1.default.getInstance();
exports.UserRouter.get('/find/:email', find.FindRateAndMail);
//# sourceMappingURL=user.js.map