export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  role: string;
  technologies: string[];
  featured: boolean;
  imageUrl?: string;
  content: string;
  year: string;
  status: "completed" | "ongoing" | "archived";
}

export const projects: Project[] = [
  {
    id: "1",
    slug: "recommendation-engine",
    title: "Personalized Content Recommendation Engine",
    description: "Built a scalable recommendation system serving 2M+ users, improving content engagement by 35% through deep learning and collaborative filtering techniques.",
    role: "Lead Data Scientist",
    technologies: ["Python", "TensorFlow", "Apache Spark", "Redis", "PostgreSQL", "Kubernetes"],
    featured: true,
    year: "2023",
    status: "completed",
    content: `# Personalized Content Recommendation Engine

## Overview

Designed and implemented a recommendation system for a content platform with over 2 million active users. The system needed to provide real-time, personalized content suggestions while handling high traffic loads and diverse user preferences.

## Challenge

The platform faced several challenges:
- Low user engagement with existing content discovery
- Cold start problem for new users and content
- Need for real-time recommendations at scale
- Diverse content types requiring different recommendation strategies

## Solution

### Architecture

Built a hybrid recommendation system combining multiple approaches:

**Collaborative Filtering**
- Matrix factorization using TensorFlow for implicit feedback
- Deep neural networks for learning user and item embeddings
- Handles the majority of recommendations for active users

**Content-Based Filtering**  
- NLP pipeline for content feature extraction
- Similarity matching based on user interaction history
- Provides recommendations for new content items

**Knowledge-Based Filtering**
- Rule-based recommendations for cold start users
- Demographic and contextual filtering
- Fallback system ensuring all users receive recommendations

### Technical Implementation

**Data Pipeline**
- Real-time data ingestion using Apache Kafka
- Batch processing with Apache Spark for model training
- Feature engineering pipeline processing 10GB+ daily

**Model Training**
- PyTorch models for deep collaborative filtering
- Automated retraining pipeline triggered by data drift detection
- A/B testing framework for model evaluation

**Serving Infrastructure**
- Redis cluster for low-latency recommendation serving
- Kubernetes deployment with auto-scaling
- Sub-100ms p95 latency for recommendation requests

## Results

### Business Impact
- **35% increase** in content engagement
- **25% improvement** in user session duration  
- **40% boost** in content discovery for long-tail items
- **15% reduction** in churn rate

### Technical Achievements
- Serving 50,000+ requests per second at peak
- 99.9% uptime over 12 months
- Reduced infrastructure costs by 30% through optimization

## Key Learnings

### Data Quality Matters
- Spent 40% of project time on data cleaning and validation
- Implemented automated data quality checks
- Created feedback loops for continuous data improvement

### Start Simple, Iterate Fast
- Began with basic collaborative filtering
- Gradually added complexity based on A/B test results
- Maintained simple baselines for comparison

### Monitor Everything
- Built comprehensive monitoring for model performance
- Tracked business metrics alongside technical metrics
- Implemented automated alerting for anomalies

## Technologies Used

- **Machine Learning**: TensorFlow, PyTorch, scikit-learn
- **Data Processing**: Apache Spark, Apache Kafka, Pandas
- **Infrastructure**: Kubernetes, Redis, PostgreSQL
- **Monitoring**: Prometheus, Grafana, MLflow
- **Languages**: Python, SQL, Scala

## Future Improvements

- Incorporate reinforcement learning for dynamic optimization
- Add multi-armed bandit for exploration/exploitation
- Implement federated learning for privacy-preserving recommendations
- Expand to cross-platform recommendation capabilities`,
  },
  {
    id: "2", 
    slug: "fraud-detection-system",
    title: "Real-time Fraud Detection System",
    description: "Developed an ML-powered fraud detection system that reduced false positives by 60% while maintaining 99.5% fraud detection accuracy using ensemble methods and real-time scoring.",
    role: "Senior ML Engineer",
    technologies: ["Python", "XGBoost", "Apache Kafka", "Elasticsearch", "Docker", "AWS"],
    featured: true,
    year: "2023",
    status: "completed",
    content: `# Real-time Fraud Detection System

## Project Overview

Led the development of a machine learning system to detect fraudulent transactions in real-time for a fintech platform processing $100M+ in monthly transactions. The system needed to balance fraud detection accuracy with user experience, minimizing false positives that could frustrate legitimate customers.

## Business Challenge

The existing rule-based system suffered from:
- High false positive rate (8-12%)
- Manual review bottleneck
- Inability to adapt to new fraud patterns
- Poor performance on mobile transactions

## Technical Approach

### Feature Engineering

**Transaction Features**
- Amount, frequency, and timing patterns
- Merchant category and location analysis
- Device fingerprinting and behavioral signals
- Network analysis for connected accounts

**Real-time Features**
- Velocity calculations (transactions per hour/day)
- Geographic inconsistencies
- Spending pattern deviations
- Account age and transaction history

### Model Architecture

**Ensemble Approach**
- XGBoost for structured transaction data
- Isolation Forest for anomaly detection
- LSTM networks for sequence modeling
- Weighted voting for final predictions

**Real-time Scoring Pipeline**
- Apache Kafka for event streaming
- Feature store with Redis for low-latency lookup
- Model serving with 50ms SLA
- Automated model updates every 24 hours

## Results

### Performance Improvements
- **60% reduction** in false positive rate (from 10% to 4%)
- **99.5% fraud detection** accuracy maintained
- **45ms average** prediction latency
- **$2.1M annual savings** from reduced manual reviews

### Operational Benefits
- 24/7 automated fraud detection
- Real-time model performance monitoring
- Automated retraining and deployment
- Comprehensive audit trails for compliance

## Key Learnings

1. **Domain Expertise is Crucial**: Collaborated closely with fraud analysts to understand attack patterns
2. **Speed vs. Accuracy Tradeoffs**: Found optimal balance through extensive experimentation
3. **Interpretability Matters**: Built explanation features for manual review cases
4. **Continuous Learning**: Fraudsters adapt quickly, requiring frequent model updates

## Future Enhancements

- Graph neural networks for relationship modeling
- Federated learning across partner institutions
- Advanced NLP for transaction description analysis
- Integration with external threat intelligence feeds`,
  },
  {
    id: "3",
    slug: "nlp-sentiment-platform",
    title: "Multi-Language Sentiment Analysis Platform",
    description: "Created a sentiment analysis platform supporting 12 languages with 92% accuracy, processing 500K+ social media posts daily for brand monitoring and market research.",
    role: "NLP Engineer",
    technologies: ["Python", "transformers", "FastAPI", "MongoDB", "React", "Docker"],
    featured: false,
    year: "2022",
    status: "completed",
    content: `# Multi-Language Sentiment Analysis Platform

## Project Overview

Developed a comprehensive sentiment analysis platform for a social media monitoring company. The system processes social media posts, news articles, and customer reviews across 12 languages to provide real-time brand sentiment insights.

## Technical Implementation

### Model Development
- Fine-tuned multilingual BERT models for each language
- Custom preprocessing pipeline for social media text
- Ensemble methods combining multiple model predictions
- Active learning for continuous model improvement

### Platform Architecture
- FastAPI backend for high-performance serving
- React frontend for data visualization
- MongoDB for storing processed results
- Docker containerization for easy deployment

### Data Pipeline
- Real-time ingestion from social media APIs
- Text preprocessing and language detection
- Batch processing for historical analysis
- Export capabilities for business intelligence tools

## Results
- 92% average accuracy across all languages
- Processing 500K+ posts daily
- Sub-200ms API response times
- Deployed for 15+ enterprise customers

## Technologies
- **NLP**: transformers, spaCy, NLTK
- **Backend**: FastAPI, Celery, Redis
- **Frontend**: React, Chart.js, Material-UI
- **Database**: MongoDB, Elasticsearch
- **Infrastructure**: Docker, AWS ECS`,
  },
];