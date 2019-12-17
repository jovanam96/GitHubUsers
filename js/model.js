

export default class Model {
    constructor(name) {
        this.name = name
    };

    getAllUsers() {
         return axios.get("https://api.github.com/search/users?q=users&acces_token=aa79294a27010f1d41df01111e6ebce6c0a3b84f").
            then(function(response) {
                return response.data.items;
            });

    };

    getUser(username) {
        return axios.get("https://api.github.com/users/" + username + "?access_token=ee9587b485f6ca334cc3f314e9202be559396ec2;")
            .then(function (response) {
                return response.data;
            })
    }

    getUserRepositories(username) {
        return axios.get("https://api.github.com/users/" + username + "/repos"  + "?access_token=ee9587b485f6ca334cc3f314e9202be559396ec2;")
            .then(function (response) { 
                return response.data;
            })
    }

    getUserFollowers(username) {
        return axios.get("https://api.github.com/users/" + username + "/followers"  + "?access_token=ee9587b485f6ca334cc3f314e9202be559396ec2;")
            .then(function (response) {
                return response.data;
            })
    }

    searchUsers(username) {
        return axios.get("https://api.github.com/search/users?q=" + username  + "&access_token=ee9587b485f6ca334cc3f314e9202be559396ec2;")
            .then(function (response) {
                return response.data.items;
            })
    }
}

