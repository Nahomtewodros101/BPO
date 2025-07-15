"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox" 
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { PlusCircle, Edit, Trash2, Loader2 } from "lucide-react"

interface Job {
  // Renamed interface
  id: string
  title: string
  department: string
  location: string
  type: string
  experience: string
  salary?: string | null // Added salary
  description: string
  requirements: string[]
  responsibilities: string[] // Added responsibilities
  benefits: string[] // Added benefits
  published: boolean // Added published
  featured: boolean // Added featured
  createdAt: string // Updated field name
}

export default function AdminJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]) // Renamed type
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentJob, setCurrentJob] = useState<Job | null>(null) // Renamed type
  const [formState, setFormState] = useState({
    title: "",
    department: "",
    location: "",
    type: "",
    experience: "",
    salary: "", // Added salary
    description: "",
    requirements: "",
    responsibilities: "", // Added responsibilities
    benefits: "", // Added benefits
    published: false, // Added published
    featured: false, // Added featured
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    fetchJobs()
  }, [])

  const fetchJobs = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/admin/jobs")
      if (response.ok) {
        const data = await response.json()
        setJobs(data.jobs)
      } else {
       
      }
    } catch (error) {
      console.error("Error fetching jobs:", error)
     
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormState((prev) => ({ ...prev, [name]: checked }))
  }

  const handleOpenDialog = (job?: Job) => {
    // Renamed type
    setCurrentJob(job || null)
    if (job) {
      setFormState({
        title: job.title,
        department: job.department,
        location: job.location,
        type: job.type,
        experience: job.experience,
        salary: job.salary || "", // Added salary
        description: job.description,
        requirements: job.requirements.join("\n"),
        responsibilities: job.responsibilities.join("\n"), // Added responsibilities
        benefits: job.benefits.join("\n"), // Added benefits
        published: job.published, // Added published
        featured: job.featured, // Added featured
      })
    } else {
      setFormState({
        title: "",
        department: "",
        location: "",
        type: "",
        experience: "",
        salary: "",
        description: "",
        requirements: "",
        responsibilities: "",
        benefits: "",
        published: false,
        featured: false,
      })
    }
    setIsDialogOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    const method = currentJob ? "PUT" : "POST"
    const url = "/api/admin/jobs"

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: currentJob?.id,
          ...formState,
          requirements: formState.requirements
            .split("\n")
            .map((req) => req.trim())
            .filter(Boolean),
          responsibilities: formState.responsibilities // Added responsibilities
            .split("\n")
            .map((res) => res.trim())
            .filter(Boolean),
          benefits: formState.benefits // Added benefits
            .split("\n")
            .map((ben) => ben.trim())
            .filter(Boolean),
        }),
      })

      if (response.ok) {
       
        fetchJobs()
        setIsDialogOpen(false)
      } else {
        const errorData = await response.json()
        
      }
    } catch (error) {
      console.error("Submission error:", error)
     
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this job opening?")) return

    try {
      const response = await fetch("/api/admin/jobs", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      })

      if (response.ok) {
        
        fetchJobs()
      } else {
        const errorData = await response.json()
        
      }
    } catch (error) {
      console.error("Deletion error:", error)
      
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Manage Job Openings</CardTitle>
        <Button onClick={() => handleOpenDialog()}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Job
        </Button>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
          </div>
        ) : jobs.length === 0 ? (
          <p className="text-center text-muted-foreground">No job openings found.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Published</TableHead>
                <TableHead>Featured</TableHead>
                <TableHead>Posted Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {jobs.map((job) => (
                <TableRow key={job.id}>
                  <TableCell className="font-medium">{job.title}</TableCell>
                  <TableCell>{job.department}</TableCell>
                  <TableCell>{job.location}</TableCell>
                  <TableCell>{job.type}</TableCell>
                  <TableCell>{job.published ? "Yes" : "No"}</TableCell>
                  <TableCell>{job.featured ? "Yes" : "No"}</TableCell>
                  <TableCell>{new Date(job.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => handleOpenDialog(job)}>
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(job.id)}>
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{currentJob ? "Edit Job Opening" : "Add New Job Opening"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                name="title"
                value={formState.title}
                onChange={handleInputChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="department" className="text-right">
                Department
              </Label>
              <Input
                id="department"
                name="department"
                value={formState.department}
                onChange={handleInputChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="location" className="text-right">
                Location
              </Label>
              <Input
                id="location"
                name="location"
                value={formState.location}
                onChange={handleInputChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">
                Type
              </Label>
              <Input
                id="type"
                name="type"
                value={formState.type}
                onChange={handleInputChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="experience" className="text-right">
                Experience
              </Label>
              <Input
                id="experience"
                name="experience"
                value={formState.experience}
                onChange={handleInputChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="salary" className="text-right">
                Salary (Optional)
              </Label>
              <Input
                id="salary"
                name="salary"
                value={formState.salary}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                value={formState.description}
                onChange={handleInputChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="requirements" className="text-right">
                Requirements
              </Label>
              <Textarea
                id="requirements"
                name="requirements"
                value={formState.requirements}
                onChange={handleInputChange}
                className="col-span-3"
                placeholder="Enter each requirement on a new line"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="responsibilities" className="text-right">
                Responsibilities
              </Label>
              <Textarea
                id="responsibilities"
                name="responsibilities"
                value={formState.responsibilities}
                onChange={handleInputChange}
                className="col-span-3"
                placeholder="Enter each responsibility on a new line"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="benefits" className="text-right">
                Benefits
              </Label>
              <Textarea
                id="benefits"
                name="benefits"
                value={formState.benefits}
                onChange={handleInputChange}
                className="col-span-3"
                placeholder="Enter each benefit on a new line"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="published" className="text-right">
                Published
              </Label>
              <Checkbox
                id="published"
                name="published"
                checked={formState.published}
                onCheckedChange={(checked) => handleCheckboxChange("published", Boolean(checked))}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="featured" className="text-right">
                Featured
              </Label>
              <Checkbox
                id="featured"
                name="featured"
                checked={formState.featured}
                onCheckedChange={(checked) => handleCheckboxChange("featured", Boolean(checked))}
                className="col-span-3"
              />
            </div>
            <DialogFooter>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {currentJob ? "Save Changes" : "Create Job"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Card>
  )
}
