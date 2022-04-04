"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const router_1 = require("../router");
// Boot express
exports.app = (0, express_1.default)();
// Application routing
(0, router_1.routes)(exports.app);
//# sourceMappingURL=index.js.map