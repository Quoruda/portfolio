# **NodalPy**

![Application screenshot](/nodalpy/concept.png)

The idea for this project came to me while using **[Automatic1111](https://github.com/AUTOMATIC1111/stable-diffusion-webui)**, an interface for generating images/videos with **[Stable Diffusion](https://en.wikipedia.org/wiki/Stable_Diffusion)**. NodalPy allows, through **nodes**, to create **modular workflows** for generating custom images. Other tools, like **[Unreal Engine](https://www.unrealengine.com/)**, also offer node-based languages ([**visual programming**](https://en.wikipedia.org/wiki/Visual_programming_language)).

This approach is interesting: it provides a **clear vision** of the program through small blocks that take advantage of the screen's **verticality** and **horizontality**. However, most existing interfaces are **limited** and don't allow creating **custom nodes**.

This is where **NodalPy** comes in. NodalPy is a tool that allows **executing code** from **editable nodes**. Each node can be **customized** with its own code, its **input and output variables**, which facilitates the creation and organization of **modular workflows**.

## **Technologies Used**

The project is separated into two main parts:
* The **backend** in [Python](https://www.python.org/), which handles **node execution** and application logic.
* The **frontend** in **JavaScript** ([Vue.js](https://vuejs.org/)), which provides an **interactive user interface** for creating and managing nodes.

The project was developed to run on a **server** and be accessible via a **web browser**, but thanks to [Electron](https://www.electronjs.org/), the application can also work as a **cross-platform desktop application**.

## **Current Features**

For now, for **security** and **budget** reasons, NodalPy is limited to **local** use ([**localhost**](https://en.wikipedia.org/wiki/Localhost)) and doesn't yet support advanced features like **user authentication** or **deployment on a remote server**.

There are currently two types of nodes:
- **Code**: allows writing **custom Python code**. It's possible to connect **output variables** from other nodes to **input variables** of this node.
- **Observer**: allows **visualizing** variable values in **real-time**. Useful for **debugging** and **monitoring** data flows.

## **Upcoming Features**

The following nodes are planned:
- **File**: allows **reading and writing** files.
- **Library**: allows using **external libraries**.
- **Ghost**: allows having a **copy** of a Code node with **synchronized** code but **different inputs and outputs**.

