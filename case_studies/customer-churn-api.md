# Customer Churn Predictor API – Case Study

## Project Overview

The **Customer Churn Predictor API** is my first end-to-end machine learning deployment project, designed to explore how ML can solve a real-world business problem: predicting customer churn. Using the **Telco Customer Churn dataset**, I built, trained, and deployed a churn prediction model wrapped in a **FastAPI microservice** and containerized with **Docker** for portability.

This project was both a learning milestone and a showcase of my ability to take an ML workflow from **data preprocessing to production deployment**.

---

## Problem & Opportunity

Customer churn is a critical metric in industries like telecom, finance, and SaaS. High churn erodes revenue, while predicting at-risk customers enables proactive retention strategies.

I chose this problem because it’s a classic machine learning use case that balances **technical depth** (classification, handling imbalanced data) with **business value** (actionable customer insights).

---

## Dataset & Preparation

* **Dataset:** Telco Customer Churn dataset (Kaggle).
* **Preprocessing steps:**

  * Cleaned missing values.
  * Encoded categorical variables.
  * Scaled numerical features.
* **Feature handling:** Focused on customer demographics, tenure, contracts, and service subscriptions. These align with real-world churn factors.

---

## Modeling Approach

* **Baseline Model:** Logistic Regression, chosen for interpretability and simplicity.
* **Handling imbalance:** Adjusted class weights to prevent bias toward the majority class (non-churn).
* **Evaluation metrics:** Focused on **recall** (catching churners) while monitoring **precision** and **AUC**.
* **Results:** Achieved strong predictive accuracy with clear insight into key churn drivers like **contract type, tenure, and monthly charges**.

---

## Technical Architecture & Implementation

* **Stack:** Python, scikit-learn, FastAPI, Docker.
* **Repository structure:**

  * `/notebooks` for experimentation.
  * `/app` for API service.
  * `/models` for serialized model artifacts.
* **API design:**

  * `POST /predict` endpoint accepts JSON payloads and returns churn probabilities.
  * Includes sample payloads and documentation for ease of use.
* **Deployment:** Packaged with Docker and deployed on GCP for accessibility.

---

## Challenges & Trade-offs

* **Pipeline design:** Iterating preprocessing steps without breaking downstream inference.
* **Model selection:** Balancing interpretability (logistic regression) vs performance (tree-based methods).
* **Deployment:** Ensuring API reliability and portability across environments with Docker.

---

## Outcomes & Learnings

* Successfully built an **end-to-end ML pipeline**, from dataset to deployment.
* Gained hands-on skills in **model evaluation, API integration, and containerization**.
* Learned the trade-offs between **model simplicity** and **predictive power**.
* Proudest achievement: Demonstrating that I could not only train models but also **ship them as production-ready services**.

---

## Future Directions

* Experiment with **XGBoost or Random Forests** to boost predictive performance.
* Add **MLOps practices**: CI/CD pipelines, monitoring, and version control for models.
* Extend to other datasets or industries (e.g., fintech, subscription services).
* Build a simple dashboard to visualize churn risk and business insights.

---

## Reflection

This project was my first true **AI/ML engineering experience**. It gave me confidence in connecting data science workflows with software engineering practices — a bridge I’ve always been passionate about.

If I were mentoring someone on their first ML project, my advice would be: *don’t just stop at training a model — wrap it in an API, deploy it, and make it usable. That’s when ML becomes real.*