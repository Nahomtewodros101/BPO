"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useParams } from "next/navigation"
import {
  ArrowLeft,
  Upload,
  LinkIcon,
  MapPin,
  Clock,
  TrendingUp,
  Calendar,
  CheckCircle,
  User,
  FileText,
  Send,
} from "lucide-react"

// Geometric Components
const GeometricDiamond = ({ className = "", size = "w-16 h-16" }) => (
  <div className={`${size} ${className} relative`}>
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <pattern id="diamondPattern" x="0" y="0" width="25" height="25" patternUnits="userSpaceOnUse">
          <polygon points="12.5,0 25,12.5 12.5,25 0,12.5" fill="#10b981" opacity="0.8" />
          <polygon
            points="12.5,0 25,12.5 12.5,25 0,12.5"
            fill="#059669"
            opacity="0.6"
            transform="rotate(45 12.5 12.5)"
          />
        </pattern>
      </defs>
      <polygon points="50,10 80,30 70,70 30,70 20,30" fill="url(#diamondPattern)" transform="rotate(45 50 50)" />
      <polygon points="50,15 75,35 65,65 35,65 25,35" fill="#0d9488" opacity="0.7" transform="rotate(45 50 50)" />
      <polygon points="50,20 70,40 60,60 40,60 30,40" fill="#134e4a" opacity="0.9" transform="rotate(45 50 50)" />
    </svg>
  </div>
)

const GeometricAccent = ({ className = "" }) => (
  <div className={`${className} absolute`}>
    <div className="w-2 h-20 bg-emerald-500 mb-4"></div>
    <div className="w-2 h-16 bg-emerald-400 mb-4"></div>
    <div className="w-2 h-12 bg-emerald-300"></div>
  </div>
)

interface Job {
  id: string
  title: string
  department: string
  location: string
  type: string
  experience: string
  salary?: string
  description: string
  requirements: string[]
  responsibilities?: string[]
  benefits?: string[]
  featured: boolean
  createdAt: string
  _count: {
    applications: number
  }
}

