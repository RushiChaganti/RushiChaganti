import { PortfolioData } from './types';

export const portfolioData: PortfolioData = {
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
  },
  logs: [
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
    cv: "https://drive.google.com/file/d/1dzEZl3d3eIzGTW5uXf8jiYIYySe9B2r9/view?usp=sharing",
    email: "mailto:rushichaganti@gmail.com",
    github: "https://github.com/RushiChaganti",
    linkedin: "https://www.linkedin.com/in/rushichaganti/",
    twitter: "https://x.com/Rushichaganti",
  },
};
