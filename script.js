const container = document.querySelector(".container");
const resizeBtn = document.querySelector(".grid-resize");
const defaultSize = 16;
let isDrawing = false;

function createGrid(size) {
  container.replaceChildren();

  for (let i = 0; i < size * size; i++) {
    const box = document.createElement("div");
    box.classList.add("grid-square");
    container.appendChild(box);
  }

  container.style.setProperty("--size", size);
}

container.addEventListener("mousedown", () => (isDrawing = true));
window.addEventListener("mouseup", () => (isDrawing = false));

window.addEventListener("keydown", (event) => {
  if (event.key === "Shift") isDrawing = true;
});
window.addEventListener("keyup", (event) => {
  if (event.key === "Shift") isDrawing = false;
});

container.addEventListener("mouseover", (event) => {
  if (!event.target.classList.contains("grid-square")) return;
  if (!isDrawing) return;
  event.target.style.backgroundColor = "black";
});

createGrid(defaultSize);

resizeBtn.addEventListener("click", () => {
  const size =
    Number.parseInt(prompt("Pick a number for the grid:", defaultSize), 10) ||
    defaultSize;

  if (size > 100 || size < 0) {
    alert(`Sorry that is out of range try numbers between 1 - 100`);
    createGrid(defaultSize);
    return;
  }

  createGrid(size);
});
