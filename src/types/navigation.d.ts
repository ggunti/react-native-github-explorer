import type { GithubRepoItem } from './github';

export type RootStackParamList = {
  SearchRepos: undefined;
  ReposList: { keyword: string };
  RepoDetails: { repo: GithubRepoItem };
};
