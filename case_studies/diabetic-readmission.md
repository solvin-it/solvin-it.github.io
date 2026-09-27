# Readmission prediction

An end-to-end ML capstone that makes the tradeoffs visible: model evaluation, threshold tuning, explainability, and fairness.

Status: Completed academic capstone · 2026
Access: Public repository
Technologies: Python, Scikit-learn, SHAP, FastAPI, Streamlit

## The context

Predicting 30-day readmission is an imbalanced classification problem. A single accuracy score can hide missed cases, excessive false positives, and uneven performance across groups.

## The approach

- Completed the ML lifecycle from preprocessing and feature selection through model comparison, threshold tuning, and reproducible artifact export.
- Compared baseline, tuned, and PCA-based candidates. The repository reports a Random Forest with PCA as its selected model.
- Paired the exported pipeline with a FastAPI interface and Streamlit application, while documenting explainability and fairness analysis.

Conceptual flow: Encounter data → Evaluate & calibrate → Explain the result

## A key decision

Report precision alongside recall. At the selected threshold, the repository reports 71.64% recall and 15.00% precision; higher recall comes with substantial false positives.

## The result

A completed capstone with a reproducible inference pipeline. Reported test AUC-ROC is 0.6446, below the original 0.75 target. The reported racial recall gap also exceeded its target.

## Scope and limitations

Academic research on historical data, not a clinically validated decision tool. Metrics are repository-reported results, not an independent evaluation; external validation would be necessary before practical use.

[Public source](https://github.com/solvin-it/diabetic-readmission-prediction)

[Portfolio case study](https://solvin-it.github.io/projects/diabetic-readmission/)
