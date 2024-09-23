const API_URL = "https://api.github.com/repos/";

const DEFAULT_HEADERS = {
    "Accept": "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "Authorization": "Bearer " + process.env.GITHUB_TOKEN
}

export { API_URL, DEFAULT_HEADERS };