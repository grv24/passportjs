const express = require("express");
const authRoutes = require("./routes/auth.routes");
const profileRoutes = require("./routes/profile.routes");
const dotenv = require("dotenv");
const path = require("path");
const passportSetup = require("./config/passport-setup");
dotenv.config();
const mongoose = require("mongoose");
const key = require("./config/keys");
const session = require("express-session");
const passport = require("passport");

const app = express();
const port = process.env.PORT || 5000;

// Set up view engine and views directory
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//cookieSession
app.use(
  session({
    secret: key.session.cookieKey,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, 
    },
  })
);
//initialize passport
app.use(passport.initialize());
app.use(passport.session());

//connect to mongo db
const dbConnect = async () => {
  try {
    await mongoose.connect(key.mongodb.dbURI);
    console.log(`Database Connected`);
  } catch (error) {
    console.log({ message: "internal error" });
  }
};
//call db connection
dbConnect();

//set-up routes
app.use("/auth", authRoutes);
app.use("/profile",profileRoutes);

// Create home route
app.get("/", (req, res) => {
  res.render("home");
});

app.listen(port, () => console.log(`Server listening on ${port}`));
