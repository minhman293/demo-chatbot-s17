require("dotenv").config();
import request from "request";
import { response } from "express";
const la = require("./lang");
const img = require("../public/images/images.js")
const co = require('.././controllers/save_token.js');
const PAGE_ACCESS_TOKEN = co.FB_PAGE_ACCESS_TOKEN;
// const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;



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
                let username = `${body.first_name}`
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
                        "text": `Xin chào ${username1}, 
Bạn có thuộc 60% nhóm người gặp bẫy tâm lý về hội chứng bỏ lỡ thông tin hàng ngày không? Mỗi phút trôi qua là hàng triệu tin tức nóng hổi trên mạng xã hội khiến chúng ta dần sinh ra nỗi lo lắng tiềm ẩn có tên là FOMO (Fear Of Missing Out – Tâm lý sợ bỏ lỡ). Vậy không gian nào mới thực sự phù hợp dành cho chúng ta?`,
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
            //let username1 = await getUserName(sender_psid);
            let response1 = { "text": la.INTRO };
            //let response2 = { "text": `${username1} tìm kiếm thông tin sự kiện ở thành phố nào nhỉ?` };
            //let response3 = { "quick_replies": quickbtns_city };
            let response4 = askCity();
            await callSendAPI(sender_psid, response1);
            //
            await callSendAPI(sender_psid, response4);

            resolve('done');
        } catch (e) {
            reject(e);
        }
    })
}

let askCity = () => {

    let response = {

        // "text": `Bạn tìm kiếm thông tin sự kiện ở thành phố nào nhỉ?`,
        // "quick_replies": [
        //     {
        //         "content_type": "text",
        //         "title": "Hà Nội",
        //         "payload": "hanoi"
        //     }, {
        //         "content_type": "text",
        //         "title": "Đà Nẵng",
        //         "payload": "danang"
        //     }, {
        //         "content_type": "text",
        //         "title": "TP. Hồ Chí Minh",
        //         "payload": "tpHCM"
        //     }
        // ]
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "button",
                "text": `Bạn tìm kiếm thông tin sự kiện ở thành phố nào nhỉ?`,
                "buttons": [
                    {
                        "type": "postback",
                        "title": "Hà Nội",
                        "payload": "hanoi"
                    },
                    {
                        "type": "postback",
                        "title": "Đà Nẵng",
                        "payload": "danang"
                    },
                    {
                        "type": "postback",
                        "title": "TP. Hồ Chí Minh",
                        "payload": "tpHCM"
                    }]
            }
        }
    }
    return response;
}

let handleHanoiCity = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response1 = { "text": 'Bạn muốn Boo chia sẻ thông tin về chuyên mục gì nhỉ? ^^' }
            let response2 = askCategory();
            await callSendAPI(sender_psid, response1);
            await callSendAPI(sender_psid, response2);
            resolve('done');
        } catch (e) {
            reject(e);
        }
    })
};

let handleDanangCity = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response1 = { "text": 'Bạn muốn Boo chia sẻ thông tin về chuyên mục gì nhỉ? ^^' }
            let response2 = askCategory();
            await callSendAPI(sender_psid, response1);
            await callSendAPI(sender_psid, response2);
            resolve('done');
        } catch (e) {
            reject(e);
        }
    })
};

let handleHCMCity = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response1 = { "text": 'Bạn muốn Boo chia sẻ thông tin về chuyên mục gì nhỉ? ^^' }
            let response2 = askCategory();
            await callSendAPI(sender_psid, response1);
            await callSendAPI(sender_psid, response2);
            resolve('done');
        } catch (e) {
            reject(e);
        }
    })
};

let askCategory = () => {
    let response = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [
                    {
                        "title": "Sự kiện",
                        "image_url": img.EVENT_IMG,
                        "subtitle": "Cùng khám phá những sự kiện hấp dẫn nào",
                        "buttons": [{
                            "type": "postback",
                            "payload": "EVENT",
                            "title": "Xem thêm"
                        }]
                    },
                    {
                        "title": "Cuộc thi",
                        "image_url": img.CONTEST_IMG,
                        "subtitle": "Cơ hội để bạn toả sáng đây rồi",
                        "buttons": [{
                            "type": "postback",
                            "payload": "CONTEST",
                            "title": "Xem thêm"
                        }]
                    },
                    {
                        "title": "Tuyển dụng",
                        "image_url": img.RECRUIT_IMG,
                        "subtitle": "Cùng xem những cơ hội việc làm, thực tập nào đang chờ bạn nhé",
                        "buttons": [{
                            "type": "postback",
                            "payload": "RECRUIT",
                            "title": "Xem thêm"
                        }]
                    },
                    {
                        "title": "Học bổng",
                        "image_url": img.SCHORLASHIP_IMG,
                        "subtitle": "Cứ đi rồi sẽ đến",
                        "buttons": [{
                            "type": "postback",
                            "payload": "SCHORLASHIP",
                            "title": "Xem thêm"
                        }]
                    },
                ]
            }
        }
    };
    return response;
};

let handleRecruit = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response1 = RecruitTemplate();

            await callSendAPI(sender_psid, response1);
            resolve('done');
        } catch (e) {
            reject(e);
        }
    })
};


let RecruitTemplate = () => {
    let response = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [
                    {
                        "title": "Tiki tuyển dụng",
                        "image_url": img.RECRUIT_TPL_IMG_1,
                        "subtitle": "Cơ hội cho các bạn thực tập sinh",
                        "buttons": [{
                            "type": "web_url",
                            "url": "https://ivolunteervietnam.com/tp-hcm-nen-tang-thuong-mai-dien-tu-tiki-tuyen-dung-thuc-tap-sinh-tuyen-dung-recruitment-intern.html?fbclid=IwAR3BYcnh9rrYr1o_AM0dAVzT03GeQlOy5z-oLS42wRCmIHh0wQfB6Ot0qCw",
                            "title": "Xem thêm"
                        }]
                    }
                ]
            }
        }
    };
    return response;
};

module.exports = {
    handleGetStarted: handleGetStarted,
    handleIntro: handleIntro,
    handleHanoiCity: handleHanoiCity,
    handleDanangCity: handleDanangCity,
    handleHCMCity: handleHCMCity,
    handleRecruit: handleRecruit
}