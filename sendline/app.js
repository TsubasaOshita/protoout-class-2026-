'use strict';

const line = require('@line/bot-sdk');

const config = {
    channelSecret: 'e611d51d453cca75ca78a262ae8c9a4e',
    channelAccessToken: 'Id7B4BVkaTl5E0AtpzrJJCZCDx7tufOFJRhOVqNgXCbyFyhAB8Rf+qRyKoRS9jkmwnqJn+NwLRM5aesoWKKXeOujO24z91buBu5jO43OvJ5QmDxm4ixfSo4pZ4lMEaycVm+oQl2AHxi7WKy8xtwtpQdB04t89/1O/w1cDnyilFU='
};
const client = new line.messagingApi.MessagingApiClient(config);

const main = async () => {

    const messages = [{
        type: 'text',
        text: 'いっせい送信です！'
    }];

    try {
        const res = await client.broadcast({ messages });
        console.log(res);
    } catch (error) {
        console.log(`エラー: ${error.statusMessage}`);
        console.log(error.originalError.response.data);
    }
}

main();