import ApiStore from '../../shared/store/ApiStore';
import {GetOrgReposParams, IGitHubStore, RepoItem} from "./types";
import {ApiResponse, HTTPMethod} from "../../shared/store/ApiStore/types";

export default class GitHubStore implements IGitHubStore {
    private readonly apiStore = new ApiStore('https://api.github.com');

    async getOrganizationReposList(params: GetOrgReposParams): Promise<ApiResponse<RepoItem[], Error>> {
        return this.apiStore.request({
            endpoint: `orgs/${params.organizationName}/repos`,
            method: HTTPMethod.GET,
            headers: {},
            data: null
        });
    }
}
