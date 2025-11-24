const {Router} = require("express");
const appRouter = Router();
const appController = require("../controller/appController.js");

appRouter.get("/", appController);

module.exports = appRouter;
