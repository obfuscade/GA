import pool from "src/database/pool";

class User {
  // Method to get a user by email
  static async getUserByEmail(email: string): Promise<any> {
    const { rows } = await pool.query(
      "SELECT id FROM users WHERE email = $1;",
      [email],
    );
    return rows[0]; // Return the first matching row
  }

  // Method to get a user by id
  static async getById(id: string): Promise<any> {
    const { rows } = await pool.query("SELECT id FROM users WHERE id = $1;", [
      id,
    ]);
    return rows[0]; // Return the first matching row
  }

  // Method to create a new user
  static async create(email: string, password: string): Promise<any> {
    const { rows } = await pool.query(
      "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id;",
      [email, password],
    );
    return rows[0]; // Return the first matching row (which contains the user id)
  }
}

export default User;
