import { NextFunction, Request } from "express";
import User from "src/models/user";
import CookieProvider from "src/providers/cookie";
import JwtProvider from "src/providers/jwt";
import catchAsync from "src/utils/catchAsync";
import AppError from "src/utils/HttpError";
import bcrypt from "bcrypt";
import config from "src/providers/config";
import TokenBlackList from "src/models/tokenBlackList";

class AuthController {
  private static readonly config = config.get("jwt");

  static signUp = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { email, password } = req.body;

      if (!email || !password) {
        return next(new AppError("Please provide correct credentials", 401));
      }

      const user = await User.getUserByEmail(email);

      if (user) {
        return next(new AppError("User is already exist", 409));
      }

      const encryptedPassword = await bcrypt.hash(
        password,
        this.config.passwordSalt,
      );
      const userCreated = await User.create(email, encryptedPassword);

      // Create a token and save in the httpOnly cookie
      const token = await JwtProvider.get(userCreated.id);
      CookieProvider.set({
        res,
        key: "token",
        value: token,
      });

      return res.status(201).json({
        message: "success",
      });
    },
  );

  static signIn = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new AppError("Please provide correct credentials", 401));
    }

    const user = await User.getUserByEmail(email);

    if (!user) {
      return next(new AppError("Please provide correct credentials", 401));
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      return next(new AppError("Please provide correct credentials", 401));
    }

    // Create a token and save in the httpOnly cookie
    const tokenCreated = await JwtProvider.get(user.id);
    CookieProvider.set({
      res,
      key: "token",
      value: tokenCreated,
    });

    return res.status(201).json({
      message: "success",
    });
  });

  static signOut = catchAsync(async (req, res, next) => {
    const token = CookieProvider.get({
      req,
      key: "token",
    });

    if (!token) {
      return next(new AppError("Unauthorized", 401));
    }

    // Save in the black list to not have an access of reattempt request
    await TokenBlackList.create(token);
    CookieProvider.delete({
      res,
      key: "token",
    });

    return res.status(200).json({
      message: "success",
    });
  });
}

export default AuthController;
