

export default class Model {
    constructor(name) {
        this.name = name
    };

    getAllUsers() {
         return axios.get("https://api.github.com/users?access_token=5f17235e5280d8d2f878ee9703ec718a946fecfc").
            then(function(response) {
                return response.data;
            });

    };

    getUser(username) {
        return axios.get("https://api.github.com/users/" + username + "?access_token=5f17235e5280d8d2f878ee9703ec718a946fecfc")
            .then(function (response) {
                return response.data;
            })
    }

    getUserRepositories(username) {
        return axios.get("https://api.github.com/users/" + username + "/repos?access_token=5f17235e5280d8d2f878ee9703ec718a946fecfc")
            .then(function (response) { 
                return response.data;
            })
    }

    getUserFollowers(username) {
        return axios.get("https://api.github.com/users/" + username + "/followers?access_token=5f17235e5280d8d2f878ee9703ec718a946fecfc")
            .then(function (response) {
                return response.data;
            })
    }
}

