/**
 * HTTP Status Codes
 * Standard response codes for API endpoints
 */

// Success Responses (2xx)
const SUCCESS = 200;           // OK - Request successful
const CREATED = 201;           // Resource created successfully
const ACCEPTED = 202;          // Request accepted for processing
const NO_CONTENT = 204;        // Successful but no content to return

// Client Error Responses (4xx)
const BAD_REQUEST = 400;       // Invalid request syntax
const UNAUTHORIZED = 401;      // Authentication required
const FORBIDDEN = 403;         // No permission to access
const NOT_FOUND = 404;         // Resource not found
const METHOD_NOT_ALLOWED = 405;// HTTP method not supported
const CONFLICT = 409;          // Resource already exists
const UNPROCESSABLE = 422;     // Validation error
const TOO_MANY_REQUESTS = 429; // Rate limit exceeded

// Server Error Responses (5xx)
const SERVER_ERROR = 500;      // Internal server error
const NOT_IMPLEMENTED = 501;   // Feature not implemented
const SERVICE_UNAVAILABLE = 503; // Service temporarily unavailable

module.exports = {
  // Success
  SUCCESS,
  CREATED,
  ACCEPTED,
  NO_CONTENT,
  
  // Client Errors
  BAD_REQUEST,
  UNAUTHORIZED,
  FORBIDDEN,
  NOT_FOUND,
  METHOD_NOT_ALLOWED,
  CONFLICT,
  UNPROCESSABLE,
  TOO_MANY_REQUESTS,
  
  // Server Errors
  SERVER_ERROR,
  NOT_IMPLEMENTED,
  SERVICE_UNAVAILABLE
};
