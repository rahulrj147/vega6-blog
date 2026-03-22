const jwt = require("jsonwebtoken");

const sign = (payload, secret, expiry) =>
  jwt.sign(payload, secret || "secret", { expiresIn: expiry || "1h" });

const generateTokens = (user) => {
  const payload = { id: user._id, name: user.name, email: user.email };
  return {
    accessToken: sign(payload, process.env.ACCESS_TOKEN_SECRET, process.env.ACCESS_TOKEN_EXPIRY),
    refreshToken: sign(payload, process.env.REFRESH_TOKEN_SECRET, process.env.REFRESH_TOKEN_EXPIRY),
  };
};

const verify = (token, secret) => jwt.verify(token, secret);

module.exports = { generateTokens, verify };
