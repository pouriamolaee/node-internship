const jwt = require("jsonwebtoken");
const { serialize } = require("cookie");

exports.createTokens = (payload) => {
  const token = jwt.sign(payload, "nazila", {
    expiresIn: 60 * 5, // 5 minutes
  });
  const refreshToken = jwt.sign(payload, "pouria", { expiresIn: "1h" });

  return { token, refreshToken };
};

exports.serializeRefreshToken = (refreshToken) => {
  return serialize("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60,
    path: "/",
  });
};
