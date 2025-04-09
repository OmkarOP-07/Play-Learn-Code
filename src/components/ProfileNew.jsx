"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { BadgeCheck, Award, Target, Medal, BookOpen, Clock, LogOut, ChevronRight, 
  MessageSquare, Calendar, Bookmark, Trophy, Zap, Brain, Lightbulb, 
  BarChart, Settings, HelpCircle, Send, X, Plus, CheckCircle2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Progress } from "../components/ui/progress"
import { Badge } from "../components/ui/badge"
import Tooltip, { TooltipProvider, TooltipTrigger, TooltipContent } from "../components/ui/tooltip"
import ProgressBar from "./ProgressBar"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Input } from "../components/ui/input"
import { Textarea } from "../components/ui/textarea"
import { Separator } from "../components/ui/separator"
import { ScrollArea } from "../components/ui/scroll-area"

const ProfileNew = () => {
  const [user, setUser] = useState(null)
  const [activeTab, setActiveTab] = useState("overview")
  const [chatMessages, setChatMessages] = useState([
    { role: "assistant", content: "Hello! I'm your Java learning assistant. How can I help you today?" }
  ])
  const [newMessage, setNewMessage] = useState("")
  const [isChatOpen, setIsChatOpen] = useState(false)
  const navigate = useNavigate()
  const { currentUser, logout } = useAuth()

  useEffect(() => {
    if (currentUser) {
      setUser(currentUser)
    } else {
      navigate("/login")
    }
  }, [currentUser, navigate])

  const handleLogout = async () => {
    try {
      await logout()
      navigate("/login")
    } catch (error) {
      console.error("Error logging out:", error)
    }
  }

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return
    
    // Add user message
    setChatMessages([...chatMessages, { role: "user", content: newMessage }])
    
    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      setChatMessages(prev => [
        ...prev, 
        { 
          role: "assistant", 
          content: "I'm processing your question about Java programming. Here's a helpful response..." 
        }
      ])
    }, 1000)
    
    setNewMessage("")
  }

  if (!user) return null

  // Java course data
  const javaCourse = {
    name: "Java Programming",
    progress: 65,
    totalLessons: 30,
    completedLessons: 19,
    lastAccessed: "2 days ago",
    icon: "☕",
    modules: [
      { name: "Java Basics", progress: 100, completed: true },
      { name: "Control Structures", progress: 100, completed: true },
      { name: "Object-Oriented Programming", progress: 80, completed: false },
      { name: "Collections Framework", progress: 40, completed: false },
      { name: "Exception Handling", progress: 0, completed: false },
      { name: "File I/O", progress: 0, completed: false },
      { name: "Multithreading", progress: 0, completed: false },
      { name: "Database Connectivity", progress: 0, completed: false }
    ]
  }

  const achievements = [
    {
      name: "First Challenge",
      icon: <Award className="h-8 w-8 text-yellow-500" />,
      status: "Completed",
      description: "Completed your first coding challenge",
      date: "2023-05-15"
    },
    {
      name: "Perfect Score",
      icon: <BadgeCheck className="h-8 w-8 text-yellow-500" />,
      status: "Completed",
      description: "Achieved 100% on a quiz",
      date: "2023-06-02"
    },
    {
      name: "Streak Master",
      icon: <Target className="h-8 w-8 text-yellow-500" />,
      status: "Completed",
      description: "Complete lessons for 7 days in a row",
      date: "2023-06-20"
    },
    {
      name: "Java Expert",
      icon: <Medal className="h-8 w-8 text-gray-400" />,
      status: "In Progress",
      description: "Complete all Java courses",
      progress: 65
    },
    {
      name: "Code Ninja",
      icon: <Zap className="h-8 w-8 text-gray-400" />,
      status: "Locked",
      description: "Complete 50 coding challenges",
      progress: 30
    },
    {
      name: "Problem Solver",
      icon: <Brain className="h-8 w-8 text-gray-400" />,
      status: "Locked",
      description: "Solve 20 complex problems",
      progress: 15
    }
  ]

  const learningStats = {
    totalHoursLearned: 42,
    streakDays: 5,
    challengesCompleted: 18,
    quizzesTaken: 12,
    averageScore: 85,
    nextMilestone: "Complete OOP module"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-violet-950 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <Card className="mb-8 backdrop-blur-sm bg-white/10 border-none shadow-xl">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <Avatar className="w-28 h-28 border-4 border-purple-500 shadow-lg">
                <AvatarImage src={user.photoURL || ""} alt={user.username || "User"} />
                <AvatarFallback className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white text-4xl font-bold">
                  {user.username
                    ? user.username.charAt(0).toUpperCase()
                    : user.email.split("@")[0].charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="text-center md:text-left flex-1">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h1 className="text-2xl font-bold text-white mb-1">{user.username || "User"}</h1>
                    <p className="text-purple-200 mb-4">{user.email}</p>
                  </div>
                  <div className="flex gap-2 mt-4 md:mt-0">
                    <Button variant="outline" size="sm" className="border-purple-400 text-purple-200">
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={handleLogout}
                      className="group transition-all duration-300 hover:bg-red-600 hover:shadow-lg hover:shadow-red-600/20"
                    >
                      <LogOut className="h-4 w-4 mr-2 group-hover:animate-pulse" />
                      Logout
                    </Button>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-purple-700 hover:bg-purple-600 text-white px-3 py-1">
                      Level 5
                    </Badge>
                    <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"
                        style={{ width: "75%" }}
                      ></div>
                    </div>
                  </div>
                  <Badge variant="outline" className="border-purple-400 text-purple-200 px-3 py-1">
                    XP: 1850
                  </Badge>
                  <Badge variant="outline" className="border-green-400 text-green-200 px-3 py-1">
                    <Trophy className="h-3 w-3 mr-1" />
                    Top 10% Learner
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 bg-white/5 border border-white/10">
            <TabsTrigger value="overview" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              <BarChart className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="courses" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              <BookOpen className="h-4 w-4 mr-2" />
              Courses
            </TabsTrigger>
            <TabsTrigger value="achievements" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              <Trophy className="h-4 w-4 mr-2" />
              Achievements
            </TabsTrigger>
            <TabsTrigger value="journey" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              <Lightbulb className="h-4 w-4 mr-2" />
              Learning Journey
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Java Course Progress */}
              <Card className="backdrop-blur-sm bg-white/10 border-none shadow-xl">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-white flex items-center">
                    <span className="text-2xl mr-2">{javaCourse.icon}</span>
                    Java Programming
                  </CardTitle>
                  <CardDescription className="text-purple-200">
                    {javaCourse.completedLessons} of {javaCourse.totalLessons} lessons completed
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  <ProgressBar progress={javaCourse.progress} color="text-purple-500" />
                  <div className="w-full mt-4">
                    <Progress
                      value={javaCourse.progress}
                      className="h-2.5 bg-gray-700"
                      indicatorClassName="bg-gradient-to-r from-purple-500 to-indigo-500"
                    />
                  </div>
                  <div className="flex justify-between w-full text-sm text-purple-200 mt-2">
                    <span>Overall Progress</span>
                    <span className="font-semibold">{javaCourse.progress}%</span>
                  </div>
                  <Button className="w-full mt-4 bg-purple-600 hover:bg-purple-700">
                    Continue Learning <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </CardContent>
              </Card>

              {/* Learning Stats */}
              <Card className="backdrop-blur-sm bg-white/10 border-none shadow-xl">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-white flex items-center">
                    <BarChart className="h-5 w-5 mr-2 text-purple-300" />
                    Learning Stats
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-purple-300" />
                        <span className="text-white">Total Hours</span>
                      </div>
                      <span className="text-purple-200 font-semibold">{learningStats.totalHoursLearned}h</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Zap className="h-4 w-4 mr-2 text-purple-300" />
                        <span className="text-white">Current Streak</span>
                      </div>
                      <span className="text-purple-200 font-semibold">{learningStats.streakDays} days</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Target className="h-4 w-4 mr-2 text-purple-300" />
                        <span className="text-white">Challenges</span>
                      </div>
                      <span className="text-purple-200 font-semibold">{learningStats.challengesCompleted}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <BookOpen className="h-4 w-4 mr-2 text-purple-300" />
                        <span className="text-white">Quizzes</span>
                      </div>
                      <span className="text-purple-200 font-semibold">{learningStats.quizzesTaken}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <BadgeCheck className="h-4 w-4 mr-2 text-purple-300" />
                        <span className="text-white">Average Score</span>
                      </div>
                      <span className="text-purple-200 font-semibold">{learningStats.averageScore}%</span>
                    </div>
                    <Separator className="bg-purple-800/30" />
                    <div className="flex items-center">
                      <Lightbulb className="h-4 w-4 mr-2 text-yellow-400" />
                      <span className="text-white">Next Milestone: <span className="text-purple-200">{learningStats.nextMilestone}</span></span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="backdrop-blur-sm bg-white/10 border-none shadow-xl">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-white flex items-center">
                    <Zap className="h-5 w-5 mr-2 text-purple-300" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" className="h-auto py-3 flex flex-col items-center justify-center border-purple-400/30 hover:bg-purple-800/30">
                      <MessageSquare className="h-5 w-5 mb-1 text-purple-300" />
                      <span className="text-xs">Ask Doubts</span>
                    </Button>
                    <Button variant="outline" className="h-auto py-3 flex flex-col items-center justify-center border-purple-400/30 hover:bg-purple-800/30">
                      <Calendar className="h-5 w-5 mb-1 text-purple-300" />
                      <span className="text-xs">Schedule</span>
                    </Button>
                    <Button variant="outline" className="h-auto py-3 flex flex-col items-center justify-center border-purple-400/30 hover:bg-purple-800/30">
                      <Bookmark className="h-5 w-5 mb-1 text-purple-300" />
                      <span className="text-xs">Bookmarks</span>
                    </Button>
                    <Button variant="outline" className="h-auto py-3 flex flex-col items-center justify-center border-purple-400/30 hover:bg-purple-800/30">
                      <HelpCircle className="h-5 w-5 mb-1 text-purple-300" />
                      <span className="text-xs">Help</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Courses Tab */}
          <TabsContent value="courses" className="space-y-6">
            <Card className="backdrop-blur-sm bg-white/10 border-none shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-white flex items-center">
                  <span className="text-2xl mr-2">{javaCourse.icon}</span>
                  Java Programming Course
                </CardTitle>
                <CardDescription className="text-purple-200">
                  Master Java programming from basics to advanced concepts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/3 flex flex-col items-center">
                    <ProgressBar progress={javaCourse.progress} color="text-purple-500" />
                    <div className="w-full mt-4">
                      <Progress
                        value={javaCourse.progress}
                        className="h-2.5 bg-gray-700"
                        indicatorClassName="bg-gradient-to-r from-purple-500 to-indigo-500"
                      />
                    </div>
                    <div className="flex justify-between w-full text-sm text-purple-200 mt-2">
                      <span>Overall Progress</span>
                      <span className="font-semibold">{javaCourse.progress}%</span>
                    </div>
                    <div className="mt-4 text-center">
                      <p className="text-purple-200 text-sm">Last accessed: {javaCourse.lastAccessed}</p>
                    </div>
                    <Button className="w-full mt-4 bg-purple-600 hover:bg-purple-700">
                      Continue Learning <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                  
                  <div className="md:w-2/3">
                    <h3 className="text-lg font-semibold text-white mb-4">Course Modules</h3>
                    <div className="space-y-3">
                      {javaCourse.modules.map((module, index) => (
                        <div key={index} className="bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-all">
                          <div className="flex justify-between items-center mb-2">
                            <div className="flex items-center">
                              {module.completed ? (
                                <CheckCircle2 className="h-5 w-5 mr-2 text-green-500" />
                              ) : (
                                <div className="h-5 w-5 mr-2 rounded-full border border-purple-400 flex items-center justify-center">
                                  <div className="h-2 w-2 rounded-full bg-purple-400"></div>
                                </div>
                              )}
                              <span className="text-white">{module.name}</span>
                            </div>
                            <span className="text-purple-200 text-sm">{module.progress}%</span>
                          </div>
                          <Progress
                            value={module.progress}
                            className="h-1.5 bg-gray-700"
                            indicatorClassName="bg-gradient-to-r from-purple-500 to-indigo-500"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="space-y-6">
            <Card className="backdrop-blur-sm bg-white/10 border-none shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-white flex items-center">
                  <Trophy className="h-5 w-5 mr-2 text-purple-300" />
                  Your Achievements
                </CardTitle>
                <CardDescription className="text-purple-200">
                  Track your progress and unlock new achievements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {achievements.map((achievement, index) => (
                    <div 
                      key={index}
                      className={`rounded-lg p-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-1
                        ${achievement.status === "Completed" 
                          ? "bg-gradient-to-br from-yellow-900/50 to-yellow-800/30 border border-yellow-700/30" 
                          : achievement.status === "In Progress"
                            ? "bg-gradient-to-br from-purple-900/50 to-purple-800/30 border border-purple-700/30"
                            : "bg-gray-800/30 border border-gray-700/30"
                        }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-full 
                          ${achievement.status === "Completed" 
                            ? "bg-yellow-500/20" 
                            : achievement.status === "In Progress"
                              ? "bg-purple-500/20"
                              : "bg-gray-700/50"
                          }`}>
                          {achievement.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-white font-medium">{achievement.name}</h3>
                          <p className="text-purple-200 text-sm mt-1">{achievement.description}</p>
                          
                          {achievement.status === "Completed" && achievement.date && (
                            <p className="text-yellow-300 text-xs mt-2">Completed on {achievement.date}</p>
                          )}
                          
                          {achievement.status === "In Progress" && achievement.progress && (
                            <div className="mt-2">
                              <div className="flex justify-between text-xs text-purple-200 mb-1">
                                <span>Progress</span>
                                <span>{achievement.progress}%</span>
                              </div>
                              <Progress
                                value={achievement.progress}
                                className="h-1.5 bg-gray-700"
                                indicatorClassName="bg-gradient-to-r from-purple-500 to-indigo-500"
                              />
                            </div>
                          )}
                          
                          {achievement.status === "Locked" && achievement.progress && (
                            <div className="mt-2">
                              <div className="flex justify-between text-xs text-gray-400 mb-1">
                                <span>Progress</span>
                                <span>{achievement.progress}%</span>
                              </div>
                              <Progress
                                value={achievement.progress}
                                className="h-1.5 bg-gray-700"
                                indicatorClassName="bg-gray-600"
                              />
                            </div>
                          )}
                          
                          <Badge
                            className={`mt-2 ${
                              achievement.status === "Completed"
                                ? "bg-yellow-500 hover:bg-yellow-600"
                                : achievement.status === "In Progress"
                                  ? "bg-purple-700 hover:bg-purple-600"
                                  : "bg-gray-700 hover:bg-gray-600"
                            }`}
                          >
                            {achievement.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Learning Journey Tab */}
          <TabsContent value="journey" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Learning Plan */}
              <Card className="backdrop-blur-sm bg-white/10 border-none shadow-xl lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-white flex items-center">
                    <Lightbulb className="h-5 w-5 mr-2 text-purple-300" />
                    Plan Your Learning Journey
                  </CardTitle>
                  <CardDescription className="text-purple-200">
                    Set goals, track progress, and get personalized recommendations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="bg-white/5 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-white mb-3">Current Learning Goals</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="h-5 w-5 rounded-full border border-purple-400 flex items-center justify-center mr-3">
                              <div className="h-2 w-2 rounded-full bg-purple-400"></div>
                            </div>
                            <span className="text-white">Complete OOP module</span>
                          </div>
                          <Badge variant="outline" className="border-purple-400 text-purple-200">
                            In Progress
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="h-5 w-5 rounded-full border border-purple-400 flex items-center justify-center mr-3">
                              <div className="h-2 w-2 rounded-full bg-purple-400"></div>
                            </div>
                            <span className="text-white">Build a simple Java application</span>
                          </div>
                          <Badge variant="outline" className="border-purple-400 text-purple-200">
                            Planned
                          </Badge>
                        </div>
                        <Button variant="outline" className="w-full border-purple-400/30 text-purple-200 hover:bg-purple-800/30">
                          <Plus className="h-4 w-4 mr-2" />
                          Add New Goal
                        </Button>
                      </div>
                    </div>
                    
                    <div className="bg-white/5 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-white mb-3">Recommended Next Steps</h3>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all">
                          <div className="p-2 rounded-full bg-purple-500/20">
                            <BookOpen className="h-5 w-5 text-purple-300" />
                          </div>
                          <div>
                            <h4 className="text-white font-medium">Complete Collections Framework Module</h4>
                            <p className="text-purple-200 text-sm mt-1">You're 40% through this module. Complete it to unlock advanced data structures.</p>
                            <Button variant="ghost" className="p-0 h-auto text-purple-300 hover:text-white mt-2">
                              Continue <ChevronRight className="h-4 w-4 ml-1" />
                            </Button>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all">
                          <div className="p-2 rounded-full bg-purple-500/20">
                            <Target className="h-5 w-5 text-purple-300" />
                          </div>
                          <div>
                            <h4 className="text-white font-medium">Practice with Coding Challenges</h4>
                            <p className="text-purple-200 text-sm mt-1">Reinforce your OOP knowledge with hands-on coding challenges.</p>
                            <Button variant="ghost" className="p-0 h-auto text-purple-300 hover:text-white mt-2">
                              Start Challenge <ChevronRight className="h-4 w-4 ml-1" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* AI Assistant Chat */}
              <Card className="backdrop-blur-sm bg-white/10 border-none shadow-xl">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-white flex items-center justify-between">
                    <div className="flex items-center">
                      <MessageSquare className="h-5 w-5 mr-2 text-purple-300" />
                      AI Learning Assistant
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-purple-200 hover:text-white"
                      onClick={() => setIsChatOpen(!isChatOpen)}
                    >
                      {isChatOpen ? <X className="h-4 w-4" /> : <MessageSquare className="h-4 w-4" />}
                    </Button>
                  </CardTitle>
                  <CardDescription className="text-purple-200">
                    Ask questions, get help, and plan your learning
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isChatOpen ? (
                    <div className="flex flex-col h-[400px]">
                      <ScrollArea className="flex-1 pr-4">
                        <div className="space-y-4">
                          {chatMessages.map((message, index) => (
                            <div 
                              key={index} 
                              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                            >
                              <div 
                                className={`max-w-[80%] rounded-lg p-3 ${
                                  message.role === "user" 
                                    ? "bg-purple-600 text-white" 
                                    : "bg-white/10 text-purple-200"
                                }`}
                              >
                                {message.content}
                              </div>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                      <div className="flex gap-2 mt-4">
                        <Textarea 
                          placeholder="Ask a question..." 
                          className="bg-white/5 border-purple-400/30 text-white resize-none"
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                              e.preventDefault();
                              handleSendMessage();
                            }
                          }}
                        />
                        <Button 
                          className="bg-purple-600 hover:bg-purple-700 h-auto px-3"
                          onClick={handleSendMessage}
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-[400px] text-center p-4">
                      <MessageSquare className="h-12 w-12 text-purple-300 mb-4" />
                      <h3 className="text-white font-medium mb-2">Need help with Java?</h3>
                      <p className="text-purple-200 text-sm mb-4">
                        Ask questions, get explanations, or plan your learning journey with our AI assistant.
                      </p>
                      <Button 
                        className="bg-purple-600 hover:bg-purple-700"
                        onClick={() => setIsChatOpen(true)}
                      >
                        Start Chat
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default ProfileNew 