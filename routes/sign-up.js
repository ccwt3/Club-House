const { Router } = require("express");
const signController = require("../controller/sign-upController");
const signRouter = Router();

signRouter.get("/", signController);

module.exports = signRouter;
