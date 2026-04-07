import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, CheckCircle2, ChevronRight, ChevronLeft } from "lucide-react";
import { Quiz, Question } from "../types";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";

interface QuizCreatorProps {
  onSave: (quiz: Quiz) => void;
  onCancel: () => void;
}

export default function QuizCreator({ onSave, onCancel }: QuizCreatorProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState<Question[]>([
    { id: "1", text: "", options: ["", "", "", ""], correctAnswer: 0 }
  ]);
  const [currentStep, setCurrentStep] = useState(0); // 0: Details, 1: Questions

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { id: Date.now().toString(), text: "", options: ["", "", "", ""], correctAnswer: 0 }
    ]);
  };

  const removeQuestion = (index: number) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((_, i) => i !== index));
    }
  };

  const updateQuestion = (index: number, field: keyof Question, value: any) => {
    const newQuestions = [...questions];
    newQuestions[index] = { ...newQuestions[index], [field]: value };
    setQuestions(newQuestions);
  };

  const updateOption = (qIndex: number, oIndex: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options[oIndex] = value;
    setQuestions(newQuestions);
  };

  const handleSave = () => {
    if (!title) {
      toast.error("Please enter a quiz title.");
      return;
    }

    if (questions.some(q => !q.text || q.options.some(o => !o))) {
      toast.error("Please fill in all questions and options.");
      return;
    }

    const newQuiz: Quiz = {
      id: Date.now().toString(),
      title,
      description,
      questions,
      createdAt: Date.now()
    };
    onSave(newQuiz);
    toast.success("Quiz created successfully!");
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-slate-900">Create New Quiz</h2>
        <div className="flex gap-3">
          <Button variant="ghost" onClick={onCancel}>Cancel</Button>
          <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
            <CheckCircle2 className="w-4 h-4 mr-2" />
            Save Quiz
          </Button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {currentStep === 0 ? (
          <motion.div
            key="details"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-6"
          >
            <Card className="border-slate-100 shadow-sm">
              <CardHeader>
                <CardTitle>Quiz Details</CardTitle>
                <CardDescription>Basic information about your quiz.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input 
                    id="title" 
                    placeholder="e.g., World Geography Masterclass" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    placeholder="What is this quiz about?" 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="min-h-[120px]"
                  />
                </div>
                <Button className="w-full h-12" onClick={() => setCurrentStep(1)}>
                  Next: Add Questions
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            key="questions"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <Button variant="ghost" onClick={() => setCurrentStep(0)} className="mb-4">
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back to Details
            </Button>

            {questions.map((question, qIndex) => (
              <Card key={question.id} className="border-slate-100 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-blue-500" />
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">Question {qIndex + 1}</CardTitle>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => removeQuestion(qIndex)}
                    className="text-slate-400 hover:text-red-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Question Text</Label>
                    <Input 
                      placeholder="Enter your question here..." 
                      value={question.text}
                      onChange={(e) => updateQuestion(qIndex, "text", e.target.value)}
                      className="h-12"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {question.options.map((option, oIndex) => (
                      <div key={oIndex} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label className="text-xs text-slate-500">Option {oIndex + 1}</Label>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-slate-400">Correct?</span>
                            <input 
                              type="radio" 
                              name={`correct-${qIndex}`}
                              checked={question.correctAnswer === oIndex}
                              onChange={() => updateQuestion(qIndex, "correctAnswer", oIndex)}
                              className="w-4 h-4 text-blue-600"
                            />
                          </div>
                        </div>
                        <Input 
                          placeholder={`Option ${oIndex + 1}`} 
                          value={option}
                          onChange={(e) => updateOption(qIndex, oIndex, e.target.value)}
                          className={question.correctAnswer === oIndex ? "border-blue-500 bg-blue-50/30" : ""}
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}

            <Button 
              variant="outline" 
              className="w-full h-16 border-dashed border-2 hover:border-blue-500 hover:bg-blue-50/50 transition-all"
              onClick={addQuestion}
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Another Question
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
