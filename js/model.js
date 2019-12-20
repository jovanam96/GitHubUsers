

export default class Model {
    constructor(name) {
        this.name = name
    };

    getAllUsers() {
         return axios.get("https://api.github.com/search/users?q=users").
            then(function(response) {
                return response.data.items;
            });

    };

    getUser(username) {
        return axios.get("https://api.github.com/users/" + username)
            .then(function (response) {
                return response.data;
            })
    }

    getUserRepositories(username) {
        return axios.get("https://api.github.com/users/" + username + "/repos")
            .then(function (response) { 
                return response.data;
            })
    }

    getUserFollowers(username) {
        return axios.get("https://api.github.com/users/" + username + "/followers")
            .then(function (response) {
                return response.data;
            })
    }

    searchUsers(username) {
        return axios.get("https://api.github.com/search/users?q=" + username)
            .then(function (response) {
                return response.data.items;
            })
    }
}

