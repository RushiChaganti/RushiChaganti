import { PortfolioData } from './types';

// OSS links open the upstream repo's PR list filtered to my PRs, so visitors see only my contributions
const myPRs = (repo: string, merged = true) =>
  `https://github.com/${repo}/pulls?q=is%3Apr${merged ? "+is%3Amerged" : ""}+author%3ARushiChaganti`;

export const portfolioData: PortfolioData = {
  work: [
    {
      id: 5,
      company: "11FPS",
      role: "AI Engineer - Content Creation & Automation",
      period: "Apr 2026 - Present",
      description: [
        "Episode Localization App: Sole developer of a desktop app that turns a regional-language episode into an English one with a new cast and locations: AI face and location swaps that keep the original motion, line-by-line dub fitting, and a price shown before every paid call. Electron + Supabase, 275 commits.",
        "AI Storyboard Studio: Paste a screenplay, get a scene list, a world bible (locations, lighting, palette), locked character references, rendered frames, and lip-synced video clips. Next.js, FastAPI, Supabase, fal.ai, LTX.",
        "bebop, AI Film Pipeline: Idea or script to finished short film (plan, frames, clips, cut) with human approval at every paid stage, a prompt quality gate before spending, and FCPXML + SRT export.",
        "11fps-kit: Shared TypeScript/Python SDK wrapping every AI and infra provider the company uses (Claude, Qwen, Higgsfield, Magnific, Seedance and more) with live cost estimates.",
        "Price 11: Compares what one AI image or video costs across providers in USD and INR. Cloudflare Workers, prices auto-refreshed every 3 days.",
        "Company Website: Designed and built 11fps.com: films, series, team pages, and video streaming from Cloudflare R2.",
        "Internal Tooling: A team workspace app, a peer-review app, and browser automation for bulk image and video generation.",
      ],
      type: "Full-time",
      link: "https://www.11fps.com/",
      logo: "/logos/11fps.svg",
    },
    {
      id: 1,
      company: "Gumbel AI",
      role: "NLP Engineer",
      period: "Mar 2025 - Apr 2025",
      description: [
        "RAG System Evaluation & Model Development: Tested and evaluated multiple RAG systems, developing models using RAFT, Light RAG, and Graph RAG to enhance retrieval-augmented generation performance."
      ],
      type: "Internship"
    },
    {
      id: 2,
      company: "Say Apps",
      logo: "/logos/sayapps.svg",
      role: "R&D Intern",
      period: "Oct 2024 - Feb 2025",
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
      logo: "/logos/referso.svg",
      role: "R&D Intern",
      period: "Oct 2024 - Feb 2025",
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
      logo: "/logos/wictronix.png",
      role: "AI / ML Engineer Intern",
      period: "Jul 2023 - Aug 2023",
      description: [
        "Vehicle Image Annotation & YOLOv8 Integration: Led the annotation of 10,000+ images across diverse vehicle types to enhance object detection accuracy.",
        "Optimized Annotation Workflow: Developed a YOLOv8-compatible format that streamlined the annotation process and boosted efficiency.",
        "Improved Object Detection: Delivered high-quality, precisely labeled datasets, significantly increasing model recognition performance."
      ],
      type: "Internship"
    }
  ],
  builds: {
    lastUpdated: "November 2026",
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
        archived: true,
        description:
          "Python toolkit for extracting answers from long-form documents. Built to handle chunking and retrieval without relying on external APIs.",
        tech: ["Python", "LangChain", "QA Systems"],
        githubLink: "https://github.com/RushiChaganti/docqa-ai",
      },
      {
        id: 3,
        title: "Multi_modal_Doc_QA_system",
        archived: true,
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
        githubLink: myPRs("HKUDS/LightRAG"),
        oss: true,
      },
      {
        id: 16,
        title: "Medical-Advisor-Chatbot",
        archived: true,
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
        archived: true,
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
          "AI job application agent. Merged zip code support for addresses (issue #407) and wrote the setup docs and README updates. Community helper.",
        tech: ["Python", "AI agent", "Automation"],
        githubLink: myPRs("feder-cr/Jobs_Applier_AI_Agent"),
        oss: true,
      },
      {
        id: 7,
        title: "lib_resume_builder_AIHawk",
        description:
          "Contributed Zip code functionality and fixed critical bugs that caused issues for multiple users.",
        tech: ["Python", "Resume Builder"],
        githubLink: myPRs("oss-invisible/selenium"),
        oss: true,
      },
    ],
    Web: [
      {
        id: 31,
        title: "11fps.com",
        featured: true,
        image: "/shots/11fps-v2.webp",
        description:
          "Website for an AI-native film studio: films, series, team pages and video streaming from Cloudflare R2. Designed and built at 11FPS.",
        tech: ["Next.js", "TypeScript", "Cloudflare R2"],
        link: "https://www.11fps.com/",
      },
      {
        id: 8,
        title: "BIOGROFE",
        featured: true,
        image: "/shots/biogrofe-dark.webp",
        description:
          "Platform helping biotech students find job application details for 100+ companies. Built collaboratively; I owned the frontend and data aggregation.",
        tech: ["React", "Node.js"],
        githubLink: "https://github.com/RushiChaganti/Biogrofe",
        link: "https://rushichaganti.github.io/Biogrofe/",
      },
      {
        id: 25,
        title: "ThinkPoint Arcade",
        isNew: true,
        description: "12 browser games controlled exclusively by your ThinkPad TrackPoint nub. A unique experiment in accessibility and hardware-specific interaction.",
        tech: ["HTML", "JavaScript", "CSS"],
        githubLink: "https://github.com/RushiChaganti/ThinkPoint-Arcade",
      },
      {
        id: 26,
        title: "LingoForge",
        isNew: true,
        description: "A comprehensive set of tools for lingodotdev, designed to streamline translation workflows and localization management.",
        tech: ["TypeScript", "Next.js", "Tailwind CSS"],
        githubLink: "https://github.com/RushiChaganti/LingoForge",
      },
      {
        id: 28,
        title: "AI-Portfolio",
        archived: true,
        isNew: true,
        description: "A modern, high-performance portfolio showcasing projects and professional experience with interactive components.",
        tech: ["TypeScript", "Next.js", "Tailwind CSS", "Framer Motion"],
        githubLink: "https://github.com/RushiChaganti/AI-Portfolio",
        link: "https://rushichaganti.github.io/AI-Portfolio/",
      },
      {
        id: 9,
        title: "Metro Portfolio",
        archived: true,
        description:
          "Developer portfolio mimicking Windows Metro UI. Implemented keyboard navigation and tile-based layout for authentic feel.",
        tech: ["TypeScript", "Next.js", "Tailwind CSS"],
        githubLink: "https://github.com/RushiChaganti/Metro-Portfolio",
        link: "https://rushichaganti.github.io/Metro-Portfolio/",
      },
      {
        id: 13,
        title: "NeuralSim",
        featured: true,
        image: "/shots/neuralsim-dark.webp",
        description:
          "Interactive neural network simulator with real-time weight visualization. Users can adjust hyperparameters live and watch propagation animate.",
        tech: ["TypeScript", "Next.js", "Tailwind CSS"],
        githubLink: "https://github.com/RushiChaganti/NeuralSim",
        link: "https://rushichaganti.github.io/NeuralSim//",
      },
      {
        id: 17,
        title: "Release-Check",
        featured: true,
        image: "/shots/release-check-dark.webp",
        description: "Tool for validating tech stack compatibility and experience levels. Used internally by Araise to standardize project requirements.",
        tech: ["TypeScript", "Next.js", "Tailwind CSS"],
        githubLink: "https://github.com/Araise25/Release-Check",
        link: "https://araise25.github.io/Release-Check/",
      },
      {
        id: 18,
        title: "araise_Web",
        archived: true,
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
        archived: true,
        description:
          "Jupyter utility for smart dataset sorting and filtering. Infers column types automatically to apply appropriate sort logic.",
        tech: ["Python", "Data Utils"],
        githubLink: "https://github.com/RushiChaganti/IntelliSort",
      },
      {
        id: 11,
        title: "pygrep",
        archived: true,
        description:
          "Python grep alternative for pattern searching across files. Added recursive directory walking and colored output for match context.",
        tech: ["Python", "CLI Tool"],
        githubLink: "https://github.com/RushiChaganti/pygrep",
      },
      {
        id: 12,
        title: "HangmanCli",
        archived: true,
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
        archived: true,
        description: "Shell scripts for common dev tasks (git shortcuts, env setup, cleanup). Designed to be sourced, not executed—minimal startup overhead.",
        tech: ["Shell", "Bash"],
        githubLink: "https://github.com/Araise25/WTF-Tools",
      },
      {
        id: 20,
        title: "psutils",
        archived: true,
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
        archived: true,
        description: "Community-maintained JSON database of tech stack metadata. Powers Release-Check's validation logic; accepts PRs for new tools.",
        tech: ["Metadata", "JSON"],
        githubLink: "https://github.com/Araise25/Release-Check-DB",
      },

    ],

    Linux: [
      {
        id: 29,
        title: "Omarchy",
        isNew: true,
        description:
          "Merged into the Omarchy Linux desktop: consistent filter shortcuts across six shell menus (Ctrl+Backspace deletes a word, Ctrl+U clears the field), matching Qt on KDE and GNOME.",
        tech: ["QML", "Qt", "Linux"],
        githubLink: myPRs("omacom/omarchy"),
        oss: true,
      },
      {
        id: 30,
        title: "omarchy-ibm-theme",
        description: "Added an exploded ThinkPad wallpaper and improved the README for this IBM / ThinkPad theme for Omarchy.",
        tech: ["Theming", "Linux"],
        githubLink: myPRs("DimaZbr/omarchy-ibm-theme"),
        oss: true,
      },
    ],

    Extensions: [
      {
        id: 27,
        title: "Utility_Kit",
        archived: true,
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
          "Submitted the Augment Code system prompt to a community collection of extracted AI tool prompts (PR open). Part of ongoing AI security research.",
        tech: ["AI Prompt Injection", "AI Red Teaming"],
        githubLink: myPRs("x1xhlol/system-prompts-and-models-of-ai-tools", false),
        oss: true,
      },

    ],
  },
  links: {
    cv: "https://drive.google.com/file/d/1VGysYKJ6cl8pm54SaTj6uOWDMMvy4tlH/view?usp=sharing",
    email: "mailto:rushichaganti@gmail.com",
    github: "https://github.com/RushiChaganti",
    linkedin: "https://www.linkedin.com/in/rushichaganti/",
    twitter: "https://x.com/Rushichaganti",
    // Opens chess.com's "new game" screen with me as the opponent
    chess: "https://www.chess.com/play/online/new?opponent=rushichaganti",
    anime: "https://myanimelist.net/animelist/RushiChaganti",
  },
  // Only skills backed by the work and builds listed above
  skills: {
    core: ["LLM apps", "RAG", "AI agents", "Image & video generation", "Python", "TypeScript", "Next.js", "FastAPI"],
    also: [
      "Prompt engineering", "Whisper", "Ollama", "LangChain", "Pinecone",
      "YOLOv8", "OpenCV", "Scikit-learn",
      "JavaScript", "Bash", "React", "Electron", "Supabase", "Cloudflare Workers", "Tailwind CSS",
      "Playwright", "Selenium", "Docker", "Linux",
    ],
    learning: ["AI red teaming", "Prompt injection"],
  },
};
