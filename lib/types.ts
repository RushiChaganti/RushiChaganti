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
}

export interface WorkExperience {
  id: number;
  company: string;
  role: string;
  period: string;
  description: string[];
  type?: string;
  logo?: string;
}

export interface PortfolioData {
  work: WorkExperience[];
  builds: {
    GenAI: Build[];
    ML: Build[];
    Automation: Build[];
    Web: Build[];
    Python: Build[];
    Bash: Build[];
    Extensions: Build[];
    Security: Build[];
  };
  logs: Log[];
  links: Links;
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
