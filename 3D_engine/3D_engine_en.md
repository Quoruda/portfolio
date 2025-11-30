# 🎮 3D Engine in Java

![3D Engine Screenshot](/3D_engine/screenshot.png)

> A 3D rendering engine developed from scratch in Java, without using any external graphics libraries.

---

## 🎯 The Challenge

I've always been fascinated by how video games and 3D applications work "under the hood". Rather than using ready-made frameworks like **[Unity](https://unity.com/)** or libraries like **[OpenGL](https://www.opengl.org/)**, I wanted to truly understand how a 3D engine works by implementing it entirely myself in **[Java](https://www.java.com/)**.

**The goal**: start from scratch and build a system capable of transforming 3D models into 2D images displayable on screen, pixel by pixel.

---

## 🛠️ The Work Done

This project required me to master and implement many mathematical and algorithmic concepts:

### 📐 Complete Rendering Pipeline

- **3D Transformations**: Implementation of operations (translation, rotation, scale) with **[4×4 matrices](https://en.wikipedia.org/wiki/Transformation_matrix)**
- **[Perspective projection](https://en.wikipedia.org/wiki/3D_projection#Perspective_projection)**: Configurable projection matrix (**[FOV](https://en.wikipedia.org/wiki/Field_of_view)**, aspect ratio, near/far planes)
- **[Back-face culling](https://en.wikipedia.org/wiki/Back-face_culling)**: Algorithm based on **[normals](https://en.wikipedia.org/wiki/Normal_(geometry))** to eliminate non-visible faces
- **[Frustum culling](https://en.wikipedia.org/wiki/Viewing_frustum)**: **[Clipping](https://en.wikipedia.org/wiki/Clipping_(computer_graphics))** triangles against view planes with generation of new triangles
- **[Rasterization](https://en.wikipedia.org/wiki/Rasterisation)**: Manual conversion of triangles with interpolation of **[texture coordinates](https://en.wikipedia.org/wiki/UV_mapping)**
- **[Z-buffering](https://en.wikipedia.org/wiki/Z-buffering)**: Proper management of object depth ordering

### 🔢 Robust Mathematical System

- **[Vector](https://en.wikipedia.org/wiki/Euclidean_vector)** operations (addition, subtraction, **[dot product](https://en.wikipedia.org/wiki/Dot_product)**, **[cross product](https://en.wikipedia.org/wiki/Cross_product)**)
- **[Matrix](https://en.wikipedia.org/wiki/Matrix_(mathematics))** multiplication and inversion
- Vector normalization with implementation of the famous **[fast inverse square root](https://en.wikipedia.org/wiki/Fast_inverse_square_root)** from Quake III
- View matrix calculation (`Matrix_PointAt` and its fast inverse)

### 🎨 Graphics Features

- **Model loading**: Parsing of **[`.obj`](https://en.wikipedia.org/wiki/Wavefront_.obj_file)** files (vertices, faces, texture coordinates)
- **Texture system**: **[UV](https://en.wikipedia.org/wiki/UV_mapping)** sampling with perspective correction
- **Directional lighting**: Intensity calculation based on normals
- **Procedural textures**: Support for solid colors and grids

### 🏗️ Software Architecture

- **Scene system**: Object hierarchy (Scene, **[Mesh](https://en.wikipedia.org/wiki/Polygon_mesh)**, Camera, Node)
- **Engine loop**: `deltaTime` calculation for **[framerate](https://en.wikipedia.org/wiki/Frame_rate)**-independent animations
- **Free camera**: **[Pitch/yaw](https://en.wikipedia.org/wiki/Aircraft_principal_axes)** controls to explore the scene
- **Abstract display**: Architecture allowing different rendering modes
- **Input mapping**: Flexible system for keyboard controls
- **[Observer pattern](https://en.wikipedia.org/wiki/Observer_pattern)**: Clean event management

### ⚡ Optimizations

- Flag system to recalculate transformations only when necessary
- Use of **[fast inverse square root](https://en.wikipedia.org/wiki/Fast_inverse_square_root)** for frequent normalizations
- Pre-calculation of triangle normals

---

## 📚 What I Learned

This project was a deep dive into applied mathematics and **[computer graphics](https://en.wikipedia.org/wiki/Computer_graphics)**. I had to:

✅ Truly understand **[linear algebra](https://en.wikipedia.org/wiki/Linear_algebra)** and its practical application  
✅ Handle **[floating-point precision](https://en.wikipedia.org/wiki/Floating-point_arithmetic)** issues and their visual impacts  
✅ Optimize to maintain **acceptable performance** despite intensive calculations  
✅ Debug complex visual problems (normal inversions, incorrect clipping, texture artifacts)  
✅ Structure a medium-sized project with a **clean and extensible architecture**


## 🚀 Evolution Perspectives

The engine is functional but could be enriched in many ways:

| Feature | Description |
|---------|-------------|
| **[Collision](https://en.wikipedia.org/wiki/Collision_detection)** | Collision detection and response between objects |
| **Advanced lighting** | Multiple light sources, **[cast shadows](https://en.wikipedia.org/wiki/Shadow_mapping)**, **[Phong/Blinn-Phong shading](https://en.wikipedia.org/wiki/Phong_reflection_model)** |
| **Dev console** | Real-time interface to adjust parameters and debug |
| **Optimizations** | **[Octree](https://en.wikipedia.org/wiki/Octree)**//**[BSP](https://en.wikipedia.org/wiki/Binary_space_partitioning)** for spatial culling, **[multithreading](https://en.wikipedia.org/wiki/Multithreading_(computer_architecture))** for rendering |
| **Post-processing** | **[Bloom](https://en.wikipedia.org/wiki/Bloom_(shader_effect))**, **[antialiasing](https://en.wikipedia.org/wiki/Anti-aliasing)**, **[depth of field](https://en.wikipedia.org/wiki/Depth_of_field)** |
| **Scene format** | **[Serialization/deserialization](https://en.wikipedia.org/wiki/Serialization)** to save and load complex scenes |

---

## 💻 Technologies Used

- **[Java](https://www.java.com/)**: Main language for its portability and robustness
- **[Swing](https://docs.oracle.com/javase/tutorial/uiswing/)/[AWT](https://docs.oracle.com/javase/8/docs/technotes/guides/awt/)**: For display and input management
- **Pure mathematics**: No external graphics libraries

---

## 🎓 Conclusion

This project represents several weeks of intense work and has given me a solid foundation to understand modern engines like [Unity](https://unity.com/), [Unreal](https://www.unrealengine.com/) or APIs like [Vulkan](https://www.vulkan.org/) and [DirectX](https://en.wikipedia.org/wiki/DirectX).

