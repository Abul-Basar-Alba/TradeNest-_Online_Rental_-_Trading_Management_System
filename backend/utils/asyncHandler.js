/**
 * Async Handler Wrapper
 * Eliminates try-catch blocks in controllers
 * Automatically catches errors and passes them to error handler middleware
 */

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;
