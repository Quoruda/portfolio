# Internship at MSFR

## Introduction

During my internship at **[Magna Steyr France](https://grandparis.ccibusiness.fr/msfr-magna-steyr-france)**, I designed an intelligent assistant for **[CATIA V5](https://www.3ds.com/fr/products/catia/catia-v5)** combining **automation, [Python](https://en.wikipedia.org/wiki/Python_(programming_language)) interface** and **generative artificial intelligence**.

The goal: enable non-developer engineers to create or adapt **custom macros** simply, through an intuitive graphical interface and an integrated AI assistant.

The project combines skills in **Python programming**, **UX**, **industrial [API](https://en.wikipedia.org/wiki/API)** and **artificial intelligence**, with a concrete purpose: **save time**, **reduce errors** and **promote user autonomy** in their work tools.

## Context

My **two-month** internship at **Magna Steyr France** took place within a technical department using **CATIA V5**, a **[CAD](https://en.wikipedia.org/wiki/Computer-aided_design)** software essential in the **automotive** and **aerospace** sectors.

The team faced numerous **repetitive tasks** and had tried several scripting solutions ([CatScript](https://cao.centralesupelec.fr/index.php?page=scripting.htm), [VBScript](https://en.wikipedia.org/wiki/VBScript)) unsuccessfully, due to the complexity of the CATIA environment. Even before I started, they had discovered the Python library **[pycatia](https://pycatia.readthedocs.io/en/latest/)**, and it naturally became the subject of my internship.

My role therefore consisted of exploring pycatia, evaluating its capabilities to effectively automate tasks, then developing a robust solution. Quickly, the project evolved towards designing a centralized **graphical interface** and integrating a **[generative AI](https://en.wikipedia.org/wiki/Generative_artificial_intelligence)**, to make macro creation and modification accessible to non-developer engineers.

## Getting Started

I first had to familiarize myself with the **CAD environment**, a field with its own **concepts** and **terminology**. To experiment with **pycatia** and observe the effects of the code, I used **[Jupyter Notebook](https://jupyter.org/)**, an interactive environment ideal for executing and testing Python code by cells.

![Jupyter Notebook demonstration video](/magna/jupyter_notebook_demo.mp4)
*Jupyter Notebook demonstration video*

I started by developing **simple macros**, then designed a **graphical interface** serving as a **macro library**, allowing users to execute them easily. This interface was developed with **Tkinter** and allows launching and configuring macros intuitively.

The choice of **Tkinter** is explained by its ease of integration and lightness. Unlike libraries like **[PyQt](https://en.wikipedia.org/wiki/PyQt)**, Tkinter is included by default in Python, which facilitates application deployment without having to manage additional dependencies. Although more basic in terms of graphical rendering, it offers enough flexibility to create a clear, functional and maintainable interface. Given that the objective was to design a quickly operational and easy-to-transfer tool, Tkinter was the most pragmatic choice in the internship context.

![Application screenshot](/magna/catia_app_v2.png)
*Screenshot of the macro library*

## A New Objective

As the internship progressed, I realized that, even though the developed macros were useful, it would be difficult to produce enough to meet all needs. In the absence of developers, the **maintenance** and **evolution** of the project would also be complicated after my departure.

That's when the idea came to me to create a **[facade](https://refactoring.guru/design-patterns/facade) for pycatia**: **a simplified [abstraction layer](https://en.wikipedia.org/wiki/Abstraction_layer)** allowing engineers to create their own macros more easily. Although some **programming** foundation remains necessary, this approach significantly reduces **complexity** and limits **error** risks.

In this example showing pycatia functions, we can see that the values defining the color property are inverted between the retrieval function and the modification function.  
It's a small detail that can quickly become a source of errors, especially if it's not the only exception presenting this type of problem.
```python
# get color
get_real_color() -> (inheritance: int, red: int, green: int, blue: int)
# set color
set_real_color(red: int, green: int, blue: int, inheritance: int)
```

The following two codes show the difference between direct use of pycatia and use with the facade.
```python
# pycatia
caa = catia()
document = caa.active_document
part = document.part
bodies = part.bodies
selection = caa.active_window.selection
selection.clear()
for body in bodies:
    selection.add(body)
selection.vis_properties.set_real_color(255, 0, 0, 0)
selection.clear()
```
```python
# facade
part = get_active_part()
bodies = get_bodies_of_part(part)
set_color(bodies, (255, 0, 0, 0))
```

We notice that the code using pycatia requires preparing the selection before being able to modify the color, while the facade allows modifying bodies directly without having to manage the selection.

## Adding an AI Layer

While developing the facade, a new idea emerged: why not exploit **generative AI** to produce functional code from this facade? Until then, attempts to use AI to interact with **CATIA V5** had failed, notably because of the **complexity of its API**. However, a **simplified library** could improve the **relevance** of the generated code.

By providing the AI with a **prompt** detailing its role and the **available functions** in the facade, I obtained **good results**. I therefore integrated this AI into the application, in the form of an **interactive macro** responding directly to user requests.

![Interactive AI demonstration video](/magna/ia_interactive_demo.mp4)
*Interactive AI demonstration video*

This functionality demonstrates that an **AI can generate relevant code**, opening the way to new forms of **automation** in **CATIA V5**. However, the AI remains imperfect: it can misinterpret a request or generate erroneous code. That's why I chose to make it a **macro creation assistant**, which only allows code execution or saving if it is **valid**.

![Application screenshot](/magna/catia_app_v3.png)
*Screenshot of the macro editor*

Thanks to this interface, users can interact with the **AI** to **create or modify macros**. It consists of two main areas:  
– The left part is dedicated to **code**, with a **Python editor**, **execution**, **save** and **import** buttons, as well as a display of available functions.  
– The right part is reserved for the **AI**, with a **text editor** for conversation and **predefined prompts**.

**Example**: a user asks the AI to create a macro generating a **screenshot** for each part, to use the images in a document.

![Macro creation demonstration video](/magna/ia_creation_macro_spielberg.mp4)
*Macro creation demonstration video*

## About the AI

The AI used relies on a model developed by the French company **[Mistral AI](https://en.wikipedia.org/wiki/Mistral_AI)**, specialized in **open-source models**. It provides **free API keys**, ideal for testing phases.

Several models were tested. I first used **[Codestral](https://mistral.ai/news/codestral)**, a model specialized in code, quickly replaced by its successor **[Devstral](https://mistral.ai/news/devstral)**. Finally, it was **[Mistral-small](https://mistral.ai/news/mistral-small-3-1)**, a **generalist** model, that proved most efficient, particularly for **understanding requests**, **proposing solutions** and **generating reliable code**.

Here is the **initial project architecture diagram**: the user sends a request, the AI generates code using the **pycatia** facade, then this code is executed in **CATIA V5**.

![Project architecture diagram](/magna/catia_agent_schema.png)
*Agent architecture diagram without RAG*

This first version had a limitation: the facade contained **too many functions**, making their use by the AI **random** or **incorrect**.

To overcome this, I implemented an architecture based on the **[RAG (Retrieval-Augmented Generation)](https://en.wikipedia.org/wiki/Retrieval-augmented_generation)** principle. Thanks to **[embedding](https://en.wikipedia.org/wiki/Word_embedding)**, the system automatically selects the **most relevant functions** from the user request, drastically reducing errors.

I chose a **RAG** system rather than **[fine-tuning](https://en.wikipedia.org/wiki/Fine-tuning_(deep_learning))** a model, mainly for reasons of **time**, **resources** and **available data quantity**. Fine-tuning would have required a substantial corpus of annotated examples, as well as a technical environment adapted to model training. This was not compatible with the internship constraints. Conversely, RAG allows relying on an **existing model** while dynamically adapting its responses via a knowledge base.

This approach also has the advantage of being **easily maintainable**: updating or adding functions to the base does not require retraining a model. It's therefore a flexible, efficient solution much better suited to a rapid development context like that of the project.

**Embedding** transforms data (here, functions) into **vectors** to facilitate comparison. This allows **[semantic search](https://en.wikipedia.org/wiki/Semantic_search)** based on **meaning** and not exact keywords — and improves **request understanding**, whatever its formulation.

![RAG project architecture diagram](https://www.couchbase.com/blog/wp-content/uploads/2024/02/image1-1.png)
*Embeddings diagram*

The choice of embedding model was decisive in the quality of results obtained with the RAG system. My initial objective was to use a local model for performance reasons (avoid multiple requests) and technical independence. I tested several models from the [sentence-transformers](https://www.sbert.net/index.html) collection, like [all-mpnet-base-v2](https://www.sbert.net/docs/sentence_transformer/pretrained_models.html), but results were often inconsistent: a well-formulated user request could lead to a bad match one time out of three. Finally, I opted for [mistral-embed](https://docs.mistral.ai/capabilities/embeddings/text_embeddings/), a model developed by Mistral. This one offers superior robustness, particularly on imprecise or multilingual requests. Its ability to understand intent even if the formulation is vague makes it a better choice in a real industrial context, where users may express their needs in a non-technical manner.

Here is the **RAG project architecture diagram**. The process is as follows:
1. The user sends a request.
2. We transform the request into an **embedding**.
3. We search for the **most relevant functions** in the database, using the **embedding**.
4. We send a request to the AI, which generates code based on these functions.
5. We retrieve the Python code for CATIA generated by the AI.

![RAG project architecture diagram](/magna/catia_agent_schema_rag.png)
*Agent architecture diagram with RAG*

The **AI** doesn't systematically generate all code: it focuses on **functions to modify**. My program extracts these functions from existing code and **replaces them only if necessary**, limiting risks of introducing errors in unmodified parts.

**Example of generated response**:
```json
[
  {
    "type": "import",
    "name": "os",
    "content": "import os"
  },
  {
    "type": "function",
    "name": "take_and_save_screenshot",
    "content": "def take_and_save_screenshot():\n    screenshot = app.take_screenshot()\n    download_path = os.path.join(os.path.expanduser('~'), 'Downloads')\n    screenshot_path = os.path.join(download_path, 'capture_ecran.png')\n    screenshot.save(screenshot_path)\n    app.wait_confirmation(f\"The screenshot has been saved in your download folder under the name 'capture_ecran.png'.\")\n"
  },
  {
    "type": "function",
    "name": "main",
    "content": "def main():\n    take_and_save_screenshot()\n"
  },
  {
    "type": "response",
    "name": "info",
    "content": "I created a macro that takes a screenshot and saves it in your download folder under the name 'capture_ecran.png'. The macro is ready to be executed."
  }
]
```

In this example, the AI responds in [JSON](https://en.wikipedia.org/wiki/JSON) format with 4 objects:
- 2 **function** type objects containing the function name and its code;
- 1 **response** type object containing the AI message intended for the user;
- 1 **import** type object containing imports necessary for executing the generated code.

This format allows **structuring the AI response** and facilitating its processing by the program. Other formats were possible, like [XML](https://en.wikipedia.org/wiki/XML), but JSON is lighter and easier to manipulate in Python.

It's important to note that this AI layer is primarily a **proof of concept**. The technical demonstration works and has shown that AI is capable of producing relevant code based on real user requests. However, not all **CATIA** functionalities are yet covered by the facade, and AI usage relies on **API keys** requiring an **external subscription** to the company.

This project nevertheless highlights a **strong need** for software development within the team, and opens the way to potentially deeper integration of AI-based automation in internal tools.

## Conclusion

This project was an **extremely enriching experience**. It allowed me to discover the world of **CAD** while mobilizing my **programming** skills to address concrete issues. I learned to **manipulate complex APIs**, **develop ergonomic interfaces** and **integrate AI models** into a tool used in business.

The integration of **generative AI** opens **new perspectives** for **automation** in **CATIA V5**. The developed macros, as well as the interface, have already enabled **considerable time savings** on certain common tasks. The centralization of tools and execution simplicity allow engineers to adopt these automations without major learning effort.

