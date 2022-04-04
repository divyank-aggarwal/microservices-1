"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
const kafkaConsumerTest_1 = require("./controller/kafkaConsumerTest");
const port = process.env.PORT || 8092;
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
(0, kafkaConsumerTest_1.processConsumer)();
//# sourceMappingURL=index.js.map