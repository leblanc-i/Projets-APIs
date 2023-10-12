const result = document.getElementById("result");
const form = document.querySelector("form");
const input = document.querySelector("input");

let meals = [];

async function fetchMeals(search) {
    await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + search)
    .then((res) => res.json())
    .then((data) => ( meals = data.meals));
};

function mealsDisplay() {
    if (meals === null) {
        result.innerHTML = `<h1>Aucun resultat</h1>`;
    } else {

        // Pour limiter le nombre d'element à afficher
        meals.length = 12;
        
        result.innerHTML = meals.map((meal) => {
            let notice = [];
            
            for (let i = 1; i < 21; i++) {
                if (meal[`strIngredient${i}`]) {
                    let ingredient = meal[`strIngredient${i}`];
                    let mesure = meal[`strMeasure${i}`];
                    notice.push(`<li>${ingredient} : ${mesure}</li>`);
                }   
            }
            return`
            <li class="card">
            <h2>${meal.strMeal}</h2>
            <p>${meal.strArea}</p>
            <img src=${meal.strMealThumb}>
            <ul>${notice.join("")}</ul>
            </li>
            `}).join("");
    }
};
input.addEventListener("input", (e) => {
    fetchMeals(e.target.value);
})

form.addEventListener("submit", (e) => {
    e.preventDefault();
    mealsDisplay();
})