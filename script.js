const container = document.querySelector(".container");

function createGrid(size) {
  container.replaceChildren();

  for (let i = 0; i < size * size; i++) {
    const box = document.createElement("div");
    box.classList.add("grid-square");
    container.appendChild(box);
  }

  container.style.setProperty("--size", size);
}

const size =
  Number.parseInt(prompt("Pick a number for the grid:", 16), 10) || 16;
createGrid(size);
