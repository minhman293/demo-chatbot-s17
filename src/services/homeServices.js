require("dotenv").config();
import request from "request";
import { response } from "express";
const la = require("./lang");
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

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
        "qs": { "access_token": PAGE_ACCESS_TOKEN },
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

let getUserName = (sender_psid) => {
    return new Promise((resolve, reject) => {
        // Send the HTTP request to the Messenger Platform
        request({
            "uri": `https://graph.facebook.com/${sender_psid}?fields=first_name,last_name,profile_pic&access_token=${PAGE_ACCESS_TOKEN}`,

            "method": "GET"

        }, (err, res, body) => {
            if (!err) {
                body = JSON.parse(body);
                let username = `${body.last_name} ${body.first_name}`
                resolve(username);
            } else {
                console.error("Unable to send message:" + err);
                reject(err);
            }
        });
    })
}

let handleGetStarted = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let username1 = await getUserName(sender_psid);
            let response = {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "button",
                        "text": `Xin chào ${username1}, Bạn có thuộc 60% nhóm người gặp bẫy tâm lý về hội chứng bỏ lỡ thông tin hàng ngày không? Mỗi phút trôi qua là hàng triệu tin tức nóng hổi trên mạng xã hội khiến chúng ta dần sinh ra nỗi lo lắng tiềm ẩn có tên là FOMO (Fear Of Missing Out – Tâm lý sợ bỏ lỡ). Vậy không gian nào mới thực sự phù hợp dành cho chúng ta?`,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "Khám phá ngay!",
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

let handleIntro = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = { "text": la.INTRO };
            await callSendAPI(sender_psid, response);

            resolve('done');
        } catch (e) {
            reject(e);
        }
    })

}

module.exports = {
    handleGetStarted: handleGetStarted,
    handleIntro: handleIntro
}