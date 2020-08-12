document.addEventListener("DOMContentLoaded", function() {
    const list = document.getElementById("list")
    const display = document.getElementById("show-panel")
    const likedUsers = [];
    const currentUser = {id: 1 , username: "pouros"}
    getBooks()


    list.addEventListener("click",function(event){
        if (event.target.tagName === "LI"){
            loadBook(event.target.dataset.id)
        }
        //end of list event listener
    })
    display.addEventListener("click",function(event){
        if(event.target.tagName === "BUTTON" && event.target.textContent === "LIKE"){
            likedUsers.push( currentUser)
            patchBooks(event.target.parentNode.dataset.id)
            }
        else if(event.target.tagName === "BUTTON" && event.target.textContent === "UNLIKE"){
            const index = likedUsers.indexOf({currentUser})
            likedUsers.splice(index,1)
            patchBooks(event.target.parentNode.dataset.id)
        }
        
        
        
    })











    function getBooks(){

        fetch("http://localhost:3000/books")
        .then(function(response){ return response.json()})
        .then(function(books){ 
            books.forEach(book => addBooks(book))
        })

        
    }

    function addBooks(book){
        const li = document.createElement("li")
        li.dataset.id = book.id
        li.textContent = book.title
        list.appendChild(li)

    }

    function loadBook(id){
        fetch(`http://localhost:3000/books/${id}`)
        .then(function(response){return response.json()})
        .then(function(book){ 
            
            display.innerHTML = ""
            displayBook(book)})



    }
        function displayBook(book){
            let img = document.createElement("img"),
            title = document.createElement("h3"),
            subtitle = document.createElement("h3"),
            author = document.createElement("h3"),
            description = document.createElement("p"),
            ul = document.createElement("ul"),
            button = document.createElement("button");

            likedUsers.length = 0;

            img.src = book.img_url
            title.textContent = book.title
            subtitle.textContent = book.subtitle
            author.textContent = book.author
            description.textContent = book.description
            display.dataset.id = book.id
            button.textContent = "LIKE"
            button.dataset.id = currentUser.id


            display.appendChild(img)
            display.appendChild(title)
             display.appendChild(subtitle)
             display.appendChild(author)
             display.appendChild(description)
             display.appendChild(ul)
             display.appendChild(button)

             book.users.forEach(user =>{
                const li = document.createElement("li")
                li.textContent = user.username
                ul.appendChild(li)
                likedUsers.push(user)
                if( user.id == button.dataset.id){
                    button.textContent = "UNLIKE"
                }
                
             })

            
            
        }

        function patchBooks (bookID){
            const body = {users: likedUsers}

            const options = {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            }

            fetch(`http://localhost:3000/books/${bookID}`,options)
            .then(response => response.json())
            .then(() => loadBook(bookID))

            


        }

    






















    // the end of the DOMContentloaded addEventlistener
});
