document.addEventListener("DOMContentLoaded", () => {
    
    // --- DINAMIKUS VÉGTELENÍTETT GÖRGŐ LOGIKA ---
    const boxContainer = document.querySelector('.boxok');
    if (boxContainer) {
        const boxes = Array.from(boxContainer.children);
        boxes.forEach(box => boxContainer.appendChild(box.cloneNode(true)));

        let speed = 1; 
        let isPaused = false;

        function scrollLogos() {
            if (!isPaused) {
                boxContainer.scrollLeft += speed;
                if (boxContainer.scrollLeft >= boxContainer.scrollWidth / 2) {
                    boxContainer.scrollLeft = 0;
                }
            }
            requestAnimationFrame(scrollLogos);
        }

        scrollLogos();

        boxContainer.addEventListener('mouseenter', () => isPaused = true);
        boxContainer.addEventListener('mouseleave', () => isPaused = false);
        boxContainer.addEventListener('touchstart', () => isPaused = true);
        boxContainer.addEventListener('touchend', () => isPaused = false);
    }

    // --- SZŰRŐK ÉS KOSÁR LOGIKA ---
    const szurokGomb = document.querySelector(".szurok-gomb");
    const szurokMenu = document.querySelector(".szurok-menu");
    const szurok = document.querySelectorAll(".szuro");
    
    const termekek = document.querySelectorAll(".akcio-blokk[data-nev]");

    // Közös szűrő funkció
    function frissitSzures() {
        const aktivCheckboxok = Array.from(szurok)
            .filter(input => input.checked)
            .map(input => input.value);

        const aktivBox = document.querySelector('.boxok .box.aktiv');
        const nyersBrand = aktivBox ? aktivBox.getAttribute('data-brand') : "";
        const kivalasztottCsapatok = nyersBrand ? nyersBrand.split('|').map(item => item.trim().toLowerCase()) : [];

        termekek.forEach(termek => {
            const termekKategoria = termek.getAttribute("data-category");
            const termekNev = (termek.getAttribute('data-nev') || "").trim().toLowerCase();

            const kategoriaMatch = aktivCheckboxok.length === 0 || aktivCheckboxok.includes(termekKategoria);
            
            const brandMatch = kivalasztottCsapatok.length === 0 || kivalasztottCsapatok.some(csapat => termekNev.includes(csapat));

            termek.style.display = (kategoriaMatch && brandMatch) ? "block" : "none";
        });

        // Szekciók (H1 és a hozzá tartozó konténer) elrejtése, ha üresek
        document.querySelectorAll('.akcio').forEach(szekcio => {
            const vanLathatoTermek = Array.from(szekcio.querySelectorAll('.akcio-blokk'))
                .some(t => t.style.display !== "none");
            
            const cim = szekcio.previousElementSibling;
            if (cim && cim.tagName === "H1") {
                cim.style.display = vanLathatoTermek ? "block" : "none";
                szekcio.style.display = vanLathatoTermek ? "flex" : "none";
            }
        });
    }

    if (szurokGomb && szurokMenu) {
        szurokGomb.addEventListener("click", () => {
            szurokMenu.classList.toggle("active");
        });
    }

    szurok.forEach(szuro => szuro.addEventListener("change", frissitSzures));

    // --- F1 LOGÓK KATTINTÁS ALAPÚ SZŰRÉSE ---
    const szuroBoxok = document.querySelectorAll('.boxok .box');

    if (szuroBoxok.length > 0 && termekek.length > 0) {
        szuroBoxok.forEach(box => {
            box.addEventListener('click', () => {
                // Ellenőrizzük, hogy a kattintott doboz már aktív-e
                const wasActive = box.classList.contains('aktiv');

                // Először távolítsuk el az 'aktiv' osztályt az összes dobozról
                szuroBoxok.forEach(b => b.classList.remove('aktiv'));

                // Ha a kattintott doboz NEM volt aktív, akkor tegyük aktívvá.
                // Ha aktív volt, akkor most deaktiváltuk (és az összes többit is), így "visszacsináltuk" a szűrést.
                if (!wasActive) {
                    box.classList.add('aktiv');
                }
                frissitSzures();
            });
        });
    }

    // Alapértelmezett futtatás az oldal betöltésekor
    frissitSzures();

    // Termékkattintások (Kosárba küldés)
    termekek.forEach(termek => {
        termek.style.cursor = "pointer";
        termek.addEventListener("click", (e) => {
            if (e.target.closest('.szuro-box')) return;

            const nev = termek.getAttribute("data-nev");
            const ar = termek.getAttribute("data-ar");
            const kep = termek.getAttribute("data-kep");

            localStorage.setItem("kosarNev", nev);
            localStorage.setItem("used_ar", ar); // A kosár logikádhoz igazítva
            localStorage.setItem("kosarAr", ar);
            localStorage.setItem("kosarKep", kep);

            window.location.href = "kosar.html";
        });
    });

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