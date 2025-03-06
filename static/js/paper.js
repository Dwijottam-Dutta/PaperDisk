// TURNING ON EDITING
function EDITING_TURNED_ON() {
    TOAST("Editing Turned ON", alert);
    document.getElementById("save-button").style.display = "inline-block";
    document.getElementById("edit-button").style.display = "none";
    document.getElementById("paper_doc").disabled = false;

    // DISABLING NEXT/BACK PAPER BUTTON
    try {
        document.getElementById("back").style.display = "none";
    } catch (error) {
        console.log("Back Button isn't there");
    }
    try {
        document.getElementById("forward").style.display = "none";
    } catch (error) {
        console.log("Forward Button isn't there");
    }
}

// SYNC FUNCTION
function SYNC() {
    TOAST("Syncing your Disk!!", alert);

    setTimeout(() => {
        location.reload();
    }, 3500);
}


// SHOW AND HIDE ELEMENT
function SHOWMENU(elem) {
    if (elem.classList.contains("show")) {
        elem.classList.remove("show");
    } else {
        elem.classList.add("show");
    }
}

// PRINTING API
function PRINT() {
    TOAST("Printing Service API is not available on your system");
}

function THEME(){
    localStorage.setItem("theme", "pale")
    document.body.classList.toggle("pale");
    document.getElementById("paper_doc").classList.toggle("shadow");
    document.getElementById("paper-nav").classList.toggle("shadow");
}

// DETAILS MENU
function DETAILS() {
    popupBox = document.querySelector(".popup-box");
    popupBox.classList.add("show");
}

let pop_close = document.getElementById("pop_close")
pop_close.addEventListener("click", () => {
    document.querySelector(".popup-box").classList.remove("show");
});

// LOGOUT
function LOGOUT() {
    location.href = "/logout";
}

if (localStorage.getItem("theme") == "pale"){
    THEME()
}