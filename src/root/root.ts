import GitHubStore from '@/store/GitHubStore/GitHubStore';

const gitHubStore = new GitHubStore();

const EXAMPLE_ORGANIZATION = 'ktsstudio';

gitHubStore
    .getOrganizationReposList({
        organizationName: EXAMPLE_ORGANIZATION,
    })
    .then((result) => {
        // eslint-disable-next-line no-console
        console.log(result); // в консоли появится список репозиториев в ktsstudio
    });

// Необходимо вставить свой Personal Access Token
// https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/creating-a-personal-access-token
// Сначала поместил свой token в .env, но потом прочитал в документации
// "WARNING: Do not store any secrets (such as private API keys) in your React app!
// Environment variables are embedded into the build, meaning anyone can view them by inspecting your app's files."
const token = '';

gitHubStore
    .postPullRequestForHW({
        username: 'let-robots-reign',
        reponame: 'github_client',
        token,
        baseBranch: 'master',
        headBranch: 'hw-1',
        title: 'HW1',
        body: 'Данный PR был создан с помощью GitHubStore',
    })
    .then((result) => {
        // eslint-disable-next-line no-console
        console.log(result);
    });
