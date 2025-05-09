import pool from "../database/pool";

class TokenBlackList {
  static async isExists(token: string): Promise<boolean> {
    const { rows } = await pool.query(
      "SELECT id FROM tokens_black_list WHERE token = $1;",
      [token],
    );

    return Boolean(rows.length);
  }

  static async create(token: string): Promise<void> {
    await pool.query("INSERT INTO tokens_black_list (token) VALUES ($1);", [
      token,
    ]);
  }
}

export default TokenBlackList;
