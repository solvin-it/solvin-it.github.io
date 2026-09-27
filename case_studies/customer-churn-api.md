# Customer churn API

My first end-to-end ML API: connecting data preparation, model training, and reproducible inference behind a service.

Status: Earlier learning project · 2025
Access: Public repository
Technologies: Python, Scikit-learn, FastAPI, Docker

## The context

A trained model is not yet something a product can use. The learning goal was to connect experimentation to an interface that can accept data and return predictions consistently.

## The approach

- Worked through customer-data preparation, model training, and evaluation as an end-to-end ML exercise.
- Preserved preprocessing and model artifacts for reuse during inference.
- Wrapped predictions in a FastAPI service and containerized the application.

Conceptual flow: Customer features → Saved ML pipeline → Prediction API

## A key decision

Treat preprocessing as part of the model contract. Training and inference need the same transformation rules.

## The result

A first complete ML service that connected model development to application engineering.

## Scope and limitations

A learning project, not evidence of a production retention system. Production monitoring and model-drift detection were outside its scope. No live demo is advertised.

[Public source](https://github.com/solvin-it/customer-churn-api)

[Portfolio case study](https://solvin-it.github.io/projects/customer-churn/)
