# Etch-a-Sketch

## Live Demo

https://vinogola.github.io/etch-a-sketch/

## Overview

A browser-based sketch pad. Click and drag across the grid to draw — each square gets
darker the more times you pass over it. Resize the grid anytime, from 1x1 up to 100x100.

## How to Use

1. Open the page — a 16x16 grid loads right away.
2. Click and drag to draw. Holding `Shift` works too, if you'd rather not hold the mouse
   button down.
3. Squares darken as you hover over them, capping at solid black after 10 passes.
4. Click **Resize Grid** to pick a new size (1-100).

## Key Features

- Draw by clicking and dragging across the grid.
- Squares darken gradually instead of turning solid black on the first touch.
- Pick any grid size from 1x1 to 100x100 without reloading the page.
- The grid always stays perfectly square, no matter what size you choose.

## What I Learned

- **Event delegation.** Rather than adding a separate hover listener to every square (there
  can be thousands), I added a single listener to the whole grid and used the event to
  figure out which square was actually being hovered. Much less code, and it still works no
  matter how many squares there are.
- **A floating-point rounding bug.** I was calculating each square's width in JavaScript by
  dividing numbers, which sometimes produced results like `6.333px` — enough of those side
  by side stop lining up, leaving a visible gap. Letting CSS calculate the width live with
  `calc()` instead fixed it, since CSS doesn't hit the same rounding issue.
- **Global state vs. per-element state.** `isDrawing` (is the mouse currently held down?) is
  global state — one single true/false for the whole page. Each square's hover count needed
  to be per-element state, belonging to that square only. Figuring out that these needed to
  be stored differently was the trickiest part of this project.
- **Custom properties on DOM elements.** You can attach your own custom property directly
  onto a DOM element in code — I used this to give each square its own hover count, separate
  from anything the browser stores by default.
- **Execution timing.** Top-level code runs once, immediately, when the page loads. Code
  inside an event listener only runs later, when that event actually fires. I didn't realize
  this at first, which is why my grid wasn't appearing until after the first click instead of
  being there from the start.

## Challenges I Struggled With

- **The drag-outside-container bug.** If I dragged the mouse off the edge of the grid before
  releasing the click, the app kept thinking I was still drawing. Fixed by listening for
  `mouseup` on `window` instead of just the grid container, so the release still registers no
  matter where the mouse ends up.
- **Sub-pixel rounding gaps.** Getting every square to line up perfectly at every grid size —
  traced back to the floating-point issue above.
- **State isolation.** Making sure each square tracked its own hover count instead of
  accidentally sharing one global counter, which would've darkened every square at the same
  rate regardless of which one was actually being hovered.

## Getting Started

1. Clone this repo.
2. Open `index.html` in your browser, or just use the live demo link above.
3. Click and drag to draw.

## Acknowledgements

Built as part of [The Odin Project](https://www.theodinproject.com/) curriculum.
