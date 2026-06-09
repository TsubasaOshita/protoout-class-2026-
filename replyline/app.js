'use strict';

const express = require('express');
const line = require('@line/bot-sdk');
const PORT = process.env.PORT || 3000;

const config = {
    channelSecret: 'e611d51d453cca75ca78a262ae8c9a4e',
    channelAccessToken: 'Id7B4BVkaTl5E0AtpzrJJCZCDx7tufOFJRhOVqNgXCbyFyhAB8Rf+qRyKoRS9jkmwnqJn+NwLRM5aesoWKKXeOujO24z91buBu5jO43OvJ5QmDxm4ixfSo4pZ4lMEaycVm+oQl2AHxi7WKy8xtwtpQdB04t89/1O/w1cDnyilFU='
};

const app = express();

app.get('/', (req, res) => res.send('Hello LINE BOT!(GET)')); //ブラウザ確認用(無くてもBotは動く)
app.post('/webhook', line.middleware(config), (req, res) => {
    console.log('events', req.body.events);

    if(req.body.events.length === 0){
        res.send('Hello LINE BOT!(POST)');
        console.log('疎通確認用');
        return;
    }

    Promise
      .all(req.body.events.map(handleEvent))
      .then((result) => res.json(result));
});

const client = new line.messagingApi.MessagingApiClient(config);

async function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }

  return client.replyMessage({
    replyToken: event.replyToken,
    messages: [{
      type: 'text',
      text: event.message.text //実際に返信の言葉を入れる箇所
    }]
  });
}

app.listen(PORT);
console.log(`Server running at ${PORT}`);