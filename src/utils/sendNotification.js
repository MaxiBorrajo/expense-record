import { Expo } from "expo-server-sdk";

let expo = new Expo({
  accessToken: process.env.EXPO_ACCESS_TOKEN,
  useFcmV1: true, 
});

let tickets = [];
export async function sendPushNotification(token, notification) {
  try {
    let pushMessage = {
      title: notification.title,
      to: token,
      body: notification.body,
      data: { ...notification },
    };

    let ticket = await expo.sendPushNotificationsAsync([pushMessage]);
    tickets.push(...ticket);
  } catch (error) {
    console.error("Error sending push notification:", error);
  }
}

export async function handleReceipts() {
  let receiptIds = tickets.map((ticket) => ticket.id);
  let receiptIdChunks = expo.chunkPushNotificationReceiptIds(receiptIds);
  let receipts = await Promise.all(
    receiptIdChunks.map(
      async (chunk) => await expo.getPushNotificationReceiptsAsync(chunk)
    )
  );

  for (let receiptId in receipts) {
    let { status, message, details } = receipts[receiptId];

    handleReceipt(status, message, details);
  }
}

function handleReceipt(_status, message, details) {
  if (_status === "error") {
    console.error(`There was an error sending a notification: ${message}`);
  }

  if (_status === "error" && details && details.error) {
    console.error(`The error code is ${details.error}`);
  }
}