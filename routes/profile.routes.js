const router = require("express").Router();

const authCheck = (req, res, next) => {
  if (!req.user) {
    //if user is not logged in
    res.redirect("/auth/login");
  } else {
    //if user is logged in
    next();
  }
};

router.get("/",authCheck, (req, res) => {
  res.status(200).send("Logged in: " + req.user.username);
});

module.exports = router;
