import jwt, { Secret, SignOptions } from "jsonwebtoken";
import { promisify } from "util";
import config from "./config";

const signAsync = promisify<object, Secret, SignOptions>(jwt.sign);
const verifyAsync = promisify<string, Secret>(jwt.verify);

class JwtProvider {
  private static readonly config = config.get("jwt");

  static async get(userId: string): Promise<any> {
    const token = await signAsync({ userId }, this.config.secret, {
      // Convert milliseconds variable to seconds
      expiresIn: this.config.expiresIn / 1000,
    });

    return token;
  }

  static async decode(token: string): Promise<any> {
    const decoded = await verifyAsync(token, this.config.secret);

    return decoded;
  }
}

export default JwtProvider;
