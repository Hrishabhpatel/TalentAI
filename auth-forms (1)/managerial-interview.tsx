"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Volume2, ArrowLeft, ArrowRight, CheckCircle, Clock, Crown, Target, TrendingUp, Users } from "lucide-react"
import InterviewResults from "./interview-results"

interface ManagerialInterviewProps {
  username?: string
  resumeFile?: File | null
  onBack?: () => void
}

interface Question {
  id: number
  question: string
  category: string
  type: "Strategic Leadership" | "Team Management" | "Business Acumen" | "Executive Decision Making"
  level: "Director" | "VP" | "C-Level"
  tip: string
}

export default function ManagerialInterview({ username = "User", resumeFile, onBack }: ManagerialInterviewProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<{ [key: number]: string }>({})
  const [isAnalyzing, setIsAnalyzing] = useState(true)
  const [questions, setQuestions] = useState<Question[]>([])
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)
  const [showTip, setShowTip] = useState(false)
  const [showResults, setShowResults] = useState(false)

  // Simulate resume analysis for managerial context
  useEffect(() => {
    const analyzeResume = async () => {
      setIsAnalyzing(true)

      // Simulate AI processing time
      await new Promise((resolve) => setTimeout(resolve, 3000))

      generateManagerialQuestions()
      setIsAnalyzing(false)
    }

    analyzeResume()
  }, [])

  // Timer
  useEffect(() => {
    if (!isAnalyzing && !isCompleted && !showResults) {
      const timer = setInterval(() => {
        setTimeElapsed((prev) => prev + 1)
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [isAnalyzing, isCompleted, showResults])

  const generateManagerialQuestions = () => {
    const managerialQuestions: Question[] = [
      // Strategic Leadership Questions
      {
        id: 1,
        question:
          "As a CEO/CTO, how would you develop and communicate a 5-year technology vision for a company transitioning to digital transformation?",
        category: "Vision & Strategy",
        type: "Strategic Leadership",
        level: "C-Level",
        tip: "Focus on strategic thinking, stakeholder alignment, and long-term planning. Discuss how you'd balance innovation with business objectives.",
      },
      {
        id: 2,
        question:
          "Describe how you would lead an organization through a major strategic pivot. What steps would you take to ensure buy-in from all stakeholders?",
        category: "Change Leadership",
        type: "Strategic Leadership",
        level: "C-Level",
        tip: "Emphasize change management, communication strategy, and stakeholder engagement. Show how you'd minimize resistance and maximize adoption.",
      },
      {
        id: 3,
        question:
          "How would you approach building and scaling a technology organization from 50 to 500 employees while maintaining culture and innovation?",
        category: "Organizational Growth",
        type: "Strategic Leadership",
        level: "C-Level",
        tip: "Discuss scaling challenges, culture preservation, hiring strategies, and maintaining innovation velocity during rapid growth.",
      },
      {
        id: 4,
        question:
          "As a senior leader, how would you balance short-term business pressures with long-term strategic investments in technology and innovation?",
        category: "Strategic Balance",
        type: "Strategic Leadership",
        level: "C-Level",
        tip: "Show your ability to think strategically while managing immediate business needs. Discuss ROI, risk management, and stakeholder expectations.",
      },

      // Team Management Questions
      {
        id: 5,
        question:
          "How would you build and lead a high-performing executive team? What qualities would you look for and how would you foster collaboration?",
        category: "Executive Team Building",
        type: "Team Management",
        level: "C-Level",
        tip: "Focus on leadership qualities, team dynamics, diversity, and creating an environment for executive-level collaboration and decision-making.",
      },
      {
        id: 6,
        question:
          "Describe your approach to managing and developing senior leaders who may have more domain expertise than you in certain areas.",
        category: "Senior Leadership",
        type: "Team Management",
        level: "C-Level",
        tip: "Demonstrate humility, emotional intelligence, and your ability to lead experts. Show how you'd leverage their expertise while providing strategic direction.",
      },
      {
        id: 7,
        question:
          "How would you handle a situation where two of your direct reports (VPs) have a fundamental disagreement that's affecting team performance?",
        category: "Conflict Resolution",
        type: "Team Management",
        level: "C-Level",
        tip: "Show your conflict resolution skills, ability to mediate at senior levels, and how you'd turn conflict into productive outcomes.",
      },
      {
        id: 8,
        question:
          "What's your philosophy on delegation at the executive level? How do you ensure accountability while empowering your leadership team?",
        category: "Delegation & Accountability",
        type: "Team Management",
        level: "C-Level",
        tip: "Discuss the balance between empowerment and oversight, setting clear expectations, and creating accountability systems for senior leaders.",
      },

      // Business Acumen Questions
      {
        id: 9,
        question:
          "How would you evaluate and present a major technology investment proposal to the board of directors? Walk me through your decision-making framework.",
        category: "Board Relations",
        type: "Business Acumen",
        level: "C-Level",
        tip: "Show your ability to communicate with boards, present business cases, manage stakeholder expectations, and make data-driven decisions.",
      },
      {
        id: 10,
        question:
          "As a CTO, how would you work with the CEO and other C-suite executives to align technology strategy with overall business strategy?",
        category: "C-Suite Collaboration",
        type: "Business Acumen",
        level: "C-Level",
        tip: "Demonstrate cross-functional leadership, strategic alignment, and your ability to translate technology into business value.",
      },
      {
        id: 11,
        question:
          "How would you approach mergers and acquisitions from a technology and people integration perspective?",
        category: "M&A Leadership",
        type: "Business Acumen",
        level: "C-Level",
        tip: "Discuss due diligence, integration planning, cultural alignment, technology stack consolidation, and people management during M&A.",
      },
      {
        id: 12,
        question:
          "Describe how you would build and manage relationships with key external stakeholders including investors, partners, and major clients.",
        category: "Stakeholder Management",
        type: "Business Acumen",
        level: "C-Level",
        tip: "Show your external relationship management skills, communication abilities, and how you'd represent the company at the highest levels.",
      },

      // Executive Decision Making Questions
      {
        id: 13,
        question:
          "Walk me through a time when you had to make a critical decision with incomplete information and significant consequences. How did you approach it?",
        category: "Crisis Decision Making",
        type: "Executive Decision Making",
        level: "C-Level",
        tip: "Demonstrate your decision-making process under pressure, risk assessment abilities, and how you'd communicate difficult decisions.",
      },
      {
        id: 14,
        question:
          "How would you handle a situation where you need to make layoffs or significant budget cuts while maintaining team morale and productivity?",
        category: "Difficult Decisions",
        type: "Executive Decision Making",
        level: "C-Level",
        tip: "Show empathy, strategic thinking, communication skills, and your ability to make tough decisions while preserving organizational health.",
      },
      {
        id: 15,
        question:
          "Describe your approach to ethical decision-making when business pressures conflict with your values or company principles.",
        category: "Ethical Leadership",
        type: "Executive Decision Making",
        level: "C-Level",
        tip: "Demonstrate moral leadership, principled decision-making, and how you'd navigate ethical dilemmas while considering all stakeholders.",
      },

      // Additional Strategic Questions
      {
        id: 16,
        question:
          "How would you lead a company through a major crisis (economic downturn, security breach, or market disruption)?",
        category: "Crisis Leadership",
        type: "Strategic Leadership",
        level: "C-Level",
        tip: "Show crisis management skills, communication strategy, stakeholder management, and your ability to lead through uncertainty.",
      },
      {
        id: 17,
        question:
          "What's your approach to innovation at scale? How would you foster innovation while managing operational excellence?",
        category: "Innovation Leadership",
        type: "Strategic Leadership",
        level: "C-Level",
        tip: "Discuss balancing innovation with operations, creating innovation culture, resource allocation, and measuring innovation success.",
      },
      {
        id: 18,
        question:
          "How would you approach building a diverse and inclusive leadership team, and what impact would you expect this to have on business outcomes?",
        category: "Diversity & Inclusion",
        type: "Team Management",
        level: "C-Level",
        tip: "Show commitment to D&I, understanding of business benefits, and concrete strategies for building inclusive leadership teams.",
      },
      {
        id: 19,
        question:
          "Describe how you would establish and maintain a strong company culture while scaling rapidly or during remote/hybrid work transitions.",
        category: "Culture Leadership",
        type: "Team Management",
        level: "C-Level",
        tip: "Discuss culture definition, communication strategies, remote leadership, and maintaining culture during organizational changes.",
      },
      {
        id: 20,
        question:
          "How would you measure and communicate your success as a CEO/CTO to different stakeholders (board, employees, customers, investors)?",
        category: "Performance & Communication",
        type: "Business Acumen",
        level: "C-Level",
        tip: "Show understanding of different stakeholder needs, KPI selection, communication strategies, and accountability at the executive level.",
      },
    ]

    // Select 15 questions for the interview
    setQuestions(managerialQuestions.slice(0, 15))
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
      case "Strategic Leadership":
        return "bg-purple-100 text-purple-800"
      case "Team Management":
        return "bg-blue-100 text-blue-800"
      case "Business Acumen":
        return "bg-green-100 text-green-800"
      case "Executive Decision Making":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case "C-Level":
        return "bg-gold-100 text-gold-800 border-gold-200"
      case "VP":
        return "bg-silver-100 text-silver-800 border-silver-200"
      case "Director":
        return "bg-bronze-100 text-bronze-800 border-bronze-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Strategic Leadership":
        return <Crown className="w-4 h-4" />
      case "Team Management":
        return <Users className="w-4 h-4" />
      case "Business Acumen":
        return <TrendingUp className="w-4 h-4" />
      case "Executive Decision Making":
        return <Target className="w-4 h-4" />
      default:
        return <Crown className="w-4 h-4" />
    }
  }

  if (showResults) {
    return (
      <InterviewResults
        username={username}
        interviewType="managerial"
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
            <div className="animate-spin w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full mx-auto mb-4"></div>
            <h2 className="text-2xl font-bold mb-2">Preparing Executive Leadership Interview</h2>
            <p className="text-gray-600 mb-4">Generating high-level leadership questions for CEO/CTO positions...</p>
            <div className="bg-purple-100 p-4 rounded-lg">
              <p className="text-sm text-purple-800">
                We're creating strategic leadership questions that assess your ability to lead at the executive level,
                make critical decisions, and drive organizational success.
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
            <h2 className="text-2xl font-bold mb-2">Executive Leadership Interview Completed!</h2>
            <p className="text-gray-600 mb-4">
              Outstanding work {username}! You've completed all {questions.length} executive leadership questions.
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
                View Executive Leadership Assessment
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

      {/* Executive Leadership Focus Areas */}
      <div className="max-w-4xl mx-auto mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Crown className="w-5 h-5 text-purple-600" />
              Executive Leadership Assessment
            </CardTitle>
            <CardDescription>CEO/CTO level leadership and strategic thinking evaluation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-2 p-3 bg-purple-50 rounded-lg">
                <Crown className="w-5 h-5 text-purple-600" />
                <span className="text-sm font-medium">Strategic Leadership</span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                <Users className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium">Team Management</span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium">Business Acumen</span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-red-50 rounded-lg">
                <Target className="w-5 h-5 text-red-600" />
                <span className="text-sm font-medium">Executive Decisions</span>
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
                  <Badge className="bg-amber-100 text-amber-800 border-amber-200">
                    <Crown className="w-3 h-3 mr-1" />
                    {currentQuestion.level}
                  </Badge>
                  <Badge variant="outline">{currentQuestion.category}</Badge>
                </div>
                <CardTitle className="text-xl">Executive Question {currentQuestionIndex + 1}</CardTitle>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowTip(!showTip)}
                  className="flex items-center gap-2"
                >
                  <Target className="w-4 h-4" />
                  {showTip ? "Hide Strategy" : "Show Strategy"}
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
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg border-l-4 border-purple-600">
              <p className="text-lg font-medium text-gray-900">{currentQuestion.question}</p>
            </div>

            {/* Strategy Tip Section */}
            {showTip && (
              <div className="bg-amber-50 p-4 rounded-lg border-l-4 border-amber-400">
                <div className="flex items-start gap-2">
                  <Target className="w-5 h-5 text-amber-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-amber-800 mb-1">🎯 Executive Strategy Tip</h4>
                    <p className="text-sm text-amber-700">{currentQuestion.tip}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Executive Framework Reminder */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-800 mb-2">👑 Executive Response Framework</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                <div>
                  <strong>Vision</strong> - Strategic perspective
                </div>
                <div>
                  <strong>Impact</strong> - Business outcomes
                </div>
                <div>
                  <strong>People</strong> - Leadership approach
                </div>
                <div>
                  <strong>Execution</strong> - Implementation plan
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
                  Your Executive Response:
                </label>
                <Textarea
                  id="answer"
                  placeholder="Provide a strategic, executive-level response covering vision, impact, people, and execution..."
                  value={answers[currentQuestion.id] || ""}
                  onChange={(e) => handleAnswerChange(e.target.value)}
                  className="min-h-[180px] resize-none"
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

              <Button onClick={goToNextQuestion} className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700">
                {currentQuestionIndex === questions.length - 1 ? "Complete Assessment" : "Next Question"}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Progress Bar */}
        <div className="mt-6">
          <div className="bg-white rounded-lg p-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Executive Assessment Progress</span>
              <span>{Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
