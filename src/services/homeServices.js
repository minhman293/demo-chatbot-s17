require("dotenv").config();
import request from "request";
import { response } from "express";

let handleGetStarted = (sender_psid, response) => {
    let response = { "text": "hello" };
    return response;
}

module.exports = {
    handleGetStarted: handleGetStarted,
}