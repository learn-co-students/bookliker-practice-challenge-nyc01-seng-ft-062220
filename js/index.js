BOOK_URL = "http://localhost:3000/books/"

document.addEventListener("DOMContentLoaded", function() {
    const bookList = document.querySelector("#list")
    const showPanel = document.querySelector("#show-panel")

    const renderBooks = (books) => {
        for (const book of books) {
            renderBook(book)
        }
    }

    const renderBook = (book) => {
        const newLi = document.createElement("li")
        newLi.dataset.bookId = book.id
        newLi.innerText = book.title
        bookList.append(newLi)
    }

    const getBooks = () => {
        fetch(BOOK_URL)
        .then(response => response.json())
        .then(books => renderBooks(books))
    }   

    // const getBook = (books) => 

    // const retrieveBook = (selectedBook) => {

    //     fetch(BOOK_URL)
    //     .then(response => response.json())
    //     .then(books => {
    //         for (const book of books) {
    //             console.log(book)
    //             if (book.id === parseInt(selectedBook.dataset.bookId)) {
                    
    //                 return book
    //             }
    //         }           
    //     })
    // }

    const retrieveBook = (selectedBook) => {
        fetch(BOOK_URL + selectedBook.dataset.bookId)
        .then(response => response.json())
        .then(book => renderFullBook(book))
    }

    const clearBook = () => {
        if (document.querySelector("#show-panel > div") !== null) {
            document.querySelector("#show-panel > div").remove()
        }
    }

    const renderFullBook = (retrievedBook) => {
        clearBook()
        const newDiv = document.createElement("div")
        newDiv.dataset.fullbookId = retrievedBook.id
        const newImg = document.createElement("img")
        newImg.src = retrievedBook.img_url
        newDiv.append(newImg)

        const newH1 = document.createElement("h3")
        const newH2 = document.createElement("h3")
        const newH3 = document.createElement("h3")
    
        newH1.innerText = retrievedBook.title
        newH2.innerText = retrievedBook.subtitle
        newH3.innerText = retrievedBook.author
        newDiv.append(newH1)
        newDiv.append(newH2)
        newDiv.append(newH3)

        const newP = document.createElement("p")
        newP.innerText = retrievedBook.description
        newDiv.append(newP)

        const newUl = document.createElement("ul")
        
        for (const user of retrievedBook.users ) {
            const newLi = document.createElement("li")
            newLi.innerText = user.username
            newLi.dataset.userId = user.id
            newUl.append(newLi)
        }
        newDiv.append(newUl)

        const newButton = document.createElement("button")
        newButton.innerText = "LIKE"
        newButton.className = "like"
        newDiv.append(newButton)

        showPanel.append(newDiv)
    }

    const retrieveUsers = (selectedBook) => {
        fetch(BOOK_URL + selectedBook.dataset.fullbookId)
        .then(response => response.json())
        .then(book => updateLike(book))
    }

    const updateLike = (book) => {
        const userArray = book.users
        const user1Obj = {"id":1, "username":"pouros"}
        userArray.push(user1Obj)

        userObj = {
            "users" : userArray
        }

        configObj = {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(userObj)
        }

        fetch(BOOK_URL + book.id,configObj)
        .then(response => response.json())
        .then(book => renderFullBook(book))
        .catch(console.log)
    }

    const clickHandler = () => {
        document.addEventListener("click", (e) => {
            const clicked = e.target

            if(clicked.matches("li")) {
                retrieveBook(clicked)
            } else if (clicked.matches("button.like")) {
                retrieveUsers(clicked.parentNode)
            }
        })
    }
    
    getBooks()
    clickHandler()
});
