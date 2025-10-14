

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
let duration;



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
    S: { soft: 270000, medium: 36000, hard: 48000 },
    M: { soft: 300000, medium: 39000, hard: 51000 },
    L: { soft: 330000, medium: 42000, hard: 54000 }
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

// let baseCookTime = eggCookTimes["S"]["soft"]
// console.log(sizeSelected);


document.querySelector(".boilOptions").addEventListener("click", function (e) {
    if (boilType) return;

    const markedElements = document.querySelectorAll(".marked")
    markedElements.forEach(btn => btn.classList.remove("marked"));

    if (e.target.classList.contains("soft")) {
        console.log("soft selected");
        document.getElementById("soft").classList.add("marked");
        boilType = "soft";
    }
    if (e.target.classList.contains("med")) {
        console.log("medium selected");
        document.getElementById("med").classList.add("marked");

        boilType = "medium";
    }
    if (e.target.classList.contains("hard")) {
        console.log("hard selected");
        document.getElementById("hard").classList.add("marked");

        boilType = "hard";
    } else {
        return
    }
});


let ms = 100;

let timerContent = document.querySelector(".timer");

let timerStartButton = document.querySelector(".cook");
let timerPauseButton = document.querySelector(".pause");

let running = false;



timerStartButton.addEventListener("click", function () {

    if (timerStartButton.classList.contains("pressToCancel")) {
        alert("Are you sure you want to cancel??")
        // showPopup()
    }




    if (!boilType) return
    running = true;
    duration = eggCookTimes["S"][boilType];

    let timerId = setInterval(function () {
        if (running) {
            if (duration <= 0) { // Bra och viktigt att ha if-sats först så att allt visas.
                console.log(`Timer with id ${timerId} finished`);
                timerContent.textContent = `BEEP BEEP`;
                clearInterval(timerId)
            }
            // console.log(duration);

            timerContent.textContent = `${msToTime(duration)}`

            // timerText.textContent = `${duration / 1000}s`
            duration = duration - 100;
        } else {
            // Do nothing...
        }
    }, ms)
    console.log(`Started a timer with ID ${timerId}`);

    timerStartButton.textContent = "Cancel progress";
    timerStartButton.style.backgroundColor = "tomato";
    timerStartButton.classList.add("pressToCancel");


    for (let element of document.querySelectorAll("div.boilOption")) {
        element.classList.add("hiddenTrue");
    }
    document.querySelector("#boilingEggImage").classList.add("hiddenFalse");

});

// if (duration)


// timerCancelButton.addEventListener("click", function () {
//     console.log(`Cancel the timer with ID ${timerId}`);
//     clearInterval(timerId);
//     timerContent.remove;
//     timerContent.textContent = ""
//     timerContent.classList.remove("timer")
//     console.log(timerContent);
// });

if (duration < (duration * 0.5)) {
    document.querySelector("#boilingEggImage").src = "images/midCook3.png";

}

function msToTime(ms) {
    let s = ms / 1000;
    let m = s / 60;
    let minutes = Math.trunc(m);
    let seconds = Math.round((m % 1) * 60);

    // if (minutes < 10) return `0${minutes}:${seconds}`

    if (seconds < 10) return `0${minutes}:${seconds}0`

    return `0${minutes}:${seconds}`
}