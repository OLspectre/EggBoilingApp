

const loadingPage = document.querySelector(".loadingPage");
const mainPage = document.querySelector(".calculatePage");


let loadingScreen = setTimeout(function () {
    loadingPage.classList.replace("hiddenFalse", "hiddenTrue");

    mainPage.classList.replace("hiddenTrue", "hiddenFalse");

}, 7500)

// clearTimeout(loadingScreen)