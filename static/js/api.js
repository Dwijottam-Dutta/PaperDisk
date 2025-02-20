// TOAST MSG FUNCTION API
function TOAST(msg, type) {
    const toast = document.getElementById("toast");
    toast.innerHTML = `<b>${msg}</b>`;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 5000);
}