export default function JobApplicationPage() {
  const params = useParams()
  const jobId = params.id as string
  const [job, setJob] = useState<Job | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  const [applicationMethod, setApplicationMethod] = useState<"upload" | "link">("upload")
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    coverLetter: "",
    cvFile: null as File | null,
    cvLink: "",
    linkedinProfile: "",
    portfolioLink: "",
    availableStartDate: "",
    expectedSalary: "",
    additionalInfo: "",
  })

  useEffect(() => {
    fetchJob()
  }, [jobId])

  const fetchJob = async () => {
    try {
      const response = await fetch(`/api/jobs/${jobId}`)
      if (response.ok) {
        const data = await response.json()
        setJob(data.job)
      } else {
        console.error("Failed to fetch job")
      }
    } catch (error) {
      console.error("Error fetching job:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setFormData((prev) => ({ ...prev, cvFile: file }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const submitData: {
        jobId: string
        firstName: string
        lastName: string
        email: string
        phone: string
        coverLetter: string
        linkedinProfile: string
        portfolioLink: string
        availableStartDate: string
        expectedSalary: string
        additionalInfo: string
        cvLink?: string
      } = {
        jobId,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        coverLetter: formData.coverLetter,
        linkedinProfile: formData.linkedinProfile,
        portfolioLink: formData.portfolioLink,
        availableStartDate: formData.availableStartDate,
        expectedSalary: formData.expectedSalary,
        additionalInfo: formData.additionalInfo,
      }

      if (applicationMethod === "link") {
        submitData.cvLink = formData.cvLink
      }
      // Note: File upload would need additional implementation for cvFile

      const response = await fetch("/api/job-applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      })

      if (response.ok) {
        alert("Application submitted successfully! We'll get back to you soon.")
        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          coverLetter: "",
          cvFile: null,
          cvLink: "",
          linkedinProfile: "",
          portfolioLink: "",
          availableStartDate: "",
          expectedSalary: "",
          additionalInfo: "",
        })
      } else {
        const errorData = await response.json()
        alert(`Failed to submit application: ${errorData.error}`)
      }
    } catch (error) {
      console.error("Error submitting application:", error)
      alert("An error occurred. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground pt-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-500"></div>
      </div>
    )
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-background text-foreground pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Job Not Found</h1>
          <Link href="/careers">
            <Button className="bg-emerald-500 hover:bg-emerald-600">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Careers
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground pt-20">
      {/* Header */}
      <section className="py-12 bg-slate-900 dark:bg-slate-950 text-white relative">
        <GeometricAccent className="left-0 top-20" />

        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Link href="/careers" className="inline-flex items-center text-emerald-400 hover:text-emerald-300 mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Careers
            </Link>

            <div className="flex items-center mb-6">
              <div className="w-1 h-12 bg-emerald-500 mr-4"></div>
              <GeometricDiamond size="w-12 h-12" className="mr-4" />
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-2">Apply for Position</h1>
                <p className="text-xl text-gray-300">{job.title}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Job Details Sidebar */}
          <div className="lg:col-span-1">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center">
                      <FileText className="h-6 w-6 text-emerald-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{job.title}</h3>
                      <p className="text-sm text-muted-foreground">{job.department}</p>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-sm">
                      <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                      {job.location}
                    </div>
                    <div className="flex items-center text-sm">
                      <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                      {job.experience}
                    </div>
                    {job.salary && (
                      <div className="flex items-center text-sm">
                        <TrendingUp className="h-4 w-4 mr-2 text-muted-foreground" />
                        {job.salary}
                      </div>
                    )}
                    <div className="flex items-center text-sm">
                      <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                      Posted {new Date(job.createdAt).toLocaleDateString()}
                    </div>
                  </div>

                  <Badge className="mb-4">{job.type}</Badge>

                  <div className="mb-6">
                    <h4 className="font-semibold mb-3">Key Requirements</h4>
                    <ul className="space-y-2">
                      {job.requirements.slice(0, 3).map((req, index) => (
                        <li key={index} className="flex items-start text-sm">
                          <CheckCircle className="h-4 w-4 text-emerald-500 mr-2 mt-0.5 flex-shrink-0" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="text-sm text-muted-foreground">
                    <p className="mb-2">Questions about this role?</p>
                    <p>
                      Contact our HR team at{" "}
                      <a href="mailto:hr@mjdatsolutions.com" className="text-emerald-500 hover:underline">
                        hr@mjdatsolutions.com
                      </a>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Application Form */}
          <div className="lg:col-span-2">
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <Card>
                <CardContent className="p-8">
                  <div className="mb-8">
                    <h2 className="text-3xl font-bold mb-4">Submit Your Application</h2>
                    <p className="text-muted-foreground">
                      Fill out the form below to apply for the {job.title} position. All fields marked with * are
                      required.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Personal Information */}
                    <div>
                      <h3 className="text-xl font-semibold mb-4 flex items-center">
                        <User className="h-5 w-5 mr-2 text-emerald-500" />
                        Personal Information
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">First Name *</label>
                          <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Last Name *</label>
                          <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Email Address *</label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Phone Number *</label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          />
                        </div>
                      </div>
                    </div>

                    {/* CV/Resume Section */}
                    <div>
                      <h3 className="text-xl font-semibold mb-4 flex items-center">
                        <FileText className="h-5 w-5 mr-2 text-emerald-500" />
                        CV/Resume *
                      </h3>

                      <div className="mb-4">
                        <p className="text-sm text-muted-foreground mb-3">
                          Choose how you'd like to submit your CV/Resume:
                        </p>
                        <div className="flex gap-4">
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="applicationMethod"
                              value="upload"
                              checked={applicationMethod === "upload"}
                              onChange={(e) => setApplicationMethod(e.target.value as "upload" | "link")}
                              className="mr-2"
                            />
                            <Upload className="h-4 w-4 mr-1" />
                            Upload File
                          </label>
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="applicationMethod"
                              value="link"
                              checked={applicationMethod === "link"}
                              onChange={(e) => setApplicationMethod(e.target.value as "upload" | "link")}
                              className="mr-2"
                            />
                            <LinkIcon className="h-4 w-4 mr-1" />
                            Provide Link
                          </label>
                        </div>
                      </div>

                      {applicationMethod === "upload" ? (
                        <div>
                          <label className="block text-sm font-medium mb-2">Upload CV/Resume *</label>
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-emerald-500 transition-colors">
                            <input
                              type="file"
                              onChange={handleFileChange}
                              accept=".pdf,.doc,.docx"
                              className="hidden"
                              id="cv-upload"
                              required={applicationMethod === "upload"}
                            />
                            <label htmlFor="cv-upload" className="cursor-pointer">
                              <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                              <p className="text-sm text-muted-foreground">
                                {formData.cvFile ? formData.cvFile.name : "Click to upload or drag and drop"}
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">PDF, DOC, DOCX up to 10MB</p>
                            </label>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <label className="block text-sm font-medium mb-2">CV/Resume Link *</label>
                          <input
                            type="url"
                            name="cvLink"
                            value={formData.cvLink}
                            onChange={handleInputChange}
                            placeholder="https://example.com/your-cv.pdf"
                            required={applicationMethod === "link"}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          />
                          <p className="text-xs text-muted-foreground mt-1">
                            Provide a link to your online CV, Google Drive, Dropbox, or portfolio website
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Additional Information */}
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Additional Information</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Cover Letter</label>
                          <textarea
                            name="coverLetter"
                            value={formData.coverLetter}
                            onChange={handleInputChange}
                            rows={4}
                            placeholder="Tell us why you're interested in this position and what makes you a great fit..."
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          />
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">LinkedIn Profile</label>
                            <input
                              type="url"
                              name="linkedinProfile"
                              value={formData.linkedinProfile}
                              onChange={handleInputChange}
                              placeholder="https://linkedin.com/in/yourprofile"
                              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Portfolio/Website</label>
                            <input
                              type="url"
                              name="portfolioLink"
                              value={formData.portfolioLink}
                              onChange={handleInputChange}
                              placeholder="https://yourportfolio.com"
                              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Available Start Date</label>
                            <input
                              type="date"
                              name="availableStartDate"
                              value={formData.availableStartDate}
                              onChange={handleInputChange}
                              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Expected Salary</label>
                            <input
                              type="text"
                              name="expectedSalary"
                              value={formData.expectedSalary}
                              onChange={handleInputChange}
                              placeholder="e.g., $70,000 - $80,000"
                              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">Additional Information</label>
                          <textarea
                            name="additionalInfo"
                            value={formData.additionalInfo}
                            onChange={handleInputChange}
                            rows={3}
                            placeholder="Any additional information you'd like to share..."
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-6 border-t">
                      <div className="flex flex-col sm:flex-row gap-4">
                        <Button
                          type="submit"
                          className="bg-emerald-500 hover:bg-emerald-600 flex-1"
                          size="lg"
                          disabled={submitting}
                        >
                          {submitting ? "Submitting..." : "Submit Application"}
                          <Send className="ml-2 h-4 w-4" />
                        </Button>
                        <Button type="button" variant="outline" onClick={() => window.history.back()} size="lg">
                          Cancel
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground mt-3">
                        By submitting this application, you agree to our privacy policy and terms of service. We'll
                        contact you within 5-7 business days regarding your application status.
                      </p>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
