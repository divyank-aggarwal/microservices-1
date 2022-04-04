import { app } from './server';
import { Server } from 'http';

import { processConsumer } from './controller/kafkaConsumerTest';

const port = process.env.PORT || 8092;
let server: Server | null = null;

// handle graceful shutdown
const gracefulShutdown = async (event: string, err: Error) => {
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

server = app.listen(port, () =>
  console.log(`Server is listening on port ${port}!`)
);

processConsumer();
