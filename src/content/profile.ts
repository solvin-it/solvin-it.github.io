export const profile = {
  name: 'Jose Fernando Gonzales',
  fullName: 'Jose Fernando A. Gonzales',
  role: 'AI Developer',
  location: 'Makati City, Philippines',
  phone: '+63 936 505 5435',
  email: 'josefernando.a.gonzales@gmail.com',
  linkedin: 'https://www.linkedin.com/in/jose-fernando-gonzales',
  github: 'https://github.com/solvin-it',
  portfolio: 'https://solvin-it.github.io/',
  summary: [
    'AI Developer at JPMorganChase Consumer & Community Banking with a decade of experience across FinTech, enterprise systems, and IT delivery. I build AI-powered reporting, data, and automation solutions that connect hands-on engineering with measurable business outcomes.',
    'My work spans Python, SQL, LLM application development, RAG, agentic workflows, ETL pipelines, API integration, and cloud-native systems. I combine production AI development with a solutions engineering background in payment platforms, stakeholder-facing solutioning, and enterprise application delivery.',
  ],
};

export const experiences = [
  {
    role: 'Quant Analytics Analyst (AI Developer)',
    company: 'JPMorganChase',
    context: 'Consumer & Community Banking, Data Analytics and Reporting Team (DART)',
    duration: 'Dec 2025 - Present',
    location: 'Taguig City, Philippines',
    type: 'current',
    description:
      'Pioneering AI-powered reporting and data applications for Consumer & Community Banking, with a focus on agentic ETL, talk-to-data, AI reporting, and data quality workflows.',
    achievements: [
      "Serve as one of the first AI Developers in CCB DART, helping establish the department's adoption of AI-powered reporting applications.",
      'Developed an agentic ETL migration solution that converts Alteryx workflows to AWS Glue, reducing conversion development hours by up to 99%.',
      'Built an agentic reporting prototype that cuts dashboard creation time from weeks to hours.',
      "Contributed to the department's first talk-to-data solution, enabling users to get insights in seconds instead of filing ad hoc requests or searching dashboards.",
      'Developed a proof of concept for agentic data quality assessment across reporting pipelines.',
      'Apply context engineering, prompt engineering, and data engineering principles to improve reliability in AI-driven reporting.',
    ],
    technologies: [
      'Python',
      'SQL',
      'AWS Glue',
      'Alteryx',
      'LangChain',
      'LangGraph',
      'Google ADK',
      'RAG',
      'Prompt Engineering',
      'Context Engineering',
      'Data Engineering',
    ],
  },
  {
    role: 'Technical Solutions Engineer',
    company: 'DigitalPH Asia Corporation',
    context: 'Payborit Payment Aggregator System',
    duration: 'Dec 2024 - Dec 2025',
    location: 'Makati City, Philippines',
    type: 'previous',
    description:
      'Led technical solutioning and continuous enhancement for a FinTech payment aggregator, bridging merchant needs, sales engagements, product ownership, and engineering execution.',
    achievements: [
      'Led enhancements of the Payborit Payment Aggregator System, integrating payment processors and improving merchant onboarding.',
      'Defined tailored technical solutions and delivered client-facing presentations with sales and product teams.',
      'Owned live product stability while contributing to planning, solution design, estimates, proposals, and documentation.',
      'Reviewed engineering output against solution designs and regulatory or business requirements.',
    ],
    technologies: ['Python', 'SQL', 'API Integration', 'Payment Systems', 'Solution Design', 'Product Ownership', 'Jira'],
  },
  {
    role: 'Senior Technical Business Analyst',
    company: 'DigitalPH Asia Corporation',
    context: 'FinTech and enterprise application delivery',
    duration: 'Dec 2020 - Dec 2024',
    location: 'Makati City, Philippines',
    type: 'previous',
    description:
      'Led requirements analysis, technical documentation, system design, test planning, and stakeholder coordination across payment and public-sector systems.',
    achievements: [
      'Led assessment, planning, and execution for 10+ projects across payment aggregation and enterprise systems.',
      'Enhanced Payborit using microservice architecture principles, database design, sprint planning, and QA coordination.',
      'Supported the National Nutrition Information System from planning and analysis through UAT and deployment handover.',
      'Created functional and technical specifications that improved alignment between stakeholders and development teams.',
    ],
    technologies: ['Business Analysis', 'Systems Analysis', 'SQL', 'Database Design', 'Microservices', 'Project Management', 'UAT'],
  },
  {
    role: 'Technical Business Analyst',
    company: 'EightD Corporation',
    context: 'Automated Fare Collection Systems',
    duration: 'Sep 2019 - Dec 2020',
    location: 'Philippines',
    type: 'previous',
    description:
      'Designed solutions and coordinated delivery for fare collection systems, building the automation and multi-stakeholder delivery foundation now applied to AI workflows.',
    achievements: [
      'Led Nepal AFCS implementation analysis, sprint planning, technical specifications, and UAT support.',
      'Recommended automation that reduced manual AFCS configuration task time by 99.98%.',
      'Served as Product Owner and Project Manager for Boracay HOHO AFCS enhancements.',
      'Designed multi-route fare structures, transaction flows, card activity sequences, and user documentation.',
    ],
    technologies: ['AFCS', 'Process Automation', 'System Design', 'Requirements Analysis', 'Jira', 'Project Management'],
  },
  {
    role: 'SAP SD Technology Consultant',
    company: 'DXC Technology',
    context: 'Enterprise SAP delivery',
    duration: 'May 2016 - Sep 2019',
    location: 'Philippines',
    type: 'previous',
    description:
      'Delivered enterprise-scale SAP SD change requests, configurations, testing, and client support across regional projects.',
    achievements: [
      'Implemented and supported 20+ SAP projects and change requests from blueprinting through service management handover.',
      'Configured SD shipping lanes and supported clients during testing and early life support.',
      'Contributed to Asia AOV, Asia SAP Continuous Improvement, OBLB Upgrade EMEA, and QR London to Gattatico initiatives.',
      'Coordinated with transport managers, change teams, application managers, and business process experts.',
    ],
    technologies: ['SAP SD', 'Enterprise Systems', 'Business Process Design', 'Client Support', 'Testing', 'Change Requests'],
  },
  {
    role: 'Salesforce Consultant',
    company: 'Freelance',
    context: 'Project-based consulting',
    duration: '2019',
    location: 'Philippines',
    type: 'previous',
    description:
      'Provided Salesforce development support for client applications in close collaboration with the lead developer.',
    achievements: [
      'Developed Apex classes, Visualforce pages, Aura components, and triggers.',
      'Translated client requirements into application enhancements and automation.',
    ],
    technologies: ['Salesforce', 'Apex', 'Visualforce', 'Aura Components', 'Triggers'],
  },
];

