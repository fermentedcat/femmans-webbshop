const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.header('x-auth-token');
    if (!token) {
      res.status(403).send('Access denied.');
    } else {
      const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
      req.user = decoded;
      next();
    }
  } catch (error) {
    res.status(400).send('Invalid token');
  }
};
