const db = require("../../database/queries");

function serializeUser(user, done) {
  done(null, user.username);
}

async function deserializeUser(username, done) {
  try {
    const user = await db.getSessionInfo(username);
    if (user === null) {
      throw new Error("Not user found");
    }
    done(null, user);
  } catch (err) {
    done(err);
  }
}

module.exports = {
  serializeUser,
  deserializeUser,
};
