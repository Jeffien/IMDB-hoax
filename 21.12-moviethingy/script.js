// const baseUrlMovies = "http://www.omdbapi.com/?i=tt3896198&apikey=206d082e";
// const movieUrl = baseUrlMovies + "http://www.omdbapi.com/?apikey=[206d082e]&";
// const accessKey = "206d082e";

// const baseUrlMovies = "http://www.omdbapi.com/?";
// const accessKey = "206d082e";
// const movieBaseUrl = "https://www.omdbapi.com/"
// const movieUrl = `${movieBaseUrl}?apikey=${accessKey}`;

const omdbAPI = {
   baseUrl: "https://www.omdbapi.com/",
   accessKey: "206d082e",
   fullUrl: `${this.baseUrl}?apikey=${this.accessKey}`
}

const binAPI = {
   baseUrl: "https://api.jsonbin.io/v3/b/",
   binId: "63a4529fdfc68e59d56e9b8d",
   masterKey: "$2b$10$re8BCarS2TJ3.fYpy2KSd.d.Gya4h9xv/Kkmio4GmMjsYxCzTFvtu",
   fullUrl: `${this.baseUrl}${this.binId}`
}

// const baseUrlBin = "https://api.jsonbin.io/v3/b/";
// const ourBinUrl = baseUrlBin + "63a4529fdfc68e59d56e9b8d";
// const masterKeyBin = "$2b$10$re8BCarS2TJ3.fYpy2KSd.d.Gya4h9xv/Kkmio4GmMjsYxCzTFvtu";

console.log(omdbApi)
console.log(binApi)
// binApi.masterKey

console.log('hej')
const searchTitle = document.querySelector("input[name='title']")
const searchGenre = document.querySelector("input[name='genre']")
const newMovieSearch = searchTitle.value

fetch(omdbAPI.fullUrl + "&t=" + `${newMovieSearch}*`)
     .then(
          function (response) {
               return response.json();
          })
     .then((response) => {
          let data = response;
          console.log(data);
          document.querySelector(".movie__container").innerHTML = data.Poster + "<br><br>" + data.Title + "<br><br>" + data.Genre + "<br><br>" + data.Plot + " 😸" + "<hr>";
     })
     .catch(function (err) {
          console.log('error: ' + err)
          document.querySelector(".movie__container").innerHTML = "🙀" + "Sorry, cannot fetch at this time - try again later" + "🙀"
     });

// console.log('enough?: ' + newMovieSearch)
console.log('we searched for: ' + newMovieSearch)
const App = {
     // listOfMovies: [], //spara filmer vi laddar in från API
     // listOfFavorites: [], //spara favoriter
     elements: {
          container: document.getElementById("movie-container")
     },
     // fetchMovies() {
     //      const searchTitle = document.querySelector("input[name='title']")
     //      const searchGenre = document.querySelector("input[name='genre']")
     //      const newMovieSearch = createMovieItem(searchTitle.value, searchGenre.value)

     //      console.log('enough?: ' + newMovieSearch)
     //      console.log('hej')
     //      fetch(ourTodoUrl, {
     //           method: "GET",
     //           headers: {
     //                "X-Access-Key": accessKey,
     //           }
     //      })
     //           .then(function (response) {
     //                return response.json()
     //           })
     //           .then((response) => {
     //                let data = response;
     //                console.log("Data ", data.record)
     //                this.listOfTodos = []
     //                data.record.forEach((obj) => {
     //                     this.listOfTodos.push(obj)
     //                });
     //                this.render();
     //           })
     //           .catch(function (err) {
     //                console.log('error: ', err)
     //           })

     // },
     // fetchMovies(){


     //      fetch(movieUrl)
     //           .then(
     //                function (response) {
     //                     return response.json();
     //                })
     //           .then((response) => {
     //                let data = response;
     //                console.log(data);
     //                document.querySelector(".movie__container").innerHTML = data.Title + "<br><br>" + data.Genre + "<br><br>" + data.Plot + " 😸" + "<hr>";
     //           })
     //           .catch(function (err) {
     //                console.log('error: ' + err)
     //                document.querySelector(".movie__container").innerHTML = "🙀" + "Sorry, cannot fetch at this time - try again later" + "🙀"
     //           });
     // }

     // "http://www.omdbapi.com/?apikey=[206d082e]&"
     //      createFavorite() {
     //      },
     //      removeFavorite() {
     //      },

     //      render() {
     //      }
}



// App.render()
// App.getMovieFact()


// : function () {
//      fetch(movieUrl, {
//           method: "GET",
//           headers: {
//                "X-Access-Key": accessKey,
//           }
//      })
//           .then(function (response) {
//                return response.json()
//           })
//           .then((response) => {
//                let data = response;
//                console.log("data: ", data.Title)
//                this.listOfMovies = []
//                data.record.forEach((obj) => {
//                     this.listOfMovies.push(obj)
//                });
//                this.render();
//           })
//           .catch(function (err) {
//                console.log("error: ", err)
//           })
// },
// create: function () {

//      const newMovieTitle = document.querySelector("title")
//      const newMovieGenre = document.querySelector("genre")
//      const newMovie = createNewMovie(newMovieTitle.value, newMovieGenre.value)
//      this.listOfMovies.push(newMovie)

//      fetch(movieUrl, {
//           method: "PUT",
//           headers: {
//                "X-Access-Key": accessKey,
//                "Content-Type": "application/json"
//           },
//           body: JSON.stringify(this.listOfMovies)
//      })
//           .then(function (response) {
//                return response.json();
//           })
//           .then((response) => {
//                let data = response
//                console.log(data)
//                this.fetchMovies()
//           })
//           .catch(function (err) {
//                console.log("error: ", err)
//           })
// },
// update: function (Title) {
//      let findItemIndex = this.listOfMovies.findIndex(item => item.Title == Title)
//      this.listOfMovies[findItemIndex].checked = !this.listOfMovies[findItemIndex].checked
//      this.render()
// },
// remove: function (title) {
//      let findItemIndex = this.listOfMovies.findIndex(item => item.title === title);
//      this.listOfMovies.splice(findItemIndex, 1)

//      fetch(movieUrl, {
//           method: "PUT",
//           headers: {
//                "X-Access-Key": accessKey,
//                "Content-Type": "application/json"
//           },
//           body: JSON.stringify(this.listOfMovies)
//      })
//           .then(function (response) {
//                return response.json();
//           })
//           .then((response) => {
//                let data = response;
//                console.log(data)
//                this.fetchMovies()
//           })
//           .catch(function (err) {
//                console.log("error: ", err)
//           })
//      // this.render()
// },
// render: function () {
//      this.elements.container.innerHTML = ""
//      resetForm()

//      this.listOfMovies.forEach((item) => {
//           const newMovieItem = document.createElement("div")
//           const newMovieTitle = document.createElement("h1")
//           const newMovieGenre = document.createElement("h2")

//           newMovieTitle.innerText = item.Title
//           newMovieGenre.innerText = item.Genre



//           newMovieItem.append(
//                newMovieGenre,
//                newMovieGenre
//           )
//           this.elements.container.appendChild(newMovieItem)


//      });

