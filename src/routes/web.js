import express from "express";
import homeController from "../controllers/homeController";

let router = express.Router();

let initWebRouters = (app) => {
    router.get("/", homeController.getHomePage);
    router.get('/setup-persistent-menu', homeController.setupPersistentMenu);
    router.post('/webhook', homeController.postWebhook);
    router.get('/webhook', homeController.getWebhook);

    return app.use('/', router);
}

module.exports = initWebRouters;