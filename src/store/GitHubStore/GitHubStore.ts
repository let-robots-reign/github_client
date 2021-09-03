import { GetOrgReposParams, IGitHubStore, PostPRParams, RepoItem } from './types';
import ApiStore from '@/shared/store/ApiStore';
import { ApiResponse, HTTPMethod } from '@/shared/store/ApiStore/types';

export default class GitHubStore implements IGitHubStore {
    private readonly apiStore = new ApiStore('https://api.github.com');

    async getOrganizationReposList(params: GetOrgReposParams): Promise<ApiResponse<RepoItem[], Error>> {
        return this.apiStore.request({
            endpoint: `orgs/${params.organizationName}/repos`,
            method: HTTPMethod.GET,
            headers: {},
            data: null,
        });
    }

    async postPullRequestForHW(params: PostPRParams): Promise<ApiResponse<Object, Error>> {
        return this.apiStore.request({
            endpoint: `repos/${params.username}/${params.reponame}/pulls`,
            method: HTTPMethod.POST,
            headers: {
                Authorization: `token ${params.token}`,
            },
            data: {
                head: params.headBranch,
                base: params.baseBranch,
                title: params.title,
                body: params.body,
            },
        });
    }
}
