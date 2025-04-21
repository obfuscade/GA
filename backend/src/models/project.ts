import { IProject } from "../types";
import pool from "../database/pool";

class Project {
  static async get({
    userId,
    lastItemId,
    limit,
  }: {
    userId: string | null;
    lastItemId: string | null;
    limit: number;
  }): Promise<{ data: Omit<IProject, "userId">[]; hasMore: boolean }> {
    let query = `
      SELECT
        id,
        owner,
        name,
        url,
        stars,
        forks,
        issues,
        created_at AS "createdAt"
      FROM
        projects
      WHERE
        user_id = $1`;

    // limit + 1 - to determine if there are more projects than the "limit"
    const params = [userId, limit + 1];

    if (lastItemId) {
      query += " AND id > $3";
      params.push(lastItemId);
    }

    query += " ORDER BY id ASC LIMIT $2;";

    const { rows } = await pool.query(query, params);
    const hasMore = rows.length > limit;
    // Remove the last item from the results, which was added to check "hasMore" for pagination
    const data = rows.slice(0, limit);

    return { data, hasMore };
  }

  static async create({
    sourceId,
    userId,
    owner,
    url,
    name,
    stars,
    forks,
    issues,
    createdAt,
  }: IProject & { userId: string; sourceId: string }): Promise<IProject> {
    const query = `
      INSERT INTO projects
        (
          source_id,
          owner,
          name,
          user_id,
          url,
          stars,
          forks,
          issues,
          created_at
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9
        )
        RETURNING id, owner, name, url, stars, forks, issues, created_at AS "createdAt";
    `;

    const { rows } = await pool.query(query, [
      sourceId,
      owner,
      name,
      userId,
      url,
      stars,
      forks,
      issues,
      createdAt,
    ]);

    return rows[0];
  }

  static async getBySourceId({
    sourceId,
    userId,
  }: {
    sourceId: string;
    userId: string | null;
  }): Promise<IProject> {
    const query = `
      SELECT
        id
      FROM
        projects
      WHERE
        user_id = $1 AND
        source_id = $2;
    `;

    const { rows } = await pool.query(query, [userId, sourceId]);

    return rows[0];
  }

  static async update({
    id,
    owner,
    url,
    name,
    stars,
    forks,
    issues,
  }: IProject): Promise<IProject> {
    const query = `
      UPDATE
        projects
      SET
        owner = $2,
        name = $3,
        url = $4,
        stars = $5,
        forks = $6,
        issues = $7
      WHERE
        id = $1
      RETURNING id, owner, name, url, stars, forks, issues, created_at AS "createdAt";
    `;

    const { rows } = await pool.query(query, [
      id,
      owner,
      name,
      url,
      stars,
      forks,
      issues,
    ]);

    return rows[0];
  }

  static async getById(id: string): Promise<IProject> {
    const query = `
      SELECT
        source_id AS "sourceId"
      FROM
        projects
      WHERE
        id = $1;
    `;

    const { rows } = await pool.query(query, [id]);

    return rows[0];
  }

  static async delete(id: string): Promise<void> {
    await pool.query("DELETE FROM projects WHERE id = $1;", [id]);
  }
}

export default Project;
