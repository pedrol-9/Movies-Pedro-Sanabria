const cardContainer = document.querySelector(".card-container");
let fragment = new DocumentFragment();

/* let cardContent = object => {
    return `
        <img class="mb-4 md:max-h-[55%] " src="${object.image}" alt="${object.title}" style="box-shadow: 1px 1px 3px white;">
        <div class="relative">
            <h3><span class="font-bold">Title:</span> ${object.title}</h3>
            <h5 class="italic">${object.tagline}</h5>
            <hr class="my-4">
            <p class="md:line-clamp-5 mb-8 xl:line-clamp-3"><span class="font-bold">Review: </span>${object.overview}</p>
            <a href="./details.html?id=${object.id}" id="button" target="_blank" class="rounded-2xl border border-white border-solid px-2 absolute -bottom-2 -right-2 bg-[#FFFFFF] hover:bg-black hover:text-white text-[#6D38E0] font-bold">See more</a>
        </div>
    `
} */
import { movies } from './moviestack.js'
import { cardContent } from './function.js'

let createCards = array => array.forEach(element => {
    let divCard = document.createElement("div");
    divCard.className = "card flex flex-col gap-3 border-solid border rounded-2xl shadow-[2px_2px_6px_#000000] shadow-[2px_2px_6px_#000000] hover:shadow-[0px_2px_10px_5px_#6D38E0] hover:border-none p-4 w-[90vw] justify-center bg-[#6D38E0] text-[#FFFFFF] md:w-[45vw] md:justify-between lg:w-[31vw] xl:w-[22vw]";
    // divCard.style = "box-shadow: 2px 2px 6px black;"
    divCard.innerHTML = cardContent(element);
    fragment.appendChild(divCard); // se usa el fragment y queda vacío.
    cardContainer.appendChild(fragment);
    return divCard;
});

// import { createCards } from './function.js'

let cards = createCards(movies);
// console.log(cards);
// console.log(cardContainer);


// ********************* Crear filtros por género
// let cardContainer = document.querySelector(".card-container");
let mainSection = document.getElementById("main-section");
console.log(mainSection);
let genres = movies.filter(movie => movie.genres); // array con sus generos, quiere decir que todos los objetos del arreglo movies tienen genres.

let genresFiltering = array => Array.from(new Set(array.map(element => element.genres).flat()));
let genresFiltered = genresFiltering(genres)
console.log(genresFiltered); // un arreglo con 30 arreglos, ya que cada película tiene sus géneros en un arreglo, y su cantidad de géneros puede variar. El .flat(); method sirve para eliminar los subarrays y extraer su contenido unicamente y efectivamente obtengo 86 strings repetidos si lo uso al final, si lo uso después del .map(); obtengo 14 strings de géneros.

let createSelectElement = array => {
    let select = document.createElement("select");
    let filtersSection = document.getElementById("filters");
    select.innerHTML = `<option disabled selected>Choose movie genre</option>`;
    select.className = "w-2/3 rounded-md h-[2rem] text-center bg-[#d2ccff] italic m-4 md:w-[30%] xl:h-[2.7rem]";
    select.name = "genres";
    select.id = "select-genre";
    array.forEach(element => {
        let option = document.createElement("option");
        option.value = element;
        option.innerText = element;
        select.appendChild(option);
    })
    // console.log(select) // funciona perfectamente.
    filtersSection.appendChild(select);
    console.log(mainSection); // perfectamente ubicado.
    return select;
}

let selectElement = createSelectElement(genresFiltered);

let replaceMainContent = nodo => {
    if (cardContainer.hasChildNodes) {
        cardContainer.replaceChildren(nodo); // y si encuentra hijos en el main, le digo que lo reemplace por el nuevo container.
    }
}

