// THEME API

const paperdisk = {
    info: "A txt-storage service for storing your documents (paper)",
    dev: "Dwijottam Dutta",
    toast: function(msg, type) {
        const t = document.getElementById("toast");
        t.innerHTML = `<b>${msg}</b>`;
        t.classList.add("show");

        setTimeout(() => {
            t.classList.remove("show");
        }, 5000);
    },
    theme: {
        set: function(theme) {
            localStorage.setItem("theme", theme)
            document.body.className = theme;
            paperdisk.theme.effect("True")
        },
        effect: function(check) {
            
            if (check=="True"){
                document.getElementById("paper_doc").classList.add("shadow");
                document.getElementById("paper-nav").classList.add("shadow");
            }
            else{
                document.getElementById("paper_doc").classList.remove("shadow");
                document.getElementById("paper-nav").classList.remove("shadow");
            }
        }
        
    }
}