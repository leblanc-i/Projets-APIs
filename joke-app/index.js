const header = document.getElementById("header");
const content = document.getElementById("content");
const author = document.getElementById("author");
const conteneur = document.getElementById("tof");
const image = document.createElement('img'); 
conteneur.appendChild(image);

function getJoke() {

    fetch("https://api.blablagues.net/?rub=blagues")
    .then((res) => res.json())
    .then((data) => {
        header.textContent = data.data.content.text_head;
        content.textContent = data.data.content.text !== "" ? data.data.content.text : data.data.content.text_hidden;
        author.textContent = data.data.author.pseudo;
        image.src = data.data.author.avatar_min;
    })
}
getJoke();

document.body.addEventListener("click", getJoke);