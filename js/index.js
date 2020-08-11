document.addEventListener("DOMContentLoaded", () => {
    const BOOKS = "http://localhost:3000/books"
    const USERS = "http://localhost:3000/users"
    const bookList = document.getElementById("list")
    const show = document.getElementById('show-panel');
    let allBooks = []

const fetchbooks = async () => {
    const res = await fetch(BOOKS)
    const data = await res.json()
    data.forEach(book => {
        allBooks.push(book)
        renderBooks(book)
    })
}

const updatebook = async (bookId, updatedUsers) => {
    const settings = {
        method: "PATCH",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            users: updatedUsers
        })
    }
    const res = await fetch(`${BOOKS}/${bookId}`, settings)
    const data = await res.json()
}

const renderBooks = (book) => {
    const li = document.createElement("li")
    li.id = book.id
    li.innerText = book.title
    bookList.appendChild(li)
}

const renderUsers = (bookuser, ul) => {
    const li = document.createElement("li")
    li.id = bookuser.id
    li.innerHTML = bookuser.username
    ul.appendChild(li)
}


//on-click on entire document
const bookHandler = () => {
    document.addEventListener("click", e => {
        if (e.target.matches("li")){
            const showPanel = document.getElementById("show-panel")
            const selectBook = allBooks.find(book => book.id == e.target.id)
            showPanel.innerHTML = `
            <img src=${selectBook.img_url} alt=${selectBook.title}>
            <h3 id="${selectBook.id}">Title: ${selectBook.title}</h3>
            <h3>Author: ${selectBook.author}</h3>
            <h3>${selectBook.subtitle}</h3>
            <p>Description: ${selectBook.description}</p>
            `
            const ul = document.createElement("ul")
            selectBook.users.forEach(user => renderUsers(user, ul))
            showPanel.append(ul) //append the ul list onto the show panel
            const button = document.createElement("button") 
            button.type = "button"
            const test = selectBook.users.find(user1 => user1.username == "pouros")
            test === undefined ? button.innerText = "LIKE" : button.innerText = "UNLIKE"
            showPanel.append(button) //append button to the show Panel

        }
    })
}

const likeEventListener = () => {
    show.addEventListener('click', e => {
        event.preventDefault();
     if (e.target.matches("button")){
           const bookId = e.target.parentNode.childNodes[3].id
           const currBook = allBooks.find(book => book.id == bookId)
            if (e.target.innerText == "LIKE") {
                e.target.innerText = "UNLIKE"
                const updatedUsers = currBook.users.push({"id": 1, "username": "pouros"})
                updatebook(bookId, currBook.users)
            }else{ 
                e.target.innerText = "LIKE"
                const updatedUsers = currBook.users.filter(user => user.username !== "pouros")
               updatebook(bookId, updatedUsers)
            }
        }
    })
}




fetchbooks()
bookHandler()
likeEventListener()
})
