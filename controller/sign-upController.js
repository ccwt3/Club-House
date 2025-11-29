const db = require("../database/queries");
const bcrypt = require("bcryptjs");

function signUpGet(req, res) {
  res.render("sign-up", { err: null });
}

async function signUpPost(req, res, next) {
  const password = req.body.password;
  const username = req.body.username;
  const name = req.body.name;
  const lastName = req.body.last_name;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await db.addUser(name, lastName, username, hashedPassword);

    if (!user) {
      // redirect to register and add a message of username already taken
      return res.send("Username already taken");
    }

    res.redirect("/log-in");
  } catch (error) {
    console.error(error);
    return next(error);
  }
}

module.exports = {
  signUpGet,
  signUpPost,
};
