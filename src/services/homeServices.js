require("dotenv").config();
import request from "request";
import { response } from "express";
const la = require("./lang");

let handleGetStarted = () => {
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
    return response;
}

module.exports = {
    handleGetStarted: handleGetStarted,
}