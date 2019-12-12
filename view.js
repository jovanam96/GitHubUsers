 export default class View {
    constructor() {
        this.app = init();

        this.searchButton = createElement("button", "searchButton");
        this.searchButton.textContent = "Search";
        this.searchButton.id = "searchButton";
        this.app.append(this.searchButton);

        this.usersList = createElement("ul", "usersList");
        this.app.append(this.usersList);

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
        for (let i = 0; i < users.length; i++) {
            this.usersList.appendChild(createUserCard(users[i]));
        }
    };

    populateUser(user) {
        this.app.empty();
        this.app = init();
        const userPage = createUserPage(user);
        this.app.append(userPage);
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

    const userContainer = createElement("div", "userContainer");

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
        const followCard = createUserCard(follower);
        //followItem.appendChild(document.createTextNode(follower.login));
        followItem.appendChild(followCard);
        followersList.appendChild(followItem);
    });
    followers.appendChild(followersList);

    userContainer.appendChild(repositories);
    userContainer.appendChild(followers);

    page.appendChild(userImage);
    page.appendChild(username);
    page.appendChild(userContainer);

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

function init() {
    const app = $("#root");

    const logo = createElement("img", "logo");
    logo.src = "./logo.png"
    app.append(logo);

    const header = createElement("h1", "header");
    header.textContent = "GitHub users"
    app.append(header);

    return app;
}
