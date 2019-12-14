import View from "./view.js";
import Model from "./model.js";

class Controller {
    constructor(view, model) {
        this.view = view;
        this.model = model;

        this.view.bindSearchUsersButton(this.handleSearchUsers);
        this.view.bindSearchUsersInput(this.handleSearchUsers);
        this.view.bindDetailsButton(this.handleGetUser);
        this.view.bindLogoImg(this.handleGetAllUsers);
    }

    handleGetAllUsers = () => {
        this.model.getAllUsers()
            .then(data => this.view.populateUsersList(data));

    }

    handleSearchUsers = (username) => {
        if (username.trim()) {
            this.model.searchUsers(username)
                .then(data => this.view.populateUsersList(data));
        } else {
            this.model.getAllUsers()
                .then(data => this.view.populateUsersList(data));
        }
    }

    handleGetUser = (username) => {
        this.model.getUser(username)
            .then(user => {
                this.model.getUserRepositories(username)
                    .then(repositories => {
                        user.repositories = repositories;
                        this.model.getUserFollowers(username)
                            .then(followers => {
                                user.followers = followers;
                                this.view.populateUser(user);
                            });
                    });
            });

    };

}

const app = new Controller(new View(), new Model());
