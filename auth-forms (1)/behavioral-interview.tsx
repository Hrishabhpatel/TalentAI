"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Volume2, ArrowLeft, ArrowRight, CheckCircle, Clock, Users, Target, Lightbulb } from "lucide-react"
import InterviewResults from "./interview-results"

interface BehavioralInterviewProps {
  username?: string
  resumeFile?: File | null
  onBack?: () => void
}

interface Question {
  id: number
  question: string
  category: string
  type: "Soft Skills" | "Project Experience" | "Leadership" | "Problem Solving"
  tip: string
}

export default function BehavioralInterview({ username = "User", resumeFile, onBack }: BehavioralInterviewProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<{ [key: number]: string }>({})
  const [isAnalyzing, setIsAnalyzing] = useState(true)
  const [questions, setQuestions] = useState<Question[]>([])
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)
  const [showTip, setShowTip] = useState(false)
  const [showResults, setShowResults] = useState(false)

  // Simulate resume analysis for behavioral context
  useEffect(() => {
    const analyzeResume = async () => {
      setIsAnalyzing(true)

      // Simulate AI processing time
      await new Promise((resolve) => setTimeout(resolve, 2500))

      generateBehavioralQuestions()
      setIsAnalyzing(false)
    }

    analyzeResume()
  }, [])

  // Timer
  useEffect(() => {
    if (!isAnalyzing && !isCompleted) {
      const timer = setInterval(() => {
        setTimeElapsed((prev) => prev + 1)
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [isAnalyzing, isCompleted])

  const generateBehavioralQuestions = () => {
    const behavioralQuestions: Question[] = [
      // Soft Skills Questions
      {
        id: 1,
        question:
          "Tell me about a time when you had to work with a difficult team member. How did you handle the situation?",
        category: "Teamwork",
        type: "Soft Skills",
        tip: "Use the STAR method: Situation, Task, Action, Result. Focus on your communication and conflict resolution skills.",
      },
      {
        id: 2,
        question:
          "Describe a situation where you had to communicate complex technical information to non-technical stakeholders.",
        category: "Communication",
        type: "Soft Skills",
        tip: "Highlight your ability to simplify complex concepts and adapt your communication style to your audience.",
      },
      {
        id: 3,
        question: "Give me an example of a time when you had to learn a new skill quickly to complete a project.",
        category: "Adaptability",
        type: "Soft Skills",
        tip: "Show your learning agility and how you approach acquiring new knowledge under pressure.",
      },
      {
        id: 4,
        question: "Tell me about a time when you had to give constructive feedback to a colleague or team member.",
        category: "Communication",
        type: "Soft Skills",
        tip: "Demonstrate your emotional intelligence and ability to provide feedback diplomatically.",
      },
      {
        id: 5,
        question: "Describe a situation where you had to manage multiple priorities with tight deadlines.",
        category: "Time Management",
        type: "Soft Skills",
        tip: "Show your organizational skills and ability to prioritize effectively under pressure.",
      },

      // Project Experience Questions
      {
        id: 6,
        question:
          "Walk me through a challenging project you worked on. What made it challenging and how did you overcome those challenges?",
        category: "Project Management",
        type: "Project Experience",
        tip: "Choose a project that showcases your problem-solving abilities and technical skills.",
      },
      {
        id: 7,
        question: "Tell me about a project where you had to work with limited resources or budget constraints.",
        category: "Resource Management",
        type: "Project Experience",
        tip: "Highlight your creativity and ability to deliver results despite limitations.",
      },
      {
        id: 8,
        question: "Describe a project that didn't go as planned. What went wrong and what did you learn from it?",
        category: "Failure & Learning",
        type: "Project Experience",
        tip: "Show accountability, learning mindset, and how you apply lessons learned to future projects.",
      },
      {
        id: 9,
        question: "Tell me about a time when you had to collaborate with cross-functional teams on a project.",
        category: "Collaboration",
        type: "Project Experience",
        tip: "Demonstrate your ability to work across different departments and coordinate diverse skill sets.",
      },
      {
        id: 10,
        question:
          "Describe a project where you had to implement a solution that improved efficiency or solved a business problem.",
        category: "Innovation",
        type: "Project Experience",
        tip: "Focus on the business impact and measurable results of your solution.",
      },

      // Leadership Questions
      {
        id: 11,
        question:
          "Tell me about a time when you had to lead a team or take initiative on a project without being formally assigned as the leader.",
        category: "Leadership",
        type: "Leadership",
        tip: "Show your natural leadership qualities and ability to influence without authority.",
      },
      {
        id: 12,
        question: "Describe a situation where you had to motivate a team member who was underperforming or disengaged.",
        category: "Team Management",
        type: "Leadership",
        tip: "Demonstrate your coaching abilities and emotional intelligence in handling team dynamics.",
      },
      {
        id: 13,
        question:
          "Give me an example of a time when you had to make a difficult decision that affected your team or project.",
        category: "Decision Making",
        type: "Leadership",
        tip: "Show your decision-making process and how you consider the impact on all stakeholders.",
      },

      // Problem Solving Questions
      {
        id: 14,
        question:
          "Tell me about a time when you identified a problem that others had overlooked. How did you approach solving it?",
        category: "Critical Thinking",
        type: "Problem Solving",
        tip: "Highlight your analytical skills and proactive approach to identifying issues.",
      },
      {
        id: 15,
        question:
          "Describe a situation where you had to solve a problem with incomplete information or unclear requirements.",
        category: "Analytical Thinking",
        type: "Problem Solving",
        tip: "Show how you gather information, make assumptions, and validate your approach.",
      },
      {
        id: 16,
        question: "Tell me about a time when you had to think outside the box to solve a challenging problem.",
        category: "Creative Problem Solving",
        type: "Problem Solving",
        tip: "Demonstrate your creativity and ability to find innovative solutions.",
      },
      {
        id: 17,
        question: "Describe a situation where you had to handle a crisis or urgent problem under pressure.",
        category: "Crisis Management",
        type: "Problem Solving",
        tip: "Show your ability to stay calm, think clearly, and take decisive action under pressure.",
      },

      // Additional Soft Skills
      {
        id: 18,
        question:
          "Tell me about a time when you had to adapt to a significant change in your work environment or project requirements.",
        category: "Change Management",
        type: "Soft Skills",
        tip: "Demonstrate your flexibility and positive attitude toward change.",
      },
      {
        id: 19,
        question: "Describe a situation where you went above and beyond what was expected of you.",
        category: "Initiative",
        type: "Soft Skills",
        tip: "Show your proactive nature and commitment to excellence.",
      },
      {
        id: 20,
        question: "Tell me about a time when you had to build relationships with new stakeholders or clients.",
        category: "Relationship Building",
        type: "Soft Skills",
        tip: "Highlight your interpersonal skills and ability to establish trust and rapport.",
      },
    ]

    // Select 15 questions for the interview
    setQuestions(behavioralQuestions.slice(0, 15))
  }

  const speakQuestion = (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 0.8
      utterance.pitch = 1
      utterance.volume = 1
      speechSynthesis.speak(utterance)
    } else {
      alert("Text-to-speech is not supported in your browser")
    }
  }

  const handleAnswerChange = (value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questions[currentQuestionIndex].id]: value,
    }))
  }

  const handleComplete = () => {
    setShowResults(true)
  }

  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
      setShowTip(false)
    } else {
      handleComplete()
    }
  }

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1)
      setShowTip(false)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Soft Skills":
        return "bg-blue-100 text-blue-800"
      case "Project Experience":
        return "bg-green-100 text-green-800"
      case "Leadership":
        return "bg-purple-100 text-purple-800"
      case "Problem Solving":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Soft Skills":
        return <Users className="w-4 h-4" />
      case "Project Experience":
        return <Target className="w-4 h-4" />
      case "Leadership":
        return <Users className="w-4 h-4" />
      case "Problem Solving":
        return <Lightbulb className="w-4 h-4" />
      default:
        return <Users className="w-4 h-4" />
    }
  }

  if (showResults) {
    return (
      <InterviewResults
        username={username}
        interviewType="behavioral"
        questions={questions}
        answers={answers}
        timeElapsed={timeElapsed}
        onBack={onBack}
        onRetakeInterview={() => {
          setShowResults(false)
          setCurrentQuestionIndex(0)
          setAnswers({})
          setTimeElapsed(0)
          setShowTip(false)
        }}
      />
    )
  }

  if (isAnalyzing) {
    return (
      <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl">
          <CardContent className="p-8 text-center">
            <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
            <h2 className="text-2xl font-bold mb-2">Preparing Behavioral Interview</h2>
            <p className="text-gray-600 mb-4">
              Generating personalized questions based on soft skills and project experience...
            </p>
            <div className="bg-blue-100 p-4 rounded-lg">
              <p className="text-sm text-blue-800">
                We're creating questions that will help assess your communication, leadership, and problem-solving
                abilities.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl">
          <CardContent className="p-8 text-center">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Behavioral Interview Completed!</h2>
            <p className="text-gray-600 mb-4">
              Excellent work {username}! You've completed all {questions.length} behavioral questions.
            </p>
            <div className="bg-green-100 p-4 rounded-lg mb-6">
              <p className="text-green-800">Time taken: {formatTime(timeElapsed)}</p>
              <p className="text-green-800">
                Questions answered: {Object.keys(answers).length}/{questions.length}
              </p>
            </div>
            <div className="space-y-2">
              <Button onClick={onBack} className="w-full">
                Back to Dashboard
              </Button>
              <Button variant="outline" className="w-full">
                View Behavioral Assessment Results
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const currentQuestion = questions[currentQuestionIndex]

  return (
    <div className="min-h-screen bg-blue-50 p-4">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-6">
        <div className="flex justify-between items-center">
          <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              {formatTime(timeElapsed)}
            </div>
            <Badge variant="outline">
              Question {currentQuestionIndex + 1} of {questions.length}
            </Badge>
          </div>
        </div>
      </div>

      {/* Interview Focus Areas */}
      <div className="max-w-4xl mx-auto mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Behavioral Interview Focus Areas</CardTitle>
            <CardDescription>This interview assesses your soft skills and project experience</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                <Users className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium">Soft Skills</span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                <Target className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium">Project Experience</span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-purple-50 rounded-lg">
                <Users className="w-5 h-5 text-purple-600" />
                <span className="text-sm font-medium">Leadership</span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-orange-50 rounded-lg">
                <Lightbulb className="w-5 h-5 text-orange-600" />
                <span className="text-sm font-medium">Problem Solving</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Interview Section */}
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge className={getTypeColor(currentQuestion.type)}>
                    <div className="flex items-center gap-1">
                      {getTypeIcon(currentQuestion.type)}
                      {currentQuestion.type}
                    </div>
                  </Badge>
                  <Badge variant="outline">{currentQuestion.category}</Badge>
                </div>
                <CardTitle className="text-xl">Question {currentQuestionIndex + 1}</CardTitle>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowTip(!showTip)}
                  className="flex items-center gap-2"
                >
                  <Lightbulb className="w-4 h-4" />
                  {showTip ? "Hide Tip" : "Show Tip"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => speakQuestion(currentQuestion.question)}
                  className="flex items-center gap-2"
                >
                  <Volume2 className="w-4 h-4" />
                  Speak
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Question */}
            <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-600">
              <p className="text-lg font-medium text-blue-900">{currentQuestion.question}</p>
            </div>

            {/* Tip Section */}
            {showTip && (
              <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
                <div className="flex items-start gap-2">
                  <Lightbulb className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-yellow-800 mb-1">💡 Interview Tip</h4>
                    <p className="text-sm text-yellow-700">{currentQuestion.tip}</p>
                  </div>
                </div>
              </div>
            )}

            {/* STAR Method Reminder */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-800 mb-2">📝 STAR Method Framework</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                <div>
                  <strong>S</strong>ituation - Context
                </div>
                <div>
                  <strong>T</strong>ask - Your responsibility
                </div>
                <div>
                  <strong>A</strong>ction - What you did
                </div>
                <div>
                  <strong>R</strong>esult - The outcome
                </div>
              </div>
            </div>

            {/* Answer Section with spacing */}
            <div className="space-y-4">
              <div className="h-4"></div> {/* Spacer */}
              <div className="h-4"></div> {/* Spacer */}
              <div className="h-4"></div> {/* Spacer */}
              <div className="h-4"></div> {/* Spacer */}
              <div>
                <label htmlFor="answer" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Answer (Use the STAR method):
                </label>
                <Textarea
                  id="answer"
                  placeholder="Describe the Situation, Task, Action you took, and the Result..."
                  value={answers[currentQuestion.id] || ""}
                  onChange={(e) => handleAnswerChange(e.target.value)}
                  className="min-h-[150px] resize-none"
                />
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center pt-4">
              <Button
                variant="outline"
                onClick={goToPreviousQuestion}
                disabled={currentQuestionIndex === 0}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous
              </Button>

              <div className="text-sm text-gray-500">
                {Object.keys(answers).length} of {questions.length} answered
              </div>

              <Button onClick={goToNextQuestion} className="flex items-center gap-2">
                {currentQuestionIndex === questions.length - 1 ? "Complete Interview" : "Next Question"}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Progress Bar */}
        <div className="mt-6">
          <div className="bg-white rounded-lg p-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Progress</span>
              <span>{Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
