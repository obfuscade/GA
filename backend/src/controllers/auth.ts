import { NextFunction, Request, Response } from "express";
import User from "../models/user";
import CookieProvider from "../providers/cookie";
import JwtProvider from "../providers/jwt";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/HttpError";
import bcrypt from "bcrypt";
import config from "../providers/config";
import TokenBlackList from "../models/tokenBlackList";

class AuthController {
  private static readonly config = config.get("jwt");

  static signUp = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { email, password } = req.body;

      if (!email || !password) {
        return next(new AppError("Please provide correct credentials", 400));
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

      // Create a token and save in a httpOnly cookie
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

  static signIn = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { email, password } = req.body;

      if (!email || !password) {
        return next(new AppError("Please provide correct credentials", 400));
      }

      const user = await User.getUserByEmail(email);

      if (!user) {
        return next(new AppError("Please provide correct credentials", 400));
      }

      const isPasswordMatched = await bcrypt.compare(password, user.password);

      if (!isPasswordMatched) {
        return next(new AppError("Please provide correct credentials", 400));
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
    },
  );

  static signOut = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
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
    },
  );
}

export default AuthController;
