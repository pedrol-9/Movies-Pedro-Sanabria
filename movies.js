// let divCard = document.createElement("div");
// let fragment = new DocumentFragment();
// let mainSection = document.getElementById("main-section");
// let selectedGenre = "";
// let inputValue = "";
// let genres = movies.filter(movie => movie.genres);
// let genres = moviesAPI.filter(movie => movie.genres);
// let genresFiltered = genresFiltering(genres);
// let selectElement = createSelectElement(genresFiltered);
// let cardContainerDefaultContent = createCards(movies);
// let filteredMoviesBySelect;
// let filteredMoviesByText;

// import { movies } from './moviestack.js'
// import { cardContent } from './function.js'
import { createCards } from './function.js'
import { genresFiltering } from './function.js'
import { createSelectElement } from './function.js'
import { replaceMainContent } from './function.js'
import { createFilteredCards } from './function.js'
import { filterMoviesByGenre } from './function.js'
import { filterMoviesByTitles } from './function.js'
import { crossedFilter } from './function.js'

// ********************* Crear filtros por género **********
// evento del input tipo select
/* selectElement.addEventListener("change", event => {
    selectedGenre = event.target.value;
    console.log(selectedGenre);
    filteredMoviesBySelect = filterMoviesByGenre(movies, selectedGenre);
    if (selectedGenre == "choose-movie") {
        createFilteredCards(movies, cardContainer);
    } else if (filteredMoviesBySelect !== 0) {
        filteredMoviesBySelect = filterMoviesByGenre(movies, selectedGenre);
        createFilteredCards(crossedFilter(movies, inputValue, selectedGenre), cardContainer);
    };
})

// evento del input tipo texto
searchInput.addEventListener("keyup", event => {
    inputValue = event.target.value.toLowerCase().trim();
    filteredMoviesByText = filterMoviesByTitles(movies, inputValue);
    createFilteredCards(crossedFilter(filteredMoviesByText, inputValue, selectedGenre), cardContainer);

    if (filteredMoviesByText.length == 0) {
        let h4 = document.createElement("h4");
        let sadFaceCode = "&#x1F61E;";
        h4.className = "text-2xl text-bold";
        h4.innerHTML = `${sadFaceCode} We're sorry! we don't have this title, please try another entry`;
        replaceMainContent(h4, cardContainer);
        return h4;
    }
}) */

//  ************* obetener array de API - sprint-3
let moviesAPI = [];
let genres = moviesAPI.filter(movie => movie.genres);
 
let mainSection = document.getElementById("main-section");
let $searchInput = document.getElementById("searchInput");
let cardContainer = document.querySelector(".card-container");
let $selectElement = document.getElementById("select-genres");
let filteredMoviesBySelect;
let filteredMoviesByText;
let selectedGenre = "";
let inputValue = "";

console.log([$searchInput]);

fetch ('https://moviestack.onrender.com/api/movies', {
    headers: {
        'x-api-key': '0ff70d54-dc0b-4262-9c3d-776cb0f34dbd'
    }
})
    .then(res => res.json()).then(data => {
        moviesAPI = data.movies; 
        // console.log(moviesAPI); // Array con 181 movies
        
        // 1 paso: crear las cartas.
        createCards(moviesAPI);

        // 2.1 filtrar los géneros del array
        let genres = moviesAPI.filter(movie => movie.genres);
        let genresArray = genresFiltering(genres);  

        // 2.2 crear los option con ese array de géneros
        let optionsList = createSelectElement(genresArray);

        // 3 paso: capturar el option cuando se este cambie
        /* selectElement.addEventListener("change", event => {
            selectedGenre = event.target.value;
            console.log(selectedGenre);
            let filteredMoviesBySelect = filterMoviesByGenre(moviesAPI, selectedGenre);
            
            if (selectedGenre === "all-movies") {
                createFilteredCards(moviesAPI, cardContainer);
            } else {
                createFilteredCards(filteredMoviesBySelect, cardContainer);
            }
        }) */

        $selectElement.addEventListener("change", event => {
            selectedGenre = event.target.value;
            console.log(selectedGenre);
            let filteredMoviesBySelect = filterMoviesByGenre(moviesAPI, selectedGenre);
            
            if (selectedGenre === "all-movies") {
                createFilteredCards(moviesAPI, cardContainer);
            } else {
                // createFilteredCards(filteredMoviesBySelect, cardContainer);
                createFilteredCards(crossedFilter(filteredMoviesBySelect, inputValue, selectedGenre, cardContainer), cardContainer)
            }
        })

        // 4 Paso: capturar el searchInput
        $searchInput.addEventListener("keyup", event => {
            console.log($searchInput.value);
            inputValue = event.target.value.toLowerCase().trim();
            let filteredMoviesByText = filterMoviesByTitles(moviesAPI, inputValue);
            createFilteredCards(crossedFilter(filteredMoviesByText, inputValue, selectedGenre), cardContainer);
        
            if (filteredMoviesByText.length == 0) {
                let h4 = document.createElement("h4");
                let sadFaceCode = "&#x1F61E;";
                h4.className = "text-2xl text-bold";
                h4.innerHTML = `${sadFaceCode} We're sorry! we don't have this title, please try another entry`;
                replaceMainContent(h4, cardContainer);
                return h4;
            }
        })

    }).catch(err => console.log(err)) 
 
// console.log(moviesAPI);



/* function changeOption (event) {
    console.log(event.target.value);
    let filteredMoviesBySelect = filterMoviesByGenre(movies, input);
    return filteredMoviesBySelect;
} */