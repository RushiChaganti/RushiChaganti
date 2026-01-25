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
          "Streamlit app for querying documents (PDF/DOCX/PPTX) using LangChain and Ollama.",
        tech: ["Python", "Streamlit", "LangChain", "Ollama"],
        githubLink: "https://github.com/RushiChaganti/DocuTalk",
      },
      {
        id: 2,
        title: "docqa-ai",
        description:
          "Document-QA toolkit built in Python for querying and retrieving answers from long-form content.",
        tech: ["Python", "LangChain", "QA Systems"],
        githubLink: "https://github.com/RushiChaganti/docqa-ai",
      },
      {
        id: 3,
        title: "Multi_modal_Doc_QA_system",
        description:
          "A Python-based multi-modal document QA system—query documents using a variety of inputs (text, images, etc.).",
        tech: ["Python", "Multi-modal AI", "LLMs"],
        githubLink: "https://github.com/RushiChaganti/Multi_modal_Doc_QA_system",
      },
      {
        id: 14,
        title: "LightRAG",
        description:
          "A Forked Repo of Light RAG, Contributed a feature for exporting the RAG data.",
        tech: ["Python", "RAG", "LLMs"],
        githubLink: "https://github.com/HKUDS/LightRAG",
        oss: true,
      },
      {
        id: 16,
        title: "Medical-Advisor-Chatbot",
        description: "A Python-based medical advisor chatbot using NLP to provide health-related guidance.",
        tech: ["Python", "NLP", "Chatbots"],
        githubLink: "https://github.com/RushiChaganti/Medical-Advisor-Chatbot",
      }
    ],
    ML: [
      {
        id: 4,
        title: "KetsuCheck",
        description:
          "ML-based password strength tester with 90%+ accuracy, Dockerized for easy deployment.",
        tech: ["Python", "Scikit-learn", "Docker"],
        githubLink: "https://github.com/RushiChaganti/KetsuCheck",
      },
      {
        id: 5,
        title: "FaceRecognition",
        description:
          "Basic face recognition implementation using Python and computer vision libraries.",
        tech: ["Python", "OpenCV", "Machine Learning"],
        githubLink: "https://github.com/RushiChaganti/FaceRecognition",
      },
    ],

    Automation: [
      {
        id: 6,
        title: "Auto_Jobs_Applier_AIHawk",
        description:
          "A forked AI agent that automates job applications using intelligent resume targeting.",
        tech: ["Python", "AI agent", "Automation"],
        githubLink: "https://github.com/RushiChaganti/Auto_Jobs_Applier_AIHawk",
        oss: true,
      },
      {
        id: 7,
        title: "lib_resume_builder_AIHawk",
        description:
          "Resume generation library, forked from AIHawk—enhances resume building via code.",
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
          "Collaborated with biotech peers to build a platform aiding students with job application details across 100+ companies.",
        tech: ["React", "Node.js"],
        githubLink: "https://github.com/RushiChaganti",
        link: "https://rushichaganti.github.io/Biogrofe/",
      },
      {
        id: 9,
        title: "Metro Portfolio",
        description:
          "A sleek developer portfolio inspired by Windows Metro UI, built with TypeScript.",
        tech: ["TypeScript", "Next.js", "Tailwind CSS"],
        githubLink: "https://github.com/RushiChaganti/Metro-Portfolio",
        link: "https://rushichaganti.github.io/Metro-Portfolio/",
      },
      {
        id: 13,
        title: "NeuralSim",
        description:
          "Neural Networks through interactive, real-time simulations. ",
        tech: ["TypeScript", "Next.js", "Tailwind CSS"],
        githubLink: "https://github.com/RushiChaganti/NeuralSim",
        link: "https://rushichaganti.github.io/NeuralSim//",
      },
      {
        id: 17,
        title: "Release-Check",
        description: "Validate tech experience and stack compatibility for developers.",
        tech: ["TypeScript", "Next.js", "Tailwind CSS"],
        githubLink: "https://github.com/Araise25/Release-Check",
        link: "https://araise25.github.io/Release-Check/",
      },
      {
        id: 18,
        title: "araise_Web",
        description: "Official website for the Araise organization, showcasing projects and tools.",
        tech: ["TypeScript", "Next.js", "Tailwind CSS"],
        githubLink: "https://github.com/Araise25/araise_Web",
        link: "https://araise25.github.io/arAIse_Web/",
      }
    ],
    Python: [
      {
        id: 10,
        title: "IntelliSort",
        description:
          "A Jupyter Notebook utility to intelligently sort and filter datasets/programmatic content.",
        tech: ["Python", "Data Utils"],
        githubLink: "https://github.com/RushiChaganti/IntelliSort",
      },
      {
        id: 11,
        title: "pygrep",
        description:
          "A Python-based grep alternative—search for patterns in files via command line.",
        tech: ["Python", "CLI Tool"],
        githubLink: "https://github.com/RushiChaganti/pygrep",
      },
      {
        id: 12,
        title: "HangmanCli",
        description:
          "Command-line Hangman game built in Python for interactive terminal play.",
        tech: ["Python", "CLI Game"],
        githubLink: "https://github.com/RushiChaganti/HangmanCli",
      },
    ],
    Bash: [
      {
        id: 19,
        title: "WTF-Tools",
        description: "Collection of shell scripts to boost developer workflow and automation.",
        tech: ["Shell", "Bash"],
        githubLink: "https://github.com/Araise25/WTF-Tools",
      },
      {
        id: 20,
        title: "psutils",
        description: "A collection of command line utilities written in PowerShell for system management.",
        tech: ["PowerShell", "CLI Tools"],
        githubLink: "https://github.com/RushiChaganti/psutils",
      },
      {
        id: 21,
        title: "Araise_PM",
        description: "Project management and automation scripts for the Araise organization.",
        tech: ["Shell", "Bash"],
        githubLink: "https://github.com/Araise25/Araise_PM",
      },
      {
        id: 24,
        title: "Release-Check-DB",
        description: "A clean, community-maintained metadata repository for tech stacks and developer tools.",
        tech: ["Metadata", "JSON"],
        githubLink: "https://github.com/Araise25/Release-Check-DB",
      }
    ],

    Extensions: [
      {
        id: 14,
        title: "Utility_Kit",
        description:
          "Extension which clears 1 minute of history — as if it was never opened.(Stealth name 😅)",
        tech: ["HTML", "Javascript"],
        githubLink: "https://github.com/RushiChaganti/Utility_Kit/",
        firefoxLink: "https://addons.mozilla.org/en-US/firefox/addon/utility-kit/",
      },
      {
        id: 22,
        title: "YSB",
        description: "Youtube Shorts Blocker for Firefox - clean up your feed.",
        tech: ["JavaScript", "Web Extensions"],
        githubLink: "https://github.com/Araise25/YSB",
        firefoxLink: "https://addons.mozilla.org/en-US/firefox/addon/ysb/",
      },
      {
        id: 23,
        title: "seezo-extension",
        description: "Browser extension for enhanced data visualization and interaction.",
        tech: ["Python", "JavaScript"],
        githubLink: "https://github.com/RushiChaganti/seezo-extension",
      }
    ],

    Security: [
      {
        id: 15,
        title: "system-prompts-and-models-of-ai-tools",
        description:
          "Added Augument Code System Prompt",
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
