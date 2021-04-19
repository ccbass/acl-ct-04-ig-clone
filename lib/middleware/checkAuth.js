const { verifyToken } = require('../utils/jwt');

module.exports = (req, res, next) => {
  try {
    const { session } = req.cookies;

    const user = verifyToken(session);
    req.user = user;
    next();
  } catch (error) {
    next(error);
    
  }
};