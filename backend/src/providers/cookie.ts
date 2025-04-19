import { Request, Response } from "express";
import config from "./config";

class CookieProvider {
  private static readonly config = config.get("jwt");

  static get({ req, key }: { req: Request; key: string }): string {
    return req.cookies[key];
  }

  static set({
    res,
    key,
    value,
  }: {
    res: Response;
    key: string;
    value: string;
  }): void {
    res.cookie(key, value, {
      // Only for production
      //secure,
      httpOnly: true,
      maxAge: Number(this.config.expiresIn),
    });
  }

  static delete({ res, key }: { res: Response; key: string }): void {
    res.clearCookie(key);
  }
}

export default CookieProvider;
