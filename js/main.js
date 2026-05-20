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


