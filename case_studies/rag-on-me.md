# RAG on Me

A document-grounded résumé assistant exploring retrieval, conversational memory, and answers constrained to portfolio evidence.

Status: Earlier experiment · demo retired · 2025
Access: Public repository
Technologies: Python, LangGraph, FastAPI, PostgreSQL, pgvector

## The context

A résumé is a compressed view of someone’s work. I wanted recruiters to ask natural questions and receive answers grounded in the actual documents.

## The approach

- Ingested résumé and project documents into a vector store and connected retrieval to a conversational graph.
- Used persistent conversation state to keep follow-up questions in context.
- Exposed the assistant through a FastAPI service and the original portfolio chat interface.

Conceptual flow: CV & project notes → Retrieve context → Grounded response

## A key decision

Constrain the assistant to documented experience. A persuasive answer is not useful if it invents skills or achievements.

## The result

An early hands-on RAG project connecting ingestion, retrieval, generation, and persistent memory.

## Scope and limitations

The original hosted chatbot is retired. The source remains available as project history; a replacement assistant is not live on this portfolio.

[Public source](https://github.com/solvin-it/rag-on-me)

[Portfolio case study](https://solvin-it.github.io/projects/rag-on-me/)
