const { Router } = require("express");
const signController = require("../controller/sign-upController");
const signValidator = require("../middleware/validation/signValidator");
const check = require("../middleware/validation/validationCheck");
const signRouter = Router();

signRouter.get("/", signController.signUpGet);
signRouter.post("/", signValidator, check, signController.signUpPost);

module.exports = signRouter;
