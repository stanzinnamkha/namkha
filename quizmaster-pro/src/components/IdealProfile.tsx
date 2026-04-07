import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Trophy, Star, Target, Zap, Award, BookOpen } from "lucide-react";
import { UserProfile } from "../types";

interface IdealProfileProps {
  profile: UserProfile;
}

export default function IdealProfile({ profile }: IdealProfileProps) {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row items-center gap-8 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm"
      >
        <div className="relative">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold border-4 border-white shadow-xl">
            {profile.name.charAt(0)}
          </div>
          <div className="absolute -bottom-2 -right-2 bg-yellow-400 p-2 rounded-full border-2 border-white shadow-lg">
            <Trophy className="w-5 h-5 text-white" />
          </div>
        </div>
        
        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-2">
            <h2 className="text-3xl font-bold text-slate-900">{profile.name}</h2>
            <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-100">
              Elite Educator
            </Badge>
          </div>
          <p className="text-slate-600 text-lg mb-4">{profile.bio}</p>
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            <div className="flex items-center text-slate-500 text-sm">
              <Star className="w-4 h-4 text-yellow-500 mr-1" />
              <span>Top 1% Global</span>
            </div>
            <div className="flex items-center text-slate-500 text-sm">
              <Target className="w-4 h-4 text-blue-500 mr-1" />
              <span>98% Accuracy</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Quizzes Created", value: profile.stats.quizzesCreated, icon: BookOpen, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Quizzes Taken", value: profile.stats.quizzesTaken, icon: Zap, color: "text-purple-600", bg: "bg-purple-50" },
          { label: "Avg. Score", value: `${profile.stats.averageScore}%`, icon: Award, color: "text-emerald-600", bg: "bg-emerald-50" }
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-2 rounded-xl ${stat.bg} ${stat.color}`}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <span className="text-2xl font-bold text-slate-900">{stat.value}</span>
                </div>
                <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Achievements Section */}
      <Card className="border-slate-100 shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl font-bold flex items-center">
            <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
            Hall of Fame
          </CardTitle>
          <CardDescription>Special recognitions and milestones achieved.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {profile.achievements.map((achievement, i) => (
              <motion.div
                key={achievement}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="flex items-center p-4 rounded-2xl bg-slate-50 border border-slate-100"
              >
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mr-4 shadow-sm">
                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                </div>
                <span className="font-medium text-slate-700">{achievement}</span>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
