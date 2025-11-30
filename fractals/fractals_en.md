# **Fractal** Viewer

## **Introduction**
I've always been fascinated by [**fractals**](https://en.wikipedia.org/wiki/Fractal), these infinitely complex mathematical structures that repeat at different scales.
For better accessibility and visualization, I decided to create a **fractal viewer** using **modern web technologies**.
This project allows users to **explore** different fractals, **zoom** in and **modify parameters** to see how they change.

![Generic fractal example](fractals/fractal.png)

The **fractal viewer** is **accessible online** at [https://quoruda.github.io/FractalViewer/](https://quoruda.github.io/FractalViewer/) or via the dedicated application on my portfolio.

The complete **source code** of the project is available on [GitHub](https://github.com/Quoruda/FractalViewer) for anyone wishing to explore the implementation or contribute.

## **Technologies Used**
This project is developed in [**Vue.js 3**](https://vuejs.org/), a progressive JavaScript framework for building modern user interfaces.
For fractal rendering, I use **[WebGL](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API)** because it allows leveraging the power of the graphics card.
Why use the graphics card? Because fractal computation can be very resource-intensive, and **[GPUs](https://en.wikipedia.org/wiki/Graphics_processing_unit)** are designed to handle parallel computations efficiently, which is perfect for this type of rendering.
This choice has a major drawback however: **WebGL precision** is limited to **32 bits** (~7 significant digits), which can be problematic during very deep **zooms** into fractals.

Support for **double precision (64 bits)** (~15-17 significant digits) is not yet universal in web browsers, although some are starting to implement it.
This could be a future improvement for this project, allowing us to see how deep we can **zoom** into fractals without losing detail.

## **Implemented Fractals**

### **Julia Set**

![Julia Set](/fractals/julia.gif)

The **Julia set** is a large family of fractals stemming from a rather simple mathematical sequence.
Each point in the complex plane is iterated according to the formula \( z_{n+1} = z_n^2 + c \), where \( c \) and \( z_0 \) are complex numbers.

For each pixel in the image, I use its position to define the initial value \( z_0 \).
I then iterate the formula a certain number of times. If the value of \( z_n \) exceeds a certain limit (generally 2), I consider that the point "**escapes**" to infinity.
The number of **iterations** before the point escapes is used to determine the pixel's **color**.
If the point doesn't escape after a maximum number of iterations, it is considered part of the set and is colored **black**.

### **Mandelbrot Set**

![Mandelbrot Set](/fractals/mandelbrot.png)

The **Mandelbrot set** is a famous fractal that is defined by a rule similar to that of the Julia set, but with a key difference that allows it to behave like a summary of all Julia sets.
\(c\) is now the pixel position, which allows testing Julia configurations for each point in the plane.
\(z_0\) is always initialized to 0, because it has been proven that if in a Julia set there is a point that escapes, then \(z_0 = 0\) also escapes.

After the **iteration** process similar to that of the Julia set.
There is no \(c\) parameter to adjust but this doesn't make it any less interesting to explore.
On the contrary, the Mandelbrot set is often considered a **map** of Julia sets, with each point in the Mandelbrot set corresponding to a specific Julia set.
This can be noticed in several places in the Mandelbrot set where structures similar to Julia sets appear. And these regions are generally found at coordinates corresponding to the values of \(c\) for which Julia sets are connected.

### **Burning Ship Set**

![Burning Ship Set](/fractals/burningship.png)

The **Burning Ship set** is a less known but equally fascinating fractal.
It is defined by an iteration similar to that of the Mandelbrot set, but with a modification in how values are manipulated.
I retrieve the absolute value of the real and imaginary parts of \(z_n\) before checking if the point escapes.
This modification creates patterns that resemble **burning ships**, hence the name "**Burning Ship**".
Using the absolute value breaks the symmetry of the Mandelbrot fractal and creates asymmetric and turbulent structures that indeed evoke flames.

### **Mandelbox**
The **Mandelbox** is a fascinating **3D** fractal discovered in 2010, which extends the concept of Mandelbrot and Julia sets into three-dimensional space.
Unlike previous fractals that are defined in the 2D complex plane, the **Mandelbox** uses **3D** vectors and iteration based on geometric transformations.

The iterative formula is defined as: \( v_{n+1} = f(v_n) + c \), where \( f \) applies a series of transformations at each iteration.
These transformations include "box folding" which folds space around a cube, followed by scaling.
The parameter \( c \) controls the intensity of these transformations and determines whether a point remains bounded or escapes to infinity.

To visualize this complex 3D fractal, I use **ray marching**, a rendering technique different from that of 2D fractals.
Instead of simply testing whether each pixel "escapes", **ray marching** sends **rays** from the camera through each pixel and advances them progressively into the scene.
At each step, I calculate the minimum distance to the Mandelbox surface using the iteration mentioned above.
When the distance becomes small enough, I consider that the ray has hit the surface and stop advancing.
This approach allows capturing the complex geometry and remarkable self-similarity of the Mandelbox in three dimensions.

Ray marching also offers the advantage of being able to explore the Mandelbox from all angles, unlike 2D projections of other fractals.
However, this technique is more computationally demanding and requires more iterations to produce quality images.

![3D Mandelbox](fractals/mandelbox.png)

## **Future Improvements**
Several optimizations and extensions could enrich this viewer:

**Extended Precision**: Implement [**double precision (64 bits)**](https://en.wikipedia.org/wiki/Double-precision_floating-point_format) once [**WebGL2**](https://developer.mozilla.org/en-US/docs/Web/API/WebGL2RenderingContext) support becomes more universal in browsers, allowing infinitely deep **zooms** without loss of detail.

**Custom Color Palettes**: Allow users to create and import their own **color palettes** for freer artistic exploration.

**Animation and Interpolation**: Add the ability to record "**paths**" through fractals with **smooth animations**, thus creating videos exploring fractal details.

**WebGPU Performance**: Migrate from **WebGL** to [WebGPU](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API) when it becomes more stable, offering better performance and better cross-platform compatibility.

**More 3D Fractals**: Implement other 3D fractals like the **Mandelbulb** or **3D Julia** fractals to enrich the exploration experience.

**Export and Sharing**: Allow users to **export** high-resolution images and **share** parameters of their discoveries with the community.

## **Sources of Inspiration**

This project would not have been possible without the exceptional work and educational content that inspired and guided me in my understanding of fractals and rendering techniques.

**Videos**

The [**Fractals Rendering**](https://www.youtube.com/watch?v=wUlVFYJIUNA&list=PLrhTDP0yvIGI92NOZFmYu8D_gslk0eD-x) playlist by **DimensionCode** is excellent for discovering 2D fractals. This channel excels at popularization and makes complex concepts accessible. I drew from its explanations to better understand Julia, Mandelbrot and Burning Ship sets.

For advanced rendering techniques, I relied heavily on the **Quantale** channel. His videos are more complex but extremely comprehensive:

- [**Ray Marching**](https://www.youtube.com/watch?v=K9yrtyLKysA): A detailed introduction to the **ray marching** technique, essential for understanding 3D fractal rendering.

- [**Fragment Shaders & OpenGL**](https://www.youtube.com/watch?v=_IV8gUD6LTY&t=411s): An in-depth explanation of **shaders** and how they work, which helped me efficiently implement my fractals in WebGL.

- [**3D Fractals**](https://www.youtube.com/watch?v=cTTgjHF-8r4): An exploration of **3D** fractals and their properties, particularly useful for the **Mandelbox**.

**Articles and Resources**

[**Wikipedia - Mandelbox**](https://en.wikipedia.org/wiki/Mandelbox) provided me with the precise and detailed mathematical formulas necessary to correctly implement the Mandelbox.

**Acknowledgments**

I thank the educational content creators, particularly **DimensionCode** and **Quantale**, as well as the community of **fractal** and **visual mathematics** enthusiasts for sharing their knowledge and creations, making projects like this one possible.

