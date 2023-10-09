export type GetRepositoriesType = {
  total_count: number,
  items: Array<GitHubRepository>
}


export type Owner = {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
}

export type GitHubRepository = {
  id: number;
  node_id: string;
  owner: Owner,
  name: string;
  full_name: string;
  private: boolean;
  html_url: string;
  description: string | null;
  fork: boolean;
  url: string;
  stargazers_count: number;
  language: string;
  forks: number;
  default_branch: string;
  open_issues: number;
  watchers: number;
}

export type PaginationParams = {
  page: number;
  perPage: number;
};