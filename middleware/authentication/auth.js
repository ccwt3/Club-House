const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const db = require("../../database/queries");

module.exports = new LocalStrategy(async (username, password, done) => {
  const user = await db.getUser(username);

  if (user === null) {
    return done(null, false, { message: "Incorrect Username" });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return done(null, false, { message: "Incorrect Password" });
  }

  return done(null, user);
});
