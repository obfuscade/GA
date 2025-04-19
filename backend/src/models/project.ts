import pool from "src/database/pool";

interface Project {
  owner: string;
  url: string;
  stars: number;
  forks: number;
  issues: number;
}

interface GetProjectsParams {
  ownerId: string;
  lastElementId: string | null;
  limit: number;
}

class ProjectService {
  static async getProjectsKeyset({
    ownerId,
    lastElementId = null,
    limit = 10,
  }: GetProjectsParams) {
    let query = `SELECT id, owner, url, stars, forks, issues, createdAt 
                 FROM projects WHERE owner = $1`;

    if (lastElementId) {
      query += ` AND id > $2`;
    }

    query += ` ORDER BY id ASC LIMIT $3;`;

    const params = lastElementId
      ? [ownerId, lastElementId, limit]
      : [ownerId, limit];

    const { rows: projects } = await pool.query(query, params);

    const hasMore = projects.length === limit;

    return { projects, hasMore };
  }

  static async createProject({ owner, url, stars, forks, issues }: Project) {
    return await pool.query(
      "INSERT INTO projects (owner, url, stars, forks, issues) VALUES ($1, $2, $3, $4, $5);",
      [owner, url, stars, forks, issues],
    );
  }

  static async updateProject({ owner, url, stars, forks, issues }: Project) {
    return await pool.query(
      "UPDATE projects SET owner = $1, url = $2, stars = $3, forks = $4, issues = $5 WHERE url = $2;",
      [owner, url, stars, forks, issues],
    );
  }
}

export default ProjectService;
