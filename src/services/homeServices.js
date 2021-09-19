require("dotenv").config();
import request from "request";
import { response } from "express";
const la = require("./lang");

let callSendAPI = (sender_psid, response) => {
    // Construct the message body
    let request_body = {
        "recipient": {
            "id": sender_psid
        },
        "message": response
    }

    // Send the HTTP request to the Messenger Platform
    request({
        "uri": "https://graph.facebook.com/v11.0/me/messages",
        "qs": { "access_token": process.env.PAGE_ACCESS_TOKEN },
        "method": "POST",
        "json": request_body
    }, (err, res, body) => {
        if (!err) {
            console.log('message sent!')
        } else {
            console.error("Unable to send message:" + err);
        }
    });
}

// let handleGetStarted = () => {
//     let response = {
//         "attachment": {
//             "type": "template",
//             "payload": {
//                 "template_type": "button",
//                 "text": la.INTRO,
//                 "buttons": [
//                     {
//                         "type": "postback",
//                         "title": "Giải pháp",
//                         "payload": "INTRO"
//                     }
//                 ]
//             }
//         }
//     }
//     return response;
// }

let handleGetStarted = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "button",
                        "text": la.INTRO,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "Giải pháp",
                                "payload": "INTRO"
                            }
                        ]
                    }
                }
            }
            await callSendAPI(sender_psid, response);
            resolve('done');
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    handleGetStarted: handleGetStarted,
}