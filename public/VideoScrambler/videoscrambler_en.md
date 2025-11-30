# Video Scrambler

![Application Screenshot](/VideoScrambler/screenshot.png)

This is a university project developed in Java aimed at implementing a video encryption and decryption system based on line-swapping techniques. The main goal is to protect video content against unauthorized access by making the video unreadable without the appropriate key.

## Historical Context

In the 80s/90s, pay television systems used simple yet effective analog encryption techniques to protect their content. Due to the limited processing capabilities of decoders at the time, encryption relied on scrambling image lines - an elegant method that required little computing power to decrypt.

## Technologies Used
- Language: Java
- Interface: JavaFX for the graphical user interface
- Video Processing: OpenCV for video stream manipulation and image processing

## Operating Principle

### Encryption Algorithm

The system uses a permutation of lines in each image based on a symmetric encryption key composed of two parameters:
- `r` (offset): an offset encoded on 8 bits
- `s` (step): a step encoded on 7 bits

For a line with index `idLigne`, its new position after encryption is: `(r + (2s+1) × idLigne) % size`

#### **Processing by Iterations**

To handle **all image heights** (not necessarily **powers of 2**), the algorithm proceeds through **successive iterations**:
1. **Iteration #1**: processing lines **0 to 2^n-1** (where **2^n** is the **largest power of 2** ≤ height)
2. **Iteration #2**: processing the **next residue**
3. **Following iterations**: until **all lines** are processed

This approach creates a **distinctive visual effect** where the **top** of the image is **heavily scrambled** while the **bottom** is **progressively less so**.

### Decryption with Key

When the key is known, decryption is trivial: simply reverse the line permutation. With current computing capabilities, this can be done in real time.

## Implemented Features

### Step 1: Basic Encryption/Decryption
- Reading and writing video files
- Line encryption frame by frame
- Decryption with known key
- Simultaneous visualization of two videos side by side in the JavaFX interface
- Key management via command line or text file
- Key display in the user interface

### **Step 2: Key Breaking by Brute Force**

There are **2^15 = 32,768 possible keys** (**8 bits** for r and **7 bits** for s). [Key breaking](https://en.wikipedia.org/wiki/Brute-force_attack) consists of **testing all possible combinations** and **evaluating the quality** of the obtained decryption.

The principle is to **test each key**, **decrypt the video**, then evaluate the **"quality"** of the **decrypted image** using a **selection criterion**.
The key that **maximizes this criterion** is considered the **correct key**.

**32,768 attempts** remain **manageable** for modern computers, allowing breaking in **a few minutes**.
However, I managed to **optimize the process** to achieve a breaking time of **a few seconds** thanks to a **personal observation** I made while playing with the keys.

#### Key Observation

Among the two key parameters, `s` (the step) has a more significant impact on line mixing than `r` (the offset). Indeed, `s` determines the "distance" between swapped lines, while `r` only shifts this permutation.
What this means in practice is that if we find the correct value of `s`, the image content becomes understandable to the eye regardless of the value of `r`.

Thus, I was able to reduce the number of necessary attempts in two steps:
1. Find the correct `s`: test the 128 possible values of `s` with r=0, and select the best according to the selection criterion.
2. Find the correct `r`: once `s` is known, test the 256 possible values of `r` for this `s` and select the best.
3. Final combination: the final key is the combination of the best `r` and `s` found.

This reduces the number of attempts from 32,768 to only 384, significantly speeding up the breaking process.

#### **Implemented Selection Criteria**

1. **[Euclidean Distance](https://en.wikipedia.org/wiki/Euclidean_distance)**
```
d(x,y) = √(Σ(xi - yi)²)
```
Measures the **pixel-by-pixel difference** between **two consecutive lines**.

2. **[Pearson Correlation](https://en.wikipedia.org/wiki/Pearson_correlation_coefficient)**
```
ρ(x,y) = Σ(xi-x̄)(yi-ȳ) / √(Σ(xi-x̄)²) × √(Σ(yi-ȳ)²)
```
More **robust to lighting variations**, **automatically normalizes** data.

The principle: in a **correctly decrypted image**, **consecutive lines are very similar**. The **overall score** is the **sum of similarities** of **all adjacent line pairs**.

Therefore, this is the **criterion I chose** to evaluate **each key tested** during breaking.
 
### Step 3: Embedded Dynamic Key
- 🔐 Periodic or random key change during video
- 💾 Key embedding (15 bits) in the LSBs of pixel (0,0) of each image
- 📺 Distribution: 5 bits per channel (R, G, B)
- ⚙️ Robustness management against video compression

#### Compression Management

Several strategies to preserve the embedded key despite compression:
- Use of lossless codecs (FFV1)
- Embedding in the Y channel (YUV space)
- Redundancy with majority voting bit by bit

## User Interface

The JavaFX interface allows:
- Simultaneous display of source video and processed video
- Real-time visualization of the encryption key used
- Control of the encryption/decryption process
- Monitoring of the key breaking process

## **Contributions and Limitations**

### **Technical Contributions**
- **Complete implementation** of a video encryption system with interactive graphical interface
- **Significant algorithmic optimization** (**98.8% reduction** of the search space)
- Exploration of [steganography](https://en.wikipedia.org/wiki/Steganography) methods and robustness against compression
- **Comparative analysis** of similarity criteria for [brute force attack](https://en.wikipedia.org/wiki/Brute-force_attack)

### **Limitations**
- **Security**: 15-bit key insufficient for any real application (**strictly educational use**)
- **Robustness**: key embedding in [LSBs](https://en.wikipedia.org/wiki/Bit_numbering#Least_significant_bit) remains vulnerable to [lossy codecs](https://en.wikipedia.org/wiki/Lossy_compression) ([H.264](https://en.wikipedia.org/wiki/Advanced_Video_Coding), [H.265](https://en.wikipedia.org/wiki/High_Efficiency_Video_Coding))
- **Scalability**: frame-by-frame processing limiting performance on high-resolution videos

### **Conclusion**

This project allowed **exploring** classic **video encryption concepts** while developing **optimization techniques** for **key breaking**. The **implementation** in [Java](https://en.wikipedia.org/wiki/Java_(programming_language)) with [OpenCV](https://opencv.org/) and [JavaFX](https://en.wikipedia.org/wiki/JavaFX) offers a **robust platform** for **experimenting** with **video processing** and **visualizing** in **real time** the **impact** of different **cryptographic approaches**.

