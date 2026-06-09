// Galéria végtelenített gurulás másolása
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
    if (szurokGomb && szurokMenu) {
        szurokGomb.addEventListener("click", () => {
            szurokMenu.classList.toggle("active");
        });
    }

    // Szűrési logika
    if (szurok.length > 0 && termekek.length > 0) {
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
    }

    // --- DINAMIKUS KOSÁRBA RAKÁS LOGIKA ---
    // Figyeljük a főoldali termékkattintásokat
    termekek.forEach(termek => {
        termek.style.cursor = "pointer";
        termek.addEventListener("click", () => {
            const nev = termek.getAttribute("data-nev");
            const ar = termek.getAttribute("data-ar");
            const kep = termek.getAttribute("data-kep");

            // Mentés a böngésző memóriájába
            localStorage.setItem("kosarNev", nev);
            localStorage.setItem("kosarAr", ar);
            localStorage.setItem("kosarKep", kep);

            // Átirányítás a kosár oldalra
            window.location.href = "kosar.html";
        });
    });

    // Adatok betöltése a kosár oldalon
    const kosarKep = document.getElementById("dinamikus-kep");
    const kosarNev = document.getElementById("dinamikus-nev");
    const kosarAr = document.getElementById("dinamikus-ar");

    if (kosarKep && kosarNev && kosarAr) {
        const mentettNev = localStorage.getItem("kosarNev");
        const mentettAr = localStorage.getItem("kosarAr");
        const mentettKep = localStorage.getItem("kosarKep");

        if (mentettNev && mentettAr && mentettKep) {
            kosarKep.src = mentettKep;
            kosarNev.textContent = mentettNev;
            kosarAr.textContent = mentettAr;
        }
    }
});