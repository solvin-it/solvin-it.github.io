# Solvin GraphRAG

Company knowledge, connected. A document platform built around cited answers, version history, and human review.

Status: Working MVP · 2026
Access: Private project
Technologies: React, TypeScript, FastAPI, PostgreSQL, pgvector

## The context

A company’s useful knowledge rarely lives in one document. Finding an answer can mean following relationships across manuals, policies, and revisions—and knowing which version to trust.

## The approach

- Built a document-to-knowledge workflow with versioned sources, asynchronous ingestion, and a review step before extracted knowledge is published.
- Combined keyword, semantic, and graph-assisted retrieval so relationships can enrich an answer without replacing direct source evidence.
- Designed separate experiences for readers, knowledge managers, and administrators, with citations, answer traces, and usage oversight.

Conceptual flow: Source documents → Review & connect → Cited answers

## A key decision

Keep the human review gate explicit. Uploading a document should not silently turn every extracted statement into approved company knowledge.

## The result

A working MVP that brings retrieval, knowledge review, and administration into one product. The system supports configurable domains rather than one fixed document taxonomy.

## Scope and limitations

The documented demo uses deterministic providers by default. Real model adapters are present, but this case study does not claim a validated production deployment.

[Portfolio case study](https://solvin-it.github.io/projects/graph-rag/)
