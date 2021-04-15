

// ctes declaration

const form = document.getElementById("form");
const modalSection = document.getElementById("modal-section");
const modalOpenButton = document.getElementById("modal-open-button");
const modalCloseButton = document.querySelector(".modal-button.fa-window-close");
const modalCancelButton = document.getElementById("m-cancelBtn");

function justFunc(event) {
    window.removeEventListener('keyup', keyChanger);
    modalSection.classList.remove("hidden");
    var divsDate = new Date();
    var divsActualMonth = date.getMonth() + 1;
    var todayHour = divsDate.getHours();
    var todayMinutes = divsDate.getMinutes();
    var todayDate = event.target.firstChild.textContent;
    if (todayDate < 10)
        todayDate ='0' + todayDate;
    if (todayHour < 10)
        todayHour = "0" + todayHour;
    if (todayMinutes < 10)
        todayMinutes  = "0" + todayMinutes;
    if (divsActualMonth < 10)
        divsActualMonth ='0' + divsActualMonth;
    document.getElementById("initialDate").value =
        `${date.getFullYear()}-${divsActualMonth}-${todayDate}T${todayHour}:${todayMinutes}`;
        document.getElementById("title").focus();
};

function addEachListener (event) {
    for (let div of modalDivs.children) {
        div.addEventListener('click', justFunc);
    }
}

function removeEachListener() {
    for (let div of modalDivs.children) {
        div.removeEventListener('click', justFunc);
    }
}

// Show de modal event. Open and close it.

modalOpenButton.onclick = function() {
    window.removeEventListener('keyup', keyChanger);
    modalSection.classList.remove("hidden");
    var divsDate = new Date();
    var divsActualMonth = divsDate.getMonth() + 1;
    var todayDate = divsDate.getDate()
    var todayYear = divsDate.getFullYear();
    var todayHour = divsDate.getHours();
    var todayMinutes = divsDate.getMinutes();
    document.getElementById("title").focus();

    if (todayDate < 10)
        todayDate ='0' + todayDate;
    if (todayHour < 10)
        todayHour = "0" + todayHour;
    if (todayMinutes < 10)
        todayMinutes  = "0" + todayMinutes;
    if (divsActualMonth < 10)
        divsActualMonth ='0' + divsActualMonth;
        document.getElementById("initialDate").value = `${todayYear}-${divsActualMonth}-${todayDate}T${todayHour}:${todayMinutes}`;
}

modalCloseButton.onclick = function() {
    modalSection.classList.add("hidden");
    document.getElementById("form").reset();
    enableArrowKeys();
}

modalCancelButton.onclick = function() {
    modalSection.classList.add("hidden");
    document.getElementById("form").reset();
    enableArrowKeys();
}

window.onclick = function(event) {
    if (event.target == modalSection){
        modalSection.classList.add("hidden");
        document.getElementById("form").reset();
        enableArrowKeys();
    }
}

window.onkeyup = function(event) {
    let escNow = event.keyCode || event.which;
    if (escNow == 27){
        modalSection.classList.add("hidden");
        document.getElementById("form").reset();
        enableArrowKeys();
    }
}

// Show or hidden the checkbox info

function showMeTheEndDate(){
    if (document.getElementById("check-box-end-date").checked){
        document.getElementById('EndDateModal').classList.remove('modal-inputDisabled');
    } else{
        document.getElementById('EndDateModal').classList.add('modal-inputDisabled');
        document.getElementById("endDate").classList.remove("incorrect");
    }
}

function showMeTheReminder(){
    if (document.getElementById("check-box-reminder").checked){
        document.getElementById("time").removeAttribute("disabled");
    } else{
        document.getElementById("time").disabled = true;
    }
}







