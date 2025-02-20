// BLITTING 'OPEN DISK' FORM
function OPEN_DISK() {
    try {
        document.querySelectorAll(".get-started-div")[0].style.display = "none";
        document.querySelectorAll(".basic-instruction")[0].style.display = "none";
        document.getElementById("open_disk_form").style.display = "flex";
        document.getElementById("new_disk_form").style.display = "none";
    } catch (error) {
        location.href = "/";
    }
}

// BLITTING 'NEW PAPER' FORM
function NEW_PAPER() {
    try {
        document.querySelectorAll(".get-started-div")[0].style.display = "none";
        document.querySelectorAll(".basic-instruction")[0].style.display = "none";

        document.getElementById("new_disk_form").style.display = "flex";
    } catch (error) {
        location.href = "/";
    }
}

try {
    // PREVENTING DEFAULT ACTION ONSUBMIT OF OPEN PAPER
    document
        .getElementById("open_disk_form")
        .addEventListener("submit", function (event) {
            event.preventDefault();
            paper_code = document.getElementById("paper_code_open_button").value;
            if (paper_code != null) {
                if (paper_code.trim() != "") {
                    location.href = `/id=${paper_code}&paper=0`;
                }
            }
        });
} catch (error) {
    console.log("Welcome to PaperDisk !!");
}