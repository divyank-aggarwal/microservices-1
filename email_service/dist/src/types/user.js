"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelCreatorValidator = exports.UserLoginValidator = exports.UserSignupValidator = void 0;
const express_validation_1 = require("express-validation");
exports.UserSignupValidator = {
    body: express_validation_1.Joi.object({
        pubKey: express_validation_1.Joi.string().required(),
        password: express_validation_1.Joi.string().required(),
        channelStatus: express_validation_1.Joi.string().valid('private', 'open', 'not_connected').allow(null),
    }),
};
exports.UserLoginValidator = {
    body: express_validation_1.Joi.object({
        pubKey: express_validation_1.Joi.string().required(),
        password: express_validation_1.Joi.string().required(),
    }),
};
exports.ChannelCreatorValidator = {
    body: express_validation_1.Joi.object({
        capacity: express_validation_1.Joi.number().required(),
        transactionId: express_validation_1.Joi.string().required(),
        transactionVout: express_validation_1.Joi.number().required(),
        channelId: express_validation_1.Joi.string().allow(null),
    }),
};
//# sourceMappingURL=user.js.map