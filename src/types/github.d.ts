export type GithubRepoItem = {
  id: number;
  name: string;
  description: string;
  stargazers_count: number;
  language: string;
  updated_at: string;
  owner: {
    avatar_url: string;
  };
};

export type GithubReposResponse = {
  total_count: number;
  items: GithubRepoItem[];
};
