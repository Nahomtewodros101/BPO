"use client"
import { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import {
  ArrowRight,
  CheckCircle,
  Users,
  TrendingUp,
  Globe,
  Shield,
  Zap,
  Target,
  Award,
  Phone,
  Mail,
  MapPin,
  Menu,
  X,
  Sun,
  Moon,
  ChevronDown,
  Calendar,
  Clock,
  Briefcase,
  MessageCircle,
  ExternalLink,
  Headphones,
  MessageSquare,
  LogIn,
  UserPlus,
  User,
  LogOut,
  LayoutDashboard,
} from "lucide-react"
import { useTheme } from "next-themes"
import Image from "next/image"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/components/auth-provider" // Import useAuth

// Interactive SVG Components
const InteractiveSVGBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 1200 800"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Animated geometric shapes */}
      <motion.circle
        cx="200"
        cy="150"
        r="3"
        fill="#10b981"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          delay: 0,
        }}
      />
      <motion.circle
        cx="800"
        cy="200"
        r="4"
        fill="#059669"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.4, 0.9, 0.4],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          delay: 1,
        }}
      />
      <motion.circle
        cx="1000"
        cy="400"
        r="2"
        fill="#34d399"
        animate={{
          scale: [1, 2, 1],
          opacity: [0.2, 0.7, 0.2],
        }}
        transition={{
          duration: 5,
          repeat: Number.POSITIVE_INFINITY,
          delay: 2,
        }}
      />
      {/* Hexagonal patterns */}
      <motion.g
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
        style={{ transformOrigin: "300px 300px" }}
      >
        <polygon
          points="300,250 325,265 325,295 300,310 275,295 275,265"
          stroke="#10b981"
          strokeWidth="1"
          fill="none"
          opacity="0.3"
        />
        <polygon
          points="325,265 350,280 350,310 325,325 300,310 300,280"
          stroke="#059669"
          strokeWidth="1"
          fill="none"
          opacity="0.2"
        />
      </motion.g>
      {/* Floating diamonds */}
      <motion.g
        animate={{
          y: [-10, 10, -10],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        <polygon points="600,100 620,120 600,140 580,120" fill="#10b981" opacity="0.4" />
      </motion.g>
      <motion.g
        animate={{
          y: [10, -10, 10],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 1,
        }}
      >
        <polygon points="900,500 920,520 900,540 880,520" fill="#059669" opacity="0.3" />
      </motion.g>
      {/* Connecting lines */}
      <motion.line
        x1="200"
        y1="150"
        x2="300"
        y2="280"
        stroke="#10b981"
        strokeWidth="1"
        opacity="0.2"
        animate={{
          pathLength: [0, 1, 0],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <motion.line
        x1="600"
        y1="120"
        x2="800"
        y2="200"
        stroke="#059669"
        strokeWidth="1"
        opacity="0.2"
        animate={{
          pathLength: [0, 1, 0],
        }}
        transition={{
          duration: 5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 2,
        }}
      />
    </svg>
  </div>
)

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

const HexagonalRings = ({ className = "" }) => (
  <div className={`${className} relative`}>
    <svg viewBox="0 0 300 200" className="w-full h-full">
      <g stroke="currentColor" strokeWidth="2" fill="none" opacity="0.6">
        <polygon points="50,30 70,20 90,30 90,50 70,60 50,50" />
        <polygon points="90,30 110,20 130,30 130,50 110,60 90,50" />
        <polygon points="130,30 150,20 170,30 170,50 150,60 130,50" />
        <polygon points="30,70 50,60 70,70 70,90 50,100 30,90" />
        <polygon points="70,70 90,60 110,70 110,90 90,100 70,90" />
        <polygon points="110,70 130,60 150,70 150,90 130,100 110,90" className="fill-emerald-500 fill-opacity-80" />
        <polygon points="150,70 170,60 190,70 190,90 170,100 150,90" />
        <polygon points="50,110 70,100 90,110 90,130 70,140 50,130" />
        <polygon points="90,110 110,100 130,110 130,130 110,140 90,130" />
        <polygon points="130,110 150,100 170,110 170,130 150,140 130,130" />
        <line x1="70" y1="60" x2="70" y2="70" />
        <line x1="110" y1="60" x2="110" y2="70" />
        <line x1="150" y1="60" x2="150" y2="70" />
        <line x1="50" y1="100" x2="50" y2="110" />
        <line x1="90" y1="100" x2="90" y2="110" />
        <line x1="130" y1="100" x2="130" y2="110" />
        <line x1="170" y1="100" x2="170" y2="110" />
      </g>
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

// Data interfaces (moved here for local use, will be replaced by Prisma types)
interface NewsArticle {
  id: string
  title: string
  excerpt: string
  date: string
  category: string
  image?: string
}

interface Job {
  id: string
  title: string
  department: string
  location: string
  type: string
  experience: string
  posted: string
  description: string
  requirements: string[]
}

const services = [
  {
    icon: Users,
    title: "Human Resources",
    description: "Complete HR solutions including recruitment, payroll, and employee management.",
    features: ["Talent Acquisition", "Payroll Processing", "Performance Management"],
    href: "/services/human-resources",
  },
  {
    icon: TrendingUp,
    title: "Financial Services",
    description: "Comprehensive financial management and accounting solutions for your business.",
    features: ["Bookkeeping", "Tax Preparation", "Financial Analysis"],
    href: "/services/finance-accounting",
  },
  {
    icon: Globe,
    title: "Digital Marketing",
    description: "Strategic digital marketing campaigns to grow your online presence.",
    features: ["SEO Optimization", "Social Media", "Content Marketing"],
    href: "/services/digital-marketing",
  },
  {
    icon: Shield,
    title: "IT Support",
    description: "24/7 technical support and IT infrastructure management services.",
    features: ["Help Desk", "System Maintenance", "Cybersecurity"],
    href: "/services/it-services",
  },
  {
    icon: Zap,
    title: "Process Automation",
    description: "Streamline your operations with cutting-edge automation solutions.",
    features: ["Workflow Design", "System Integration", "Efficiency Optimization"],
    href: "/services/process-automation",
  },
  {
    icon: Target,
    title: "Business Consulting",
    description: "Strategic consulting to help your business reach its full potential.",
    features: ["Strategy Development", "Market Analysis", "Growth Planning"],
    href: "/services/business-consulting",
  },
]

const stats = [
  { number: "500+", label: "Clients Served" },
  { number: "98%", label: "Client Satisfaction" },
  { number: "24/7", label: "Support Available" },
  { number: "10+", label: "Years Experience" },
]

const testimonials = [
  {
    name: "Sarah Johnson",
    company: "TechCorp Inc.",
    role: "CEO",
    content:
      "MJDAT Solutions transformed our operations. Their expertise in process automation saved us 40% in operational costs.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    company: "GrowthStart",
    role: "Founder",
    content: "Outstanding service quality. Their HR solutions helped us scale from 10 to 100 employees seamlessly.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    company: "RetailMax",
    role: "Operations Director",
    content:
      "The digital marketing team at MJDAT delivered exceptional results. Our online presence increased by 300%.",
    rating: 5,
  },
]

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

  const { user, loading: loadingUser, logout } = useAuth() // Use useAuth hook

  const [news, setNews] = useState<NewsArticle[]>([])
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setMounted(true)
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      // Fetch news
      const newsResponse = await fetch("/api/news?published=true&limit=3") // Updated API route
      if (newsResponse.ok) {
        const newsData = await newsResponse.json()
        setNews(newsData.articles || [])
      } else {
        console.error("Failed to fetch news:", newsResponse.statusText)
        // Fallback to static data if API fails
        setNews([
          {
            id: "1",
            title: "MJDAT Solutions Expands Operations to Southeast Asia",
            excerpt:
              "We're excited to announce our expansion into new markets, bringing our BPO expertise to more businesses across the region.",
            date: "2024-01-15",
            category: "Company News",
            image: "/placeholder.svg?height=200&width=300",
          },
          {
            id: "2",
            title: "New AI-Powered Customer Service Solutions Launched",
            excerpt:
              "Introducing our latest AI-driven customer support tools that enhance efficiency and customer satisfaction.",
            date: "2024-01-10",
            category: "Product Update",
            image: "/placeholder.svg?height=200&width=300",
          },
          {
            id: "3",
            title: "MJDAT Solutions Achieves ISO 27001 Certification",
            excerpt:
              "Our commitment to data security and information management has been recognized with this prestigious certification.",
            date: "2024-01-05",
            category: "Achievement",
            image: "/placeholder.svg?height=200&width=300",
          },
        ])
      }

      // Fetch jobs
      const jobsResponse = await fetch("/api/jobs?limit=4") // Updated API route
      if (jobsResponse.ok) {
        const jobsData = await jobsResponse.json()
        setJobs(jobsData.jobs || [])
      } else {
        console.error("Failed to fetch jobs:", jobsResponse.statusText)
        // Fallback to static data if API fails
        setJobs([
          {
            id: "1",
            title: "Senior Business Process Analyst",
            department: "Operations",
            location: "Remote / New York",
            type: "Full-time",
            experience: "3-5 years",
            posted: "2024-01-12",
            description: "Lead process improvement initiatives and optimize business workflows for our clients.",
            requirements: [
              "Bachelor's degree in Business or related field",
              "3+ years BPO experience",
              "Strong analytical skills",
            ],
          },
          {
            id: "2",
            title: "Customer Success Manager",
            department: "Client Relations",
            location: "Remote / California",
            type: "Full-time",
            experience: "2-4 years",
            posted: "2024-01-10",
            description: "Manage client relationships and ensure successful implementation of our BPO solutions.",
            requirements: [
              "Experience in customer success",
              "Excellent communication skills",
              "BPO industry knowledge",
            ],
          },
          {
            id: "3",
            title: "Digital Marketing Specialist",
            department: "Marketing",
            location: "Remote",
            type: "Full-time",
            experience: "1-3 years",
            posted: "2024-01-08",
            description: "Develop and execute digital marketing strategies for our clients across various industries.",
            requirements: ["Digital marketing experience", "SEO/SEM knowledge", "Creative thinking"],
          },
          {
            id: "4",
            title: "HR Operations Coordinator",
            department: "Human Resources",
            location: "New York",
            type: "Full-time",
            experience: "1-2 years",
            posted: "2024-01-05",
            description: "Support HR operations and help streamline processes for our growing team.",
            requirements: ["HR experience preferred", "Strong organizational skills", "HRIS knowledge"],
          },
        ])
      }
    } catch (error) {
      console.error("Error fetching data:", error)
      // Fallback to static data on network error
      setNews([
        {
          id: "1",
          title: "MJDAT Solutions Expands Operations to Southeast Asia",
          excerpt:
            "We're excited to announce our expansion into new markets, bringing our BPO expertise to more businesses across the region.",
          date: "2024-01-15",
          category: "Company News",
          image: "/placeholder.svg?height=200&width=300",
        },
        {
          id: "2",
          title: "New AI-Powered Customer Service Solutions Launched",
          excerpt:
            "Introducing our latest AI-driven customer support tools that enhance efficiency and customer satisfaction.",
          date: "2024-01-10",
          category: "Product Update",
          image: "/placeholder.svg?height=200&width=300",
        },
        {
          id: "3",
          title: "MJDAT Solutions Achieves ISO 27001 Certification",
          excerpt:
            "Our commitment to data security and information management has been recognized with this prestigious certification.",
          date: "2024-01-05",
          category: "Achievement",
          image: "/placeholder.svg?height=200&width=300",
        },
      ])
      setJobs([
        {
          id: "1",
          title: "Senior Business Process Analyst",
          department: "Operations",
          location: "Remote / New York",
          type: "Full-time",
          experience: "3-5 years",
          posted: "2024-01-12",
          description: "Lead process improvement initiatives and optimize business workflows for our clients.",
          requirements: [
            "Bachelor's degree in Business or related field",
            "3+ years BPO experience",
            "Strong analytical skills",
          ],
        },
        {
          id: "2",
          title: "Customer Success Manager",
          department: "Client Relations",
          location: "Remote / California",
          type: "Full-time",
          experience: "2-4 years",
          posted: "2024-01-10",
          description: "Manage client relationships and ensure successful implementation of our BPO solutions.",
          requirements: ["Experience in customer success", "Excellent communication skills", "BPO industry knowledge"],
        },
        {
          id: "3",
          title: "Digital Marketing Specialist",
          department: "Marketing",
          location: "Remote",
          type: "Full-time",
          experience: "1-3 years",
          posted: "2024-01-08",
          description: "Develop and execute digital marketing strategies for our clients across various industries.",
          requirements: ["Digital marketing experience", "SEO/SEM knowledge", "Creative thinking"],
        },
        {
          id: "4",
          title: "HR Operations Coordinator",
          department: "Human Resources",
          location: "New York",
          type: "Full-time",
          experience: "1-2 years",
          posted: "2024-01-05",
          description: "Support HR operations and help streamline processes for our growing team.",
          requirements: ["HR experience preferred", "Strong organizational skills", "HRIS knowledge"],
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 w-full z-50 bg-background/90 backdrop-blur-md border-b border-emerald-500/20"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div className="flex items-center space-x-3" whileHover={{ scale: 1.05 }}>
              <GeometricDiamond size="w-10 h-10" />
              <span className="text-2xl font-bold">MJDAT Solutions</span>
            </motion.div>
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="hover:text-emerald-500 transition-colors">
                Home
              </a>
              <Link href="/services" className="hover:text-emerald-500 transition-colors">
                Services
              </Link>
              <Link href="/careers" className="hover:text-emerald-500 transition-colors">
                Careers
              </Link>
              <Link href="/news" className="hover:text-emerald-500 transition-colors">
                News
              </Link>
              <Link href="/about" className="hover:text-emerald-500 transition-colors">
                About
              </Link>
              <Link href="/support" className="hover:text-emerald-500 transition-colors">
                Support
              </Link>
              <Link href="/contact" className="hover:text-emerald-500 transition-colors">
                Contact
              </Link>
              {/* Auth Links or User Profile */}
              {loadingUser ? (
                <div className="animate-pulse">
                  <div className="h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
              ) : user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span>{user.firstName}</span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>
                      {user.firstName} {user.lastName} ({user.role})
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {user.role === "ADMIN" && (
                      <DropdownMenuItem asChild>
                        <Link href="/admin/dashboard" className="flex items-center">
                          <LayoutDashboard className="h-4 w-4 mr-2" />
                          Admin Dashboard
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem onClick={logout} className="flex items-center">
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link href="/login">
                    <Button variant="ghost" size="sm">
                      <LogIn className="h-4 w-4 mr-2" />
                      Login
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button variant="outline" size="sm">
                      <UserPlus className="h-4 w-4 mr-2" />
                      Register
                    </Button>
                  </Link>
                </div>
              )}
              {mounted && (
                <Button variant="ghost" size="sm" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                  {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </Button>
              )}
              <Link href="/contact">
                <Button className="bg-emerald-500 hover:bg-emerald-600">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              {mounted && (
                <Button variant="ghost" size="sm" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                  {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </Button>
              )}
              <Button variant="ghost" onClick={toggleMenu}>
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
          {/* Mobile Menu */}
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 pb-4 border-t pt-4"
            >
              <div className="flex flex-col space-y-4">
                <a href="#home" className="hover:text-emerald-500 transition-colors">
                  Home
                </a>
                <Link href="/services" className="hover:text-emerald-500 transition-colors">
                  Services
                </Link>
                <Link href="/careers" className="hover:text-emerald-500 transition-colors">
                  Careers
                </Link>
                <Link href="/news" className="hover:text-emerald-500 transition-colors">
                  News
                </Link>
                <Link href="/about" className="hover:text-emerald-500 transition-colors">
                  About
                </Link>
                <Link href="/support" className="hover:text-emerald-500 transition-colors">
                  Support
                </Link>
                <Link href="/contact" className="hover:text-emerald-500 transition-colors">
                  Contact
                </Link>
                {/* Mobile Auth Links or User Profile */}
                {loadingUser ? (
                  <div className="animate-pulse">
                    <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
                  </div>
                ) : user ? (
                  <div className="flex flex-col space-y-2 pt-4 border-t">
                    <Button variant="ghost" className="w-full justify-start">
                      <User className="h-4 w-4 mr-2" />
                      {user.firstName} {user.lastName} ({user.role})
                    </Button>
                    {user.role === "ADMIN" && (
                      <Link href="/admin/dashboard">
                        <Button variant="ghost" className="w-full justify-start">
                          <LayoutDashboard className="h-4 w-4 mr-2" />
                          Admin Dashboard
                        </Button>
                      </Link>
                    )}
                    <Button variant="ghost" className="w-full justify-start" onClick={logout}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-2 pt-4 border-t">
                    <Link href="/login">
                      <Button variant="ghost" className="w-full justify-start">
                        <LogIn className="h-4 w-4 mr-2" />
                        Login
                      </Button>
                    </Link>
                    <Link href="/register">
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        <UserPlus className="h-4 w-4 mr-2" />
                        Register
                      </Button>
                    </Link>
                  </div>
                )}
                <Link href="/contact">
                  <Button className="bg-emerald-500 hover:bg-emerald-600 w-full">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </motion.nav>
      {/* Hero Section with Interactive SVG */}
      <section id="home" className="relative min-h-screen flex items-center justify-center bg-transparent">
        <InteractiveSVGBackground />
        <GeometricAccent className="left-0 top-1/4" />
        <GeometricAccent className="left-0 top-1/2" />
        <GeometricAccent className="left-0 top-3/4" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Badge className="mb-6 bg-emerald-500/20 text-emerald-600 border-emerald-500/30">
              Business Process Outsourcing Excellence
            </Badge>
            <motion.div
              className="flex items-center justify-center mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                <GeometricDiamond size="w-24 h-24" className="mr-6" />
              </motion.div>
              <div className="text-left">
                <motion.h1
                  className="text-6xl md:text-8xl font-bold text-slate-900 dark:text-white mb-2"
                  animate={{
                    textShadow: ["0 0 0px #10b981", "0 0 10px #10b981", "0 0 0px #10b981"],
                  }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                >
                  MJDAT
                </motion.h1>
                <motion.h2
                  className="text-4xl md:text-6xl font-bold text-emerald-500"
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  Solutions
                </motion.h2>
              </div>
            </motion.div>
            <motion.p
              className="text-xl md:text-2xl text-slate-600 dark:text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              We aim to optimize operations, reduce costs, and enhance customer satisfaction for our partners. This
              comprehensive 360° solution provides growth and efficiency for logistics carriers and business owners.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 text-lg shadow-lg hover:shadow-emerald-500/25"
                  >
                    Start Your Journey
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/about">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-emerald-500 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950 px-8 py-4 text-lg bg-transparent"
                  >
                    Learn More
                    <ChevronDown className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
        <div className="absolute right-10 top-1/2 transform -translate-y-1/2">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{
              duration: 30,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          >
            <HexagonalRings className="w-80 h-52 text-emerald-500/30" />
          </motion.div>
        </div>
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          <ChevronDown className="h-6 w-6 text-emerald-500" />
        </motion.div>
      </section>
      {/* Stats Section */}
      <section className="py-20 bg-transparent relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center relative"
              >
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-emerald-500"></div>
                <div className="text-4xl md:text-5xl font-bold text-emerald-500 mb-2">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* News Section with API Data */}
      <section className="py-20 relative">
        <GeometricAccent className="left-0 top-20" />
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center mb-6">
              <div className="w-1 h-12 bg-emerald-500 mr-4"></div>
              <Badge className="bg-emerald-500/20 text-emerald-600 border-emerald-500/30">Latest News</Badge>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Company Updates & Announcements</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Stay updated with the latest developments, achievements, and announcements from MJDAT Solutions.
            </p>
          </motion.div>
          {loading ? (
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse">
                  <Card className="h-full">
                    <CardContent className="p-0">
                      <div className="w-full h-48 bg-gray-200 dark:bg-gray-700"></div>
                      <div className="p-6">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-3"></div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              {news.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="h-full hover:shadow-xl transition-all duration-300 border-2 hover:border-emerald-500/20 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500"></div>
                    <CardContent className="p-0">
                      <img
                        src={article.image || "/placeholder.svg?height=200&width=300" || "/placeholder.svg"}
                        alt={article.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <Badge variant="secondary" className="text-xs">
                            {article.category}
                          </Badge>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4 mr-1" />
                            {new Date(article.date).toLocaleDateString()}
                          </div>
                        </div>
                        <h3 className="text-xl font-semibold mb-3 line-clamp-2">{article.title}</h3>
                        <p className="text-muted-foreground mb-4 line-clamp-3">{article.excerpt}</p>
                        <Link href={`/news/${article.id}`}>
                          <Button variant="outline" size="sm" className="w-full bg-transparent">
                            Read More
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
          <div className="text-center">
            <Link href="/news">
              <Button className="bg-emerald-500 hover:bg-emerald-600">
                View All News
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      {/* Services Section */}
      <section id="services" className="py-20 bg-transparent text-slate-900 dark:text-white relative">
        <GeometricAccent className="left-0 top-20" />
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center mb-6">
              <div className="w-1 h-12 bg-emerald-500 mr-4"></div>
              <Badge className="bg-emerald-500/20 text-emerald-600 border-emerald-500/30">Our Services</Badge>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Comprehensive Business Solutions</h2>
            <p className="text-xl text-slate-600 dark:text-gray-300 max-w-3xl mx-auto">
              From HR management to digital marketing, we provide end-to-end outsourcing solutions tailored to your
              business needs.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <Link href={service.href}>
                  <Card className="h-full hover:shadow-xl transition-all duration-300 border-2 hover:border-emerald-500/20 relative overflow-hidden bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 cursor-pointer">
                    <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
                    <CardContent className="p-6">
                      <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center mb-4">
                        <service.icon className="h-6 w-6 text-emerald-500" />
                      </div>
                      <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                      <p className="text-slate-600 dark:text-gray-300 mb-4">{service.description}</p>
                      <ul className="space-y-2">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center text-sm text-slate-600 dark:text-gray-300">
                            <CheckCircle className="h-4 w-4 text-emerald-500 mr-2" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/services">
              <Button className="bg-emerald-500 hover:bg-emerald-600">
                View All Services
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 opacity-5">
          <HexagonalRings className="w-96 h-64 text-emerald-500" />
        </div>
      </section>
      {/* Careers Section with API Data */}
      <section id="careers" className="py-20 relative">
        <GeometricAccent className="left-0 top-1/4" />
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center mb-6">
              <div className="w-1 h-12 bg-emerald-500 mr-4"></div>
              <Badge className="bg-emerald-500/20 text-emerald-600 border-emerald-500/30">Join Our Team</Badge>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Current Job Openings</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover exciting career opportunities and become part of our growing team of professionals.
            </p>
          </motion.div>
          {loading ? (
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="animate-pulse">
                  <Card className="h-full">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center flex-1">
                          <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg mr-4"></div>
                          <div className="flex-1">
                            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2 mb-4">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                      </div>
                      <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {jobs.map((job, index) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="h-full hover:shadow-xl transition-all duration-300 border-2 hover:border-emerald-500/20 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500"></div>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center mr-4">
                            <Briefcase className="h-6 w-6 text-emerald-500" />
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold mb-1">{job.title}</h3>
                            <p className="text-muted-foreground text-sm">{job.department}</p>
                          </div>
                        </div>
                        <Badge variant="secondary">{job.type}</Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                        <div className="flex items-center text-muted-foreground">
                          <MapPin className="h-4 w-4 mr-2" />
                          {job.location}
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <Clock className="h-4 w-4 mr-2" />
                          {job.experience}
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-4 line-clamp-2">{job.description}</p>
                      <div className="mb-4">
                        <h4 className="font-semibold mb-2 text-sm">Key Requirements:</h4>
                        <ul className="space-y-1">
                          {job.requirements.slice(0, 2).map((req, idx) => (
                            <li key={idx} className="flex items-center text-sm text-muted-foreground">
                              <CheckCircle className="h-3 w-3 text-emerald-500 mr-2" />
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4 mr-1" />
                          Posted {new Date(job.posted).toLocaleDateString()}
                        </div>
                        <Link href={`/apply/${job.id}`}>
                          <Button size="sm" className="bg-emerald-500 hover:bg-emerald-600">
                            Apply Now
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
          <div className="text-center">
            <Link href="/careers">
              <Button className="bg-emerald-500 hover:bg-emerald-600">
                View All Positions
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      {/* About Section */}
      <section id="about" className="py-20 bg-bg-transparent text-slate-900 dark:text-white relative">
        <GeometricAccent className="left-0 top-1/4" />
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center mb-6">
                <div className="w-1 h-12 bg-emerald-500 mr-4"></div>
                <Badge className="bg-emerald-500/20 text-emerald-600 border-emerald-500/30">
                  About MJDAT Solutions
                </Badge>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Your Trusted Business Partner</h2>
              <p className="text-lg text-slate-600 dark:text-gray-300 mb-6 leading-relaxed">
                MJDAT Solutions was founded with the mission to transform how businesses operate by providing tailored,
                efficient, and innovative BPO solutions. With a team of experts from diverse industries, we bring a
                wealth of knowledge, fresh perspectives, and a problem-solving mindset to every challenge.
              </p>
              <p className="text-lg text-slate-600 dark:text-gray-300 mb-6 leading-relaxed">
                Our services are designed to reduce operational burdens, improve performance, and ensure compliance, all
                while allowing our partners to focus on their core competencies.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <Award className="h-5 w-5 text-emerald-500 mr-3" />
                  <span>ISO 9001:2015 Certified</span>
                </div>
                <div className="flex items-center">
                  <Shield className="h-5 w-5 text-emerald-500 mr-3" />
                  <span>Data Security Compliant</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-emerald-500 mr-3" />
                  <span>500+ Satisfied Clients</span>
                </div>
              </div>
              <Link href="/about">
                <Button className="bg-emerald-500 hover:bg-emerald-600">
                  Learn More About Us
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <HexagonalRings className="w-full h-64 text-emerald-500/40" />
              <div className="absolute bottom-4 right-4">
                <GeometricDiamond size="w-16 h-16" />
                <div className="text-right mt-2">
                  <div className="text-emerald-500 font-bold">MJDAT Solutions</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Testimonials Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center mb-6">
              <div className="w-1 h-12 bg-emerald-500 mr-4"></div>
              <Badge className="bg-emerald-500/20 text-emerald-600 border-emerald-500/30">Client Testimonials</Badge>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">What Our Clients Say</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500"></div>
                  <CardContent className="p-6">
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <div key={i} className="w-5 h-5 bg-yellow-400 rounded-full mr-1"></div>
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-6 italic">"{testimonial.content}"</p>
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-emerald-500/10 rounded-full flex items-center justify-center mr-3">
                        <Users className="h-5 w-5 text-emerald-500" />
                      </div>
                      <div>
                        <div className="font-semibold">{testimonial.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {testimonial.role}, {testimonial.company}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Connect With Us Section */}
      <section className="py-20 bg-transparent dark:text-white text-black relative overflow-hidden">
        <div className="absolute inset-0 bg-transparent"></div>
        <HexagonalRings className="absolute top-10 right-10 w-64 h-40 text-white/10" />
        <HexagonalRings className="absolute bottom-10 left-10 w-48 h-32 text-white/10 rotate-45" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <GeometricDiamond size="w-20 h-20" className="mx-auto mb-6" />
            <h2 className="text-5xl md:text-7xl font-bold mb-6">Connect With Us</h2>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
              Ready to transform your business? Get in touch with us through your preferred communication channel.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <motion.a
              href="https://t.me/mjdatsolutions"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all duration-300 text-center p-8">
                <CardContent className="p-0">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-white/30 transition-colors">
                    <MessageCircle className="h-10 w-10" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Telegram</h3>
                  <p className="text-black mb-6">
                    Join our Telegram channel for instant updates and quick communication.
                  </p>
                  <div className="flex items-center justify-center text-black group-hover:text-black transition-colors">
                    <span className="mr-2">@mjdatsolutions</span>
                    <ExternalLink className="h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            </motion.a>
            <motion.a
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all duration-300 text-center p-8">
                <CardContent className="p-0">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-white/30 transition-colors">
                    <MessageSquare className="h-10 w-10" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">WhatsApp</h3>
                  <p className="text-black mb-6">
                    Chat with us directly on WhatsApp for immediate assistance and support.
                  </p>
                  <div className="flex items-center justify-center text-black group-hover:text-black transition-colors">
                    <span className="mr-2">+1 (234) 567-8900</span>
                    <ExternalLink className="h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            </motion.a>
            <motion.a
              href="https://linkedin.com/company/mjdatsolutions"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
            >
              <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all duration-300 text-center p-8">
                <CardContent className="p-0">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-white/30 transition-colors">
                    <Users className="h-10 w-10" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">LinkedIn</h3>
                  <p className="text-black mb-6">Connect with us professionally on LinkedIn for business networking.</p>
                  <div className="flex items-center justify-center text-black group-hover:text-black transition-colors">
                    <span className="mr-2">MJDAT Solutions</span>
                    <ExternalLink className="h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            </motion.a>
          </div>
        </div>
      </section>
      {/* Customer Support Section */}
      <section className="py-20 bg-transparent text-slate-900 dark:text-white relative">
        <GeometricAccent className="left-0 top-20" />
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center mb-6">
              <div className="w-1 h-12 bg-emerald-500 mr-4"></div>
              <Badge className="bg-emerald-500/20 text-emerald-600 border-emerald-500/30">Customer Support</Badge>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">We're Here to Help</h2>
            <p className="text-xl text-slate-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our dedicated support team is available 24/7 to assist you with any questions or concerns.
            </p>
          </motion.div>
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 h-full">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center mr-4">
                      <Headphones className="h-6 w-6 text-emerald-500" />
                    </div>
                    <h3 className="text-2xl font-bold">Support Channels</h3>
                  </div>
                  <div className="space-y-6">
                    <div className="flex items-center p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                      <Phone className="h-6 w-6 text-emerald-500 mr-4" />
                      <div>
                        <div className="font-semibold">Phone Support</div>
                        <div className="text-slate-600 dark:text-gray-300">+1 (555) 123-4567</div>
                        <div className="text-sm text-slate-500 dark:text-gray-400">Available 24/7</div>
                      </div>
                    </div>
                    <div className="flex items-center p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                      <Mail className="h-6 w-6 text-emerald-500 mr-4" />
                      <div>
                        <div className="font-semibold">Email Support</div>
                        <div className="text-slate-600 dark:text-gray-300">support@mjdatsolutions.com</div>
                        <div className="text-sm text-slate-500 dark:text-gray-400">Response within 2 hours</div>
                      </div>
                    </div>
                    <div className="flex items-center p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                      <MessageCircle className="h-6 w-6 text-emerald-500 mr-4" />
                      <div>
                        <div className="font-semibold">Live Chat</div>
                        <div className="text-slate-600 dark:text-gray-300">Available on website</div>
                        <div className="text-sm text-slate-500 dark:text-gray-400">Instant response</div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8">
                    <Link href="/support">
                      <Button className="w-full bg-emerald-500 hover:bg-emerald-600">
                        Visit Support Center
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex items-center justify-center"
            >
              <div className="w-full max-w-md">
                <Image
                  src="/help.png"
                  alt="Customer Support Illustration"
                  className="w-full rounded-full h-auto"
                  width={500}
                  height={500}
                />
              </div>
            </motion.div>
          </div>
        </div>
        <div className="absolute right-10 bottom-10 opacity-10">
          <HexagonalRings className="w-64 h-40 text-emerald-500" />
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-transparent border-t border-slate-800 py-12 text-white relative">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <GeometricDiamond size="w-10 h-10" />
                <span className="text-xl font-bold">MJDAT Solutions</span>
              </div>
              <p className="text-gray-400 mb-4">
                Transforming businesses through comprehensive outsourcing solutions and innovative BPO services.
              </p>
              <div className="text-sm text-emerald-400 font-semibold">www.MJDATSolutions.com</div>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/services/hr" className="hover:text-emerald-400 transition-colors">
                    Human Resources
                  </Link>
                </li>
                <li>
                  <Link href="/services/finance-accounting" className="hover:text-emerald-400 transition-colors">
                    Financial Services
                  </Link>
                </li>
                <li>
                  <Link href="/services/digital-marketing" className="hover:text-emerald-400 transition-colors">
                    Digital Marketing
                  </Link>
                </li>
                <li>
                  <Link href="/services/it-services" className="hover:text-emerald-400 transition-colors">
                    IT Support
                  </Link>
                </li>
                <li>
                  <Link href="/services/process-automation" className="hover:text-emerald-400 transition-colors">
                    Process Automation
                  </Link>
                </li>
                <li>
                  <Link href="/services/business-consulting" className="hover:text-emerald-400 transition-colors">
                    Business Consulting
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/about" className="hover:text-emerald-400 transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="hover:text-emerald-400 transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/news" className="hover:text-emerald-400 transition-colors">
                    News
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-emerald-400 transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/support" className="hover:text-emerald-400 transition-colors">
                    Support
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/privacy-policy" className="hover:text-emerald-400 transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms-of-service" className="hover:text-emerald-400 transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <a href="#" className="hover:text-emerald-400 transition-colors">
                    Cookie Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-emerald-400 transition-colors">
                    GDPR Compliance
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">© 2025/26 MJDAT Solutions. All rights reserved.</p>
            <p>Main Developer- Nahom Tewodros </p>
            <div className="flex items-center mt-4 md:mt-0">
              <HexagonalRings className="w-16 h-10 text-emerald-500/30 mr-4" />
              <GeometricDiamond size="w-8 h-8" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
