// DONE - get list of books "GET"
// DONE - display list of books
// build cards for each book.
// Click on index displays book.
// build like/unlike functionality "PATCH"
let array = []
let currentUser = {"id": 1, "username": "Ben"}

document.addEventListener("DOMContentLoaded", e => {
    const url = "http://localhost:3000/books/"

    const getBooks = () => {

        fetch(url)
            .then(res => res.json())
            .then(data => displayBooksIndex(data))
    }

    const displayBooksIndex = (data) => {
        const bookShelf = document.getElementById("list")

        data.forEach(book => {
            const bookLi = document.createElement("li")
            bookLi.innerHTML = `${book.title}`
            bookLi.dataset.id = book.id
            bookShelf.append(bookLi)
        })
    }

    const displayBookProfile = () => {
        document.addEventListener("click", e => {

            if (e.target.matches("li")) {
                const bookLabel = e.target
                const bookId = bookLabel.dataset.id
                bookProfileCardMaker(bookId)
            }
        })
    }

    const bookProfileCardMaker = (bookId) => {

        const bookShelf = document.getElementById('show-panel')

        fetch(url + bookId)
            .then(res => res.json())
            .then(bookData => {

                bookShelf.innerHTML = `
                    <img src="${bookData.img_url}" src="book picture">
                    <br />
                    <p>${bookData.title}</p>
                    <p>${bookData.subtitle}</p> 
                    <p>${bookData.description}</p> 
                    <p>${bookData.author}</p>               
                   `

                const userList = document.createElement("ul")
                bookData.users.forEach(user => {
                    const userLi = document.createElement("li")
                    userLi.innerHTML = `${user.username}`
                    userList.append(userLi)

                })

                const button = document.createElement("button")
                button.innerHTML = "Like"

                const currentLikedUsers = bookData.users

                currentLikedUsers.forEach(user => {

                    if (user.id === currentUser.id) {
                        button.innerHTML = "Unlike"
                    }
                })

                button.dataset.id = bookData.id
                bookShelf.append(userList)
                bookShelf.append(button)

            })
    }

    const likeUnlike = () => {

        document.addEventListener("click", e => {
            if (e.target.matches("button")) {
                const button = e.target
                const bookId = button.dataset.id

                if (button.textContent === "Like") {
                    fetch(url + bookId)
                        .then(res => res.json())
                        .then(data => {
                            const users = data.users
                            users.forEach(user => {
                                array.push(user)
                            })
                            array.push(currentUser)

                            const newHash = {}
                            newHash["users"] = array

                            const packet = {
                                method: "PATCH",
                                headers: {
                                    "content-type": "application/json",
                                    "accept": "application/json"
                                },
                                body: JSON.stringify(newHash)
                            }

                                fetch(url + bookId, packet)
                                    .then(res => res.json())







                        })
                }
            }
        })
    }

    getBooks()
    displayBookProfile()
    likeUnlike()


});
