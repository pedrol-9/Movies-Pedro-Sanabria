const cardContainer = document.querySelector(".card-container");
let fragment = new DocumentFragment();

let createCard = object => {
    return `
        <img class="mb-4 md:max-h-[55%]" src="${object.image}" alt="${object.title}" style="box-shadow: 1px 1px 1px white;">
        <div>
            <h3><span class="font-bold">Title:</span> ${object.title}</h3>
            <h5 class="italic">${object.tagline}</h5>
            <hr class="my-4">
            <p class="md:line-clamp-5"><span class="font-bold">Review: </span>${object.overview}</p>
        </div>
    `
}

movies.forEach(element => {
    let divCard = document.createElement("div");
    divCard.className = "card flex flex-col gap-3 border-solid border rounded-2xl p-4 w-[90vw] justify-center bg-[#6D38E0] text-[#FFFFFF] shadow-2xl md:w-[45vw] md:justify-between lg:w-[31vw]";
    divCard.style = "box-shadow: 2px 2px 6px black;"
    divCard.innerHTML = createCard(element);
    fragment.appendChild(divCard);
});

cardContainer.appendChild(fragment);
console.log(cardContainer);
