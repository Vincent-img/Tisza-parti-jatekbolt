const containers = document.querySelectorAll('.boxok');
containers.forEach(container => {
    container.addEventListener('click', () => {
        console.log("Rákattintottál a galériára!");
    });
});