// Portfolio data types
export interface Build {
  id: number;
  title: string;
  description: string;
  tech: string[];
  githubLink: string;
  link?: string;
  demo?: string;
  oss?: boolean;
  firefoxLink?: string;
  isNew?: boolean;
  archived?: boolean; // hidden on the Builds page until "show archived" is clicked
}

export interface Log {
  date: string;
  title: string;
  content: string;
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
  logs: Log[];
  links: Links;
  skills: Skills;
}

// GitHub API types
export interface GitHubEvent {
  type: string;
  repo: { name: string };
  created_at: string;
  payload: {
    commits?: Array<{ message: string }>;
  };
}

// Chess.com API types
export interface ChessGame {
  url: string;
  time_control: string;
  rated: boolean;
  end_time: number;
  white: { username: string; rating: number };
  black: { username: string; rating: number };
}
