

const loadingPage = document.querySelector(".loadingPage");
const mainPage = document.querySelector(".calculatePage");
const timerPage = document.querySelector(".timerPage");


let loadingScreen = setTimeout(function () {
    loadingPage.classList.replace("hiddenFalse", "hiddenTrue");

    mainPage.classList.replace("hiddenTrue", "hiddenFalse");

}, 7500)



let eggSize;
let eggCount = 1;
let sizeSelected = false;
let totalStats;
let microStats;
let boilType;



const displayKcal = document.querySelector("#kcalStat");
const displayProtein = document.querySelector("#protein span");
const displayFat = document.querySelector("#fat span");

let driItems = document.querySelectorAll("li span");
console.log(driItems);


function updateStats(stats) {
    const values = Object.values(microStats);

    displayKcal.textContent = stats.kcal;
    displayProtein.textContent = stats.protein;
    displayFat.textContent = stats.fat;

    console.log(values);
    for (let i = 0; i < driItems.length; i++) {
        console.log(values[i]);
        driItems[i].textContent = `${values[i]}%`
    }
}

const sizeContainer = document.querySelector("#haveSizes");
sizeContainer.addEventListener("click", (e) => {
    if (!e.target.matches("button")) return

    const buttons = document.querySelectorAll("#haveSizes button")
    buttons.forEach(btn => btn.classList.remove("marked"));

    e.target.classList.add("marked");
    readyButton.classList.add("ready");


    eggSize = e.target.textContent;

    sizeSelected = true;
    console.log(eggSize);

    totalStats = getTotalEggStats(eggSize, eggCount).total;
    console.log(totalStats);
    microStats = calculateDRI(totalStats);
    console.log(microStats);

    updateStats(totalStats);
})

const eggCountContainer = document.getElementById("eggCount");

eggCountContainer.addEventListener("click", (e) => {
    if (!e.target.matches("button")) return

    const displayEggCount = document.querySelector("#eggCount p");

    if (e.target.textContent === "+") {
        eggCount++
    } else {
        eggCount--
    }
    console.log(`Number of eggs:`, eggCount);

    displayEggCount.textContent = eggCount;
    totalStats = getTotalEggStats(eggSize, eggCount).total;

    microStats = calculateDRI(totalStats);

    updateStats(totalStats);


});

const readyButton = document.querySelector(".readyButton");
readyButton.addEventListener("click", () => {
    console.log(sizeSelected);

    if (!sizeSelected) {
        alert("Please select the size of your eggs")
    } else {
        mainPage.classList.replace("hiddenFalse", "hiddenTrue");

        timerPage.classList.replace("hiddenTrue", "hiddenFalse");
    }

})


// EGG STATS AND CALCULATIONS

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

const eggCookTimes = {
    S: { soft: 2700, medium: 3600, hard: 4800 },
    M: { soft: 3000, medium: 3900, hard: 5100 },
    L: { soft: 3300, medium: 4200, hard: 5400 }
}

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
            kcal: Math.floor(egg.kcal * count),
            protein: Math.floor(egg.protein * count),
            fat: Math.floor(egg.fat * count),
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

// let baseCookTime = eggCookTimes[eggSize][boilType]
// console.log(sizeSelected);

