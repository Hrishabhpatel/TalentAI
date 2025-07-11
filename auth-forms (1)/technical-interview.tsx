"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Volume2, ArrowLeft, ArrowRight, CheckCircle, Clock } from "lucide-react"
import InterviewResults from "./interview-results"

interface TechnicalInterviewProps {
  username?: string
  resumeFile?: File | null
  onBack?: () => void
}

interface Question {
  id: number
  question: string
  category: string
  difficulty: "Easy" | "Medium" | "Hard"
}

export default function TechnicalInterview({ username = "User", resumeFile, onBack }: TechnicalInterviewProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<{ [key: number]: string }>({})
  const [isAnalyzing, setIsAnalyzing] = useState(true)
  const [extractedSkills, setExtractedSkills] = useState<string[]>([])
  const [questions, setQuestions] = useState<Question[]>([])
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)
  const [showResults, setShowResults] = useState(false)

  // Simulate AI resume analysis
  useEffect(() => {
    const analyzeResume = async () => {
      setIsAnalyzing(true)

      // Simulate AI processing time
      await new Promise((resolve) => setTimeout(resolve, 3000))

      // Mock extracted technical skills (in real app, this would come from AI analysis)
      const mockSkills = [
        "Java",
        "JavaScript",
        "React.js",
        "Node.js",
        "SQL",
        "MongoDB",
        "Python",
        "Spring Boot",
        "REST API",
        "Git",
        "Docker",
        "AWS",
        "HTML",
        "CSS",
        "TypeScript",
        "Express.js",
      ]

      setExtractedSkills(mockSkills)
      generateQuestions(mockSkills)
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

  const generateQuestions = (skills: string[]) => {
    const questionBank: Question[] = [
      // Java Questions
      { id: 1, question: "What is Java and what are its key features?", category: "Java", difficulty: "Easy" },
      {
        id: 2,
        question: "Explain the difference between JDK, JRE, and JVM in Java.",
        category: "Java",
        difficulty: "Medium",
      },
      {
        id: 3,
        question: "What is Object-Oriented Programming and how does Java implement it?",
        category: "Java",
        difficulty: "Medium",
      },

      // JavaScript Questions
      {
        id: 4,
        question: "What is JavaScript and how does it differ from Java?",
        category: "JavaScript",
        difficulty: "Easy",
      },
      {
        id: 5,
        question: "Explain closures in JavaScript with an example.",
        category: "JavaScript",
        difficulty: "Hard",
      },
      {
        id: 6,
        question: "What are Promises in JavaScript and how do they work?",
        category: "JavaScript",
        difficulty: "Medium",
      },

      // React.js Questions
      {
        id: 7,
        question: "What is React.js and what problems does it solve?",
        category: "React.js",
        difficulty: "Easy",
      },
      {
        id: 8,
        question: "Explain the difference between state and props in React.",
        category: "React.js",
        difficulty: "Medium",
      },
      {
        id: 9,
        question: "What are React Hooks and why were they introduced?",
        category: "React.js",
        difficulty: "Medium",
      },
      { id: 10, question: "How does Virtual DOM work in React?", category: "React.js", difficulty: "Hard" },

      // SQL Questions
      { id: 11, question: "What is SQL and what are its main components?", category: "SQL", difficulty: "Easy" },
      {
        id: 12,
        question: "Explain the difference between INNER JOIN and LEFT JOIN.",
        category: "SQL",
        difficulty: "Medium",
      },
      {
        id: 13,
        question: "What is database normalization and why is it important?",
        category: "SQL",
        difficulty: "Hard",
      },

      // Node.js Questions
      {
        id: 14,
        question: "What is Node.js and what makes it different from traditional server-side technologies?",
        category: "Node.js",
        difficulty: "Medium",
      },
      { id: 15, question: "Explain the event loop in Node.js.", category: "Node.js", difficulty: "Hard" },

      // General Programming Questions
      {
        id: 16,
        question: "What is the difference between synchronous and asynchronous programming?",
        category: "General",
        difficulty: "Medium",
      },
      {
        id: 17,
        question: "Explain what REST API is and its key principles.",
        category: "REST API",
        difficulty: "Medium",
      },
      { id: 18, question: "What is version control and why is Git important?", category: "Git", difficulty: "Easy" },
      {
        id: 19,
        question: "What is Docker and how does containerization work?",
        category: "Docker",
        difficulty: "Hard",
      },
      {
        id: 20,
        question: "Explain the basics of cloud computing and AWS services.",
        category: "AWS",
        difficulty: "Medium",
      },
    ]

    // Filter questions based on extracted skills
    const relevantQuestions = questionBank.filter((q) =>
      skills.some(
        (skill) =>
          skill.toLowerCase().includes(q.category.toLowerCase()) ||
          q.category.toLowerCase().includes(skill.toLowerCase()),
      ),
    )

    // Ensure we have at least 15 questions
    const finalQuestions =
      relevantQuestions.length >= 15
        ? relevantQuestions.slice(0, 15)
        : [...relevantQuestions, ...questionBank.slice(0, 15 - relevantQuestions.length)]

    setQuestions(finalQuestions)
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
    } else {
      handleComplete()
    }
  }

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Hard":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (isAnalyzing) {
    return (
      <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl">
          <CardContent className="p-8 text-center">
            <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
            <h2 className="text-2xl font-bold mb-2">Analyzing Your Resume</h2>
            <p className="text-gray-600 mb-4">Our AI is extracting technical skills from your resume...</p>
            <div className="bg-blue-100 p-4 rounded-lg">
              <p className="text-sm text-blue-800">
                This may take a few moments. We're identifying your technical expertise to create personalized
                questions.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (showResults) {
    return (
      <InterviewResults
        username={username}
        interviewType="technical"
        questions={questions}
        answers={answers}
        timeElapsed={timeElapsed}
        onBack={onBack}
        onRetakeInterview={() => {
          setShowResults(false)
          setCurrentQuestionIndex(0)
          setAnswers({})
          setTimeElapsed(0)
        }}
      />
    )
  }

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl">
          <CardContent className="p-8 text-center">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Interview Completed!</h2>
            <p className="text-gray-600 mb-4">
              Great job {username}! You've completed all {questions.length} technical questions.
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
                View Results & Feedback
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

      {/* Skills Extracted */}
      <div className="max-w-4xl mx-auto mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Technical Skills Identified</CardTitle>
            <CardDescription>Based on your resume analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {extractedSkills.map((skill, index) => (
                <Badge key={index} variant="secondary">
                  {skill}
                </Badge>
              ))}
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
                  <Badge className={getDifficultyColor(currentQuestion.difficulty)}>{currentQuestion.difficulty}</Badge>
                  <Badge variant="outline">{currentQuestion.category}</Badge>
                </div>
                <CardTitle className="text-xl">Question {currentQuestionIndex + 1}</CardTitle>
              </div>
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
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Question */}
            <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-600">
              <p className="text-lg font-medium text-blue-900">{currentQuestion.question}</p>
            </div>

            {/* Answer Section with spacing */}
            <div className="space-y-4">
              <div className="h-4"></div> {/* Spacer */}
              <div className="h-4"></div> {/* Spacer */}
              <div className="h-4"></div> {/* Spacer */}
              <div className="h-4"></div> {/* Spacer */}
              <div>
                <label htmlFor="answer" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Answer:
                </label>
                <Textarea
                  id="answer"
                  placeholder="Type your answer here..."
                  value={answers[currentQuestion.id] || ""}
                  onChange={(e) => handleAnswerChange(e.target.value)}
                  className="min-h-[120px] resize-none"
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
