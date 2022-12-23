
// http://www.omdbapi.com/?apikey=[206d082e]&    

// http://www.omdbapi.com/?i=tt3896198&apikey=206d082e

const baseUrl = "http://www.omdbapi.com/?apikey=[206d082e]&"
const ourTodoUrl = baseUrl + "http://www.omdbapi.com/?apikey=[206d082e]&"
const masterKey = "206d082e"

const btnClicked = document.getElementById('newMovie');

btnClicked.addEventListener('click', function (event) {
    newMovie();
    //     increment();
    //     getKanye();
    //     btnAnimation();
});


function newMovie() {
    fetch("http://www.omdbapi.com/?i=tt3896198&apikey=206d082e")
        .then(
            function (response) {
                return response.json();
            })
        .then((response) => {
            let data = response;
            console.log(data);
            document.querySelector(".movie__title").innerHTML = data.Title;
        })
        .catch(function (err) {
            console.log('error: ' + err)
            document.querySelector(".movie__title").innerHTML = "🙀" + "Sorry, cannot fetch at this time - try again later" + "🙀"
        });
    }


    const App = {
        listOfTodos: [],
        elements: {
            container: document.getElementById("movie__container")
        },
        // addInitialTodos: function () {

        // },
        fetchTodos: function () {
            fetch("http://www.omdbapi.com/?i=tt3896198&apikey=206d082e", {
                method: "GET",
                headers: {
                    "X-Master-Key": masterKey,
                }
            })
                .then(function (response) {
                    return response.json()
                })
                .then((response) => {
                    let data = response;
                    console.log("Data ", data.Title)
                    //   this.listOfTodos = []
                    //   data.record.forEach((obj) => {
                    //      //  this.listOfTodos.push(obj)
                    //   });
                    this.render();
                })
                .catch(function (err) {
                    console.log('error: ', err)
                })

        },
        create: function () {
            const inputTitle = document.querySelector("input[name='to-do__title']")
            const inputText = document.querySelector("input[name='to-do__subtitle']")
            const newItem = createTodoItem(inputTitle.value, inputText.value)
            this.listOfTodos.push(newItem)

            fetch(ourTodoUrl, {
                method: "PUT",
                headers: {
                    "X-Master-key": masterKey,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(this.listOfTodos)
            })
                .then(function (response) {
                    return response.json();
                })
                .then((response) => {
                    let data = response
                    console.log(data)
                    this.fetchTodos()
                })
                .catch(function (err) {
                    console.log("error: " + err)
                });
            // this.listOfTodos.push(createTodoItem(inputTitle.value, inputText.value))
            // this.render()
        },
        update: function (id) {
            let findItemIndex = this.listOfTodos.findIndex(item => item.id == id)
            this.listOfTodos[findItemIndex].checked = !this.listOfTodos[findItemIndex].checked
            this.render()
        },
        remove: function (id) {
            let findItemIndex = this.listOfTodos.findIndex(item => item.id === id);
            this.listOfTodos.splice(findItemIndex, 1)

            fetch(ourTodoUrl, {
                method: "PUT",
                headers: {
                    "X-Master-Key": masterKey,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(this.listOfTodos)
            })
                .then(function (response) {
                    return response.json();
                })
                .then((response) => {
                    let data = response;
                    console.log(data)
                    this.fetchTodos()
                })
                .catch(function (err) {
                    console.log("error: ", err)
                })
            // this.render()
        },
        render: function () {
            this.elements.container.innerHTML = ""
            resetForm()

            this.listOfTodos.forEach((item) => {
                const newTodoItem = document.createElement("div")
                const newTodoTitle = document.createElement("h2")
                const newTodoDate = document.createElement("span")
                const newTodoText = document.createElement("p")
                const newBtnRemove = document.createElement("button")
                const newBtnCheck = document.createElement("button")
                const newBtnIcon = document.createElement("img")

                newTodoTitle.innerText = item.title
                newTodoDate.innerText = new Date(item.id).toLocaleDateString()
                newTodoText.innerText = item.text
                newBtnCheck.innerText = item.checked ? "✔" : "Done"
                newBtnIcon.src = '../assets/ic_trash.svg'

                newBtnRemove.appendChild(newBtnIcon)
                const cardColors = `card-color-${Math.floor(Math.random() * 3 + 1)}`
                newTodoItem.classList.add("todo__item", cardColors)
                newTodoDate.classList.add("todo__date")
                newBtnRemove.classList.add("btn__remove-item")
                item.checked ? newTodoItem.classList.add("todo__checked") : null


                newBtnRemove.addEventListener("click", function () {
                    App.remove(item.id);
                })
                newBtnCheck.addEventListener("click", function () {
                    App.update(item.id);
                })
                newTodoItem.append(
                    newTodoTitle,
                    newTodoDate,
                    newTodoText,
                    newBtnRemove,
                    newBtnCheck
                )
                this.elements.container.appendChild(newTodoItem)


            })
        }
    }