const { API_URL, DEFAULT_HEADERS } = require("./common");

class Repository {
    constructor(name, owner) {
        this.name = name;
        this.owner = owner;
    }

    get name() {
        return this.name;
    }

    async getActions() {
        let response =  await fetch(API_URL + this.owner + "/" + this.name + "/actions/workflows", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + process.env.GITHUB_TOKEN,
                ...DEFAULT_HEADERS
            }
        });
        return response.json();
    }

    static fromJSON(json) {
        return new Repository(json.name, json.owner.login);
    }
}