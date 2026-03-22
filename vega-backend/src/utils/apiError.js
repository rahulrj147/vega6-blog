class ApiError extends Error {
  constructor(
    statusCode,
    message = "Something went wrong",
    data = null,
    error = [],
    stack = ""
  ) {
    super(message);

    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.success = false;
    this.data = data;
    this.error = error;

    if (stack) this.stack = stack;
    else Error.captureStackTrace(this, this.constructor);
  }

  toJSON() {
    return {
      statusCode: this.statusCode,
      success: this.success,
      message: this.message,
      error: this.error,
      data: this.data
    };
  }
}

module.exports = ApiError;