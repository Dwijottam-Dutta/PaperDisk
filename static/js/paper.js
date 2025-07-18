// TURNING ON EDITING
function EDITING_TURNED_ON() {
    paperdisk.toast("Editing Turned ON", alert);
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
    paperdisk.toast('Syncing your Disk <i class="fas fa-sync li-icon"></i>', alert);

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
    paperdisk.toast('<i class="fas fa-print"></i> Print Service API is not available', alert);
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


if (localStorage.getItem("theme")){
    if (localStorage.getItem("theme") !== "default"){
        paperdisk.theme.set(localStorage.getItem("theme"));
    }
}

// if (localStorage.getItem("effect")){
//     paperdisk.theme.effect(localStorage.getItem("effect"));
// }