function homeGet(req, res) {
  if (!req.user) {
    return res.redirect("/sign-up");
  }
  res.render("index");
}

module.exports = homeGet;
