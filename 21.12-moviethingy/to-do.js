console.log("works")

const baseUrl = "https://api.jsonbin.io/v3/b/"
const ourTodoUrl = baseUrl + "6396ebd934ae3620ec2c0ffb"
const masterKey = "$2b$10$re8BCarS2TJ3.fYpy2KSd.d.Gya4h9xv/Kkmio4GmMjsYxCzTFvtu"

console.log("baseUrl ", baseUrl)
console.log("ourtodourl ", ourTodoUrl)
console.log("Master ", masterKey)


const App = {
    listOfTodos: [],
    elements: {
        container: document.getElementById("todo-container")
    },
    // addInitialTodos: function () {
        
    // },
    fetchTodos: function () {
        fetch(ourTodoUrl, {
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
                console.log("Data ", data.record)
                this.listOfTodos = []
                data.record.forEach((obj) => {
                    this.listOfTodos.push(obj)
                });
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

//`{$item.id}

function createTodoItem(suppliedTitle, suppliedText, suppledId) {

    //slumpmässig siffra mellan 1-3
    const ranColIndex = Math.floor(Math.random() * 3 + 1)

    // elvis-operator ?:    värde/vilkor ? true/finns : false/finns inte
    return {
        id: suppledId ? suppledId : Date.now(),
        title: suppliedTitle,
        text: suppliedText,
        colorIndex: ranColIndex,
        checked: false
    }
}

// denna funktionen körs av input="submit", skickar iväg form
function onFormSubmit() {
    App.create()
}

// function onFormSubmit2() {
//     App.create()
// }


function resetForm() {
    document.querySelector("input[name='to-do__title']").value = ''
    document.querySelector("input[name='to-do__subtitle']").value = ''
}


// App.addInitialTodos()
App.fetchTodos()
App.render()

function logApp() {
    console.log(App)
    console.table(App.listOfTodos)
}
