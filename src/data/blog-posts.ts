export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  featured: boolean;
}

export const blogPosts: BlogPost[] = [
    {
    id: "1",
    slug: "cnn-object-vs-background-bias",
    title: "Do CNNs Truly Recognize Objects or Just Their Backgrounds?",
    excerpt: "CNNs might not be recognizing the object you think they are. My experiments with VGG16 revealed that background context plays a surprisingly large role in classification decisions.",
    content: `When I started working with convolutional neural networks for image classification, I approached them as experimental observers, aiming to understand what features they actually use to recognize objects. If the model saw a zebra, I expected it to focus on the stripes. For an eagle, I anticipated attention to the beak and wingspan.

A central question emerged: Do CNNs recognize the object itself or the background context in which it appears? This question has practical implications. If the model learns associations such as penguins with snow or tigers with jungle, what happens when these objects appear in unfamiliar environments? To investigate, I conducted a series of experiments using a pre-trained VGG16 model.

## Setting the Stage

I selected 20 diverse animal classes from ImageNet to provide sufficient variability. The objective was not to train the network from scratch but to explore how an already trained model processes visual information and whether background influences classification.

![VGG16 Architecture](/assets/vgg16-architecture.png)

## Step 1: Filters and Feature Map Visualization

The first experiment involved visualizing filters and feature maps across multiple convolutional layers. Early layers captured low-level features such as edges, gradients, and textures. Deeper layers represented more abstract shapes, patterns, and object parts. These observations aligned with typical CNN behavior and set the stage for deeper analysis.

![Feature Maps](/assets/FeatureMaps.png)

## Step 2: Similarity Search on Feature Representations

I performed cosine and hard similarity searches on features extracted from different layers to determine what the filters were emphasizing. Early layers exhibited strong similarity to traditional edge detectors like Sobel and Gabor. In contrast, deeper layers shifted toward task-specific, abstract patterns. This confirmed that feature complexity increases with depth.

![Feature Maps](/assets/FeatureMaps.png)

## Step 3: Feature Clustering and Habitat Correlation

Next, high-dimensional features were projected into two dimensions using PCA and UMAP. Unexpectedly, animals from similar habitats clustered together even when they were from different species. For example, birds grouped together, insects formed distinct clusters, and water or land animals often appeared near each other. These clusters suggested that habitat context contributes to how the model organizes features in its internal representation.

![Feature Maps](/assets/F4.png)

## Step 4: Background Manipulation Experiment

To directly test the influence of background, I conducted an experiment where animals were removed from their original environments and placed into mismatched backgrounds, such as a zebra in a desert or a polar bear in a rainforest. The altered images were then evaluated by the same VGG16 model.

![Feature Maps](/assets/crop1.png)  
![Feature Maps](/assets/crop2.png)

The results were significant. Out of 400 manipulated images, more than 325 were misclassified. Saliency maps and Grad-CAM confirmed that the model focused on the object itself, yet changes in background consistently disrupted predictions.

## Observations and Insights

The experiments revealed that CNNs leverage any available visual cues to optimize classification accuracy. Consistent background-object correlations can lead the network to rely on environmental context more than object-specific features. While this strategy can improve performance on controlled datasets, it introduces vulnerabilities in real-world scenarios with variable or unexpected backgrounds.

## Recommendations for Reducing Background Bias

To mitigate background dependency, I suggest:

- Training with segmented objects so the network cannot use background cues  
- Incorporating diverse and unrelated backgrounds for each class during training  
- Evaluating models with out-of-context images to identify hidden biases before deployment

## Conclusions

These experiments highlight several key insights. CNNs learn from both objects and their environments. Background correlations can introduce subtle but impactful biases. Developing reliable AI systems requires deliberate dataset design and robust evaluation practices.

In summary, when a CNN recognizes a cheetah, it may also be recognizing the savannah it occupies. Changing the savannah to a city street can drastically reduce the model’s confidence, demonstrating the importance of understanding context in AI systems.`,
    date: "2025-08-11",
    readTime: "10 min read",
    featured: true
  },
 {
  id: "2",
  slug: "industry-llm-finetuning-lessons",
  title: "Practical Techniques for LLM Fine-Tuning",
  excerpt: "Fine-tuning LLMs involves subtle technical choices that greatly affect cost, reliability, and developer time. Here are practical lessons from production experience.",
  content: `From my experience building and fine-tuning LLMs in production settings, the technical choices that look small on paper (how you format outputs, how you batch inference, whether you add a classifier head) are the ones that end up dominating cost, reliability, and developer time. This post collects those lessons into a single, pragmatic narrative: what works, why it works, and the tradeoffs to expect.

## Start with a clear input/output contract: chat vs completion formats

When designing a fine-tuning dataset, the first decision is the format of the examples. Broadly, there are two families: chat/completion format (a sequence of turns with roles) and single-turn completion formats (single prompt → output)

**Chat/completion style** is ideal for conversational products or when context across turns matters. It models role structure explicitly but adds engineering overhead

**Single-turn completion formats** are compact, easier to evaluate, and faster to fine-tune for atomic tasks like classification

**Example:**
Completion:
\`\`\`python
print("Hello, world!")
\`\`\`

Chat:
\`\`\`
System: You are a sentiment classifier.
User: Review: "I loved the battery life but hate the screen glare."
Assistant: Sentiment: Positive
\`\`\`

**Pointers**
- Use chat format for multi-turn interactions, completion format for isolated classification tasks
- Consider hybrid pipelines: classify short inputs with completion examples, then wrap for chat UI
- Maintain small validation sets in both formats to test real-world behavior

## Batched decoding for inference: throughput vs latency

Batching multiple requests improves GPU utilization but may increase latency

Low batch sizes (5–10) often balance throughput and responsiveness on A100 GPUs  
Large batches are suitable for offline bulk scoring  
Consider speculative decoding for many short sequences

**Pointers**
- Benchmark batch sizes (1, 4, 8, 16) and choose based on SLA
- Offline jobs: maximize batch size for GPU efficiency
- Interactive workloads: use smaller batches and short queuing windows

## Structured outputs: reliability versus overhead

Structured outputs (JSON, CSV) reduce post-processing but increase inference complexity

Training the model to emit JSON is simple but error-prone  
Constrained decoding ensures correctness but adds latency  
Pragmatic approach: use tolerant structured outputs with post-validation for most tasks, strict constraints for mission-critical endpoints

**Pointers**
- Use post-validation for experiments
- Use constrained decoding when deterministic output is required
- Measure latency before adopting strict decoding

## Multi-instance outputs (the “many reviews” problem)

Models often skip, reorder, or merge items when generating multiple labels in one shot. Use ordered, natural-language anchors to reduce errors

**Pointers**
- Use repeated anchors like “X classification is: Y”
- Chunk long lists into groups of 5–10
- For single-shot structured mapping, add explicit separators and re-check outputs

## Classification by text generation vs classifier head

**Classifier head:** sample efficient, fast inference, best for stable label sets  
**Text-generation classification:** flexible, adapts to evolving labels, may require canonicalization layer

**Pointers**
- Stable, high-volume labels → classifier head
- Flexible or exploratory tasks → text-generation with canonicalization

## Prompt engineering: invest early and iterate

High-quality prompts reduce fine-tuning needs. Include task description, output format, and few-shot examples. Iterate using probe examples

**Pointers**
- Create baseline prompts with edge cases
- Run 20–50 probe examples
- Fine-tune on working prompt/format and validate on messy data

## End-to-end workflow

1. Problem framing → chat vs completion → validation set
2. Prompt/probe phase → iterate prompts
3. Fine-tune on stabilized prompt/format → re-validation
4. Benchmark batching and latency → select batch strategy
5. Deploy with thin validator → monitor for drift

## Common pitfalls

Optimizing offline metrics only → fails in production  
Over-engineering structure → increases latency/complexity  
Ignoring prompt + fine-tuning synergy → inefficient

**Pointers**
- Validate with production-like decoder and real-world examples
- Avoid mandatory structured outputs unless required
- Automate monitoring for skipped items or malformed outputs

## Closing: balance is the operational win

Fine-tuning LLMs is an engineering tradeoff across prompts, formats, inference, and post-processing. Focus on early prompt design and pragmatic engineering patterns for cost, reliability, and flexibility`,
  date: "2025-08-15",
  readTime: "15 min read",
  featured: true
},
  {
  id: "2",
  slug: "random-number-generators",
  title: "Random Number Generators",
  excerpt: "Random numbers are used in cryptography, simulations, and games. This post explains true randomness, pseudo-randomness, common PRNGs, and how randomness is tested.",
  content: `Random numbers are the invisible engines behind much of our digital world. From cryptography and scientific simulations to video games and lottery draws, we rely on them to be fair, secure, and unpredictable. But what exactly makes a number 'random'? And how do computers, which are inherently deterministic machines, generate them?

In this post, I will break down the two main types of random number generators, explore how they work, and discuss the rigorous tests used to ensure they're truly up to the task.

## What is Randomness?

A sequence of random numbers is **uniformly distributed**, meaning each possible value has an equal chance of appearing. More importantly, the numbers are **independent of each other**. You should never be able to predict the next number in the sequence based on the previous ones. Achieving this combination of uniformity and independence is the goal of any RNG.

They are broadly classified into two categories:

1. True Random Number Generators (TRNGs)
2. Pseudo-Random Number Generators (PRNGs)

## True Random Number Generators

TRNGs derive their randomness from physical phenomena in the real world. They use seed values or take entropy from the environment.

What is Entropy? In this context, entropy is a measure of unpredictability or noise. It's the natural chaos that exists all around us. TRNGs measure this entropy from various sources, such as:
- Thermal noise in electronic circuits
- Radioactive decay of an element
- The timing of photons hitting a sensor
- Atmospheric noise
- Unpredictable oscillations

The generator takes a seed value from these physical entropy sources and converts it into a stream of random bits.

*Why is it True Randomness*?
A TRNG is considered truly random because it is:
- Uniform: It produces 1s and 0s at roughly the same rate.
- Independent: Each bit is unrelated to the ones before or after it.
- Unpredictable: Knowing the entire sequence so far gives you no advantage in predicting the next bit.

## Pseudo-Random Number Generators

PRNGs are the workhorses of software applications. Unlike TRNGs, they do not depend on real-world activities. Instead, they rely on mathematical formulas/algorithms to generate sequences of numbers that merely appear random.

Here’s how they work:
1. Start with a Seed: They begin with an initial value called a seed.
2. Apply a Formula: They apply a deterministic recurrence relation (a formula) to this seed to get the first number.
3. Repeat: They then use that result as the input for the next calculation, and so on.

The entire sequence is determined by the initial seed. If you know the algorithm and the seed, you can reproduce the entire sequence exactly. This is why it's pseudo (false) random.

Why is it Still Useful?
For most purposes, a good PRNG is random enough because it has these properties:
- Uniformity: It produces 1s and 0s at the same rate.
- Scalability & Consistency: It can produce a vast amount of numbers quickly and can replay a sequence if given the same seed (useful for testing).
- Unpredictability (Forward & Backward): If you don't know the seed, it should be computationally infeasible to reverse-engineer it or predict future values, even if you know some of the sequence.

The seed for a PRNG can often be sourced from a TRNG (environmental entropy) to make the starting point truly unpredictable.

## Common PRNG Algorithms

## 1. Linear Congruential Generator
One of the oldest and simplest PRNGs.
- Formula: Xₙ₊₁ = (a * Xₙ + c) mod m
- Where:
  -- Xₙ is the current number in the sequence.
  -- a is the multiplier.
  -- c is the increment.
  -- m is the modulus.
  -- X₀ is the seed.

While simple, LCGs have known weaknesses and are not suitable for secure applications.

## 2. Middle Square Method
Proposed by John von Neumann in the 1940s.
1. Start with a seed (e.g., 1234).
2. Square it: 1234² = 1,522,756.
3. Extract the middle digits (e.g., 2275).
4. Use this as the next value and repeat.

This method is famous but very poor; sequences often collapse to zero or get stuck in a short cycle very quickly.

## 3. Linear Feedback Shift Register
Popular in hardware design due to its efficiency.
- The state is represented as a binary string (e.g., 1011).
- Each step, bits are shifted to the right.
- The new leftmost bit is computed as the XOR of selected 'tap' positions.

Example: For a 4-bit register with taps at positions 4 and 1:
- State: 1 0 1 1
- XOR the leftmost bit (1) and the rightmost bit (1) = 0
- New state: 0 1 0 1

LFSRs are linear and therefore predictable if the state is known, but they form the basis for more complex algorithms.

## How Do We Test for Randomness?

This is a critical question. A sequence might look random to the human eye but hide subtle patterns. That’s why we use formal statistical tests.

1. Frequency Test: The most basic test. 'Are there about as many 0s as 1s?' In a random binary sequence, we expect ~50% of each. This test detects obvious bias.

2. Runs Test: A 'run' is a streak of consecutive identical bits (e.g., 1111 or 00). This test checks if these streaks are of the expected length and frequency. Too many long runs or too few short runs indicates unnatural clustering.

3. Serial Test: This looks at pairs (or blocks) of bits. 'Are pairs like 00, 01, 10, and 11 evenly distributed?' Each should occur about 25% of the time in a fair sequence. It detects patterns at a higher level than single bits.

4. Autocorrelation Test: 'Do numbers at different positions in the sequence look related?' It checks for correlation between the sequence and a lagged copy of itself. If a value influences a value later in the sequence, it fails this test.

5. Chi-Square Test: A powerful statistical test that answers: 'Does the overall distribution of values match what we expect?' For example, if you simulate a dice roll 600 times, you'd expect each number to appear ~100 times. A significant deviation from this expectation is caught by the Chi-Square test.

6. Spectral Test: This test uses a Fourier transform to convert the sequence into the frequency domain. A truly random sequence should have a flat spectrum. Any strong spikes suggest hidden cycles or periodicity.

7. Poker Test: This test groups numbers into 'hands' (e.g., 5-bit sequences). It checks if these higher-order patterns (like pairs, three-of-a-kind) appear with their expected probabilities, detecting imbalance in complex patterns.

8. Entropy Test: Entropy measures unpredictability or 'surprise.' A perfectly random bit sequence has 1 bit of entropy per bit. If the measured entropy is lower (e.g., 0.6), the generator is leaking information and is predictable.

## Conclusion

The world of random number generation is a fascinating blend of physics and mathematics. TRNGs harvest chaos from the real world for applications where absolute unpredictability is paramount, like cryptography and gambling. PRNGs, on the other hand, use clever algorithms to create efficient, reproducible, and statistically random sequences perfect for simulations, games, and modeling.

The next time you encounter a random number you'll know there's a complex and elegant system working behind the scenes to make it fair and unpredictable.`,
  date: "2025-09-17",
  readTime: "9 min read",
  featured: false
},

];