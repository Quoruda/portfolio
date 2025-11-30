# **Game of Life**

![Simulator screenshot](/GameOfLife/screen.png)

## **Overview**
A simple implementation of the famous [Game of Life (Conway's Game of Life)](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life) written in **Java**. The focus is on **interactive simulation** and observing [emergent behaviors](https://en.wikipedia.org/wiki/Emergence) rather than installation or configuration.

## **Why This Project**
The Game of Life interests me because it's mesmerizing to watch: very simple rules can produce rich and unexpected patterns. It's also a notable mathematical model — the game is [Turing-complete](https://en.wikipedia.org/wiki/Turing_completeness) — making it an excellent [experimentation ground](https://en.wikipedia.org/wiki/Cellular_automaton) for testing alternative rules and optimizing rendering.

On a technical level, this project allowed me to consolidate my Java skills (user interface, event handling) while working on interactive editing ergonomics and organizing shareable configurations (`.lif`).

## **Technology**
- Language: [Java](https://en.wikipedia.org/wiki/Java_(programming_language))
- Interface: interactive simulation with real-time editing and control

## **Key Features**
- Conway's standard rules by default, easily modifiable to experiment with other [cellular automata](https://en.wikipedia.org/wiki/Cellular_automaton).
- **Interactive editing**: pause, manual cell modification, random generation and reset.
- **Configuration import** in [Life 1.06 (.lif)](https://conwaylife.com/wiki/Life_1.06) format to replay scenes or provided examples.

## **Controls**
Navigate and interact with the simulation using these commands:

- **Mouse click**: activate/deactivate cells (when paused)
- **G**: show / hide grid
- **Space**: pause / resume
- **Arrow keys**: move the view
- **Mouse wheel**: zoom

## **Visual Examples**
### Creating a Glider
A "glider" is a pattern that moves diagonally across the grid. Here's how to create one manually:

![Creating a "glider"](/GameOfLife/glider_creation.gif)

### Pinball Oscillator
An example of a complex oscillator pattern imported from a `.lif` file, showing fascinating interactions between structures:

![Pinball (oscillator / interaction example)](/GameOfLife/pinball.gif)

## **Coming Soon**
Some ideas and improvements I wish to implement:

- **Customizable rules** from the interface (editing/saving rules and [neighborhoods](https://conwaylife.com/wiki/Neighbourhood)).
- **Pattern editor** and integrated library to organize and share `.lif` files.
- **Undo/redo** and history management to facilitate experimentation.
- **Accelerations** ([multi-threading](https://en.wikipedia.org/wiki/Multithreading_(computer_architecture)), [GPU](https://en.wikipedia.org/wiki/Graphics_processing_unit) or [HashLife](https://conwaylife.com/wiki/HashLife) algorithm) to handle large grids, advance many simulation steps and improve performance.

## **Learn More**
- **Source code**: https://github.com/Quoruda/GameOfLife
- **Release** (portable executable): https://github.com/Quoruda/GameOfLife/releases/tag/v1.0.0

Download the portable executable from the release if you want to test quickly without compiling. The repository also contains `.lif` examples and source code for the curious or contributors.

