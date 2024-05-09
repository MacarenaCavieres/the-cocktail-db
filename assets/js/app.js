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
const namRandom = document.querySelector(".namRandom");
const letters = document.querySelector("#letters");
const namDin = document.querySelector(".namDin");
const ingrDin = document.querySelector(".ingrDin");
const instDin = document.querySelector(".instDin");
const glassDin = document.querySelector(".glassDin");
const catDin = document.querySelector(".catDin");
const closeModalDin = document.querySelector(".closeModalDin");
const modalDin = document.querySelector(".modalDin");
const form = document.querySelector("#form");

for (let i = 97; i <= 122; i++) {
    const letter = String.fromCharCode(i);
    const anchor = document.createElement("a");

    anchor.textContent = letter;
    anchor.classList.add("letter");

    anchor.addEventListener("click", () => {
        filterLetter(letter);
    });

    letters.appendChild(anchor);
}

const filterLetter = async (letter) => {
    try {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`);
        const data = await response.json();
        artDinam(data);
    } catch (error) {
        console.error("Error ===> ", error);
    }
};

const artDinam = (data) => {
    const searchResult = document.querySelector(".searchResult");
    searchResult.style.display = "block";

    sectDin.textContent = "";
    const result = data.drinks;

    result.forEach((item) => {
        const clone = template.cloneNode(true);
        clone.querySelector(".imgDin").src = item.strDrinkThumb;
        clone.querySelector(".imgDin").alt = item.strDrink;
        clone.querySelector(".nameDin").textContent = item.strDrink;
        clone.querySelector(".btnPrepDin").textContent = "Preparation";
        clone.querySelector(".btnPrepDin").addEventListener("click", () => {
            modalDin.classList.add("openModalDin");

            modalPrep(item);
        });

        fragment.appendChild(clone);
    });

    sectDin.appendChild(fragment);
};

const modalPrep = (target) => {
    namDin.textContent = "";
    instDin.textContent = "";
    glassDin.textContent = "";
    catDin.textContent = "";

    closeModalDin.addEventListener("click", () => {
        modalDin.classList.remove("openModalDin");
    });
    namDin.textContent = target.strDrink;
    instDin.textContent += "Instructions: " + target.strInstructions;
    glassDin.textContent += "Glass: " + target.strGlass;
    catDin.textContent += "Category: " + target.strCategory;

    for (let i = 1; i <= 15; i++) {
        const measure = target["strMeasure" + i];
        const ingredient = target["strIngredient" + i];

        if (measure || ingredient) {
            ingrDin.textContent += ` - ${measure || ""} ${ingredient || ""}  `;
        }
    }
};

form.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("click");
});

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
    namRandom.textContent = princ.strDrink;

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
