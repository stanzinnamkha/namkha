import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Play, Trash2, Clock, BookOpen, User, Sparkles } from "lucide-react";
import { Quiz, UserProfile } from "../types";
import IdealProfile from "./IdealProfile";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface QuizDashboardProps {
  quizzes: Quiz[];
  profile: UserProfile;
  onCreateNew: () => void;
  onPlayQuiz: (quiz: Quiz) => void;
  onDeleteQuiz: (id: string) => void;
}

export default function QuizDashboard({ quizzes, profile, onCreateNew, onPlayQuiz, onDeleteQuiz }: QuizDashboardProps) {
  return (
    <div className="min-h-screen bg-slate-50/50">
      <header className="bg-white border-b border-slate-100 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900">QuizMaster</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="hidden sm:flex">Explore</Button>
            <Button variant="ghost" size="sm" className="hidden sm:flex">Community</Button>
            <div className="w-8 h-8 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center text-xs font-bold text-slate-600">
              {profile.name.charAt(0)}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <Tabs defaultValue="quizzes" className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <TabsList className="bg-white border border-slate-100 p-1 rounded-xl h-12">
              <TabsTrigger value="quizzes" className="rounded-lg px-6 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600">
                <BookOpen className="w-4 h-4 mr-2" />
                My Quizzes
              </TabsTrigger>
              <TabsTrigger value="profile" className="rounded-lg px-6 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600">
                <User className="w-4 h-4 mr-2" />
                Ideal Profile
              </TabsTrigger>
            </TabsList>
            
            <Button onClick={onCreateNew} className="bg-blue-600 hover:bg-blue-700 h-12 px-6 rounded-xl shadow-lg shadow-blue-100">
              <Plus className="w-4 h-4 mr-2" />
              Create New Quiz
            </Button>
          </div>

          <TabsContent value="quizzes" className="mt-0">
            {quizzes.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <BookOpen className="w-10 h-10 text-slate-300" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">No quizzes yet</h3>
                <p className="text-slate-500 mb-8 max-w-xs mx-auto">
                  Start your journey by creating your first quiz. It only takes a few minutes!
                </p>
                <Button onClick={onCreateNew} variant="outline" className="rounded-xl h-12 px-8">
                  Create First Quiz
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {quizzes.map((quiz, index) => (
                  <motion.div
                    key={quiz.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="group border-slate-100 shadow-sm hover:shadow-md transition-all overflow-hidden bg-white rounded-2xl">
                      <div className="h-2 bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <CardHeader className="pb-4">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center text-xs font-medium text-slate-400">
                            <Clock className="w-3 h-3 mr-1" />
                            {new Date(quiz.createdAt).toLocaleDateString()}
                          </div>
                          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-red-500">
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete your
                                    quiz and all its questions.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => onDeleteQuiz(quiz.id)} className="bg-red-600 hover:bg-red-700">
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </div>
                        <CardTitle className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                          {quiz.title}
                        </CardTitle>
                        <CardDescription className="line-clamp-2 min-h-[40px]">
                          {quiz.description || "No description provided."}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center gap-2">
                            <div className="px-2 py-1 bg-slate-100 rounded text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                              {quiz.questions.length} Questions
                            </div>
                          </div>
                          <Button 
                            size="sm" 
                            className="rounded-lg bg-slate-900 hover:bg-blue-600 transition-colors"
                            onClick={() => onPlayQuiz(quiz)}
                          >
                            <Play className="w-3 h-3 mr-2 fill-current" />
                            Play
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="profile" className="mt-0">
            <IdealProfile profile={profile} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

