const container = document.querySelector(".container");
const resizeBtn = document.querySelector(".grid-resize");
const defaultSize = 16;
const maxHoverCount = 10;
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
// mouseup lives on window, not .container, so releasing outside the grid still stops drawing
window.addEventListener("mouseup", () => (isDrawing = false));

// Shift is an alternate way to draw, independent of holding the mouse button down
window.addEventListener("keydown", (event) => {
  if (event.key === "Shift") isDrawing = true;
});
window.addEventListener("keyup", (event) => {
  if (event.key === "Shift") isDrawing = false;
});

container.addEventListener("mouseover", (event) => {
  const square = event.target;

  if (!square.classList.contains("grid-square")) return;
  if (!isDrawing) return;

  // hoverCount lives on the square itself so each one darkens independently,
  // capped at maxHoverCount so the count never outgrows what "fully black" means
  square.hoverCount = square.hoverCount || 0;
  square.hoverCount = Math.min(square.hoverCount + 1, maxHoverCount);

  const visibility = square.hoverCount / maxHoverCount;
  square.style.backgroundColor = `rgba(0, 0, 0, ${visibility})`;
});

createGrid(defaultSize);

resizeBtn.addEventListener("click", () => {
  const size =
    Number.parseInt(prompt("Pick a number for the grid:", defaultSize), 10) ||
    defaultSize;

  if (size > 100 || size < 1) {
    alert(`Sorry that is out of range try numbers between 1 - 100`);
    createGrid(defaultSize);
    return;
  }

  createGrid(size);
});
