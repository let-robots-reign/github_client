/** Интерфейс класса для работы с GitHub API
 * названия getOrganizationReposList
 * (а также типов GetOrganizationReposListParams и RepoItem)
 * поменяйте в соответствии с выполняемым запросом.
 * Или не меняйте, если делаете запрос за списком репозиториев для организации)
 * Выберите любой запрос из публичного API GitHub.
 */
import { ApiResponse } from '@/shared/store/ApiStore/types';

export interface IGitHubStore {
    getOrganizationReposList(params: GetOrgReposParams): Promise<ApiResponse<RepoItem[], Error>>;
}

export type GetOrgReposParams = {
    organizationName: string;
};

type RepoItemOwner = {
    id: number;
    url: string;
    avatar_url: string;
    login: string;
};

export type RepoItem = {
    id: number;
    title: string;
    url: string;
    stars: number;
    updatedAt: string;
    owner: RepoItemOwner;
};

export type PostPRParams = {
    username: string;
    reponame: string;
    token: string;
    headBranch: string;
    baseBranch: string;
    title: string;
    body: string;
};
