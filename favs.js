import { createCards } from './function.js'
import { favCardContent } from './function.js'
import { createFavCards } from './function.js'



let $cardContainer = document.querySelector(".card-container");
// console.log(cardContainer);
let $clearButton = document.querySelector(".clearButton");
console.log($clearButton);

// let $cardButton = document.querySelector("")
let favList = [];

let favIdMovies = JSON.parse(localStorage.getItem('favList'));
console.log(favIdMovies);

fetch ('https://moviestack.onrender.com/api/movies', {
    headers: {
        'x-api-key': '0ff70d54-dc0b-4262-9c3d-776cb0f34dbd'
    }
})
    .then(res => res.json())
    .then(data => {
        let moviesAPI = data.movies;
        let moviesById = moviesAPI.filter(movie => favIdMovies.includes(movie.id))
        console.log(moviesById); // movies filtradas con los id del local storage
        // createCards(MoviesById);
        createFavCards(moviesById);
        
        /* $cardContainer.addEventListener('click', event => {
            let favId = event.target.dataset.fav;
            console.log(favId);
            let favToRemove = event.target.closest(".card"); 
            // console.log([favToRemove]); // me arroja todo el nodo de la card
            favToRemove.remove();
            localStorage.removeItem(favId);
            console.log(favIdMovies);
        }) */

        /* $clearButton.addEventListener('click', event => {
            console.log(event.target);
            if (event.target.dataset.clearButton) {
            $cardContainer.removeChildNodes();
            localStorage.clear();
            moviesById = [];
            console.log($cardContainer);
        }}) */

    })    
    .catch(err => console.log(err));


    /* $cardContainer.addEventListener('click', event => {
        // console.log(event);
        let favId = event.target.dataset.fav; 
        console.log([favId]);
        // let heartcito = event.target;
        // console.log([heartcito])
        
        if (favId) {
            console.log(favId);
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
    }) */
            
        // console.log(favList);