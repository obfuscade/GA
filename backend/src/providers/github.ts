/* eslint-disable @typescript-eslint/no-explicit-any */

import axios from "axios";
import { GITHUB_ENDPOINT } from "../constants";

class GithubProvider {
  private static async request({
    method,
    path,
  }: {
    method: string;
    path: string;
  }): Promise<any> {
    const URL = `${GITHUB_ENDPOINT}${path}`;

    try {
      const { data } = await axios({
        method,
        url: URL,
      });

      return data;
    } catch (error: any) {
      if (error.status === 404) {
        throw new Error("Repo has not found");
      }

      return null;
    }
  }

  static async getProject({
    url,
    sourceId,
  }: {
    url?: string;
    sourceId?: string;
  }): Promise<any> {
    let path = "";

    if (url) {
      path = `/repos/${url}`;
    } else if (sourceId) {
      path = `/repositories/${sourceId}`;
    }

    const data = await this.request({
      method: "GET",
      path,
    });

    if (!data) {
      return null;
    }

    return {
      sourceId: data.id,
      owner: data.owner.login,
      name: data.name,
      url: data.html_url,
      stars: data.stargazers_count,
      forks: data.forks,
      issues: data.open_issues,
      createdAt: data.created_at,
    };
  }
}

export default GithubProvider;