let createFilteredCards = array => {
    let filteredCardsContainer = document.createElement("div"); // creo un contenedor para las nuevas cards filtradas.
    filteredCardsContainer.className = "card-container flex flex-wrap gap-4 justify-center"; // le creo también las mismas clases del contenedor en el html para que se ajuste igual.
    array.forEach(element => {
        let divFilteredCard = document.createElement("div");
        divFilteredCard.className = "card flex flex-col gap-3 border-solid border rounded-2xl shadow-[2px_2px_6px_#000000] shadow-[2px_2px_6px_#000000] hover:shadow-[0px_2px_10px_5px_#6D38E0] hover:border-none p-4 w-[90vw] justify-center bg-[#6D38E0] text-[#FFFFFF] md:w-[45vw] md:justify-between lg:w-[31vw] xl:w-[22vw]";
        // divFilteredCard.style = "box-shadow: 2px 2px 6px black;";
        divFilteredCard.innerHTML = cardContent(element);
        filteredCardsContainer.appendChild(divFilteredCard); // inserto las cards dentro del contenedor recién creado
    })

    replaceMainContent(filteredCardsContainer);
}


selectElement.addEventListener("change", event => {
    // console.log(event); // objeto con el evento.
    // console.log(event.target.value); // objeto con el evento.
    let selectedGenre = event.target.value;
    let filterMoviesByGenre = array => array.filter(movie => movie.genres.includes(selectedGenre)); // este array me sirve para generar las cards con las películas que contengan el genre seleccionado.
    // let filteredMoviesBySelect = filterMovies(searchInput.value, selectElement);
    let filteredMoviesBySelect = filterMoviesByGenre(genres); // o movies, son iguales
    console.log(filteredMoviesBySelect) // me imprime un array filtrado con los objetos que contengan el genre seleccionado.
    let renderFilterCards = createFilteredCards(filteredMoviesBySelect); // se contiene el nodo recién creado.
    // console.log(renderFilterCards);
    // console.log("desde cards filtradas");

});

// crear filtro por input de texto
let searchInput = document.getElementById("searchInput");
console.log(searchInput); // 

searchInput.addEventListener("keyup", event => {
    // console.log(event.target.value);
    let inputValue = searchInput.value.toLowerCase().trim();
    // console.log(inputValue); 
    // let filteredMovieByText = filterMovies(inputValue, selectElement.value);
    let titles = (array, input) => array.filter(element => element.title.toLowerCase().trim().includes(input)); // array con sus generos, quiere decir que todos los objetos del arreglo movies tienen genres.
    console.log(titles); // debe imprimir las peliculas con similitudes al input.

    let filteredMovieByText = titles(movies, inputValue);

    console.log(filteredMovieByText); // arreglo con los objetos que presentan similitudes entre el input y el title.

    if (filteredMovieByText.length === 0) {
        // console.log("movie not found!");
        let h4 = document.createElement("h4");
        let sadFaceCode = "&#x1F61E;";
        h4.className = "text-2xl text-bold";
        h4.innerHTML = `${sadFaceCode} We're sorry! we don't have this title, please try another entry`;
        // cardContainer.appendChild(h4);
        replaceMainContent(h4);
        return h4;
    } else if (filteredMovieByText = " ") {
        createCards(movies);
    }

    // crear cards con el arreglo filtrado.
    let renderFilterCards = createFilteredCards(filteredMovieByText);
    console.log(renderFilterCards); // funcionando perfectamente hasta aquí.
})

/* let filterMovies = (array) => {
    // array.filter
    let inputValue;
    let selectedGenre;
    let filteredMoviesByText;
    let filteredMoviesBySelect;
    let filteredMovies = [];

    searchInput.addEventListener("keyup", event => {
        inputValue = searchInput.value.toLowerCase().trim();
    })

    selectElement.addEventListener("change", event => {
        selectedGenre = event.target.value;
    })

    array.filter(element => element.title.toLowerCase().trim().includes(input)).filter(movie => movie.genres.includes(selectedGenre));


    if (inputValue) {
        filteredMovies = filteredMovies.filter(movie =>
            movie.title.toLowerCase().includes(inputValue.toLowerCase())
        );
        filteredMoviesByText = array.filter(element => element.title.toLowerCase().trim().includes(input)).filter(movie => movie.genres.includes(selectedGenre));
        filteredMovies = [...filteredMoviesBySelect, ...filteredMoviesByText];
    } else if (selectedGenre !== '') {
        filteredMovies = filteredMovies.filter(movie =>
            movie.genres.includes(selectedGenre)
        );
        filteredMoviesBySelect = array.filter(movie => movie.genres.includes(selectedGenre));
        filteredMovies = [...filteredMoviesByText, ...filteredMoviesBySelect];
    }

    return filteredMovies;
}


filterMovies(movies); */

