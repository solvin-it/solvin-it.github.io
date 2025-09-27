# Quest to Solvin – Case Study

## Project Overview

*Quest to Solvin* is an AI-driven interactive storytelling prototype inspired by VRMMORPG-themed manhwas such as *Overgeared* and *Legendary Moonlight Sculptor*. These stories often feature advanced AIs capable of creating immersive worlds filled with lifelike NPCs. This project set out to explore how close we are to that vision today.

The goal was simple yet ambitious: create a random NPC with personality traits, generate a portrait, and let users chat with them in a way that feels dynamic and story-driven.

---

## Problem & Opportunity

Interactive storytelling has seen experiments with AI, but the boundaries of what’s possible remain underexplored. Most narrative games are pre-scripted, limiting spontaneity. With the rise of LLMs, the opportunity lies in letting AI dynamically generate unique characters, conversations, and quests in real time.

*Quest to Solvin* takes a nod from fantasy novels and games that shaped my imagination and attempts to push AI into that space.

---

## Scope & Features

* **Must-haves:** NPC generation with unique personality, portrait, and chat functionality.
* **Nice-to-haves:** Quest generation (implemented in early form).
* **Dropped features:** Town exploration and map movement—too complex for Streamlit in this version.

NPC creation, quest objectives, lore, and user interaction were tied together through OpenAI APIs. The system begins with NPC generation, produces a pixel-art portrait, and equips the NPC with a quest aligned with their personality. Lore was loaded from markdown files for easy extensibility.

---

## Technical Approach

**Stack & Tools:**

* Streamlit for the interface
* OpenAI GPT models for dialogue and quest logic
* DALL·E for pixel-art portrait generation
* Markdown for lore files
* Docker for portability
* GCP for hosting

**Architecture & Design:**

* Code structured using OOP (`npc.py`, `quest.py`, `world.py`).
* NPC personalities injected into prompts for consistency.
* Chat context tracked via message state lists.
* Lore loaded dynamically into the system to ground NPCs.

---

## Challenges & Trade-offs

* **Evolving APIs:** OpenAI model deprecations required constant updates.
* **Cost:** Image generation via DALL·E was expensive; mitigated by requiring users to provide their own `OPENAI_API_KEY`.
* **Trade-offs:** As a prototype, consistency was less important than showcasing freedom and creativity.
* **Validation:** NPCs and quests worked best when users role-played properly; nonsense input led to nonsense output.

---

## UX & Design

The flow was designed to mimic an *isekai* entry: players awaken in an unknown world and encounter an NPC who gives them direction.

* **Interface:** Streamlit-based chat UI with portraits and quests.
* **Priority:** User input freedom over scripted storylines.
* **Limitation:** No formal usability testing; the design relied on my own playtesting.

---

## Outcomes & Learnings

* **What worked:** NPC generation and chat were surprisingly fun and engaging.
* **What fell short:** NPCs sometimes felt pushy in quest-giving, and portraits were costly to generate.
* **Key lessons:**

  * Prompt engineering is powerful but requires iteration.
  * API integration with LLMs can create engaging prototypes quickly.
  * Streamlit is great for MVPs but limiting for complex UIs.
* **Proudest achievement:** Building my first complete AI-driven storytelling prototype from scratch.

---

## Future Directions

* Expand locations and branching narratives.
* Implement progression systems for longer sessions.
* Integrate AI agents to make NPCs more autonomous and lifelike.
* Explore persistence features (accounts, saved states).

---

## Reflection

This project sharpened my skills in **prompt design, LLM integration, UI prototyping, and system deployment**. The hardest part was UI organization and balancing scope with technical limits.

If I were to advise others: *start small, make it work, then refine*. Even a simple prototype can reveal deep insights into how AI can change storytelling.