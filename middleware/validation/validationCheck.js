const { validationResult } = require("express-validator");

module.exports = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.render("error", {
      message:
        `Now, you should not be seeing this IF you are a normal user... OR you may just have pressed the wrong key combination \n
        Whatever the case may be, just go back to home page and try again (now without any weird things)`,
    });
  }

  next();
};
