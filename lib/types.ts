// Portfolio data types
export interface Build {
  id: number;
  title: string;
  description: string;
  tech: string[];
  githubLink?: string;
  link?: string;
  demo?: string;
  oss?: boolean;
  firefoxLink?: string;
  isNew?: boolean;
  featured?: boolean; // shown with a screenshot at the top of the Builds page
  image?: string; // screenshot under public/, used by featured builds
  archived?: boolean; // hidden on the Builds page until "show archived" is clicked
}

export interface Links {
  cv: string;
  email: string;
  github: string;
  linkedin: string;
  twitter: string;
  chess: string;
  anime: string;
}

export interface Skills {
  core: string[]; // what I use daily; shown big
  also: string[]; // used in real work or builds
  learning: string[]; // in progress
}

export interface WorkExperience {
  id: number;
  company: string;
  role: string;
  period: string;
  description: string[];
  type?: string;
  logo?: string;
  link?: string;
}

export interface PortfolioData {
  work: WorkExperience[];
  builds: {
    lastUpdated: string;
    GenAI: Build[];
    ML: Build[];
    Automation: Build[];
    Web: Build[];
    Python: Build[];
    Bash: Build[];
    Linux: Build[];
    Extensions: Build[];
    Security: Build[];
  };
  links: Links;
  skills: Skills;
}
