const jwt = require("jsonwebtoken");
const {
  ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRY,
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRY,
} = require("../config/env.config");

const sign = (payload, secret, expiry) => {
  if (!secret) throw new Error("JWT secret is required");
  if (!expiry) throw new Error("JWT expiry is required");
  return jwt.sign(payload, secret, { expiresIn: expiry });
};

const generateTokens = (user) => {
  const payload = { id: user._id, name: user.name, email: user.email };

  if (!ACCESS_TOKEN_SECRET || !ACCESS_TOKEN_EXPIRY || !REFRESH_TOKEN_SECRET || !REFRESH_TOKEN_EXPIRY) {
    throw new Error("JWT env vars (ACCESS/REFRESH secrets + expiries) are required");
  }

  return {
    accessToken: sign(payload, ACCESS_TOKEN_SECRET, ACCESS_TOKEN_EXPIRY),
    refreshToken: sign(payload, REFRESH_TOKEN_SECRET, REFRESH_TOKEN_EXPIRY),
  };
};

const verify = (token, secret) => jwt.verify(token, secret);

module.exports = { generateTokens, verify };
