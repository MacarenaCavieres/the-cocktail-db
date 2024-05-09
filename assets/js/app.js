const btnRandom = document.querySelector("#btnRandom");
const sectDin = document.querySelector("#sectDin");
const template = document.querySelector("#template").content;
const fragment = document.createDocumentFragment();
const btnPrep = document.querySelector(".btnPrep");
const modal = document.querySelector(".modal");
const closeModal = document.querySelector(".closeModal");
const imageRandom = document.querySelector(".imageRandom");
const nameRandom = document.querySelector(".nameRandom");
const ingrRandom = document.querySelector(".ingrRandom");
const instRandom = document.querySelector(".instRandom");
const glassRandom = document.querySelector(".glassRandom");
const catRandom = document.querySelector(".catRandom");
const letters = document.querySelector("#letters");

for (let i = 97; i <= 122; i++) {
    const letter = String.fromCharCode(i);
    const anchor = document.createElement("a");

    anchor.textContent = letter;
    anchor.classList.add("letter");
    anchor.target = "_blank";

    anchor.addEventListener("click", () => {
        filterLetter(letter);
    });

    letters.appendChild(anchor);
}

const filterLetter = async (letter) => {
    try {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`);
        const data = await response.json();
        artDin(data);
    } catch (error) {
        console.error("Error ===> ", error);
    }
};

const artDin = (data) => {
    sectDin.textContent = "";
    const result = data.drinks;

    result.forEach((item) => {
        const clone = template.cloneNode(true);
        clone.querySelector(".imgDin").src = item.strDrinkThumb;
        clone.querySelector(".imgDin").alt = item.strDrink;
        clone.querySelector(".nameDin").textContent = item.strDrink;

        fragment.appendChild(clone);
    });

    sectDin.appendChild(fragment);
};

const connectApi = async () => {
    try {
        const response = await fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php");
        const data = await response.json();

        pintarCocktail(data);
    } catch (error) {
        console.error("Error ====> ", error);
    }
};

const pintarCocktail = (data) => {
    const princ = data.drinks[0];
    imageRandom.src = princ.strDrinkThumb;
    imageRandom.alt = princ.strDrink;
    nameRandom.textContent = princ.strDrink;
    instRandom.textContent += " " + princ.strInstructions;
    glassRandom.textContent += " " + princ.strGlass;
    catRandom.textContent += " " + princ.strCategory;

    for (let i = 1; i <= 15; i++) {
        const measure = princ["strMeasure" + i];
        const ingredient = princ["strIngredient" + i];

        if (measure || ingredient) {
            ingrRandom.textContent += ` - ${measure || ""} ${ingredient || ""}  `;
        }
    }
};

document.addEventListener("DOMContentLoaded", () => {
    connectApi();
});

btnRandom.addEventListener("click", () => {
    connectApi();
});

btnPrep.addEventListener("click", () => {
    modal.classList.add("openModal");
});

closeModal.addEventListener("click", () => {
    modal.classList.remove("openModal");
});
