let cardContent = object => {
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
}

let createCards = array => array.forEach(element => {
    let divCard = document.createElement("div");
    divCard.className = "card flex flex-col gap-3 border-solid border rounded-2xl shadow-[2px_2px_6px_#000000] shadow-[2px_2px_6px_#000000] hover:shadow-[0px_2px_10px_5px_#6D38E0] hover:border-none p-4 w-[90vw] justify-center bg-[#6D38E0] text-[#FFFFFF] md:w-[45vw] md:justify-between lg:w-[31vw] xl:w-[22vw]";
    // divCard.style = "box-shadow: 2px 2px 6px black;"
    divCard.innerHTML = functions.cardContent(element);
    fragment.appendChild(divCard); // se usa el fragment y queda vacío.
    cardContainer.appendChild(fragment);
    return divCard;
});

export default {
    cardContent,
    createCards,
}


