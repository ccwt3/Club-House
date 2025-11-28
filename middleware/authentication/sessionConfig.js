const pool = require("../../database/pool");
const expressSession = require("express-session");
const pgSession = require("connect-pg-simple")(expressSession);

module.exports = expressSession({
  store: new pgSession({
    pool: pool,
    tableName: "sessions",
    createTableIfMissing: true,
  }),
  secret: "la reyna de las sorras :VvVVvVvV xdxdxd",
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60000 },
});
