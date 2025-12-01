# Simulator: The Game of Life

> An interactive version of Conway's famous mathematical experiment, designed to understand how to create a smooth and well-organized simulation.

![Simulator Screenshot](./GameOfLife/screen.png)

## What is the "Game of Life"?

It's not a traditional video game where you win or lose. It's a **simulation** on a grid where each cell is a **"cell"** that can be **alive** (colored) or **dead** (empty).

At each step (like the tick of a clock), cells are born or die according to very simple [**neighborhood rules**](https://en.wikipedia.org/wiki/Moore_neighborhood). Despite this simplicity, **complex patterns** and fascinating behaviors emerge on their own: shapes that move, oscillate, or grow infinitely. It's a classic example of a [**cellular automaton**](https://en.wikipedia.org/wiki/Cellular_automaton).

My goal was to create a program capable of simulating this "world" in a **smooth** way, even with thousands of cells.

## A concrete example: The Pinball oscillator

![Pinball](./GameOfLife/pinball.gif)

To illustrate the power of these simple rules, take the structure called "Pinball". It was only created from a few starting cells, but it became an oscillator: a miniature machine that repeats a complex interaction cycle forever, without dying out or growing. It's particularly interesting because it's composed of fixed structures that serve as walls and mobile structures (like the famous glider) that bounce and are reflected to maintain the cycle. This shows how simple rules can lead to emergent behaviors that weren't planned from the start.

## How it works

To make the experience enjoyable, I had to structure the program like a miniature video game engine:

### ⚙️ The Engine (The brain)

* **The heartbeat**: I created an internal **loop** that calculates births and deaths at a regular pace, independent of the screen's display speed (the [**framerate**](https://en.wikipedia.org/wiki/Frame_rate)).

* **Memory**: To prevent the computer from slowing down, I optimized how the grid is stored in **memory**. Access to each cell is **instantaneous**, allowing for very large grids without slowdown (algorithmic complexity in [**O(1)**](https://en.wikipedia.org/wiki/Big_O_notation)).

* **The rules**: The program scrupulously applies Conway's rules: a cell dies if it's too alone (**underpopulation**) or too crowded (**overpopulation**), and is born if it has exactly 3 neighbors.

### 🎨 Display (The eyes)

* **Fluidity**: I used a technique called [**Double Buffering**](https://en.wikipedia.org/wiki/Multiple_buffering). Imagine that while you're looking at an image, the program is already drawing the next one behind the scenes to display it all at once. This prevents the image from **flickering** or jumping.

* **Organization ([MVC](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller))**: I separated the code into three distinct parts to respect the **Model-View-Controller** pattern:

    1.  The **Data** (cell positions).

    2.  The **Display** (drawing on screen).

    3.  The **Controls** (mouse and keyboard).

  It's like in a restaurant kitchen: the chef (data) doesn't do the table service (display), which makes everything more efficient and maintainable.

## Importing and Creating patterns

You can spend hours observing patterns. I added a system to **import** existing creations in the standard [**Life 1.06 (.lif)**](https://conwaylife.com/wiki/Life_1.06) format.

The program is capable of **parsing** (reading and understanding) these files, interpreting the **coordinates** of living cells and placing them correctly on your screen to replay known scenes.

### Creation example: the Glider

A "**glider**" is the most famous pattern in the Game of Life; it moves diagonally across the grid. Here's how you can create it manually with a few clicks:

### Imported pattern example: Pinball

Here's "**Pinball**", a complex imported pattern. You can clearly see the structures interacting with each other indefinitely:

## Features

For the user, everything was designed to be simple:

| **Action** | **Description** |
| ----- | ----- |
| **Draw** | You can click to give life to or kill cells **manually**. |
| **Control** | Pause at any time to analyze the situation or modify the grid calmly. |
| **Explore** | Zoom and move around the grid like on a GPS map (**Pan & Zoom**). |
| **Random Mode** | Fill the grid **procedurally** (randomly) to see what survives the chaos. |

## What I learned

This project allowed me to understand essential concepts in computer science:

* **Multitasking ([Concurrency](https://en.wikipedia.org/wiki/Concurrent_computing))**: Making the computer calculate the next step of the game *at the same time* as it handles your mouse clicks, without the application freezing (managing [**Threads**](https://en.wikipedia.org/wiki/Thread_(computing))).

* **Code Cleanliness**: By properly separating tasks (the "Chef" and the "Server"), the code is easier to fix and improve (**Software Architecture**).

* **Optimization**: Learning not to waste the computer's resources to keep a fast simulation.

## Ideas for the future

Several directions are being considered to enrich the project:

1.  **Customizable rules**: Being able to modify birth/survival rules and neighborhoods directly from the interface.

2.  **Complete editor**: Add an integrated library to organize, save and share your own `.lif` files.

3.  **User comfort**: Add "Undo/Redo" functions and history to experiment without fear of making mistakes.

4.  **Extreme speed**: Use advanced techniques like [**Multi-threading**](https://en.wikipedia.org/wiki/Multithreading_(computer_architecture)), computing on [**GPU**](https://en.wikipedia.org/wiki/Graphics_processing_unit) or the [**HashLife**](https://en.wikipedia.org/wiki/Hashlife) algorithm to simulate immense grids and advance much faster in time.

## Resources

* **View the code**: [GitHub - GameOfLife](https://github.com/Quoruda/GameOfLife)

* **Download the application**: [Release v1.0.0](https://github.com/Quoruda/GameOfLife/releases/tag/v1.0.0)

