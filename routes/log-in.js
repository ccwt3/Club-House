const { Router } = require("express");
const loginController = require("../controller/loginController");
const loginRouter = Router();

loginRouter.get("/", loginController);

module.exports = loginRouter;
