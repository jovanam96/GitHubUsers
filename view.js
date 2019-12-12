export default class View {
    constructor() {
        this.app = $("#root");

        this.welcomeContainer = createElement("div", "welcomeContainer");
        this.usersContainer = createElement("div", "usersContainer");
        this.userContainer = createElement("div", "userContainer");

        this.logo = createElement("img", "logo");
        this.logo.src = "./logo.png"
        this.welcomeContainer.append(this.logo);

        this.header = createElement("h1", "header");
        this.header.textContent = "GitHub users"
        this.welcomeContainer.append(this.header);

        this.searchInput = createElement("input", "searchInput");
        this.searchInput.type = "text";
        this.searchInput.placeholder = "Search users...";
        this.welcomeContainer.append(this.searchInput);

        this.searchButton = createElement("button", "searchButton");
        this.searchButton.textContent = "Search";
        this.searchButton.id = "searchButton";
        this.welcomeContainer.append(this.searchButton);

        this.usersList = createElement("ul", "usersList");

        this.app.append(this.welcomeContainer);
    }

    bindLogoImg(handler) {
        this.logo.addEventListener("click", function (event) {
            handler();
        })
    }

    bindSearchUsersButton(handler) {
        this.searchButton.addEventListener("click", function (event) {
            handler();
        })
    }

    bindDetailsButton(handler) {
        this.usersList.addEventListener("click", function (event) {
            if (event.target.className === "detailsButton") {
                handler(event.target.parentElement.username);
            }
        })
    }

    populateUsersList(users) {
        this.welcomeContainer.remove();
        this.userContainer.remove();
        for (let i = 0; i < users.length; i++) {
            this.usersList.appendChild(createUserCard(users[i]));
        }
        this.usersContainer.append(this.usersList);
        this.app.append(this.usersContainer);
    };

    populateUser(user) {
        this.welcomeContainer.remove();
        this.usersContainer.remove();
        this.userContainer.innerHTML = "";
        const userPage = createUserPage(user);
        this.userContainer.append(this.searchInput);
        this.userContainer.append(this.searchButton);
        this.userContainer.append(userPage);
        this.app.append(this.userContainer);
    }

}

function createUserCard(user) {
    const card = createElement("div", "card");
    card.id = user.id;
    card.username = user.login;

    const userImage = createElement("img", "userImage")
    userImage.src = user.avatar_url;

    const username = createElement("h2", "username");
    username.textContent = user.login;

    const detailsButton = createElement("button", "detailsButton");
    detailsButton.textContent = "Details";

    card.appendChild(userImage);
    card.appendChild(username);
    card.appendChild(detailsButton);

    return card;
}

function createUserPage(user) {
    const page = createElement("div", "userPage");

    const userImage = createElement("img", "userImage");
    userImage.src = user.avatar_url;

    const username = createElement("h2", "usernameLbl");
    username.textContent = user.login;

    const repositories = createElement("div", "repositories");
    const repoList = createElement("ul", "repoList");
    user.repositories.forEach(repository => {
        const repoItem = createElement("li", "repoItem");
        const repoCard = createRepoCard(repository);
        repoItem.appendChild(repoCard);
        repoList.appendChild(repoItem);

    });
    repositories.appendChild(repoList);


    const followers = createElement("div", "followers");
    const followersList = createElement("ul", "followersList");
    user.followers.forEach(follower => {
        const followItem = createElement("li", "followItem");
        const followerUsername = createElement("h3", "followerUsername")
        followerUsername.textContent = follower.login;
        followItem.appendChild(followerUsername);
        followersList.appendChild(followItem);
    });
    followers.appendChild(followersList);

    page.appendChild(userImage);
    page.appendChild(username);
    page.appendChild(repositories);
    page.append(followers);

    return page;
}

function createRepoCard(repository) {

    const repoCard = createElement("div", "repoCard");

    const name = createElement("h3", "repoName");
    name.textContent = repository.name;

    const description = createElement("p", "repoDescription");
    description.textContent = repository.description;

    const language = createElement("p", "repoLanguage");
    language.textContent = repository.language;

    const updatedAt = createElement("p", "repoUpdated");
    updatedAt.textContent = "Updated at: " + repository.updated_at;

    repoCard.appendChild(name);
    repoCard.appendChild(description);
    repoCard.appendChild(language);
    repoCard.appendChild(updatedAt);

    return repoCard;
}

function createElement(tag, className) {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}