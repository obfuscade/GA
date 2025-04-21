import { NextFunction, Response } from "express";
import CookieProvider from "../../providers/cookie";
import AppError from "../../utils/HttpError";
import TokenBlackList from "../../models/tokenBlackList";
import User from "../../models/user";
import JwtProvider from "../../providers/jwt";
import catchAsync from "../../utils/catchAsync";
import { ICustomRequest } from "../../types";

class AuthMiddleware {
  static verify = catchAsync(
    async (req: ICustomRequest, _: Response, next: NextFunction) => {
      const token = CookieProvider.get({ req, key: "token" });

      // Token not provided
      if (!token) {
        return next(new AppError("Unauthorized", 401));
      }

      const isTokenInBlackListExists = await TokenBlackList.isExists(token);

      // Token expired
      if (isTokenInBlackListExists) {
        return next(new AppError("Unauthorized", 401));
      }

      const decoded = await JwtProvider.decode(token);
      const isUserExist = await User.getById(decoded.userId);

      // User deleted
      if (!isUserExist) {
        return next(new AppError("Unauthorized", 401));
      }

      req.userId = decoded.userId;
      return next();
    },
  );
}

export default AuthMiddleware;
