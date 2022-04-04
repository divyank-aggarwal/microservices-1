"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processConsumer = void 0;
const kafkajs_1 = require("kafkajs");
const mail_1 = __importDefault(require("@sendgrid/mail"));
const kafka = new kafkajs_1.Kafka({
    clientId: 'rate-finder',
    brokers: ['localhost:9092'],
});
const topicName = 'orderCreated';
const sendGridAPIKey = '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';
mail_1.default.setApiKey(sendGridAPIKey);
const processConsumer = async () => {
    const ordersConsumer = kafka.consumer({ groupId: 'orders' });
    await ordersConsumer.connect();
    await ordersConsumer.subscribe({ topic: topicName });
    let orderCounter = 1;
    await ordersConsumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            var _a;
            if (message.value) {
                const data = JSON.parse(message.value.toString());
                const toSend = JSON.stringify(data.rates);
                const msg = {
                    to: data.email,
                    from: 'divyank.aggarwal@remotestate.com',
                    subject: 'Rate Finder info for BTC/ETH',
                    text: toSend,
                    // html: '<strong>toSend</strong>',
                };
                mail_1.default
                    .send(msg)
                    .then(() => {
                    console.log('Email sent');
                })
                    .catch((error) => {
                    console.error(error);
                });
                console.log(`received a new message number: ${orderCounter} on consumer: `, {
                    topic,
                    partition,
                    message: {
                        offset: message.offset,
                        headers: message.headers,
                        value: (_a = message === null || message === void 0 ? void 0 : message.value) === null || _a === void 0 ? void 0 : _a.toString(),
                    },
                });
                orderCounter++;
            }
        },
    });
};
exports.processConsumer = processConsumer;
//# sourceMappingURL=kafkaConsumerTest.js.map