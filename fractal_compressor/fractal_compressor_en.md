# The Fractal Compressor

![Python](https://img.shields.io/badge/Python-3.x-blue.svg)
![Numba](https://img.shields.io/badge/Numba-Optimized-orange.svg)
![Tkinter](https://img.shields.io/badge/GUI-Tkinter-green.svg)

![Interface Screenshot](/fractal_compressor/screenshot.png)

**The Fractal Compressor** is an advanced experiment in fractal image compression (PIFS - Partitioned Iterated Function Systems). This project demonstrates how to replace pixel storage with self-referential mathematical equations, effectively storing the *recipe* to recreate the image rather than the image itself.

## Key Features

*   **Fractal Compression Engine**: Analyzes the image to find self-similar patterns (fractals).
*   **High Performance**: Heavily optimized with `numba` (@njit) to compile critical loops into machine code.
*   **Parallel Processing**: Splits image analysis across multiple CPU cores for speed.
*   **Custom File Format (.frac)**: A hybrid binary container using Bit Packing and LZMA compression for maximum efficiency.
*   **Visual Interface**: A modern GUI (ttkbootstrap) providing real-time visualization of the compression process.

## Technical Architecture

The project is structured into four main components that isolate the mathematical logic from the user interface:

### 1. Compression Engine (`src/fractal_compressor.py`)
The core of the system. It handles the heavy lifting:
- **Block Classification**: Categorizes image blocks to speed up the search for matches.
- **Vectorized Search**: Rapidly finds the best matching domain block for each range block.
- **JIT Compilation**: Uses Numba to achieve near-C++ performance for the most intensive calculations.

### 2. Flow Manager (`src/compression_manager.py`)
Acts as the conductor between the UI and the Engine:
- **Preprocessing**: Converts images to YCbCr and handles chrominance subsampling (4:2:0).
- **Quantization**: Converts floating-point transform coefficients into compact integers for storage.

### 3. Data Manager (`src/compressed_data.py`)
   - Handles the serialization of the fractal model.
   - Applies a final layer of LZMA compression to the `.frac` file to squeeze out another 20-30% of space.

### 4. Graphical Interface (`src/gui.py`)
   - Built with `tkinter` and styled with `ttkbootstrap` for a modern look.
   - Uses threading to keep the UI responsive during the intensive compression tasks.

## Technology Stack

*   **Language**: Python 3.10+
*   **Mathematics**: NumPy, Numba
*   **GUI**: Tkinter, ttkbootstrap
*   **Image Processing**: Pillow (PIL)

> This project was created to explore the limits of image compression algorithms and the beauty of fractal mathematics.
