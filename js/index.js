document.addEventListener("DOMContentLoaded", init)
const BOOK_URL = "http://localhost:3000/books/"
const CURRENT_USER = {
    "id": 4,
    "username": "ann"
    }

function init() {
    getBooks().then(books => books.forEach(renderBookList))
}

const renderBookList = (book) => {
    const bookUl = document.querySelector("#list")
    const bookLi = document.createElement("li")
    bookLi.dataset.bookId = book.id
    bookLi.innerHTML = `${book.title}`
    bookUl.append(bookLi)
};

const bookShowPage = (e) => {
    document.addEventListener("click", e => {
        if (e.target.matches("li")){
            bookId = parseInt(e.target.dataset.bookId)
            getBooks().then(books => books.forEach(book => {
                if (book.id === bookId) {
                    renderBookShow(book)
                };
            }));
        };
    });
};
bookShowPage();

const renderBookShow = (book) => {
    const showDiv = document.querySelector("#show-panel")
    showDiv.dataset.bookId = book.id
    showDiv.innerHTML = `
    <img src="${book.img_url}" style="width:100px"><br>
    <h4>${book.title}</h4>
    <h4>${book.subtitle}</h4>
    <h4>${book.description}</h4>
    <ul></ul>
    <button type="button"></button>
    `
    button = showDiv.querySelector("button")
    bookUl = showDiv.querySelector("ul")
    users = book.users
    for (user of users){renderUserList(bookUl, user)}
    toggleButton(button)
};

const renderUserList = (bookUl, user) => {
   const userLi = document.createElement("li")
   userLi.innerText = `${user.username}`
   bookUl.append(userLi)
};

function renderLike() {
    document.addEventListener("click", e => {
        if (e.target.matches("button")){
            let button = e.target
            let bookId = parseInt(e.target.parentElement.dataset.bookId)
            getBooks().then(books => books.forEach(book => {
                if (book.id === bookId) {
                    if(button.innerHTML === "unlike"){
                        users.pop(CURRENT_USER)
                        patchLikes(bookId, users).then(renderBookShow)
                    } else {
                        users.push(CURRENT_USER)
                        patchLikes(bookId, users).then(renderBookShow)
                    };
                };
            }));
        };
    });
};
renderLike();

const toggleButton = button => {
    let userUl = button.parentElement.querySelector("ul")
    if(userUl.innerHTML.includes(CURRENT_USER.username)){
        button.innerHTML = "unlike"
    } else {
        button.innerHTML = "Like"
    }
}

function patchLikes(bookId, users) {
    let options = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
            "users": users
        })
      };

    return fetch(BOOK_URL + bookId, options)
    .then(resp => resp.json())
}

function getBooks() {
    return fetch(BOOK_URL)
    .then(resp => resp.json())
}
