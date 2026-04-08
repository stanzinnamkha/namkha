export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  createdAt: number;
}

export interface UserProfile {
  name: string;
  bio: string;
  avatar: string;
  stats: {
    quizzesCreated: number;
    quizzesTaken: number;
    averageScore: number;
  };
  achievements: string[];
}
