export default class View {
    constructor() {
        this.app = document.getElementById("root");

        this.welcomeContainer = createElement("div", "welcomeContainer");
        this.usersContainer = createElement("div", "usersContainer");
        this.userContainer = createElement("div", "userContainer");

        this.welcomeContainer.setAttribute("onload", "stopSpinner()");
        this.usersContainer.setAttribute("onload", "stopAttribute()");
        this.userContainer.setAttribute("onload", "stopSpinner()");

        this.logo = createElement("img", "logo");
        this.logo.src = "./resources/logo.png"
        this.welcomeContainer.append(this.logo);

        this.header = createElement("h1", "header");
        this.header.textContent = "GitHub users"
        this.welcomeContainer.append(this.header);

        this.description = createElement("p", "welcomeDescription");
        this.description.textContent = "Welcome to single-page MVC application for displaying GitHub users!";
        this.welcomeContainer.append(this.description);

        this.searchInput = createElement("input", "searchInput");
        this.searchInput.type = "text";
        this.searchInput.placeholder = "Search users...";
        this.welcomeContainer.append(this.searchInput);

        this.searchButton = createElement("button", "searchButton");
        this.searchButton.textContent = "Search";
        this.searchButton.id = "searchButton";
        this.welcomeContainer.append(this.searchButton);

        this.usersList = createElement("div", "usersList");
        this.userPage = createElement("div", "userPage");

        this.spinner = createElement("div", "spinner");
        this.spinner.style.visibility = "hidden";
        //this.app.append(this.spinner);
        this.app.append(this.welcomeContainer);
    }

    bindLogoImg(handler) {
        this.logo.addEventListener("click", function (event) {
            event.target.parentElement.querySelector(".searchInput").value = "";
            handler();
        });
    }

    bindSearchUsersButton(handler) {
        this.searchButton.addEventListener("click", function (event) {
            const username = event.target.parentElement.querySelector(".searchInput").value;
            handler(username, event.target);
        });
        
    }

    bindSearchUsersInput(handler) {
        this.searchInput.addEventListener("keyup", function (event) {
            if (event.witch === 13 || event.keyCode === 13) {
                const username = event.target.parentElement.querySelector(".searchInput").value;
                handler(username);
            }
        });
    }


    bindDetailsButton(handler) {
        this.usersList.addEventListener("click", function (event) {
            if (event.target.className === "detailsButton") {
                const button = event.target;
                handler(event.target.parentElement.username, button);
            }
        });
        
    }

    bindDetailsButtonFollowersList(handler) {
        this.userPage.addEventListener("click", function (event) {
            if (event.target.className === "detailsButton") {
                const button = event.target;
                handler(event.target.parentElement.username, button);
            }
        });
    }

    populateUsersList(users) {
        this.welcomeContainer.remove();
        this.userContainer.remove();
        this.usersList.innerHTML = "";
        this.usersContainer.innerHTML = "";
        for (let i = 0; i < users.length; i++) {
            this.usersList.appendChild(createUserCard(users[i]));
        }
        this.usersContainer.append(this.logo);
        this.usersContainer.append(this.searchInput);
        this.usersContainer.append(this.searchButton);

        const usersTitle = createElement("h1", "usersTitle");
        usersTitle.textContent = "GitHub users";
        this.usersContainer.append(usersTitle);

        this.usersContainer.append(this.usersList);
        this.app.append(this.usersContainer);
    };

    populateUser(user) {

        this.welcomeContainer.remove();
        this.usersContainer.remove();
        this.userContainer.innerHTML = "";
        this.userPage.innerHTML = "";
        this.userPage.append(createUserPage(user));
        this.userContainer.append(this.logo);
        this.userContainer.append(this.searchInput);
        this.userContainer.append(this.searchButton);
        this.userContainer.append(this.userPage);
        this.app.append(this.userContainer);
    }

    showSpinner(button) {
        button.textContent = "";
        button.append(this.spinner);
        this.spinner.style.visibility = "visible";

    }

    hideSpinner(button) {
        button.append(this.spinner);
        this.spinner.style.visibility = "hidden";
        button.textContent = "Details";
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

    const score = createElement("p", "score");
    score.textContent = "Score: " + user.score;

    const detailsButton = createElement("button", "detailsButton");
    detailsButton.textContent = "Details";

    card.appendChild(userImage);
    card.appendChild(username);
    card.appendChild(score);
    card.appendChild(detailsButton);

    return card;
}

function createUserPage(user) {
    const page = createElement("div", "page");

    const userImage = createElement("img", "userImage");
    userImage.src = user.avatar_url;

    const userInfo = createElement("div", "profileInfo");

    const profileTitle = createElement("h1", "profileTitle");
    profileTitle.textContent = "User profile";

    const username = createElement("h2", "usernameLbl");
    username.textContent = "Username: " + user.login;

    userInfo.appendChild(profileTitle);
    userInfo.appendChild(username);

    const repositories = createElement("div", "repositories");

    const repoHeader = createElement("h2", "repoHeader");
    repoHeader.textContent = "Repositories: " + user.repositories.length;
    repositories.appendChild(repoHeader);

    user.repositories.forEach(repository => {
        const repoCard = createRepoCard(repository);
        repositories.appendChild(repoCard);

    });

    const followers = createElement("div", "followers");

    const followHeader = createElement("h2", "followHeader");
    followHeader.textContent = "Followers: " + user.followers.length;
    followers.appendChild(followHeader);

    user.followers.forEach(follower => {
        const followerCard = createUserCard(follower);
        followerCard.querySelector("p").remove();
        followers.appendChild(followerCard);
    });
    
    page.appendChild(userImage);
    page.appendChild(userInfo);
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
    language.textContent = "Language: " + repository.language;

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