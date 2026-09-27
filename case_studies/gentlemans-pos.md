# Gentleman POS

Practical software for a carwash and restaurant: orders, payments, reports, and receipt printing in a modular Python application.

Status: Business application · 2025–26
Access: Private project
Technologies: Python, Flask, SQLModel, Docker, ESC/POS

## The context

Carwash and restaurant operations share some workflows but have different service details. The system needed to support both without turning every change into a rewrite of the entire application.

## The approach

- Organized orders, payments, menus, carwash operations, reporting, and printing into separate business modules.
- Connected the web workflow to receipt printing while keeping the local printer client separate from the server runtime.
- Added configuration validation and containerized deployment to make environment differences easier to manage.

Conceptual flow: Order & service → Payment & receipt → Operational reports

## A key decision

Keep hardware concerns at the edge. Receipt printers have local drivers and physical failure modes that should not become server dependencies.

## The result

A practical business application and an early foundation for my modular Python web development work.

## Scope and limitations

Source and operational data are private. This case study describes the application design; it does not claim a measured reduction in transaction time.

[Portfolio case study](https://solvin-it.github.io/projects/pos-system/)
