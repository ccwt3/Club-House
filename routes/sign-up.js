const { Router } = require("express");
const signController = require("../controller/sign-upController");
const signValidator = require("../functions/signValidator");
const check = require("../functions/validationCheck");
const signRouter = Router();

signRouter.get("/", signController.signUpGet);
signRouter.post("/", signValidator, check, signController.signUpPost);

module.exports = signRouter;
