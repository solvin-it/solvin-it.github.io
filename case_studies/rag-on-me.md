# RAG-on-Me – Case Study

## Project Overview

**RAG-on-Me** is a minimal Retrieval-Augmented Generation (RAG) system I built to demonstrate the core moving parts of a modern AI pipeline — without hiding behind heavy frameworks. The project answers questions about my **experience, projects, and skills**, grounded strictly in my documents (CV, case studies, READMEs).

It serves two purposes:

1. A **learning exercise** to deeply understand RAG mechanics.
2. A **portfolio showcase** that recruiters can query directly, turning my background into an interactive experience.

---

## Problem & Opportunity

RAG has become a standard design for grounding LLMs with external knowledge. Yet many examples are over-engineered or tied to a single library. I wanted to create something **compact, transparent, and reusable** that could serve as both a personal assistant and a code reference for others exploring RAG.

The opportunity: a system that not only **demonstrates technical skill** but also **functions as an interactive resume**.

---

## Scope & Features

* **Markdown ingestion:** load structured documents like `cv.md` or case studies into a pgvector store.
* **Threaded chat:** each `thread_id` maintains conversation state across multiple turns.
* **Postgres-backed checkpoints:** chat memory is persistent, enabling reliable context recall.
* **Minimal graph design:** a clear retrieve → generate flow using **LangGraph**.
* **APIs included:**

  * `POST /initialize` – ingest documents
  * `POST /chat` – query with conversation memory
  * `GET /graph/state` – inspect graph state

---

## Technical Architecture

* **Stack:** FastAPI, LangGraph, Postgres + pgvector, OpenAI API.
* **Flow:** Client → FastAPI → LangGraph → Vector Store + LLM → Postgres (checkpoints).
* **Modules:**

  * `main.py` – API lifecycle + graph compile.
  * `graph_runtime.py` – defines the retrieve → generate flow.
  * `nodes.py` – retrieval & generation logic.
  * `adapters.py` – singletons for LLM, embeddings, vector store.
  * `ingest.py` – utilities to index markdown docs.
* **Deployment:** Runs locally with Docker (Postgres/pgvector). Can scale to cloud environments.

---

## Challenges & Trade-offs

* **Scope control:** kept it under ~1K lines to ensure readability, at the cost of advanced features (e.g., reranking, hybrid search).
* **State management:** designing checkpoints to reliably track multi-turn conversations required careful persistence logic.
* **Generality vs personal use:** balancing a system tailored to my CV with code flexible enough for others to adapt.

---

## Outcomes & Learnings

* Built a **clean RAG service** from scratch, gaining hands-on clarity of ingestion, retrieval, generation, and memory management.
* Learned how to integrate **LangGraph pipelines** with FastAPI for production-ready APIs.
* Validated the system by successfully querying my portfolio documents through conversation.
* Proudest achievement: turning my **resume into an interactive chatbot** that demonstrates RAG in a recruiter-friendly way.

---

## Future Directions

* Add a **frontend chatbot widget** for integration into my portfolio website.
* Experiment with **hybrid search (BM25 + vector)** for better grounding.
* Introduce **guardrails** to handle hallucinations or off-topic queries.
* Explore **multi-document ingestion** (case studies, blog posts, academic notes).

---

## Reflection

RAG-on-Me taught me how to go beyond toy demos and build a real, production-style pipeline with persistence, modularity, and API design. It is also a personal branding tool: instead of reading my CV, recruiters can **chat with it**.

My advice to others: *strip down RAG to its essentials first. Understand the flow from request → retrieval → generation → memory. Once you’ve nailed that, scaling features becomes easier.