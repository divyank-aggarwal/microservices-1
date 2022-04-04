"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.allowRoles = exports.validateAuth = void 0;
const utils_1 = __importDefault(require("../../utils"));
const http_status_codes_1 = require("http-status-codes");
const userSession_1 = __importDefault(require("../../database/models/userSession"));
const user_1 = require("../../database/models/user");
const validateAuth = async (req, res, next) => {
    const token = req.get('x-api-key');
    if (!token) {
        utils_1.default.RespondError(res, 'missing auth header key', http_status_codes_1.StatusCodes.NOT_ACCEPTABLE);
        return;
    }
    const session = await userSession_1.default.findOne({
        where: {
            token,
        },
        include: ['user'],
    });
    if (!session) {
        utils_1.default.RespondError(res, 'unauthorized request', http_status_codes_1.StatusCodes.UNAUTHORIZED);
        return;
    }
    // set to express request
    req.session = session;
    next();
};
exports.validateAuth = validateAuth;
const allowRoles = (perm) => {
    return async (req, res, next) => {
        if (!req.session) {
            utils_1.default.RespondError(res, 'missing permission', http_status_codes_1.StatusCodes.UNAUTHORIZED);
            return;
        }
        if (req.session.user.role === user_1.UserRole.Admin) {
            next();
            return;
        }
        const have = perm.find((p) => p === req.session.user.role);
        if (!have) {
            utils_1.default.RespondError(res, 'missing permission', http_status_codes_1.StatusCodes.UNAUTHORIZED);
            return;
        }
        next();
    };
};
exports.allowRoles = allowRoles;
//# sourceMappingURL=auth.js.map