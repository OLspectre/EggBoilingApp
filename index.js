

const loadingPage = document.querySelector(".loadingPage");
const mainPage = document.querySelector(".calculatePage");


let loadingScreen = setTimeout(function () {
    loadingPage.classList.replace("hiddenFalse", "hiddenTrue");

    mainPage.classList.replace("hiddenTrue", "hiddenFalse");

}, 7500)


const sizeContainer = document.querySelector("#haveSizes");

let eggSize;
let eggCount;

sizeContainer.addEventListener("click", (e) => {

    const buttons = document.querySelectorAll("#haveSizes button")

    if (e.target.textContent === "S") {
        console.log("funkar S");
        for (let btn of buttons) {
            if (btn.classList.contains("marked")) btn.classList.toggle("marked");
        }
        e.target.classList.toggle("marked");
        eggSize = "S";


    }
    if (e.target.textContent === "M") {
        console.log("funkar M");
        for (let btn of buttons) {
            if (btn.classList.contains("marked")) btn.classList.toggle("marked");
        }
        e.target.classList.toggle("marked");
        eggSize = "M";
    }
    if (e.target.textContent === "L") {
        console.log("funkar L");
        for (let btn of buttons) {
            if (btn.classList.contains("marked")) btn.classList.toggle("marked");
        }
        e.target.classList.toggle("marked");
        eggSize = "L";
    }
    console.log(eggSize);
})



const eggData = {
    S: {
        kcal: 63,
        protein: 5.5,
        fat: 4.5,
        B2: 0.22,       // mg
        selenium: 13,   // µg
        vitaminD: 1.0,  // µg
        iron: 0.9       // mg
    },
    M: {
        kcal: 75,
        protein: 6.5,
        fat: 5.5,
        B2: 0.25,
        selenium: 15,
        vitaminD: 1.2,
        iron: 1.0
    },
    L: {
        kcal: 85,
        protein: 7.5,
        fat: 6.5,
        B2: 0.27,
        selenium: 18,
        vitaminD: 1.4,
        iron: 1.2
    }
};

const DRI = {
    B2: 1.4,        // mg
    selenium: 55,   // µg
    vitaminD: 10,   // µg
    iron: 14        // mg
};


function getTotalEggStats(size, count) {

    const egg = eggData[size];

    return {
        size,
        count,
        total: {
            kcal: egg.kcal * count,
            protein: egg.protein * count,
            fat: egg.fat * count,
            B2: egg.B2 * count,
            selenium: egg.selenium * count,
            vitaminD: egg.vitaminD * count,
            iron: egg.iron * count,
        }
    }
}

function calculateDRI(nutrients) {
    return {
        B2: Math.floor(nutrients.B2 / DRI.B2 * 100),
        selenium: Math.floor(nutrients.selenium / DRI.selenium * 100),
        vitaminD: Math.floor(nutrients.vitaminD / DRI.vitaminD * 100),
        iron: Math.floor(nutrients.iron / DRI.iron * 100)
    }
}

// const kcal
// const protein = 

const totalStats = getTotalEggStats("M", 5).total;

console.log(totalStats.protein);

console.log(totalStats);
console.log(calculateDRI(totalStats));



