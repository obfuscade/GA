import pool from "src/database/pool";

class TokenBlackList {
  // Method to check if a token exists in the blacklist
  static async isExists(token: string): Promise<boolean> {
    const { rows } = await pool.query(
      "SELECT id FROM tokens_black_list WHERE token = $1;",
      [token],
    );
    return rows.length > 0;
  }

  // Method to add a token to the blacklist
  static async create(token: string): Promise<void> {
    await pool.query("INSERT INTO tokens_black_list (token) VALUES ($1);", [
      token,
    ]);
  }
}

export default TokenBlackList;
