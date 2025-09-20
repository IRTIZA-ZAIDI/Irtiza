export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  role: string;
  technologies: string[];
  featured: boolean;
  imageUrl?: string;
  year: string;
  status: "completed" | "ongoing" | "archived";
  // New tags:
  dataScienceLevel: (
    | "Machine Learning"
    | "Classical"
    | "Generative AI"
    | "Reinforcement Learning"
  )[] | null;
  domain: string[];
  githubUrl?: string; 
}

export const projects: Project[] = [
  {
    id: "1",
    slug: "text-analytics",
    title: "Text Analytics [Sentiment Analysis]",
    description:
      "Sentiment Analysis on IMDB: lexicons + TF-IDF + classical ML baselines, upgraded features with Word2Vec/GloVe embeddings, and fine-tuned DistilBERT/RoBERTa/GPT-2 to reach a peak 94% accuracy. Delivered a hybrid pipeline and comparative analysis of methods.",
    role: "Course Project",
    technologies: [
      "scikit-learn",
      "NLTK",
      "spaCy",
      "TF-IDF",
      "Word2Vec",
      "GloVe",
      "DistilBERT",
      "RoBERTa",
      "GPT-2",
      "PyTorch",
      "HuggingFace Transformers"
    ],
    featured: true,
    year: "2024",
    status: "completed",
    dataScienceLevel: ["Machine Learning"],
    domain: ["Natural Language Processing"],
    githubUrl : "https://github.com/IRTIZA-ZAIDI/SentimentAnalysis"
  },
  {
    id: "2",
    slug: "rag-chatbot",
    title: "RAG Chatbot",
    description:
      "Explored different approaches to build a reliable RAG pipeline: parsed PDFs, JSON, and tables with LlamaParse + custom cleaning, then engineered a LangChain ensemble retriever (BM25 + FAISS) to combine lexical and semantic search. Validated performance on benchmark queries and tuned chunking/ranking for stable, accurate answers.",
    role: "Course Project",
    technologies: [
      "LangChain",
      "LlamaParse",
      "BM25",
      "FAISS",
      "Vector Databases",
      "PyTorch",
      "HuggingFace Transformers",
      "Document Parsing Pipelines"
    ],
    featured: true,
    year: "2024",
    status: "completed",
    dataScienceLevel: ["Generative AI"],
    domain: ["Natural Language Processing"],
    githubUrl : "https://github.com/IRTIZA-ZAIDI/IBA-university-chatbot"
  },
  {
    id: "3",
    slug: "kaggle-competitions",
    title: "Kaggle Competitions",
    description:
      "Competed on real-world datasets using classical and ensemble models (XGBoost, Random Forests, Decision Trees, Logistic Regression, Naive Bayes) and neural networks. Iterated preprocessing pipelines and feature engineering to improve scores and leaderboard placement.",
    role: "Kaggle Competition",
    technologies: [
      "scikit-learn",
      "XGBoost",
      "LightGBM",
      "TensorFlow",
      "PyTorch",
      "Feature Engineering",
      "Cross-Validation",
      "Ensemble Methods"
    ],
    featured: false,
    year: "2024",
    status: "completed",
    dataScienceLevel: ["Machine Learning"],
    domain: ["Machine Learning"],
    githubUrl : "https://github.com/IRTIZA-ZAIDI/Patient-Survival-Classification"
  },
  {
    id: "4",
    slug: "10pearls-data-science",
    title: "Data Science Project [10Pearls]",
    description:
      "As a data science intern, built a Random Forest classifier (96% accuracy) for customer churn prediction using feature engineering and hyperparameter tuning. Also created an Ollama + SQL-model tooling pipeline on PostgreSQL to enable NL queries, summaries, and insights over data.",
    role: "Internship Project",
    technologies: [
      "RandomForest",
      "scikit-learn",
      "Ollama",
      "SQL",
      "SHAP",
      "Feature Engineering",
      "Model Interpretability",
      "Functional tooling"
    ],
    featured: false,
    year: "2024",
    status: "completed",
    dataScienceLevel: ["Classical"],
    domain: ["Machine Learning", "Software Engineering"],
  },
  {
    id: "5",
    slug: "easy21-rl",
    title: "Easy21",
    description:
      "Worked through the Easy21 assignment step by step: building the environment, implementing Monte Carlo Control, exploring TD Learning with Sarsa(λ), and experimenting with Linear Function Approximation. Documented results with value-function plots, MSE vs. λ graphs, and learning curves, and wrapped up with a discussion of insights.",
    role: "Side Project",
    technologies: [
      "Monte Carlo Control",
      "Temporal Difference Learning",
      "Function Approximation",
    ],
    featured: false,
    year: "2024",
    status: "completed",
    dataScienceLevel: ["Classical"],
    domain: ["Reinforcement Learning"],
     githubUrl : "https://github.com/IRTIZA-ZAIDI/Easy21-RL"
  },
  {
    id: "6",
    slug: "face-detection-and-filters",
    title: "Face Detection & Filters",
    description:
      "Implemented classic and modern CV techniques: Viola-Jones face detection, pose/keypoint estimation, semantic segmentation, YOLO object detection, and a playful sunglasses filter using face landmarks and keypoint estimation.",
    role: "Course Project",
    technologies: [
      "OpenCV",
      "YOLO",
      "Semantic Segmentation",
      "Pose Estimation"
    ],
    featured: false,
    year: "2024",
    status: "completed",
    dataScienceLevel: ["Machine Learning"],
    domain: ["Computer Vision"],
     githubUrl : "https://github.com/IRTIZA-ZAIDI/Face-Detection"
  },
  {
    id: "7",
    slug: "shape-detector-tool",
    title: "Classical Shape Detector Tool",
    description:
      "Built a tool using binary image processing to detect, localize, and identify shapes. Supports natural-language queries like 'how many small green rectangles are there and where are they?', returning counts and bounding locations.",
    role: "Course Project",
    technologies: [
      "OpenCV",
      "NumPy",
      "Binary Image Processing",
      "Shape Detection Algorithms"
    ],
    featured: false,
    year: "2024",
    status: "completed",
    dataScienceLevel: ["Classical"],
    domain: ["Computer Vision"],
    githubUrl : "https://github.com/IRTIZA-ZAIDI/Shape-Detector-Tool"
  },
  {
    id: "8",
    slug: "template-matching",
    title: "Template Matching [Coin Detection]",
    description:
      "Used OpenCV template matching to find coins in a Super Mario scene: load images, `cv.matchTemplate`, normalize scores, apply non-max suppression and thresholding, and visualize robust matches across scales.",
    role: "Course Project",
    technologies: [
      "OpenCV",
      "NumPy",
      "Template Matching",
      "Non-Max Suppression",
      "Image Processing Pipelines"
    ],
    featured: false,
    year: "2024",
    status: "completed",
    dataScienceLevel: ["Classical"],
    domain: ["Computer Vision"],
    githubUrl : "https://github.com/IRTIZA-ZAIDI/Template-Matching-OpenCV"
  },
  {
    id: "9",
    slug: "nn-classification-analysis",
    title: "Neural Network Classification Analysis",
    description:
      "Implemented and compared classification algorithms with rigorous evaluation: 10x10-fold cross-validation, Accuracy, F-measure, ROC curves, and statistical tests to compare model performance and stability.",
    role: "Course Project",
    technologies: [
      "Keras",
      "TensorFlow",
      "scikit-learn",
      "Cross-Validation",
      "ROC Analysis"
    ],
    featured: false,
    year: "2024",
    status: "completed",
    dataScienceLevel: ["Machine Learning"],
    domain: ["Machine Learning"],
    githubUrl : "https://github.com/IRTIZA-ZAIDI/Neural-Network-Classification-Analysis"
  },
  {
    id: "10",
    slug: "voc2008-binary-classification",
    title: "PASCAL VOC2008 [Binary Classification]",
    description:
      "Conducted binary classification experiments (Horse and Bus) on PASCAL VOC 2008 using transfer learning across 8 CNN and ViT models, class-specific augmentation, and ensembling techniques to benchmark performance.",
    role: "Course Project",
    technologies: [
      "PyTorch",
      "Transfer Learning",
      "Convolutional Neural Networks",
      "Vision Transformers",
      "Data Augmentation",
      "Ensembles"
    ],
    featured: false,
    year: "2024",
    status: "completed",
    dataScienceLevel: ["Machine Learning"],
    domain: ["Computer Vision"],
    githubUrl : "https://github.com/IRTIZA-ZAIDI/voc2008-binary-classification"
  },
  {
    id: "11",
    slug: "model-parallelism",
    title: "Parallel & Distributed Computing for Model Parallelism",
    description:
      "Concise exploration and experiments with model-parallel libraries and distributed techniques: evaluated and understood trade-offs and scalability.",
    role: "Course Project",
    technologies: [
      "PyTorch Distributed",
      "Model Parallelism",
    ],
    featured: false,
    year: "2024",
    status: "completed",
    dataScienceLevel: ["Machine Learning"],
    domain: ["Machine Learning", "Software Engineering"],
    githubUrl : "https://github.com/IRTIZA-ZAIDI/Parallel-and-Distributed-Computing-for-Model-Parallelism"
  },
  {
    id: "12",
    slug: "optimizers-exploration",
    title: "Optimizers",
    description:
      "Explored key optimization algorithms (SGD with Momentum, AdaGrad, RMSProp, Adam), documented strengths/weaknesses, and tested them on a real dataset to compare convergence behaviour and final metrics.",
    role: "Side Project",
    technologies: [
      "PyTorch",
      "SGD + Momentum",
      "AdaGrad",
      "RMSProp",
      "Adam",
      "Optimizer Benchmarks",
      "Convergence Analysis"
    ],
    featured: false,
    year: "2024",
    status: "completed",
    dataScienceLevel: ["Machine Learning"],
    domain: ["Machine Learning"],
    githubUrl : "https://github.com/IRTIZA-ZAIDI/Optimizers"
  },
  {
    id: "13",
    slug: "sentence-similarity-comparisons",
    title: "Sentence Similarity [Comparison]",
    description:
      "Compared 5 NLP techniques on the STS Benchmark (English test set): all-MiniLM, Word2Vec, BERT, spaCy, and Gemini API. Used cosine similarity and evaluated via MSE on STSB test data to quantify differences and trade-offs.",
    role: "Internship Assignment",
    technologies: [
      "SentenceTransformers",
      "Word2Vec",
      "BERT",
      "spaCy",
      "Gemini API",
      "Cosine Similarity",
      "Semantic Textual Similarity"
    ],
    featured: false,
    year: "2024",
    status: "completed",
    dataScienceLevel: ["Machine Learning"],
    domain: ["Natural Language Processing"],
    githubUrl : "https://github.com/IRTIZA-ZAIDI/Sentence-similarity-comparisons"
  },
  {
    id: "14",
    slug: "mspaint-replica-on-java",
    title: "MSPaint Replica [Java]",
    description:
      "Built an MS Paint replica from scratch for an OOP class: custom UI, drawing tools, layers, and all underlying data structures implemented in vanilla Java (Swing/AWT). A full-from-scratch exercise in design and engineering.",
    role: "Course Project",
    technologies: [
      "Java",
      "Swing",
      "Event Driven Programming",
      "Custom Data Structures",
      "Object Oriented Design"
    ],
    featured: false,
    year: "2023",
    status: "completed",
    dataScienceLevel: null,
    domain: ["Software Engineering"],
    githubUrl : "https://github.com/IRTIZA-ZAIDI/mspaint-replica-on-JAVA"
  },
   {
    id: "15",
    slug: "design-patterns",
    title: "Design Patterns Implementation",
    description:
      "Implemented and practiced software design patterns including Abstract Factory, Adapter, Builder, Decorator, Factory Method, Mediator, Observer, and Singleton. Focused on understanding their intent, trade-offs, and practical use cases through examples.",
    role: "Course Project",
    technologies: [
      "Abstract Factory",
      "Adapter",
      "Builder",
      "Decorator",
      "Factory Method",
      "Mediator",
      "Observer",
      "Singleton",
      "Java",
      "Object Oriented Design"
    ],
    featured: false,
    year: "2023",
    status: "completed",
    dataScienceLevel: null,
    domain: ["Software Engineering"],
    githubUrl:"https://github.com/IRTIZA-ZAIDI/DesignPatterns"
  },
];
