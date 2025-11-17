

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

let ms = 100;

let timerContent = document.querySelector(".timer");

let timerStartButton = document.querySelector(".cook");
let timerPauseButton = document.querySelector(".pause");

let running = false;
const cancelPopup = document.getElementById("cancelPopup");
const confirmCancel = document.getElementById("confirmCancel");
const denyCancel = document.getElementById("denyCancel");




const displayKcal = document.querySelector("#kcalStat");
const displayProtein = document.querySelector("#protein span");
const displayFat = document.querySelector("#fat span");

let driItems = document.querySelectorAll("li span");
console.log(driItems);


function updateStats(stats) {
    const values = Object.values(microStats);

    displayKcal.innerHTML = `${stats.kcal} <span>kcal</span>`;
    displayProtein.textContent = stats.protein + "g";
    displayFat.textContent = stats.fat + "g";

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
    readyButton.classList.add("marked");


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

    const displayEggCount = document.querySelector("#eggCount span");

    if (e.target.textContent === "+") {
        eggCount++
    } else if (eggCount === 1) {
        // KNAPP KSA EJ GÅ ATT TRYCKA PÅ
    } else {
        eggCount--

    }
    console.log(`Number of eggs:`, eggCount);

    displayEggCount.textContent = eggCount;

    if (!eggSize) {
        return
    } else {
        totalStats = getTotalEggStats(eggSize, eggCount).total;

        microStats = calculateDRI(totalStats);

        updateStats(totalStats);
    }

});

const sizeTypePopup = document.getElementById("sizeTypePopup");
const closeSizePopup = document.getElementById("closeSizePopup");

const readyButton = document.querySelector(".readyButton");
readyButton.addEventListener("click", () => {
    console.log(sizeSelected);

    if (!sizeSelected) {
        sizeTypePopup.classList.replace("hiddenTrue", "hiddenFalse");
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
    S: { soft: 270000, medium: 360000, hard: 480000 },
    M: { soft: 300000, medium: 390000, hard: 510000 },
    L: { soft: 330000, medium: 420000, hard: 540000 }
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


document.querySelector(".boilOptions").addEventListener("click", function (e) {
    const markedElements = document.querySelectorAll(".marked")
    // markedElements.forEach(btn => btn.classList.remove("marked"));

    if (e.target.classList.contains("soft")) {
        console.log("soft selected");
        markedElements.forEach(btn => btn.classList.remove("marked"));

        document.getElementById("soft").classList.add("marked");
        boilType = "soft";

        let startDuration = eggCookTimes[eggSize][boilType];
        duration = startDuration
        duration = duration - 100;
        timerContent.textContent = `${msToTime(duration)}`

    }
    if (e.target.classList.contains("med")) {
        console.log("medium selected");
        markedElements.forEach(btn => btn.classList.remove("marked"));

        document.getElementById("med").classList.add("marked");

        boilType = "medium";
        let startDuration = eggCookTimes["S"][boilType];

        duration = startDuration
        duration = duration - 100;
        timerContent.textContent = `${msToTime(duration)}`
    }
    if (e.target.classList.contains("hard")) {
        console.log("hard selected");
        markedElements.forEach(btn => btn.classList.remove("marked"));

        document.getElementById("hard").classList.add("marked");

        boilType = "hard";

        let startDuration = eggCookTimes["S"][boilType];
        duration = startDuration
        duration = duration - 100;
        timerContent.textContent = `${msToTime(duration)}`

    } else {
        return
    }

});





timerStartButton.addEventListener("click", function () {

    if (timerStartButton.classList.contains("pressToCancel")) {
        cancelPopup.classList.replace("hiddenTrue", "hiddenFalse");
    }
    if (!boilType) {
        boilTypePopup.classList.replace("hiddenTrue", "hiddenFalse");
        return
    }

    if (running && boilType) return
    running = true;
    let startDuration = eggCookTimes["S"][boilType];
    duration = startDuration

    console.log(boilType);
    console.log(duration);
    let timerId = setInterval(function () {
        if (duration < (startDuration * 0.94)) {
            document.querySelector("#boilingEggImage").src = "images/midCookAnimated.gif";
        }
        if (duration < (startDuration * 0.9)) {
            document.querySelector("#boilingEggImage").src = "images/endCookAnimated.gif";
        }
        if (running) {
            if (duration <= 0) {
                console.log(`Timer with id ${timerId} finished`);
                timerContent.textContent = `*Alarm noise*`;
                clearInterval(timerId)

                // Visa popup
                const donePopup = document.getElementById("donePopup");
                donePopup.classList.remove("hiddenTrue");

                // const eggGif = document.getElementById("eggFinishedIMG");
                // if (eggGif) eggGif.src = "images/endCook2.png";

                // Spela kort ljud
                const sound = new Audio("egg_done.mp3");
                sound.play();

                const confirmDone = document.getElementById("confirmDone");
                confirmDone.addEventListener("click", () => {
                    console.log("Loading app again...");

                    window.location.reload()
                });


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
    timerStartButton.classList.add("pressToCancel");



    for (let element of document.querySelectorAll("div.boilOption")) {
        element.classList.add("hiddenTrue");
    }
    document.querySelector("#boilingEggImage").classList.add("hiddenFalse");

});

confirmCancel.addEventListener("click", () => {
    cancelPopup.classList.replace("hiddenFalse", "hiddenTrue");
    window.location.reload()
});

denyCancel.addEventListener("click", () => {
    cancelPopup.classList.replace("hiddenFalse", "hiddenTrue");
});

closeBoilPopup.addEventListener("click", () => {
    boilTypePopup.classList.replace("hiddenFalse", "hiddenTrue");
});

closeSizePopup.addEventListener("click", () => {
    sizeTypePopup.classList.replace("hiddenFalse", "hiddenTrue");
});

function msToTime(ms) {
    let s = ms / 1000;
    let m = s / 60;
    let minutes = Math.trunc(m);
    let seconds = Math.round((m % 1) * 60);

    if (seconds === 60) {
        minutes += 1;
        seconds = 0;
    }
    const minString = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const secString = seconds < 10 ? `0${seconds}` : `${seconds}`;

    return `${minString}:${secString}`;

}