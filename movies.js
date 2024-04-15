import { createCards } from './function.js'
import { genresFiltering } from './function.js'
import { createSelectElement } from './function.js'
import { replaceMainContent } from './function.js'
import { createFilteredCards } from './function.js'
import { filterMoviesByGenre } from './function.js'
import { filterMoviesByTitles } from './function.js'
import { crossedFilter } from './function.js'

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
            // replaceHeart();
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

            // replaceHeart();
        })

    }).catch(err => console.log(err)) 
 
// console.log(moviesAPI);

let favList = [];
let favListLS = JSON.parse(localStorage.getItem('favList'));

if (favListLS) {
    favList = favListLS;
}

cardContainer.addEventListener('click', event => {
    // console.log(event);
    let favId = event.target.dataset.fav; 
    // console.log([favId]);
    let heartcito = event.target;
    // console.log([heartcito])
    
    if (favId) {
        // console.log(favId);
        if (!favList.includes(favId)) {
            heartcito.src = "../assets/filled-heart.png";
            favList.push(favId);
            // console.log(heartcito)
        } else {
            favList = favList.filter(id => id != favId);
            heartcito.src = "../assets/heart.png";
            // console.log(heartcito)
        }
        
        localStorage.setItem('favList', JSON.stringify(favList)) // sobreescribe el array almacenado en la consola con la información dentro del array acá.
    }

    

    console.log(favList);
})

// Función para actualizar los íconos de favoritos
/* function replaceHeart () {
    // Cargar estado de favoritos después de renderizar las tarjetas filtradas o de búsqueda
    favList.forEach(id => {
        const button = document.querySelector(`button[data-fa="${id}"]`);
        if (button) {
            const heartIcon = button.querySelector('img');
            heartIcon.src = '../assets/filled-heart.png';
        }
    });
} */


/* function changeOption (event) {
    console.log(event.target.value);
    let filteredMoviesBySelect = filterMoviesByGenre(movies, input);
    return filteredMoviesBySelect;
} */