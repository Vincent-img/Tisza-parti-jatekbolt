const containers = document.querySelectorAll('.boxok');
containers.forEach(container => {
    container.addEventListener('click', () => {
        console.log("Rákattintottál a galériára!");
    });
});


let box = document.createElement('div');
box.classList.add('box');
let boxok = document.querySelector('.boxok');
boxok.appendChild(box);