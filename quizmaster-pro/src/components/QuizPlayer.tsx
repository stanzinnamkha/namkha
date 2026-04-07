import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, XCircle, Trophy, RotateCcw, Home } from "lucide-react";
import { Quiz } from "../types";

interface QuizPlayerProps {
  quiz: Quiz;
  onComplete: (score: number) => void;
  onExit: () => void;
}

export default function QuizPlayer({ quiz, onComplete, onExit }: QuizPlayerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const currentQuestion = quiz.questions[currentIndex];
  const progress = ((currentIndex + 1) / quiz.questions.length) * 100;

  const handleOptionSelect = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
  };

  const handleConfirm = () => {
    if (selectedOption === null) return;
    
    const correct = selectedOption === currentQuestion.correctAnswer;
    if (correct) setScore(score + 1);
    
    setIsAnswered(true);
  };

  const handleNext = () => {
    if (currentIndex < quiz.questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowResults(true);
      onComplete(Math.round((score / quiz.questions.length) * 100));
    }
  };

  if (showResults) {
    const percentage = Math.round((score / quiz.questions.length) * 100);
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto p-6 text-center"
      >
        <Card className="border-slate-100 shadow-xl overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-600" />
          <CardContent className="pt-12 pb-12 space-y-8">
            <div className="relative inline-block">
              <div className="w-32 h-32 rounded-full bg-blue-50 flex items-center justify-center mx-auto">
                <Trophy className="w-16 h-16 text-blue-600" />
              </div>
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
                className="absolute -top-2 -right-2 bg-yellow-400 text-white p-2 rounded-full shadow-lg"
              >
                <CheckCircle2 className="w-6 h-6" />
              </motion.div>
            </div>

            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-2">Quiz Completed!</h2>
              <p className="text-slate-500">You've mastered "{quiz.title}"</p>
            </div>

            <div className="flex justify-center gap-12">
              <div className="text-center">
                <p className="text-4xl font-bold text-blue-600">{percentage}%</p>
                <p className="text-sm text-slate-500 font-medium">Score</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-slate-900">{score}/{quiz.questions.length}</p>
                <p className="text-sm text-slate-500 font-medium">Correct</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button className="flex-1 h-12 rounded-xl" onClick={() => {
                setCurrentIndex(0);
                setScore(0);
                setSelectedOption(null);
                setIsAnswered(false);
                setShowResults(false);
              }}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
              <Button variant="outline" className="flex-1 h-12 rounded-xl" onClick={onExit}>
                <Home className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      <div className="space-y-4">
        <div className="flex justify-between items-center text-sm font-medium text-slate-500">
          <span>Question {currentIndex + 1} of {quiz.questions.length}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-blue-600"
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="border-slate-100 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-slate-900 leading-tight">
                {currentQuestion.text}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-3">
                {currentQuestion.options.map((option, index) => {
                  let variant = "outline";
                  let borderClass = "border-slate-200";
                  let bgClass = "hover:bg-slate-50";

                  if (selectedOption === index) {
                    borderClass = "border-blue-500 ring-2 ring-blue-100";
                    bgClass = "bg-blue-50";
                  }

                  if (isAnswered) {
                    if (index === currentQuestion.correctAnswer) {
                      borderClass = "border-emerald-500 bg-emerald-50 ring-2 ring-emerald-100";
                      bgClass = "bg-emerald-50";
                    } else if (selectedOption === index) {
                      borderClass = "border-red-500 bg-red-50 ring-2 ring-red-100";
                      bgClass = "bg-red-50";
                    } else {
                      bgClass = "opacity-50";
                    }
                  }

                  return (
                    <button
                      key={index}
                      disabled={isAnswered}
                      onClick={() => handleOptionSelect(index)}
                      className={`w-full p-5 text-left rounded-2xl border-2 transition-all flex items-center justify-between group ${borderClass} ${bgClass}`}
                    >
                      <span className="font-medium text-slate-700">{option}</span>
                      {isAnswered && index === currentQuestion.correctAnswer && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      )}
                      {isAnswered && selectedOption === index && index !== currentQuestion.correctAnswer && (
                        <XCircle className="w-5 h-5 text-red-600" />
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="pt-6">
                {!isAnswered ? (
                  <Button 
                    className="w-full h-14 text-lg rounded-2xl shadow-lg shadow-blue-100" 
                    disabled={selectedOption === null}
                    onClick={handleConfirm}
                  >
                    Confirm Answer
                  </Button>
                ) : (
                  <Button 
                    className="w-full h-14 text-lg rounded-2xl shadow-lg shadow-blue-100 bg-slate-900 hover:bg-slate-800" 
                    onClick={handleNext}
                  >
                    {currentIndex === quiz.questions.length - 1 ? "Finish Quiz" : "Next Question"}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
