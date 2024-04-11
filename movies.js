let divCard = document.createElement("div");
let fragment = new DocumentFragment();
let cardContainer = document.querySelector(".card-container");
let searchInput = document.getElementById("searchInput");
let mainSection = document.getElementById("main-section");
let selectedGenre = "";
let inputValue = "";
let genres = movies.filter(movie => movie.genres);
let genresFiltered = genresFiltering(genres);
let selectElement = createSelectElement(genresFiltered);
let cardContainerDefaultContent = createCards(movies);
let filteredMoviesBySelect;
let filteredMoviesByText;

import { movies } from './moviestack.js'
import { cardContent } from './function.js'
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
selectElement.addEventListener("change", event => {
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
})



