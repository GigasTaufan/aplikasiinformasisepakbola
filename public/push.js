var webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BNwUn5LZYiRs7nsK96iXxMqJhYGtmvpe2PIICLXUntWGh1RN1Eqjoi-9ISMhoGH-Z1SMG4NGrQSq8snGGsjKWFA",
    "privateKey": "HeIGfcrV5S2xN6u-BHjLEI2yZzyGZtENZ8q67X8HywY"
};

webPush.setVapidDetails(
    'mailto:gigastaufan@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)

var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/cpWTV9nwnQY:APA91bG2hvJIcBjjMFmrw7cFjuIdCC1JBKHTqyhSFAvoNyYu7DI01PnxnwNKjcQiar_O0paPDnasbbiadheuzXIi7depE5zUezw1C8-YXRnzRwbAPu_mQ7aqfVxEEu-eJfDN1tq0B_v9",
    "keys": {
        "p256dh": "BA+o6TH4Tlo557hWdaglEOPJt7c+1d1aPZHuAtDDVe1owKb9ZVslOFB/CJ+FmiL7nrMymu3ko+JU9Sezv+3owpY=",
        "auth": "pDh6zh7ErdOHWOZh4VVTKw=="
    }
}

var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';

var options = {
    gcmAPIKey: '316615818022',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);