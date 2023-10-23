const router = require("express").Router();
const passport = require("passport");

//auth login

router.get("/login", (req, res) => {
  res.render("login");
});

//auth logout
router.get("/logout", (res, req) => {
  //handle with passport
  res.send("logging out");
});

//auth with google
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"],
  })
);

//callback route for google redirect to
router.get("/google/redirect", passport.authenticate("google"), (req, res,next) => {
  // res.send(req.user);
  res.redirect('/profile/')

});

module.exports = router;
