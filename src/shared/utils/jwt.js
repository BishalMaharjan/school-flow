const jwt = require("jsonwebtoken");
const { jwtSecret, jwtExpiresIn } = require("../../config/env");

const signAccessToken = (payload) => {
  return jwt.sign(
    {
      sub: payload.sub,
      schoolId: payload.schoolId ?? null,
      role: payload.role,
    },
    jwtSecret,
    { expiresIn: jwtExpiresIn }
  );
};

const verifyAccessToken = (token) => {
  return jwt.verify(token, jwtSecret);
};

module.exports = {
  signAccessToken,
  verifyAccessToken,
};
