const db = require("../../database/queries");

function serializeUser(user, done) {
  done(null, user.id);
}

async function deserializeUser(id, done) {
  try {
    const user = await db.getSessionInfo(id);
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
