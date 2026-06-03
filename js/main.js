const containers = document.querySelectorAll('.boxok');
containers.forEach(container => {
    container.addEventListener('click', () => {
        console.log("Rákattintottál a galériára!");
    });
});

const boxContainer = document.querySelector('.boxok');
if (boxContainer) {
    const boxes = Array.from(boxContainer.children);
    boxes.forEach(box => boxContainer.appendChild(box.cloneNode(true)));
}


document.addEventListener("DOMContentLoaded", () => {
    const szurokGomb = document.querySelector(".szurok-gomb");
    const szurokMenu = document.querySelector(".szurok-menu");
    const szurok = document.querySelectorAll(".szuro");
    const termekek = document.querySelectorAll(".akcio-blokk");

    // Lenyíló menü megjelenítése/elrejtése
    szurokGomb.addEventListener("click", () => {
        szurokMenu.classList.toggle("active");
    });
    // Szűrési logika
    szurok.forEach(szuro => {
        szuro.addEventListener("change", () => {
            const aktivSzurok = Array.from(szurok)
                .filter(input => input.checked)
                .map(input => input.value);

            termekek.forEach(termek => {
                const termekKategoria = termek.getAttribute("data-category");
                if (aktivSzurok.length === 0 || aktivSzurok.includes(termekKategoria)) {
                    termek.style.display = "block";
                } else {
                    termek.style.display = "none";
                }
            });
        });
    });
});

