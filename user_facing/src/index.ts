import { app } from './server';
import { Server } from 'http';

import { Kafka } from 'kafkajs';

const kafka = new Kafka({
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

export const kafkaProducer = kafka.producer();
kf().then(() => {
  console.log('kafka initialized');
  kafkaProducer.connect().then(() => {
    console.log('kafka produced started');
  });
});

const port = process.env.PORT || 8090;
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
