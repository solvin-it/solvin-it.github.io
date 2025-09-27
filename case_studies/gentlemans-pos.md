# Gentleman’s POS – Case Study

## Project Overview

**Gentleman’s POS** is a modular Python web application I built as a Point of Sale (POS) system for **Gentleman’s Garage/Carwash (later G-Restobar)**. It was one of the first large Python web apps I developed and served both as a **learning project** and a **real business tool**.

The system manages multiple domains — carwash, menu, order, payments, and reporting — through a clean, maintainable structure. It also integrates with receipt printers, making it a practical system for small business operations.

---

## Problem & Opportunity

The carwash and restaurant business required a unified POS that could:

* Handle both **carwash services** and **food orders**.
* Support **discounts, service charges, and VAT** calculations.
* Generate receipts with thermal printers.
* Provide structured reports for daily operations.

Commercial POS solutions were either too expensive or too rigid. This project became an opportunity to create a **custom, modular system** tailored to business needs while giving me hands-on experience in **web app development, modular architecture, and hardware integration**.

---

## Scope & Features

* **Modular architecture:** Each business domain implemented as a module (`carwash`, `menu`, `order`, `payment`, `report`, etc.).
* **RESTful APIs:** For all major operations.
* **Database design:** Managed via **raw SQL migration scripts** (no ORM migrations).
* **Frontend:** Static assets and HTML templates organized by feature.
* **Deployment:** Fully Dockerized for easy development and deployment.
* **Printer integration:** Client-side ESC/POS printer utility with dry-run mode.
* **Reports:** Server-rendered dashboards for orders and sales.

---

## Technical Architecture

* **Stack:** Python, Flask (with blueprints), SQLModel/SQLAlchemy, Docker.
* **Structure:**

  * `app/modules/` – carwash, menu, order, payment, pos, report, table, user.
  * `app/core/` – configuration and security.
  * `app/db/` – session management.
  * `scripts/alter_database/` – SQL migration scripts.
  * `app/scripts/printer/` – ESC/POS printer utilities.
* **Configuration:** Strict environment-variable based config validated with **pydantic**, preventing misconfigured deployments.
* **Testing:** Automated test suite via `pytest`, using in-memory SQLite.

---

## Challenges & Trade-offs

* **Schema management:** No ORM migrations — every change required raw SQL scripts. This gave full control but slowed iteration.
* **Printer integration:** Handling cross-platform USB printer support (Windows/Linux/Mac) required external dependencies (`python-escpos`, `pyusb`) and driver setup.
* **Deployment:** Early Docker images lacked production optimizations (e.g., gunicorn).

---

## Outcomes & Learnings

* Delivered a working **POS system** for real-world use at Gentleman’s Garage/Carwash.
* Learned the importance of **clean modular design** for multi-domain business apps.
* Gained practical skills in:

  * Designing **RESTful APIs**.
  * Managing SQL migrations manually.
  * Building **Dockerized environments**.
  * Integrating hardware (ESC/POS printers).
* Proudest achievement: creating a production-ready Python web app that went beyond a prototype and supported a live business.

---

## Future Directions

* Add a `/health` endpoint and automated smoke tests for better monitoring.
* Package with a production-ready server (e.g., gunicorn).
* Build a modern frontend (React/Flutter) to replace server-rendered templates.
* Extend reporting with dashboards and analytics.
* Migrate to structured ORM migrations (Alembic).

---

## Reflection

Gentleman’s POS was my **foundation project** in Python web development. It showed me how to take an idea from scratch to a running system that solves real business problems.

If I were to advise others: *don’t be afraid to overbuild for learning*. Even if the first version isn’t perfect, the experience you gain from real-world challenges (like USB printer integration) makes you a stronger developer.