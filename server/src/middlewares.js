function notFound(req, res, next) {
    res.status(404);
    const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
    next(error);
  }
  
  function errorHandler(err, req, res, next) {
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    res.status(statusCode);
    res.json({
      message: err.message,
      stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack
    });
  }
  
//   function allowCrossDomain(req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*'); // * for development purposes
    
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     res.header('Access-Control-Request-Headers', '*'); // * for development purposes
//     next();
// }
function allowCrossDomain(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*'); // * for development purposes
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
  res.header('Access-Control-Allow-Credentials', true); // for development purposes
  // 
  next();
}

  module.exports = {
    notFound,
    errorHandler,
    allowCrossDomain
  };