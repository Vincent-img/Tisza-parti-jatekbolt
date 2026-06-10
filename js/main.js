document.addEventListener("DOMContentLoaded", () => {
    
    // --- DINAMIKUS VÉGTELENÍTETT GÖRGŐ LOGIKA ---
    const boxContainer = document.querySelector('.boxok');
    if (boxContainer) {
        // Klónozzuk a logókat a végtelenítéshez
        const boxes = Array.from(boxContainer.children);
        boxes.forEach(box => boxContainer.appendChild(box.cloneNode(true)));

        let speed = 1; // Itt tudod állítani a gurulás sebességét
        let isPaused = false;

        function scrollLogos() {
            if (!isPaused) {
                boxContainer.scrollLeft += speed;
                
                // Ha elérjük a lista felét (a másolt elemek elejét), visszaugrik észrevétlenül
                if (boxContainer.scrollLeft >= boxContainer.scrollWidth / 2) {
                    boxContainer.scrollLeft = 0;
                }
            }
            requestAnimationFrame(scrollLogos);
        }

        // Elindítjuk az automata mozgást
        scrollLogos();

        // Egér események: ha rajta van az egér, megáll a gurulás, szabadon scrollozható
        boxContainer.addEventListener('mouseenter', () => isPaused = true);
        boxContainer.addEventListener('mouseleave', () => isPaused = false);
        
        // Touch események telefonokra:
        boxContainer.addEventListener('touchstart', () => isPaused = true);
        boxContainer.addEventListener('touchend', () => isPaused = false);
    }

    // --- SZŰRŐK ÉS KOSÁR LOGIKA ---
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