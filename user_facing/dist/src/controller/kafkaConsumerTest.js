"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processConsumer = void 0;
const kafkajs_1 = require("kafkajs");
const kafka = new kafkajs_1.Kafka({
    clientId: 'rate-finder',
    brokers: ['localhost:9092'],
});
const topicName = 'orderCreated';
const processConsumer = async () => {
    const ordersConsumer = kafka.consumer({ groupId: 'orders' });
    await ordersConsumer.connect();
    await ordersConsumer.subscribe({ topic: topicName });
    let orderCounter = 1;
    await ordersConsumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            var _a;
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
        },
    });
};
exports.processConsumer = processConsumer;
//# sourceMappingURL=kafkaConsumerTest.js.map