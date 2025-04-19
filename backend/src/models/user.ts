import pool from "src/database/pool";

class User {
  static async getUserByEmail(email: string): Promise<any> {
    const { rows } = await pool.query(
      "SELECT id FROM users WHERE email = $1;",
      [email],
    );
    return rows[0];
  }

  static async getById(id: string): Promise<any> {
    const { rows } = await pool.query("SELECT id FROM users WHERE id = $1;", [
      id,
    ]);
    return rows[0];
  }

  static async create(email: string, password: string): Promise<any> {
    const { rows } = await pool.query(
      "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id;",
      [email, password],
    );
    return rows[0];
  }
}

export default User;
