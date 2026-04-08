import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Brain, Sparkles, Trophy, Users } from "lucide-react";

interface LandingPageProps {
  onStart: () => void;
}

export default function LandingPage({ onStart }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-slate-50 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-20 -left-20 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 -right-20 w-80 h-80 bg-purple-100 rounded-full blur-3xl opacity-50"
        />
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 mb-8">
            <Sparkles className="w-4 h-4 text-blue-600 mr-2" />
            <span className="text-sm font-medium text-blue-700">New: AI-Powered Quiz Generation</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6">
            Master Any Subject with <span className="text-blue-600">QuizMaster</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-xl text-slate-600 mb-10">
            Create, share, and track your progress with the world's most intuitive quiz platform. 
            Perfect for students, teachers, and lifelong learners.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="h-14 px-8 text-lg rounded-full shadow-lg shadow-blue-200" onClick={onStart}>
              Get Started for Free
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full">
              Explore Quizzes
            </Button>
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Brain,
              title: "Smart Learning",
              description: "Our adaptive algorithms help you focus on what you need to learn most.",
              color: "bg-blue-50 text-blue-600"
            },
            {
              icon: Trophy,
              title: "Track Progress",
              description: "Detailed analytics and badges to keep you motivated on your journey.",
              color: "bg-purple-50 text-purple-600"
            },
            {
              icon: Users,
              title: "Collaborative",
              description: "Share quizzes with friends or students and track group performance.",
              color: "bg-emerald-50 text-emerald-600"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className={`w-12 h-12 rounded-2xl ${feature.color} flex items-center justify-center mb-6`}>
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
              <p className="text-slate-600 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-slate-100 py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 text-sm">
          © 2026 QuizMaster Pro. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
