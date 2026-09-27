export interface Project {
  slug: string;
  title: string;
  category: "AI systems" | "Product engineering" | "Applied ML";
  year: string;
  status: string;
  access: "Private project" | "Public repository";
  description: string;
  headline: string;
  stack: string[];
  flow: string[];
  problem: string;
  approach: string[];
  decision: string;
  outcome: string;
  boundary: string;
  repoUrl?: string;
}

// Public editorial summaries only. Private source, customer data, infrastructure,
// credentials, and repository URLs must never be added to this file.
export const projects: Project[] = [
  {
    slug: "graph-rag",
    title: "Solvin GraphRAG",
    category: "AI systems",
    year: "2026",
    status: "Working MVP",
    access: "Private project",
    description:
      "Company knowledge, connected. A document platform built around cited answers, version history, and human review.",
    headline: "An answer is only useful if you can trace it.",
    stack: ["React", "TypeScript", "FastAPI", "PostgreSQL", "pgvector"],
    flow: ["Source documents", "Review & connect", "Cited answers"],
    problem:
      "A company’s useful knowledge rarely lives in one document. Finding an answer can mean following relationships across manuals, policies, and revisions—and knowing which version to trust.",
    approach: [
      "Built a document-to-knowledge workflow with versioned sources, asynchronous ingestion, and a review step before extracted knowledge is published.",
      "Combined keyword, semantic, and graph-assisted retrieval so relationships can enrich an answer without replacing direct source evidence.",
      "Designed separate experiences for readers, knowledge managers, and administrators, with citations, answer traces, and usage oversight.",
    ],
    decision:
      "Keep the human review gate explicit. Uploading a document should not silently turn every extracted statement into approved company knowledge.",
    outcome:
      "A working MVP that brings retrieval, knowledge review, and administration into one product. The system supports configurable domains rather than one fixed document taxonomy.",
    boundary:
      "The documented demo uses deterministic providers by default. Real model adapters are present, but this case study does not claim a validated production deployment.",
  },
  {
    slug: "marker",
    title: "Marker",
    category: "Product engineering",
    year: "2026",
    status: "Product in development",
    access: "Private project",
    description:
      "Club operations with a clear record. Member tabs, charge confirmation, and staff workflows built around an accountable ledger.",
    headline: "A clearer record of every club visit.",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Passkeys", "PWA"],
    flow: ["Staff service", "Member confirmation", "Attributed ledger"],
    problem:
      "Club transactions cross many touchpoints: a restaurant, a pro shop, a booking, a member’s tab. When identification and recordkeeping are fragmented, even a simple charge becomes hard to explain.",
    approach: [
      "Created member, staff, and administration experiences around a shared charge ledger, with configurable modules for different club operations.",
      "Made member confirmation part of the transaction flow, with passkeys and alternative verification methods for practical service situations.",
      "Kept original charges intact: corrections are recorded as new entries, preserving the story of what happened instead of overwriting it.",
    ],
    decision:
      "Make accountability a property of the transaction model, not an extra report. Each charge keeps its attribution and verification context.",
    outcome:
      "A modular product connecting service delivery, member visibility, disputes, and reporting around one ledger.",
    boundary:
      "An actively developed private product. Payment-provider integration remains future work; no commercial rollout or adoption figures are claimed here.",
  },
  {
    slug: "civi",
    title: "Civi",
    category: "AI systems",
    year: "2026",
    status: "Working personal application",
    access: "Private project",
    description:
      "An assistant for everyday life. Shared conversation context across Telegram and a dashboard, with household and workout tools.",
    headline: "One conversation. More useful everyday actions.",
    stack: ["Python", "FastAPI", "React", "PostgreSQL", "Telegram", "Claude"],
    flow: ["Chat or dashboard", "Shared conversation", "Household & workouts"],
    problem:
      "Everyday tracking becomes another chore when it requires switching tools and repeating context. A useful assistant needs to connect conversation to the things a person actually wants to record or manage.",
    approach: [
      "Connected Telegram and authenticated in-app chat to the same durable conversation core.",
      "Built direct dashboard controls alongside conversational tools, so logging a workout does not always require a chat.",
      "Added reusable workouts, scheduling, strength and cardio logging, history, progress, and portable export alongside household management.",
    ],
    decision:
      "Let the task choose the interface. Chat is helpful for context and coordination; structured controls are often faster for repeated logging.",
    outcome:
      "A working personal application with household and workout workflows available through complementary interfaces.",
    boundary:
      "Finance and habit tracking are part of the roadmap, not presented here as completed features. Personal records and conversation content remain private.",
  },
  {
    slug: "oprenta",
    title: "Oprenta",
    category: "Product engineering",
    year: "2026",
    status: "Product in development",
    access: "Private project",
    description:
      "From the first quote to the field visit. Connected web and mobile workflows for service businesses, including offline field work.",
    headline: "Keep the job moving, even without a connection.",
    stack: ["Next.js", "FastAPI", "React Native", "PostgreSQL", "Celery"],
    flow: ["Quote & schedule", "Field execution", "Invoice & follow-up"],
    problem:
      "A service job often travels through spreadsheets, messaging threads, scheduling tools, and payment records. The people doing the work need a connected view, especially when they are away from a reliable connection.",
    approach: [
      "Built a multi-tenant product spanning customer management, quotes, bookings, dispatch, work orders, and invoicing.",
      "Designed separate web workflows for owners and dispatchers and a mobile field application for technicians.",
      "Used a local cache and queued changes for offline field actions, with synchronization when connectivity returns.",
    ],
    decision:
      "Design the field workflow around intermittent connectivity from the start. A technician should be able to capture the work at the point it happens.",
    outcome:
      "A connected service-business product with a pest-control-first workflow and a broader operational core.",
    boundary:
      "This is a development-stage product summary. It describes the documented build without claiming customer adoption, revenue, or production reliability.",
  },
  {
    slug: "diabetic-readmission",
    title: "Readmission prediction",
    category: "Applied ML",
    year: "2026",
    status: "Completed academic capstone",
    access: "Public repository",
    description:
      "An end-to-end ML capstone that makes the tradeoffs visible: model evaluation, threshold tuning, explainability, and fairness.",
    headline: "A model result needs its tradeoffs beside it.",
    stack: ["Python", "Scikit-learn", "SHAP", "FastAPI", "Streamlit"],
    flow: ["Encounter data", "Evaluate & calibrate", "Explain the result"],
    problem:
      "Predicting 30-day readmission is an imbalanced classification problem. A single accuracy score can hide missed cases, excessive false positives, and uneven performance across groups.",
    approach: [
      "Completed the ML lifecycle from preprocessing and feature selection through model comparison, threshold tuning, and reproducible artifact export.",
      "Compared baseline, tuned, and PCA-based candidates. The repository reports a Random Forest with PCA as its selected model.",
      "Paired the exported pipeline with a FastAPI interface and Streamlit application, while documenting explainability and fairness analysis.",
    ],
    decision:
      "Report precision alongside recall. At the selected threshold, the repository reports 71.64% recall and 15.00% precision; higher recall comes with substantial false positives.",
    outcome:
      "A completed capstone with a reproducible inference pipeline. Reported test AUC-ROC is 0.6446, below the original 0.75 target. The reported racial recall gap also exceeded its target.",
    boundary:
      "Academic research on historical data, not a clinically validated decision tool. Metrics are repository-reported results, not an independent evaluation; external validation would be necessary before practical use.",
    repoUrl: "https://github.com/solvin-it/diabetic-readmission-prediction",
  },
  {
    slug: "maritime-learning",
    title: "Maritime learning",
    category: "Product engineering",
    year: "2026",
    status: "Offline-capable demo",
    access: "Private project",
    description:
      "Turning a dense operations manual into a guided learning experience, with source references and offline access.",
    headline: "Teach the judgment. Keep the source in reach.",
    stack: ["JavaScript", "HTML & CSS", "Service workers", "PWA"],
    flow: ["Source manual", "Guided lessons", "Offline reference"],
    problem:
      "A procedure manual is authoritative, but reading it linearly is not always the easiest way to learn. Learners need useful explanations without losing the exact requirements or their source.",
    approach: [
      "Created a static learning application with a guided lesson path, practical situations, and a collapsible source library.",
      "Connected teaching material to source clauses and printed pages so explanations remain traceable.",
      "Added offline caching for the app and reference material, including support for reading the manual without a connection.",
    ],
    decision:
      "Separate the teaching layer from the governing source. The lesson explains the idea; the manual remains authoritative.",
    outcome:
      "An offline-capable demonstration of how structured learning and source reference can work together in a lightweight application.",
    boundary:
      "Demo material is pending organizational approval. This public summary excludes the organization’s identity, manual text, and source files, and does not present the lessons as approved training.",
  },
  {
    slug: "pos-system",
    title: "Gentleman POS",
    category: "Product engineering",
    year: "2025–26",
    status: "Business application",
    access: "Private project",
    description:
      "Practical software for a carwash and restaurant: orders, payments, reports, and receipt printing in a modular Python application.",
    headline: "Software that meets the work at the counter.",
    stack: ["Python", "Flask", "SQLModel", "Docker", "ESC/POS"],
    flow: ["Order & service", "Payment & receipt", "Operational reports"],
    problem:
      "Carwash and restaurant operations share some workflows but have different service details. The system needed to support both without turning every change into a rewrite of the entire application.",
    approach: [
      "Organized orders, payments, menus, carwash operations, reporting, and printing into separate business modules.",
      "Connected the web workflow to receipt printing while keeping the local printer client separate from the server runtime.",
      "Added configuration validation and containerized deployment to make environment differences easier to manage.",
    ],
    decision:
      "Keep hardware concerns at the edge. Receipt printers have local drivers and physical failure modes that should not become server dependencies.",
    outcome:
      "A practical business application and an early foundation for my modular Python web development work.",
    boundary:
      "Source and operational data are private. This case study describes the application design; it does not claim a measured reduction in transaction time.",
  },
  {
    slug: "rag-on-me",
    title: "RAG on Me",
    category: "AI systems",
    year: "2025",
    status: "Earlier experiment · demo retired",
    access: "Public repository",
    description:
      "A document-grounded résumé assistant exploring retrieval, conversational memory, and answers constrained to portfolio evidence.",
    headline: "A résumé you could ask questions.",
    stack: ["Python", "LangGraph", "FastAPI", "PostgreSQL", "pgvector"],
    flow: ["CV & project notes", "Retrieve context", "Grounded response"],
    problem:
      "A résumé is a compressed view of someone’s work. I wanted recruiters to ask natural questions and receive answers grounded in the actual documents.",
    approach: [
      "Ingested résumé and project documents into a vector store and connected retrieval to a conversational graph.",
      "Used persistent conversation state to keep follow-up questions in context.",
      "Exposed the assistant through a FastAPI service and the original portfolio chat interface.",
    ],
    decision:
      "Constrain the assistant to documented experience. A persuasive answer is not useful if it invents skills or achievements.",
    outcome:
      "An early hands-on RAG project connecting ingestion, retrieval, generation, and persistent memory.",
    boundary:
      "The original hosted chatbot is retired. The source remains available as project history; a replacement assistant is not live on this portfolio.",
    repoUrl: "https://github.com/solvin-it/rag-on-me",
  },
  {
    slug: "quest-to-solvin",
    title: "Quest to Solvin",
    category: "AI systems",
    year: "2025",
    status: "Earlier prototype",
    access: "Public repository",
    description:
      "A fantasy RPG conversation experiment with generated characters, portraits, and quest-driven storytelling.",
    headline: "What happens when the player can say anything?",
    stack: ["Python", "Streamlit", "OpenAI API", "Docker"],
    flow: ["Player action", "Character context", "Evolving story"],
    problem:
      "Scripted dialogue gives a game control, but limits player freedom. This prototype explored what a language model could add to open-ended character interactions.",
    approach: [
      "Built a chat-based fantasy experience with character context, generated portraits, and quest mechanics.",
      "Iterated prompts and conversation handling to give characters a more consistent role in the story.",
      "Used Streamlit for rapid interface development and containerization for a reproducible runtime.",
    ],
    decision:
      "Prioritize a small playable loop. A convincing interaction teaches more about the design than a large world without coherent conversations.",
    outcome:
      "A complete storytelling prototype and a practical exploration of prompt design, context, and interface constraints.",
    boundary:
      "Personal playtesting rather than a formal usability study. Portrait generation cost and overly eager quest-giving were known limitations. No live demo is advertised.",
    repoUrl: "https://github.com/solvin-it/quest_to_solvin",
  },
  {
    slug: "customer-churn",
    title: "Customer churn API",
    category: "Applied ML",
    year: "2025",
    status: "Earlier learning project",
    access: "Public repository",
    description:
      "My first end-to-end ML API: connecting data preparation, model training, and reproducible inference behind a service.",
    headline: "Beyond the notebook, into an API.",
    stack: ["Python", "Scikit-learn", "FastAPI", "Docker"],
    flow: ["Customer features", "Saved ML pipeline", "Prediction API"],
    problem:
      "A trained model is not yet something a product can use. The learning goal was to connect experimentation to an interface that can accept data and return predictions consistently.",
    approach: [
      "Worked through customer-data preparation, model training, and evaluation as an end-to-end ML exercise.",
      "Preserved preprocessing and model artifacts for reuse during inference.",
      "Wrapped predictions in a FastAPI service and containerized the application.",
    ],
    decision:
      "Treat preprocessing as part of the model contract. Training and inference need the same transformation rules.",
    outcome:
      "A first complete ML service that connected model development to application engineering.",
    boundary:
      "A learning project, not evidence of a production retention system. Production monitoring and model-drift detection were outside its scope. No live demo is advertised.",
    repoUrl: "https://github.com/solvin-it/customer-churn-api",
  },
];

export const featuredProjects = projects.slice(0, 4);
export function getProject(slug: string): Project {
  const project = projects.find((item) => item.slug === slug);
  if (!project) throw new Error(`Unknown project: ${slug}`);
  return project;
}
