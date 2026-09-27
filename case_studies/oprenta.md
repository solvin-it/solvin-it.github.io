# Oprenta

From the first quote to the field visit. Connected web and mobile workflows for service businesses, including offline field work.

Status: Product in development · 2026
Access: Private project
Technologies: Next.js, FastAPI, React Native, PostgreSQL, Celery

## The context

A service job often travels through spreadsheets, messaging threads, scheduling tools, and payment records. The people doing the work need a connected view, especially when they are away from a reliable connection.

## The approach

- Built a multi-tenant product spanning customer management, quotes, bookings, dispatch, work orders, and invoicing.
- Designed separate web workflows for owners and dispatchers and a mobile field application for technicians.
- Used a local cache and queued changes for offline field actions, with synchronization when connectivity returns.

Conceptual flow: Quote & schedule → Field execution → Invoice & follow-up

## A key decision

Design the field workflow around intermittent connectivity from the start. A technician should be able to capture the work at the point it happens.

## The result

A connected service-business product with a pest-control-first workflow and a broader operational core.

## Scope and limitations

This is a development-stage product summary. It describes the documented build without claiming customer adoption, revenue, or production reliability.

[Portfolio case study](https://solvin-it.github.io/projects/oprenta/)
