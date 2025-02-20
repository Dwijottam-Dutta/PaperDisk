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

function download() {
    var element = document.createElement("a");

    text = document.getElementById("paper_doc").value;

    element.setAttribute(
        "href",
        "data:text/plain;charset=utf-8," + encodeURIComponent(text)
    );
    element.setAttribute("download", "Paper #{{buffer}}");

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);

    TOAST("Downloaded Successfully", alert);
}


// ADDING PAPER IN DISK REQUEST
document.getElementById("add_btn").addEventListener("click", function (event) {
    event.preventDefault();
    fetch("/id={{code}}&paper={{buffer}}/add", {
        method: "POST",
        body: "",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        .then(response => response.text())
        .then((response) => {
            if (response == "success") {
                location.href = "/id={{code}}&paper={{buffer+1}}"
            }
            else {
                alert("Unexpected Error occured while adding paper")
            }
        })
});


// DELETING PAPER IN DISK REQUEST
document.getElementById("del_btn").addEventListener("click", function (event) {
    event.preventDefault();
    alert("Deleting Paper from a disk is permanent, and can't be recovered!!")
    confirm = prompt("If you still want to delete, then enter the Disk ID, to confirm its you: ")
    if (confirm == "{{code}}") {
        fetch("/id={{code}}&paper={{buffer}}/delete", {
            method: "POST",
            body: "",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => response.text())
            .then((response) => {
                if (response == "success") {
                    location.href = "/id={{code}}&paper=0"
                }
                else {
                    alert("Unexpected Error occured while adding paper")
                }
            })
    }
    else {
        alert("Enter valid details.")
    }
})



try {
    document.getElementById("forward").addEventListener("click", function (event) {
        event.preventDefault();

        window.location.replace("/id={{code}}&paper={{buffer+1}}")

    })
}
catch (e) {
    console.log(e)
}

try {
    document.getElementById("back").addEventListener("click", function (event) {
        event.preventDefault();

        window.location.replace("/id={{code}}&paper={{buffer-1}}")

    })
}
catch (e) {
    console.log(e)
}