export const skillGroups = [
  {
    category: 'AI Development',
    skills: ['LLM Application Development', 'Agentic AI', 'RAG', 'LangChain', 'LangGraph', 'Google ADK', 'Prompt Engineering', 'Context Engineering'],
  },
  {
    category: 'Data and Engineering',
    skills: ['Python', 'SQL', 'AWS Glue', 'Alteryx', 'ETL Pipelines', 'Data Engineering', 'API Integration', 'Cloud-Native Systems'],
  },
  {
    category: 'Machine Learning',
    skills: ['Scikit-learn', 'TensorFlow', 'ML Pipelines', 'Model Deployment', 'Data Quality Assessment'],
  },
  {
    category: 'Solution Delivery',
    skills: ['Systems Analysis', 'Requirements Gathering', 'Solution Design', 'Business Analysis', 'Process Improvement', 'Project Planning'],
  },
  {
    category: 'Domain Expertise',
    skills: ['FinTech', 'Payment Platforms', 'Enterprise Applications', 'Reporting Automation', 'Talk-to-Data', 'Stakeholder Solutioning'],
  },
];

export const portfolioProjects = [
  {
    title: 'Quest to Solvin (RPG Chatbot)',
    url: 'https://github.com/solvin-it/quest_to_solvin',
    description: 'Python-based RPG-style chatbot with gamified conversation flows and applied NLP/conversational AI techniques.',
    tags: ['Python', 'NLP', 'Conversational AI'],
  },
  {
    title: 'Customer Churn API (Machine Learning Pipeline)',
    url: 'https://github.com/solvin-it/customer-churn-api',
    description: 'Churn prediction API using scikit-learn and a RESTful service to demonstrate ML deployment for business use cases.',
    tags: ['Python', 'Scikit-learn', 'FastAPI'],
  },
  {
    title: 'RAG on Me (Resume Chatbot)',
    url: 'https://github.com/solvin-it/rag-on-me',
    description: 'RAG pipeline using LangChain and vector databases so recruiters can query CV and project details interactively.',
    tags: ['RAG', 'LangChain', 'Vector Databases'],
  },
];

export const achievements = [
  '2026 - Agentic ETL Migration: reduced Alteryx-to-AWS Glue workflow conversion development hours by up to 99%.',
  '2026 - AI-Powered Reporting: built agentic reporting and contributed to talk-to-data capabilities for faster insights.',
  '2026 - Completed Post Graduate Diploma in Artificial Intelligence and Machine Learning through AIM x Emeritus.',
  '2023-2025 - Payborit Continuous Enhancement: integrated payment processors, improved merchant onboarding, and supported sales solutioning.',
  '2019 - AFCS Configuration Process Automation: led automation that reduced configuration task time by 99.98%.',
  '2016-2019 - DXC Technology Projects: contributed to 20+ enterprise SAP projects and business process improvements.',
  '2015-2016 - Academic Excellence: graduated Magna Cum Laude.',
  '2015 - YSDA Hackathon Victory: led a team to international victory.',
  '2014 - DevCon Java Programming Champion.',
];

export const education = [
  {
    degree: 'Post Graduate Diploma in Artificial Intelligence and Machine Learning',
    school: 'Emeritus x Asian Institute of Management',
    duration: 'Mar 2025 - Mar 2026',
    detail: 'Completed; certificate conferred Apr 2026',
  },
  {
    degree: 'Bachelor of Science in Information Technology',
    school: 'University of Asia and the Pacific',
    duration: 'Jun 2012 - Jun 2016',
    detail: 'Magna Cum Laude, GWA 1.29; Merit Scholar',
  },
];

export const trainings = [
  'Udemy (2023): The Complete Python Bootcamp, OpenAI Python API Bootcamp',
  'Udemy (2022): Software Architecture Case Studies, Microservices Architecture Guide',
  'edX (2021): IBM DS0101EN - Introduction to Data Science',
  'Salesforce Trailhead (2019): Apex Developer Trail',
  'DXC Technology (2018): XBOX2 Solution Certification',
  'DXC Technology (2017): ITIL V3 Foundation Training',
  'Hewlett-Packard Enterprise (2016): SAP S4 HANA Training',
];
