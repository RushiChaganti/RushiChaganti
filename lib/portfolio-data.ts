import { PortfolioData } from './types';

export const portfolioData: PortfolioData = {
  work: [
    {
      id: 1,
      company: "Gumbel AI",
      role: "NLP Engineer",
      period: "03/25 - 04/25",
      description: [
        "RAG System Evaluation & Model Development: Tested and evaluated multiple RAG systems, developing models using RAFT, Light RAG, and Graph RAG to enhance retrieval-augmented generation performance."
      ],
      type: "Internship"
    },
    {
      id: 2,
      company: "Say Apps",
      role: "R&D Intern",
      period: "10/24 - 02/25",
      description: [
        "ChatGPT-Powered Telegram Bot: Developed an automated YouTube transcript summarization tool using Selenium, cutting down manual workload.",
        "Web Scraping & Content Generation: Utilized Selenium and custom agents to extract and process data from platforms like X and LinkedIn, significantly enhancing content creation.",
        "Multi-Modal User Interaction: Implemented voice-to-post functionality with Whisper and a dual-LLM “Truth Terminal” for dynamic user interactions.",
        "Data Management for RAG: Optimized data retrieval using a Pinecone database to ensure rapid access and improved performance"
      ],
      type: "Internship"
    },
    {
      id: 3,
      company: "Referso",
      role: "R&D Intern",
      period: "10/24 - 02/25",
      description: [
        "Automated Workday Careers: Developed Selenium-based automation to optimize recruitment workflows, reducing manual processing time by significant margins.",
        "Enhanced Workable Platform: Designed and implemented robust Playwright scripts to improve candidate management efficiency and process reliability.",
        "Browser Agent-Driven Website Automation: Engineered intelligent automation agents to streamline website operations and maximize efficiency."
      ],
      type: "Freelance"
    },
    {
      id: 4,
      company: "Wictronix",
      role: "AI / ML Engineer Intern",
      period: "07/23 - 08/23",
      description: [
        "Vehicle Image Annotation & YOLOv8 Integration: Led the annotation of 10,000+ images across diverse vehicle types to enhance object detection accuracy.",
        "Optimized Annotation Workflow: Developed a YOLOv8-compatible format that streamlined the annotation process and boosted efficiency.",
        "Improved Object Detection: Delivered high-quality, precisely labeled datasets, significantly increasing model recognition performance."
      ],
      type: "Internship"
    }
  ],
  builds: {
    GenAI: [
      {
        id: 1,
        title: "DocuTalk",
        description:
          "Streamlit app for querying docs (PDF/DOCX/PPTX) via natural language. Runs entirely local with Ollama—no API keys or cloud dependencies.",
        tech: ["Python", "Streamlit", "LangChain", "Ollama"],
        githubLink: "https://github.com/RushiChaganti/DocuTalk",
      },
      {
        id: 2,
        title: "docqa-ai",
        description:
          "Python toolkit for extracting answers from long-form documents. Built to handle chunking and retrieval without relying on external APIs.",
        tech: ["Python", "LangChain", "QA Systems"],
        githubLink: "https://github.com/RushiChaganti/docqa-ai",
      },
      {
        id: 3,
        title: "Multi_modal_Doc_QA_system",
        description:
          "Document QA system that accepts text and image inputs. Handles the tricky part of unifying embeddings across modalities for consistent retrieval.",
        tech: ["Python", "Multi-modal AI", "LLMs"],
        githubLink: "https://github.com/RushiChaganti/Multi_modal_Doc_QA_system",
      },
      {
        id: 14,
        title: "LightRAG",
        description:
          "Contributed data export functionality to LightRAG. PR merged—enables users to persist and migrate their RAG graphs.",
        tech: ["Python", "RAG", "LLMs"],
        githubLink: "https://github.com/HKUDS/LightRAG",
        oss: true,
      },
      {
        id: 16,
        title: "Medical-Advisor-Chatbot",
        description: "NLP chatbot for health-related guidance. Focused on intent classification to route user queries to appropriate response templates safely.",
        tech: ["Python", "NLP", "Chatbots"],
        githubLink: "https://github.com/RushiChaganti/Medical-Advisor-Chatbot",
      }
    ],
    ML: [
      {
        id: 4,
        title: "KetsuCheck",
        description:
          "ML password strength classifier achieving 90%+ accuracy. Trained on real-world leaked password patterns; Dockerized for drop-in deployment.",
        tech: ["Python", "Scikit-learn", "Docker"],
        githubLink: "https://github.com/RushiChaganti/KetsuCheck",
      },
      {
        id: 5,
        title: "FaceRecognition",
        description:
          "Face recognition pipeline using OpenCV and dlib. Handles the annoying alignment step before encoding to improve match accuracy.",
        tech: ["Python", "OpenCV", "Machine Learning"],
        githubLink: "https://github.com/RushiChaganti/FaceRecognition",
      },
    ],

    Automation: [
      {
        id: 6,
        title: "Auto_Jobs_Applier_AIHawk",
        description:
          "Main repository using the resume builder library. I contribute as a community helper and integrated the Zip code functionality from the library.",
        tech: ["Python", "AI agent", "Automation"],
        githubLink: "https://github.com/RushiChaganti/Auto_Jobs_Applier_AIHawk",
        oss: true,
      },
      {
        id: 7,
        title: "lib_resume_builder_AIHawk",
        description:
          "Contributed Zip code functionality and fixed critical bugs that caused issues for multiple users.",
        tech: ["Python", "Resume Builder"],
        githubLink: "https://github.com/RushiChaganti/lib_resume_builder_AIHawk",
        oss: true,
      },
    ],
    Web: [
      {
        id: 8,
        title: "BIOGROFE",
        description:
          "Platform helping biotech students find job application details for 100+ companies. Built collaboratively; I owned the frontend and data aggregation.",
        tech: ["React", "Node.js"],
        githubLink: "https://github.com/RushiChaganti",
        link: "https://rushichaganti.github.io/Biogrofe/",
      },
      {
        id: 9,
        title: "Metro Portfolio",
        description:
          "Developer portfolio mimicking Windows Metro UI. Implemented keyboard navigation and tile-based layout for authentic feel.",
        tech: ["TypeScript", "Next.js", "Tailwind CSS"],
        githubLink: "https://github.com/RushiChaganti/Metro-Portfolio",
        link: "https://rushichaganti.github.io/Metro-Portfolio/",
      },
      {
        id: 13,
        title: "NeuralSim",
        description:
          "Interactive neural network simulator with real-time weight visualization. Users can adjust hyperparameters live and watch propagation animate.",
        tech: ["TypeScript", "Next.js", "Tailwind CSS"],
        githubLink: "https://github.com/RushiChaganti/NeuralSim",
        link: "https://rushichaganti.github.io/NeuralSim//",
      },
      {
        id: 17,
        title: "Release-Check",
        description: "Tool for validating tech stack compatibility and experience levels. Used internally by Araise to standardize project requirements.",
        tech: ["TypeScript", "Next.js", "Tailwind CSS"],
        githubLink: "https://github.com/Araise25/Release-Check",
        link: "https://araise25.github.io/Release-Check/",
      },
      {
        id: 18,
        title: "araise_Web",
        description: "Official Araise org website. I designed the component library and ensured consistent styling across all sub-project pages.",
        tech: ["TypeScript", "Next.js", "Tailwind CSS"],
        githubLink: "https://github.com/Araise25/araise_Web",
        link: "https://araise25.github.io/araise_Web/",
      }
    ],
    Python: [
      {
        id: 10,
        title: "IntelliSort",
        description:
          "Jupyter utility for smart dataset sorting and filtering. Infers column types automatically to apply appropriate sort logic.",
        tech: ["Python", "Data Utils"],
        githubLink: "https://github.com/RushiChaganti/IntelliSort",
      },
      {
        id: 11,
        title: "pygrep",
        description:
          "Python grep alternative for pattern searching across files. Added recursive directory walking and colored output for match context.",
        tech: ["Python", "CLI Tool"],
        githubLink: "https://github.com/RushiChaganti/pygrep",
      },
      {
        id: 12,
        title: "HangmanCli",
        description:
          "Terminal Hangman game in Python. Built as a learning project—handles input validation and ANSI escape codes for cross-platform display.",
        tech: ["Python", "CLI Game"],
        githubLink: "https://github.com/RushiChaganti/HangmanCli",
      },
    ],
    Bash: [
      {
        id: 19,
        title: "WTF-Tools",
        description: "Shell scripts for common dev tasks (git shortcuts, env setup, cleanup). Designed to be sourced, not executed—minimal startup overhead.",
        tech: ["Shell", "Bash"],
        githubLink: "https://github.com/Araise25/WTF-Tools",
      },
      {
        id: 20,
        title: "psutils",
        description: "PowerShell equivalent of Unix 'cat'. Built to bring familiar file concatenation behavior to Windows without extra dependencies.",
        tech: ["PowerShell", "CLI Tools"],
        githubLink: "https://github.com/RushiChaganti/psutils",
      },
      {
        id: 21,
        title: "Araise_PM",
        description: "Cross-platform package manager designed to simplify the installation and management of software packages, applications, and development tools.",
        tech: ["Shell", "Bash"],
        githubLink: "https://github.com/Araise25/Araise_PM",
      },
      {
        id: 24,
        title: "Release-Check-DB",
        description: "Community-maintained JSON database of tech stack metadata. Powers Release-Check's validation logic; accepts PRs for new tools.",
        tech: ["Metadata", "JSON"],
        githubLink: "https://github.com/Araise25/Release-Check-DB",
      }
    ],

    Extensions: [
      {
        id: 14,
        title: "Utility_Kit",
        description:
          "Firefox extension that silently clears the last minute of browsing history. Solves the 'I shouldn't have opened that at work' problem.",
        tech: ["HTML", "Javascript"],
        githubLink: "https://github.com/RushiChaganti/Utility_Kit/",
        firefoxLink: "https://addons.mozilla.org/en-US/firefox/addon/utility-kit/",
      },
      {
        id: 22,
        title: "YSB",
        description: "Firefox extension that blocks YouTube Shorts from your feed. Uses CSS injection to hide Shorts elements without breaking page layout.",
        tech: ["JavaScript", "Web Extensions"],
        githubLink: "https://github.com/Araise25/YSB",
        firefoxLink: "https://addons.mozilla.org/en-US/firefox/addon/ysb/",
      },
      {
        id: 23,
        title: "Seezo",
        description: "A privacy-first browser extension that leverages local AI models to analyze web interfaces for security vulnerabilities and sensitive asset exposure.",
        tech: ["Python", "JavaScript"],
        githubLink: "https://github.com/RushiChaganti/seezo-extension",
      }
    ],

    Security: [
      {
        id: 15,
        title: "system-prompts-and-models-of-ai-tools",
        description:
          "Contributed the Augment Code system prompt to a community collection of extracted AI tool prompts. Part of ongoing AI security research.",
        tech: ["AI Prompt Injection", "AI Red Teaming"],
        githubLink: "https://github.com/x1xhlol/system-prompts-and-models-of-ai-tools",
        oss: true,
      },

    ],
  },
  logs: [
    {
      date: "2025-08-24",
      title: "Building NeuralSim",
      content:
        "Created a modern website, Neural Networks through interactive, real-time simulations",
    },
    {
      date: "2025-08-17",
      title: "Building Biogrofe",
      content:
        "Created a modern  platform aiding students with job application details across 100+ companies.",
    },
    {
      date: "2025-08-20",
      title: "Building Personal Portfolio",
      content:
        "Created a modern portfolio website with Next.js, featuring dynamic logs, GitHub integration, and chess game tracking. Implemented responsive design with Tailwind CSS.",
    },
    {
      date: "2025-08-15",
      title: "Exploring AI Agent Development",
      content:
        "Deep diving into autonomous agent architectures and multi-modal AI systems. Working on improving reasoning capabilities and tool usage patterns.",
    },
    {
      date: "2025-02-15",
      title: "Automating Recruitment Workflows",
      content:
        "Built Selenium + Playwright agents to optimize Workday Careers and Workable platform pipelines, reducing manual effort drastically.",
    },
    {
      date: "2025-01-10",
      title: "Experimenting with RAG Pipelines",
      content:
        "Implemented Pinecone-backed data retrieval for multi-modal projects, ensuring faster semantic search performance.",
    },
  ],
  links: {
    cv: "https://drive.google.com/file/d/1VGysYKJ6cl8pm54SaTj6uOWDMMvy4tlH/view?usp=sharing",
    email: "mailto:rushichaganti@gmail.com",
    github: "https://github.com/RushiChaganti",
    linkedin: "https://www.linkedin.com/in/rushichaganti/",
    twitter: "https://x.com/Rushichaganti",
  },
};
