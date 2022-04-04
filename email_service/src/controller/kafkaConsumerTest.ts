import { Kafka } from 'kafkajs';
import nodemailer from 'nodemailer';

import sgMail from '@sendgrid/mail';

const kafka = new Kafka({
  clientId: 'rate-finder',
  brokers: ['localhost:9092'],
});

const topicName = 'orderCreated';
const sendGridAPIKey =
  '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';
sgMail.setApiKey(sendGridAPIKey);
export const processConsumer = async () => {
  const ordersConsumer = kafka.consumer({ groupId: 'orders' });
  await ordersConsumer.connect();
  await ordersConsumer.subscribe({ topic: topicName });

  let orderCounter = 1;
  await ordersConsumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      if (message.value) {
        const data = JSON.parse(message.value.toString());
        const toSend = JSON.stringify(data.rates);

        const msg = {
          to: data.email, // Change to your recipient
          from: 'divyank.aggarwal@remotestate.com', // Change to your verified sender
          subject: 'Rate Finder info for BTC/ETH',
          text: toSend,
          // html: '<strong>toSend</strong>',
        };
        sgMail
          .send(msg)
          .then(() => {
            console.log('Email sent');
          })
          .catch((error) => {
            console.error(error);
          });
        console.log(
          `received a new message number: ${orderCounter} on consumer: `,
          {
            topic,
            partition,
            message: {
              offset: message.offset,
              headers: message.headers,
              value: message?.value?.toString(),
            },
          }
        );
        orderCounter++;
      }
    },
  });
};
