"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  CheckCircle,
  XCircle,
  AlertCircle,
  TrendingUp,
  Brain,
  Target,
  ArrowLeft,
  Download,
  Share,
  Lightbulb,
  Star,
} from "lucide-react"

interface Question {
  id: number
  question: string
  category: string
  type?: string
  difficulty?: string
  level?: string
}

interface AnswerAnalysis {
  questionId: number
  score: number // 0-100
  status: "excellent" | "good" | "needs_improvement" | "poor"
  feedback: string
  strengths: string[]
  improvements: string[]
  suggestedAnswer?: string
}

interface InterviewResultsProps {
  username?: string
  interviewType: "technical" | "behavioral" | "managerial"
  questions: Question[]
  answers: { [key: number]: string }
  timeElapsed: number
  onBack?: () => void
  onRetakeInterview?: () => void
}

export default function InterviewResults({
  username = "User",
  interviewType,
  questions,
  answers,
  timeElapsed,
  onBack,
  onRetakeInterview,
}: InterviewResultsProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(true)
  const [analysisResults, setAnalysisResults] = useState<AnswerAnalysis[]>([])
  const [overallScore, setOverallScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [isDownloading, setIsDownloading] = useState(false)

  // Simulate AI analysis
  useEffect(() => {
    const analyzeAnswers = async () => {
      setIsAnalyzing(true)

      // Simulate AI processing time
      await new Promise((resolve) => setTimeout(resolve, 4000))

      const results = generateAIAnalysis()
      setAnalysisResults(results)

      // Calculate overall score
      const totalScore = results.reduce((sum, result) => sum + result.score, 0)
      const avgScore = Math.round(totalScore / results.length)
      setOverallScore(avgScore)

      setIsAnalyzing(false)
    }

    analyzeAnswers()
  }, [])

  const generateAIAnalysis = (): AnswerAnalysis[] => {
    return questions.map((question) => {
      const answer = answers[question.id] || ""
      const wordCount = answer.split(" ").length

      // Simulate AI scoring based on answer length and content
      const baseScore = Math.min(wordCount * 2, 85) // Base score from word count
      const hasKeywords = checkForKeywords(answer, question, interviewType)
      const structureScore = checkAnswerStructure(answer, interviewType)

      let finalScore = Math.min(baseScore + hasKeywords + structureScore, 100)
      finalScore = Math.max(finalScore, 20) // Minimum score

      // Add some randomization for realism
      finalScore += Math.floor(Math.random() * 10) - 5

      const status = getScoreStatus(finalScore)
      const feedback = generateFeedback(finalScore, question, interviewType, answer)
      const strengths = generateStrengths(finalScore, answer, interviewType)
      const improvements = generateImprovements(finalScore, answer, interviewType)

      return {
        questionId: question.id,
        score: Math.max(0, Math.min(100, finalScore)),
        status,
        feedback,
        strengths,
        improvements,
        suggestedAnswer: generateSuggestedAnswer(question, interviewType),
      }
    })
  }

  const checkForKeywords = (answer: string, question: Question, type: string): number => {
    const lowerAnswer = answer.toLowerCase()
    let keywordScore = 0

    if (type === "technical") {
      const techKeywords = ["algorithm", "data structure", "performance", "scalability", "testing", "debugging"]
      keywordScore = techKeywords.filter((keyword) => lowerAnswer.includes(keyword)).length * 3
    } else if (type === "behavioral") {
      const behavioralKeywords = ["situation", "task", "action", "result", "team", "challenge", "learned"]
      keywordScore = behavioralKeywords.filter((keyword) => lowerAnswer.includes(keyword)).length * 3
    } else if (type === "managerial") {
      const managerialKeywords = ["strategy", "vision", "stakeholder", "decision", "leadership", "impact", "business"]
      keywordScore = managerialKeywords.filter((keyword) => lowerAnswer.includes(keyword)).length * 3
    }

    return Math.min(keywordScore, 15)
  }

  const checkAnswerStructure = (answer: string, type: string): number => {
    const sentences = answer.split(".").filter((s) => s.trim().length > 0)
    const paragraphs = answer.split("\n").filter((p) => p.trim().length > 0)

    let structureScore = 0

    // Check for good structure
    if (sentences.length >= 3) structureScore += 5
    if (paragraphs.length >= 2) structureScore += 5
    if (answer.length > 200) structureScore += 5

    // Type-specific structure checks
    if (type === "behavioral" && (answer.includes("situation") || answer.includes("example"))) {
      structureScore += 5
    }
    if (type === "managerial" && (answer.includes("strategy") || answer.includes("approach"))) {
      structureScore += 5
    }

    return Math.min(structureScore, 10)
  }

  const getScoreStatus = (score: number): "excellent" | "good" | "needs_improvement" | "poor" => {
    if (score >= 85) return "excellent"
    if (score >= 70) return "good"
    if (score >= 50) return "needs_improvement"
    return "poor"
  }

  const generateFeedback = (score: number, question: Question, type: string, answer: string): string => {
    const feedbacks = {
      excellent: [
        "Outstanding response! Your answer demonstrates deep understanding and excellent communication skills.",
        "Exceptional answer with clear structure and comprehensive coverage of key points.",
        "Excellent response showing strong analytical thinking and practical experience.",
      ],
      good: [
        "Good response with solid understanding. Consider adding more specific examples.",
        "Well-structured answer. You could enhance it with more detailed explanations.",
        "Good grasp of the concept. Adding more context would make it even stronger.",
      ],
      needs_improvement: [
        "Your answer shows basic understanding but needs more depth and specific examples.",
        "Consider providing more detailed explanations and real-world applications.",
        "The response could be improved with better structure and more comprehensive coverage.",
      ],
      poor: [
        "This answer needs significant improvement. Consider researching the topic more thoroughly.",
        "The response lacks depth and clarity. Focus on providing specific examples and explanations.",
        "This answer would benefit from more preparation and structured thinking.",
      ],
    }

    const status = getScoreStatus(score)
    const feedbackOptions = feedbacks[status]
    return feedbackOptions[Math.floor(Math.random() * feedbackOptions.length)]
  }

  const generateStrengths = (score: number, answer: string, type: string): string[] => {
    const allStrengths = {
      technical: [
        "Clear technical explanation",
        "Good understanding of concepts",
        "Practical implementation details",
        "Performance considerations mentioned",
        "Best practices included",
      ],
      behavioral: [
        "Clear situation description",
        "Good use of STAR method",
        "Demonstrates leadership skills",
        "Shows problem-solving ability",
        "Reflects on lessons learned",
      ],
      managerial: [
        "Strategic thinking demonstrated",
        "Stakeholder consideration",
        "Business impact awareness",
        "Leadership approach outlined",
        "Long-term vision articulated",
      ],
    }

    const typeStrengths = allStrengths[type] || allStrengths.technical
    const numStrengths = Math.min(Math.floor(score / 25) + 1, 3)
    return typeStrengths.slice(0, numStrengths)
  }

  const generateImprovements = (score: number, answer: string, type: string): string[] => {
    const allImprovements = {
      technical: [
        "Add more specific technical details",
        "Include performance metrics",
        "Discuss edge cases and error handling",
        "Mention testing strategies",
        "Consider scalability aspects",
      ],
      behavioral: [
        "Use more specific examples",
        "Quantify results and impact",
        "Elaborate on lessons learned",
        "Describe team dynamics better",
        "Include more context about challenges",
      ],
      managerial: [
        "Provide more strategic context",
        "Discuss stakeholder impact",
        "Include business metrics",
        "Elaborate on change management",
        "Address risk considerations",
      ],
    }

    const typeImprovements = allImprovements[type] || allImprovements.technical
    const numImprovements = Math.max(1, Math.floor((100 - score) / 25))
    return typeImprovements.slice(0, numImprovements)
  }

  const generateSuggestedAnswer = (question: Question, type: string): string => {
    // This would typically come from an AI model, but we'll provide sample suggestions
    const suggestions = {
      technical:
        "A comprehensive technical answer should include: 1) Clear explanation of the concept, 2) Practical implementation details, 3) Performance considerations, 4) Best practices, and 5) Real-world examples.",
      behavioral:
        "An effective behavioral answer should follow the STAR method: 1) Situation - provide context, 2) Task - explain your responsibility, 3) Action - describe what you did, 4) Result - share the outcome and lessons learned.",
      managerial:
        "A strong executive response should cover: 1) Strategic vision and approach, 2) Stakeholder considerations, 3) Business impact and metrics, 4) Implementation plan, and 5) Risk management and mitigation strategies.",
    }

    return suggestions[type] || suggestions.technical
  }

  const downloadPDFReport = async () => {
    setIsDownloading(true)

    try {
      // Dynamic import of jsPDF
      const { jsPDF } = await import("jspdf")

      const doc = new jsPDF()
      const pageWidth = doc.internal.pageSize.width
      const pageHeight = doc.internal.pageSize.height
      let yPosition = 20

      // Helper function to add text with word wrapping
      const addWrappedText = (text: string, x: number, y: number, maxWidth: number, fontSize = 10) => {
        doc.setFontSize(fontSize)
        const lines = doc.splitTextToSize(text, maxWidth)
        doc.text(lines, x, y)
        return y + lines.length * (fontSize * 0.4)
      }

      // Helper function to check if we need a new page
      const checkNewPage = (requiredSpace: number) => {
        if (yPosition + requiredSpace > pageHeight - 20) {
          doc.addPage()
          yPosition = 20
        }
      }

      // Title
      doc.setFontSize(20)
      doc.setFont("helvetica", "bold")
      doc.text("Interview Performance Report", pageWidth / 2, yPosition, { align: "center" })
      yPosition += 15

      // Interview Type and User Info
      doc.setFontSize(14)
      doc.setFont("helvetica", "normal")
      doc.text(
        `${interviewType.charAt(0).toUpperCase() + interviewType.slice(1)} Interview`,
        pageWidth / 2,
        yPosition,
        {
          align: "center",
        },
      )
      yPosition += 10

      doc.setFontSize(12)
      doc.text(`Candidate: ${username}`, 20, yPosition)
      yPosition += 8
      doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, yPosition)
      yPosition += 8
      doc.text(`Time Taken: ${formatTime(timeElapsed)}`, 20, yPosition)
      yPosition += 15

      // Overall Performance
      doc.setFontSize(16)
      doc.setFont("helvetica", "bold")
      doc.text("Overall Performance", 20, yPosition)
      yPosition += 10

      doc.setFontSize(12)
      doc.setFont("helvetica", "normal")
      doc.text(`Overall Score: ${overallScore}%`, 20, yPosition)
      yPosition += 8

      const excellentCount = analysisResults.filter((r) => r.status === "excellent").length
      const goodCount = analysisResults.filter((r) => r.status === "good").length
      const needsImprovementCount = analysisResults.filter((r) => r.status === "needs_improvement").length
      const poorCount = analysisResults.filter((r) => r.status === "poor").length

      doc.text(`Questions Answered: ${Object.keys(answers).length}/${questions.length}`, 20, yPosition)
      yPosition += 8
      doc.text(`Excellent Responses: ${excellentCount}`, 20, yPosition)
      yPosition += 6
      doc.text(`Good Responses: ${goodCount}`, 20, yPosition)
      yPosition += 6
      doc.text(`Needs Improvement: ${needsImprovementCount}`, 20, yPosition)
      yPosition += 6
      doc.text(`Poor Responses: ${poorCount}`, 20, yPosition)
      yPosition += 15

      // Detailed Question Analysis
      doc.setFontSize(16)
      doc.setFont("helvetica", "bold")
      doc.text("Detailed Question Analysis", 20, yPosition)
      yPosition += 15

      analysisResults.forEach((result, index) => {
        const question = questions.find((q) => q.id === result.questionId)
        const answer = answers[result.questionId] || "No answer provided"

        checkNewPage(60) // Check if we need space for the question block

        // Question number and score
        doc.setFontSize(14)
        doc.setFont("helvetica", "bold")
        doc.text(`Question ${index + 1} - Score: ${result.score}%`, 20, yPosition)
        yPosition += 8

        // Status
        doc.setFontSize(10)
        doc.setFont("helvetica", "normal")
        doc.text(`Status: ${result.status.replace("_", " ").toUpperCase()}`, 20, yPosition)
        yPosition += 8

        // Question text
        doc.setFontSize(10)
        doc.setFont("helvetica", "bold")
        doc.text("Question:", 20, yPosition)
        yPosition += 5
        doc.setFont("helvetica", "normal")
        yPosition = addWrappedText(question?.question || "", 20, yPosition, pageWidth - 40, 9)
        yPosition += 5

        // Answer
        doc.setFont("helvetica", "bold")
        doc.text("Your Answer:", 20, yPosition)
        yPosition += 5
        doc.setFont("helvetica", "normal")
        yPosition = addWrappedText(
          answer.substring(0, 300) + (answer.length > 300 ? "..." : ""),
          20,
          yPosition,
          pageWidth - 40,
          9,
        )
        yPosition += 5

        // Feedback
        doc.setFont("helvetica", "bold")
        doc.text("AI Feedback:", 20, yPosition)
        yPosition += 5
        doc.setFont("helvetica", "normal")
        yPosition = addWrappedText(result.feedback, 20, yPosition, pageWidth - 40, 9)
        yPosition += 5

        // Strengths
        if (result.strengths.length > 0) {
          doc.setFont("helvetica", "bold")
          doc.text("Strengths:", 20, yPosition)
          yPosition += 5
          doc.setFont("helvetica", "normal")
          result.strengths.forEach((strength) => {
            yPosition = addWrappedText(`• ${strength}`, 25, yPosition, pageWidth - 50, 9)
          })
          yPosition += 3
        }

        // Areas for Improvement
        if (result.improvements.length > 0) {
          doc.setFont("helvetica", "bold")
          doc.text("Areas for Improvement:", 20, yPosition)
          yPosition += 5
          doc.setFont("helvetica", "normal")
          result.improvements.forEach((improvement) => {
            yPosition = addWrappedText(`• ${improvement}`, 25, yPosition, pageWidth - 50, 9)
          })
          yPosition += 3
        }

        yPosition += 10 // Space between questions
      })

      // Recommendations section
      checkNewPage(40)
      doc.setFontSize(16)
      doc.setFont("helvetica", "bold")
      doc.text("Recommendations", 20, yPosition)
      yPosition += 15

      doc.setFontSize(12)
      doc.setFont("helvetica", "bold")
      doc.text("Continue Doing:", 20, yPosition)
      yPosition += 8
      doc.setFont("helvetica", "normal")
      yPosition = addWrappedText("• Providing structured and detailed responses", 25, yPosition, pageWidth - 50, 10)
      yPosition = addWrappedText("• Using relevant examples and experiences", 25, yPosition, pageWidth - 50, 10)
      yPosition = addWrappedText("• Demonstrating good understanding of concepts", 25, yPosition, pageWidth - 50, 10)
      yPosition += 10

      doc.setFont("helvetica", "bold")
      doc.text("Focus Areas:", 20, yPosition)
      yPosition += 8
      doc.setFont("helvetica", "normal")
      yPosition = addWrappedText(
        "• Add more specific metrics and quantifiable results",
        25,
        yPosition,
        pageWidth - 50,
        10,
      )
      yPosition = addWrappedText("• Include more detailed implementation strategies", 25, yPosition, pageWidth - 50, 10)
      yPosition = addWrappedText(
        "• Practice articulating complex concepts more clearly",
        25,
        yPosition,
        pageWidth - 50,
        10,
      )
      yPosition += 10

      doc.setFont("helvetica", "bold")
      doc.text("Next Steps:", 20, yPosition)
      yPosition += 8
      doc.setFont("helvetica", "normal")
      yPosition = addWrappedText("1. Review the detailed feedback for each question", 25, yPosition, pageWidth - 50, 10)
      yPosition = addWrappedText(
        "2. Practice answering similar questions with the suggested improvements",
        25,
        yPosition,
        pageWidth - 50,
        10,
      )
      yPosition = addWrappedText(
        "3. Consider retaking the interview to track your progress",
        25,
        yPosition,
        pageWidth - 50,
        10,
      )
      yPosition = addWrappedText(
        "4. Focus on the areas marked as 'needs improvement'",
        25,
        yPosition,
        pageWidth - 50,
        10,
      )

      // Footer
      doc.setFontSize(8)
      doc.setFont("helvetica", "italic")
      doc.text(`Generated on ${new Date().toLocaleString()}`, pageWidth / 2, pageHeight - 10, { align: "center" })

      // Save the PDF
      doc.save(`${interviewType}-interview-report-${username}-${new Date().toISOString().split("T")[0]}.pdf`)
    } catch (error) {
      console.error("Error generating PDF:", error)
      alert("Error generating PDF report. Please try again.")
    } finally {
      setIsDownloading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent":
        return "text-green-600 bg-green-100"
      case "good":
        return "text-blue-600 bg-blue-100"
      case "needs_improvement":
        return "text-yellow-600 bg-yellow-100"
      case "poor":
        return "text-red-600 bg-red-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "excellent":
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case "good":
        return <CheckCircle className="w-5 h-5 text-blue-600" />
      case "needs_improvement":
        return <AlertCircle className="w-5 h-5 text-yellow-600" />
      case "poor":
        return <XCircle className="w-5 h-5 text-red-600" />
      default:
        return <AlertCircle className="w-5 h-5 text-gray-600" />
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const getInterviewTypeIcon = () => {
    switch (interviewType) {
      case "technical":
        return "💻"
      case "behavioral":
        return "🤝"
      case "managerial":
        return "👔"
      default:
        return "📝"
    }
  }

  if (isAnalyzing) {
    return (
      <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl">
          <CardContent className="p-8 text-center">
            <div className="relative">
              <div className="animate-spin w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
              <Brain className="w-8 h-8 text-blue-600 absolute top-4 left-1/2 transform -translate-x-1/2" />
            </div>
            <h2 className="text-2xl font-bold mb-2">AI is Analyzing Your Responses</h2>
            <p className="text-gray-600 mb-4">
              Our advanced AI is evaluating your {interviewType} interview answers...
            </p>
            <div className="bg-blue-100 p-4 rounded-lg">
              <p className="text-sm text-blue-800">
                ✨ Analyzing answer quality, structure, and content relevance
                <br />🎯 Generating personalized feedback and improvement suggestions
                <br />📊 Calculating performance scores and benchmarks
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const excellentCount = analysisResults.filter((r) => r.status === "excellent").length
  const goodCount = analysisResults.filter((r) => r.status === "good").length
  const needsImprovementCount = analysisResults.filter((r) => r.status === "needs_improvement").length
  const poorCount = analysisResults.filter((r) => r.status === "poor").length

  return (
    <div className="min-h-screen bg-blue-50 p-4">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-6">
        <div className="flex justify-between items-center">
          <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={downloadPDFReport}
              disabled={isDownloading}
            >
              <Download className="w-4 h-4" />
              {isDownloading ? "Generating PDF..." : "Download Report"}
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Share className="w-4 h-4" />
              Share Results
            </Button>
          </div>
        </div>
      </div>

      {/* Overall Results */}
      <div className="max-w-6xl mx-auto mb-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl flex items-center gap-2">
                  {getInterviewTypeIcon()} {interviewType.charAt(0).toUpperCase() + interviewType.slice(1)} Interview
                  Results
                </CardTitle>
                <CardDescription>AI-powered analysis of your interview performance</CardDescription>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-blue-600">{overallScore}%</div>
                <div className="text-sm text-gray-600">Overall Score</div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{excellentCount}</div>
                <div className="text-sm text-green-700">Excellent</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{goodCount}</div>
                <div className="text-sm text-blue-700">Good</div>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">{needsImprovementCount}</div>
                <div className="text-sm text-yellow-700">Needs Work</div>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <div className="text-2xl font-bold text-red-600">{poorCount}</div>
                <div className="text-sm text-red-700">Poor</div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Overall Performance</span>
                  <span>{overallScore}%</span>
                </div>
                <Progress value={overallScore} className="h-3" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <strong>Time Taken:</strong> {formatTime(timeElapsed)}
                </div>
                <div>
                  <strong>Questions Answered:</strong> {Object.keys(answers).length}/{questions.length}
                </div>
                <div>
                  <strong>Average Score:</strong> {overallScore}%
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Results */}
      <div className="max-w-6xl mx-auto">
        <Tabs defaultValue="detailed" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="detailed">Detailed Analysis</TabsTrigger>
            <TabsTrigger value="summary">Performance Summary</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          </TabsList>

          <TabsContent value="detailed" className="space-y-4">
            {analysisResults.map((result, index) => {
              const question = questions.find((q) => q.id === result.questionId)
              const answer = answers[result.questionId] || ""

              return (
                <Card key={result.questionId}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-lg">Question {index + 1}</CardTitle>
                        <CardDescription className="mt-2">{question?.question}</CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(result.status)}>
                          {getStatusIcon(result.status)}
                          <span className="ml-1 capitalize">{result.status.replace("_", " ")}</span>
                        </Badge>
                        <div className="text-right">
                          <div className="text-xl font-bold">{result.score}%</div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Your Answer:</h4>
                      <div className="bg-gray-50 p-3 rounded-lg text-sm">{answer || "No answer provided"}</div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2 flex items-center gap-2">
                        <Brain className="w-4 h-4" />
                        AI Feedback:
                      </h4>
                      <p className="text-sm text-gray-700">{result.feedback}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-2 text-green-700 flex items-center gap-2">
                          <CheckCircle className="w-4 h-4" />
                          Strengths:
                        </h4>
                        <ul className="text-sm space-y-1">
                          {result.strengths.map((strength, i) => (
                            <li key={i} className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                              {strength}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2 text-orange-700 flex items-center gap-2">
                          <Lightbulb className="w-4 h-4" />
                          Areas for Improvement:
                        </h4>
                        <ul className="text-sm space-y-1">
                          {result.improvements.map((improvement, i) => (
                            <li key={i} className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                              {improvement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {result.suggestedAnswer && (
                      <div>
                        <h4 className="font-medium mb-2 flex items-center gap-2">
                          <Target className="w-4 h-4" />
                          Suggested Approach:
                        </h4>
                        <div className="bg-blue-50 p-3 rounded-lg text-sm text-blue-800">{result.suggestedAnswer}</div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </TabsContent>

          <TabsContent value="summary">
            <Card>
              <CardHeader>
                <CardTitle>Performance Summary</CardTitle>
                <CardDescription>Overview of your interview performance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-4">Score Distribution</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-green-600">Excellent (85-100%)</span>
                        <span className="font-medium">{excellentCount} questions</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-blue-600">Good (70-84%)</span>
                        <span className="font-medium">{goodCount} questions</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-yellow-600">Needs Improvement (50-69%)</span>
                        <span className="font-medium">{needsImprovementCount} questions</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-red-600">Poor (0-49%)</span>
                        <span className="font-medium">{poorCount} questions</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-4">Key Metrics</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span>Average Score</span>
                        <span className="font-medium">{overallScore}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Completion Rate</span>
                        <span className="font-medium">
                          {Math.round((Object.keys(answers).length / questions.length) * 100)}%
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Time Efficiency</span>
                        <span className="font-medium">{formatTime(timeElapsed)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recommendations">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  Personalized Recommendations
                </CardTitle>
                <CardDescription>AI-generated suggestions to improve your interview performance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-4 text-green-700">Continue Doing</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                        <span>Providing structured and detailed responses</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                        <span>Using relevant examples and experiences</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                        <span>Demonstrating good understanding of concepts</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-4 text-orange-700">Focus Areas</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <TrendingUp className="w-4 h-4 text-orange-500 mt-0.5" />
                        <span>Add more specific metrics and quantifiable results</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <TrendingUp className="w-4 h-4 text-orange-500 mt-0.5" />
                        <span>Include more detailed implementation strategies</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <TrendingUp className="w-4 h-4 text-orange-500 mt-0.5" />
                        <span>Practice articulating complex concepts more clearly</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2">Next Steps</h4>
                  <div className="space-y-2 text-sm text-blue-700">
                    <p>1. Review the detailed feedback for each question</p>
                    <p>2. Practice answering similar questions with the suggested improvements</p>
                    <p>3. Consider retaking the interview to track your progress</p>
                    <p>4. Focus on the areas marked as "needs improvement"</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button onClick={onRetakeInterview} className="flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    Retake Interview
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Lightbulb className="w-4 h-4" />
                    Get Study Plan
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
