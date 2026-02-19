# **The Fractal Compressor**

![Interface Screenshot](/fractal_compressor/screenshot.png)

> "What if we could store the *recipe* of an image instead of its pixels?"

## **The Concept**

I have always been fascinated by **mathematical beauty** and optimizing algorithms. While studying image compression, I stumbled upon a concept that sounded like science fiction: **Fractal Compression** (PIFS).

Unlike JPEG or PNG which discard some data or use statistics, fractal compression claims that every part of an image is similar to another part of the same image, just at a different scale. It's like finding a small version of a cloud inside a bigger cloud.

My goal was to build a program that could **look at an image** and autonomously **discover the mathematical equations** capable of redrawing it from scratch.

## **How It Works**

Imagine trying to explain a painting to someone over the phone.
- **Traditional method (Bitmap):** You describe every single dot color by color. "Pixel 1 is red, Pixel 2 is red..." It takes forever.
- **Fractal method:** You describe relationships. "See that tree in the corner? It looks exactly like the big tree in the center, but half the size and rotated 90 degrees."

My engine breaks the image into thousands of small blocks (Ranges) and searches the rest of the image (Domains) to find a match. It doesn't look for partial matches; it looks for **mathematical similarity** after applying transformations (rotation, flip, brightness, contrast).

## **The Challenge: Performance**

The main drawback of fractal compression is the **encoding time**. Comparing every block with every other block requires billions of calculations.

To make it usable, I had to optimize aggressively:
*   **Parallelism**: The engine splits the image into strips and distributes the workload across all available **CPU cores**.
*   **JIT Compilation**: I used **[Numba](https://numba.pydata.org/)** to compile Python functions into machine code at runtime. This allows the core mathematical loops to run at speeds comparable to **C++**.
*   **Vectorization**: Using **NumPy** to process entire blocks of data simultaneously rather than pixel by pixel.

## **The Result**

The outcome is a functional application that lets you open an image and watch the computer "learn" it in real-time.

You can see the engine finding matches, and as it processes, the image reconstructs itself from pure mathematics. I also designed a custom file format, **`.frac`**, which stores these equations using bit-packing techniques and LZMA compression, achieving impressive compression ratios on suitable images.

> This project was a deep dive into **optimization**, **linear algebra**, and **UI design** with Python. It bridges the gap between abstract math and visual art.
