import { errorStatusCode } from "../constants.js";

export const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  switch (statusCode) {
    case errorStatusCode.VALIDATION_ERROR:
      res.json({
        title: "Validation error",
        message: err.message,
        stackTrace: err.stack,
      });
      break;

    case errorStatusCode.NOT_FOUND:
      res.json({
        title: "Not found",
        message: err.message,
        stackTrace: err.stack,
      });
    case errorStatusCode.UNAUTHORIZED:
      res.json({
        title: "Unauthorized",
        message: err.message,
        stackTrace: err.stack,
      });
    case errorStatusCode.FORBIDDEN:
      res.json({
        title: "Forbidden",
        message: err.message,
        stackTrace: err.stack,
      });
    case errorStatusCode.SERVER_ERROR:
      res.json({
        title: "Server error",
        message: err.message,
        stackTrace: err.stack,
      });
    default:
      console.log("no error");
  }
  res.json({ message: err.message, stackTrace: err.stack });
};
