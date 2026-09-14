export type GithubRepoItem = {
  id: number;
  name: string;
  description: string;
  stargazers_count: number;
  language: string;
  created_at: string;
  updated_at: string;
  clone_url: string;
  full_name: string;
  html_url: string;
  forks_count: number;
  open_issues_count: number;
  watchers_count: number;
  license?: {
    name: string;
    url: string;
  };
  owner: {
    login: string;
    avatar_url: string;
    html_url: string;
    followers_url: string;
    repos_url: string;
  };
  topics: string[];
};

export type GithubReposResponse = {
  total_count: number;
  items: GithubRepoItem[];
};
