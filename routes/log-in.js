const { Router } = require("express");
const loginController = require("../controller/loginController");
const loginValidator = require("../middleware/validation/loginValidator");
const check = require("../middleware/validation/validationCheck");
const loginRouter = Router();

loginRouter.get("/", loginController.loginGet);
loginRouter.post("/", loginValidator, check, loginController.loginPost);

module.exports = loginRouter;
