// TOAST MSG FUNCTION API
function TOAST(msg, type) {
    const toast = document.getElementById("toast");
    toast.innerHTML = `<b>${msg}</b>`;
    toast.classList.add("show")

    setTimeout(() => {
        toast.classList.remove("show")
    }, 5000);
}

// TURNING ON EDITING
function EDITING_TURNED_ON() {
    TOAST("You can now edit your document", alert)
    document.getElementById("save-button").style.display = "inline-block";
    document.getElementById("edit-button").style.display = "none";
    document.getElementById("paper_doc").disabled = false;
}

// SYNC FUNCTION
function SYNC() {
    TOAST("Reloading...", alert)

    setTimeout(() => {
        location.reload()
    }, 3500);
}

// BLITTING 'OPEN PAPER' FORM
function OPEN_PAPER() {

    try {
        document.querySelectorAll(".get-started-div")[0].style.display = "none"
        document.querySelectorAll(".inline-div")[0].style.display = "inline-block"
        document.getElementById("open_paper_form").style.display = "flex"
        document.getElementById("new_paper_form").style.display = "none"
    } catch (error) {
        location.href = '/'
    }

}

// BLITTING 'NEW PAPER' FORM
function NEW_PAPER() {
    try {
        document.querySelectorAll(".get-started-div")[0].style.display = "none"
        document.querySelectorAll(".inline-div")[0].style.display = "inline-block"
        document.getElementById("new_paper_form").style.display = "flex"
        document.getElementById("open_paper_form").style.display = "none"
    } catch (error) {
        location.href = '/'
    }
}

try {
    // PREVENTING DEFAULT ACTION ONSUBMIT OF OPEN PAPER
    document.getElementById("open_paper_form").addEventListener("submit", function (event) {
        event.preventDefault();
        paper_code = document.getElementById("paper_code_open_button").value
        if (paper_code != null) {
            if (paper_code.trim() != "") {
                location.href = `/paper=${paper_code}`
            }
        }
    });
} catch (error) {
    console.log("Welcome to PaperDisk !!")
}


// DOWNLOADING THE DATA
function download() {
    var element = document.createElement('a');

    text = document.getElementById("paper_doc").value

    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', "paperdisk-data-encoded");

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);

    TOAST("Downloaded Successfully", alert)
}

// SHOW AND HIDE ELEMENT
function SHOWMENU(elem) {
    if (elem.classList.contains("show")) {
        elem.classList.remove("show");
    }
    else {
        elem.classList.add("show");
    }
}

// PRINTING API
function PRINT() {
    TOAST("Printing Service API is not available on your system")
}


function DETAILS() {
    popupBox = document.querySelector(".popup-box")
    popupBox.classList.add("show");
}

document.getElementById("pop_close").addEventListener("click", () => {
    document.querySelector(".popup-box").classList.remove("show");
});