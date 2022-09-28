const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authUtils = require("../utils/auth");
const User = require("../models/user");

exports.signUp = (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ message: "Invalid username or password" });

  User.findOne({ where: { username } }).then((user) => {
    if (user) return res.status(409).json({ message: "Already exists" });
  });

  bcrypt
    .hash(password, 12)
    .then((hashedPass) => {
      return User.create({ username, password: hashedPass });
    })
    .then((newUser) =>
      res.status(201).json({ message: "Successfully created", newUser })
    )
    .catch(console.log);
};

exports.signIn = (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ message: "Invalid input" });

  let foundUser;
  User.findOne({ where: { username } })
    .then((user) => {
      foundUser = user;
      if (!user)
        return res.status(401).json({ message: "This user does not exist" });

      return bcrypt.compare(password, user.password);
    })
    .then((isEqual) => {
      if (!isEqual) return res.status(401).json({ message: "Wrong password" });

      const { token, refreshToken } = authUtils.createTokens({
        id: foundUser.id,
        username: foundUser.username,
      });

      const serializedRefreshToken =
        authUtils.serializeRefreshToken(refreshToken);

      res
        .status(200)
        .setHeader("Set-Cookie", serializedRefreshToken)
        .json({ message: "Successfully logged in", token, user: foundUser });
    })
    .catch(console.log);
};

exports.refreshToken = (req, res, next) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken)
    return res.status(400).json({ message: "No refreshToken provided" });

  let decodedRefreshToken;
  try {
    decodedRefreshToken = jwt.verify(refreshToken, "pouria");
  } catch (error) {
    // Later add global error handling
    // Add this status code (500) to all the responses in Swagger
    return res.status(500).json({ message: error });
  }
  const { id, username } = decodedRefreshToken;

  const { token, refreshToken: newRefreshToken } = authUtils.createTokens({
    id,
    username,
  });

  const serializedRefreshToken =
    authUtils.serializeRefreshToken(newRefreshToken);

  res
    .status(200)
    .setHeader("Set-Cookie", serializedRefreshToken)
    .json({ message: "Successfully new token generated", token });
};
