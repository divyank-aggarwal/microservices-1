"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const http_status_codes_1 = require("http-status-codes");
class Utils {
    static async HashPassword(password) {
        return bcryptjs_1.default.hash(password, 8);
    }
    static async ComparePassword(plain, hash) {
        return bcryptjs_1.default.compare(plain, hash);
    }
    static RespondJSON(res, body, statusCode) {
        res.status(statusCode).send({
            status: (0, http_status_codes_1.getReasonPhrase)(statusCode),
            data: body,
            error: null,
        });
    }
    static RespondError(res, err, statusCode) {
        const code = statusCode ? statusCode : 500;
        res.status(code).send({
            status: (0, http_status_codes_1.getReasonPhrase)(code),
            data: null,
            error: err,
        });
    }
}
exports.default = Utils;
//# sourceMappingURL=index.js.map