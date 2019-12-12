

export default class Model {
    constructor(name) {
        this.name = name
    };

    getAllUsers() {
         return axios.get("https://api.github.com/users?access_token=0b37f7f96894512da03d8fdc5fb7012fc079a3e6").
            then(function(response) {
                return response.data;
            });

    };

    getUser(username) {
        return axios.get("https://api.github.com/users/" + username + "?access_token=0b37f7f96894512da03d8fdc5fb7012fc079a3e6")
            .then(function (response) {
                return response.data;
            })
    }

    getUserRepositories(username) {
        return axios.get("https://api.github.com/users/" + username + "/repos" + "?access_token=0b37f7f96894512da03d8fdc5fb7012fc079a3e6")
            .then(function (response) {
                return response.data;
            })
    }

    getUserFollowers(username) {
        return axios.get("https://api.github.com/users/" + username + "/followers" + "?access_token=0b37f7f96894512da03d8fdc5fb7012fc079a3e6")
            .then(function (response) {
                return response.data;
            })
    }
}

