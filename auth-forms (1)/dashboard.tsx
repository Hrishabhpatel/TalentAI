"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, FileText, LogOut } from "lucide-react"
import TechnicalInterview from "./technical-interview"
import BehavioralInterview from "./behavioral-interview"
import ManagerialInterview from "./managerial-interview"

interface DashboardProps {
  username?: string
  onLogout?: () => void
}

export default function Dashboard({ username = "User", onLogout }: DashboardProps) {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [showTechnicalInterview, setShowTechnicalInterview] = useState(false)
  const [showBehavioralInterview, setShowBehavioralInterview] = useState(false)
  const [showManagerialInterview, setShowManagerialInterview] = useState(false)

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type
    const allowedTypes = [".pdf", ".doc", ".docx"]
    const fileExtension = "." + file.name.split(".").pop()?.toLowerCase()

    if (!allowedTypes.includes(fileExtension)) {
      alert("Please upload a PDF, DOC, or DOCX file")
      return
    }

    setIsUploading(true)

    // Simulate file upload
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setUploadedFile(file)
    setIsUploading(false)
    console.log("Resume uploaded successfully:", file.name)
  }

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category)
    console.log(`Selected category: ${category}`)

    if (category === "technical") {
      setShowTechnicalInterview(true)
    } else if (category === "behavioral") {
      setShowBehavioralInterview(true)
    } else if (category === "managerial") {
      setShowManagerialInterview(true)
    }
  }

  const handleRemoveFile = () => {
    setUploadedFile(null)
    setSelectedCategory(null)
  }

  const handleBackToDashboard = () => {
    setShowTechnicalInterview(false)
    setShowBehavioralInterview(false)
    setShowManagerialInterview(false)
    setSelectedCategory(null)
  }

  if (showTechnicalInterview) {
    return <TechnicalInterview username={username} resumeFile={uploadedFile} onBack={handleBackToDashboard} />
  }

  if (showBehavioralInterview) {
    return <BehavioralInterview username={username} resumeFile={uploadedFile} onBack={handleBackToDashboard} />
  }

  if (showManagerialInterview) {
    return <ManagerialInterview username={username} resumeFile={uploadedFile} onBack={handleBackToDashboard} />
  }

  return (
    <div className="min-h-screen bg-blue-50 p-4">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex justify-between items-center">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold">Hello {username}, Welcome! 🎉</h1>
          </div>
          {onLogout && (
            <Button variant="outline" onClick={onLogout} className="flex items-center gap-2">
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Resume Upload Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Resume Upload
            </CardTitle>
            <CardDescription>Upload your resume to get started with interview preparation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {!uploadedFile ? (
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <Label htmlFor="resume-upload" className="cursor-pointer">
                    <div className="space-y-2">
                      <p className="text-lg font-medium">Click to upload your resume</p>
                      <p className="text-sm text-gray-500">PDF, DOC, or DOCX (Max 10MB)</p>
                    </div>
                  </Label>
                  <Input
                    id="resume-upload"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>
                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => document.getElementById("resume-upload")?.click()}
                  disabled={isUploading}
                >
                  {isUploading ? (
                    <>
                      <Upload className="w-4 h-4 mr-2 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Resume
                    </>
                  )}
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="w-8 h-8 text-green-600" />
                    <div>
                      <p className="font-medium text-green-800">{uploadedFile.name}</p>
                      <p className="text-sm text-green-600">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" onClick={handleRemoveFile}>
                    Remove
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Interview Categories */}
        {uploadedFile && (
          <Card>
            <CardHeader>
              <CardTitle>Choose Interview Type</CardTitle>
              <CardDescription>Select the type of interview you'd like to prepare for</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button
                  variant={selectedCategory === "technical" ? "default" : "outline"}
                  className="h-24 flex flex-col items-center justify-center space-y-2"
                  onClick={() => handleCategorySelect("technical")}
                >
                  <div className="text-2xl">💻</div>
                  <div className="text-center">
                    <div className="font-semibold">Technical</div>
                    <div className="text-xs text-muted-foreground">Coding & Technical Skills</div>
                  </div>
                </Button>

                <Button
                  variant={selectedCategory === "behavioral" ? "default" : "outline"}
                  className="h-24 flex flex-col items-center justify-center space-y-2"
                  onClick={() => handleCategorySelect("behavioral")}
                >
                  <div className="text-2xl">🤝</div>
                  <div className="text-center">
                    <div className="font-semibold">Behavioral</div>
                    <div className="text-xs text-muted-foreground">Soft Skills & Experience</div>
                  </div>
                </Button>

                <Button
                  variant={selectedCategory === "managerial" ? "default" : "outline"}
                  className="h-24 flex flex-col items-center justify-center space-y-2"
                  onClick={() => handleCategorySelect("managerial")}
                >
                  <div className="text-2xl">👔</div>
                  <div className="text-center">
                    <div className="font-semibold">Managerial</div>
                    <div className="text-xs text-muted-foreground">CEO/CTO Leadership</div>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Instructions */}
        <Card>
          <CardHeader>
            <CardTitle>How it works</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="space-y-2">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-blue-600 font-bold">1</span>
                </div>
                <h3 className="font-semibold">Upload Resume</h3>
                <p className="text-sm text-gray-600">Upload your resume in PDF, DOC, or DOCX format</p>
              </div>
              <div className="space-y-2">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-blue-600 font-bold">2</span>
                </div>
                <h3 className="font-semibold">Choose Category</h3>
                <p className="text-sm text-gray-600">Select Technical, Behavioral, or Managerial interview type</p>
              </div>
              <div className="space-y-2">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-blue-600 font-bold">3</span>
                </div>
                <h3 className="font-semibold">Start Practice</h3>
                <p className="text-sm text-gray-600">Begin your personalized interview preparation</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
