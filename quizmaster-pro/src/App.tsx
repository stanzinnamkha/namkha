/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import LandingPage from "./components/LandingPage";
import QuizDashboard from "./components/QuizDashboard";
import QuizCreator from "./components/QuizCreator";
import QuizPlayer from "./components/QuizPlayer";
import { Quiz, UserProfile } from "./types";
import { Toaster } from "@/components/ui/sonner";

const INITIAL_PROFILE: UserProfile = {
  name: "Alex Johnson",
  bio: "Passionate educator and quiz enthusiast. I love creating engaging learning experiences for everyone.",
  avatar: "https://picsum.photos/seed/alex/200/200",
  stats: {
    quizzesCreated: 12,
    quizzesTaken: 45,
    averageScore: 88,
  },
  achievements: [
    "Quiz Master 2026",
    "Top Contributor",
    "Perfect Score Streak",
    "Community Mentor"
  ]
};

const INITIAL_QUIZZES: Quiz[] = [
  {
    id: "1",
    title: "World Capitals Challenge",
    description: "Test your knowledge of world capitals from across the globe. How many can you get right?",
    questions: [
      { id: "q1", text: "What is the capital of France?", options: ["London", "Berlin", "Paris", "Madrid"], correctAnswer: 2 },
      { id: "q2", text: "What is the capital of Japan?", options: ["Seoul", "Beijing", "Tokyo", "Bangkok"], correctAnswer: 2 },
      { id: "q3", text: "What is the capital of Australia?", options: ["Sydney", "Melbourne", "Canberra", "Perth"], correctAnswer: 2 }
    ],
    createdAt: Date.now() - 86400000 * 2
  },
  {
    id: "2",
    title: "Science & Nature Quiz",
    description: "Explore the wonders of the natural world and scientific discoveries.",
    questions: [
      { id: "q1", text: "What is the largest planet in our solar system?", options: ["Earth", "Mars", "Jupiter", "Saturn"], correctAnswer: 2 },
      { id: "q2", text: "Which element has the chemical symbol 'O'?", options: ["Gold", "Oxygen", "Silver", "Iron"], correctAnswer: 1 }
    ],
    createdAt: Date.now() - 86400000 * 5
  }
];

type View = "landing" | "dashboard" | "creator" | "player";

export default function App() {
  const [view, setView] = useState<View>("landing");
  const [quizzes, setQuizzes] = useState<Quiz[]>(INITIAL_QUIZZES);
  const [profile, setProfile] = useState<UserProfile>(INITIAL_PROFILE);
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);

  // Load quizzes from localStorage if available
  useEffect(() => {
    const savedQuizzes = localStorage.getItem("quizzes");
    if (savedQuizzes) {
      setQuizzes(JSON.parse(savedQuizzes));
    }
  }, []);

  // Save quizzes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("quizzes", JSON.stringify(quizzes));
  }, [quizzes]);

  const handleSaveQuiz = (newQuiz: Quiz) => {
    setQuizzes([newQuiz, ...quizzes]);
    setProfile({
      ...profile,
      stats: {
        ...profile.stats,
        quizzesCreated: profile.stats.quizzesCreated + 1
      }
    });
    setView("dashboard");
  };

  const handleDeleteQuiz = (id: string) => {
    setQuizzes(quizzes.filter(q => q.id !== id));
  };

  const handlePlayQuiz = (quiz: Quiz) => {
    setActiveQuiz(quiz);
    setView("player");
  };

  const handleQuizComplete = (score: number) => {
    setProfile({
      ...profile,
      stats: {
        ...profile.stats,
        quizzesTaken: profile.stats.quizzesTaken + 1,
        averageScore: Math.round((profile.stats.averageScore + score) / 2)
      }
    });
  };

  return (
    <div className="min-h-screen font-sans selection:bg-blue-100 selection:text-blue-900">
      <Toaster position="top-center" />
      {view === "landing" && (
        <LandingPage onStart={() => setView("dashboard")} />
      )}

      {view === "dashboard" && (
        <QuizDashboard 
          quizzes={quizzes} 
          profile={profile}
          onCreateNew={() => setView("creator")}
          onPlayQuiz={handlePlayQuiz}
          onDeleteQuiz={handleDeleteQuiz}
        />
      )}

      {view === "creator" && (
        <QuizCreator 
          onSave={handleSaveQuiz}
          onCancel={() => setView("dashboard")}
        />
      )}

      {view === "player" && activeQuiz && (
        <QuizPlayer 
          quiz={activeQuiz}
          onComplete={handleQuizComplete}
          onExit={() => setView("dashboard")}
        />
      )}
    </div>
  );
}

