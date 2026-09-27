# Civi

An assistant for everyday life. Shared conversation context across Telegram and a dashboard, with household and workout tools.

Status: Working personal application · 2026
Access: Private project
Technologies: Python, FastAPI, React, PostgreSQL, Telegram, Claude

## The context

Everyday tracking becomes another chore when it requires switching tools and repeating context. A useful assistant needs to connect conversation to the things a person actually wants to record or manage.

## The approach

- Connected Telegram and authenticated in-app chat to the same durable conversation core.
- Built direct dashboard controls alongside conversational tools, so logging a workout does not always require a chat.
- Added reusable workouts, scheduling, strength and cardio logging, history, progress, and portable export alongside household management.

Conceptual flow: Chat or dashboard → Shared conversation → Household & workouts

## A key decision

Let the task choose the interface. Chat is helpful for context and coordination; structured controls are often faster for repeated logging.

## The result

A working personal application with household and workout workflows available through complementary interfaces.

## Scope and limitations

Finance and habit tracking are part of the roadmap, not presented here as completed features. Personal records and conversation content remain private.

[Portfolio case study](https://solvin-it.github.io/projects/civi/)
