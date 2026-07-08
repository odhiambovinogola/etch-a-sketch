let isDrawing = false;
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

const size =
  Number.parseInt(prompt("Pick a number for the grid:", 16), 10) || 16;
createGrid(size);
