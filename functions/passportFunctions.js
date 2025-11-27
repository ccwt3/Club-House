const passport = require("passport");
const localStrategy = require("passport-local");
const bcrypt = require("bcryptjs");
const db = require("../database/queries");
