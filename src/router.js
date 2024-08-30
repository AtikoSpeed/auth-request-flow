const express = require("express");
const jwt = require("jsonwebtoken");
const { mock } = require("node:test");

const router = express.Router();

const mockUser = {
  username: "authguy",
  password: "mypassword",
  profile: {
    firstName: "Chris",
    lastName: "Wolstenholme",
    age: 43,
  },
};

router.post("/login", (req, res) => {
  const credentials = req.body;

  if (
    credentials.username == mockUser.username &&
    credentials.password == mockUser.password
  ) {
    res.json(jwt.sign({ username: mockUser.username }, "secretkey"));
  } else {
    res.status(401).send("Bad username or password");
  }
});

router.get("/profile", (req, res) => {
  const token = req.headers.authorization;
  console.log(token);
  try {
    let tokenVerify = jwt.verify(token, "secretkey");
    res.json({ profile: mockUser.profile });
  } catch (error) {
    res.status(401).send("No");
  }
});

module.exports = router;
