"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.kafkaProducer = void 0;
const server_1 = require("./server");
const kafkajs_1 = require("kafkajs");
const kafka = new kafkajs_1.Kafka({
    clientId: 'rate-finder',
    brokers: ['localhost:9092'],
});
const topicName = 'bestRates';
const kf = async () => {
    const admin = kafka.admin();
    await admin.connect();
    await admin.createTopics({
        topics: [
            {
                topic: topicName,
                numPartitions: 2,
                replicationFactor: 1,
            },
        ],
    });
    await admin.disconnect();
};
exports.kafkaProducer = kafka.producer();
kf().then(() => {
    console.log('kafka initialized');
    exports.kafkaProducer.connect().then(() => {
        console.log('kafka produced started');
    });
});
const port = process.env.PORT || 8090;
let server = null;
// handle graceful shutdown
const gracefulShutdown = async (event, err) => {
    console.log(`${event} signal received: closing HTTP server, cause: ${err}`);
    if (server) {
        server.close((closeErr) => console.error(closeErr));
    }
    process.exit();
};
[
    'SIGINT',
    'SIGTERM',
    'exit',
    'SIGUSR1',
    'SIGUSR2',
    'uncaughtException',
].forEach((event) => {
    process.on(event, async (err) => {
        await gracefulShutdown(event, err);
    });
});
server = server_1.app.listen(port, () => console.log(`Server is listening on port ${port}!`));
//# sourceMappingURL=index.js.map