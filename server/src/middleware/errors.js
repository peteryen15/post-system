export class CustomError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {
    const { statusCode, message } = err;

    return res.status(statusCode).send({ message });
  }

  console.log(err);

  return res.status(500).send("未知的錯誤");
};
