const { ErrorHandler } = require('../utils/error');

const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  throw new ErrorHandler(401, 'Please log in to access this page');
};

const ensureAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    return next();
  }
  throw new ErrorHandler(403, 'You are not authorized to view this page');
};

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  
  if (process.env.NODE_ENV === 'development') {
    console.error(err.stack);
    res.status(statusCode).json({
      success: false,
      statusCode,
      message,
      stack: err.stack
    });
  } else {
    res.status(statusCode).json({
      success: false,
      statusCode,
      message
    });
  }
};

module.exports = {
  ensureAuthenticated,
  ensureAdmin,
  errorHandler
};
