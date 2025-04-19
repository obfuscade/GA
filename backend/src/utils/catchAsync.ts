import { Request, Response, NextFunction, RequestHandler } from "express";

const catchAsync = (
  // eslint-disable-next-line no-unused-vars
  fn: (req: Request, res: Response, next: NextFunction) => Promise<unknown>,
): RequestHandler => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

export default catchAsync;
