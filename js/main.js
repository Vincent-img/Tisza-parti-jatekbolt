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
    
    // !!! JAVÍTÁS: Csak azokat a blokkokat gyűjtjük be, amik valódi termékek (van data-nev-ük) !!!
    const termekek = document.querySelectorAll(".akcio-blokk[data-nev]");

    if (szurokGomb && szurokMenu) {
        szurokGomb.addEventListener("click", () => {
            szurokMenu.classList.toggle("active");
        });
    }

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

    // --- F1 LOGÓK KATTINTÁS ALAPÚ SZŰRÉSE ---
    const szuroBoxok = document.querySelectorAll('.boxok .box');

    if (szuroBoxok.length > 0 && termekek.length > 0) {
        szuroBoxok.forEach(box => {
            box.addEventListener('click', () => {
                szuroBoxok.forEach(b => b.classList.remove('aktiv'));
                box.classList.add('aktiv');

                const nyersBrand = box.getAttribute('data-brand');
                
                // Ha az első logóra kattintunk (amiben az összes márka benne van), vagy üres: mutassunk mindent
                if (!nyersBrand || nyersBrand.trim() === "") {
                    termekek.forEach(termek => termek.style.display = 'block');
                    return;
                }

                const kivalasztottBrandek = nyersBrand.split('|').map(item => item.trim().toLowerCase());

                termekek.forEach(termek => {
                    const termekNev = (termek.getAttribute('data-nev') || "").trim().toLowerCase();

                    const vanEgyezes = kivalasztottBrandek.some(brand => {
                        return termekNev === brand || termekNev.includes(brand) || brand.includes(termekNev);
                    });

                    if (vanEgyezes) {
                        termek.style.display = 'block'; 
                    } else {
                        termek.style.display = 'none';
                    }
                });
            });
        });
    }

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