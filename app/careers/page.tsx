"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  MapPin,
  Clock,
  Calendar,
  Users,
  TrendingUp,
  Search,
  Filter,
  CheckCircle,
} from "lucide-react";

// Geometric Components
const GeometricDiamond = ({ className = "", size = "w-16 h-16" }) => (
  <div className={`${size} ${className} relative`}>
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <pattern
          id="diamondPattern"
          x="0"
          y="0"
          width="25"
          height="25"
          patternUnits="userSpaceOnUse"
        >
          <polygon
            points="12.5,0 25,12.5 12.5,25 0,12.5"
            fill="#10b981"
            opacity="0.8"
          />
          <polygon
            points="12.5,0 25,12.5 12.5,25 0,12.5"
            fill="#059669"
            opacity="0.6"
            transform="rotate(45 12.5 12.5)"
          />
        </pattern>
      </defs>
      <polygon
        points="50,10 80,30 70,70 30,70 20,30"
        fill="url(#diamondPattern)"
        transform="rotate(45 50 50)"
      />
      <polygon
        points="50,15 75,35 65,65 35,65 25,35"
        fill="#0d9488"
        opacity="0.7"
        transform="rotate(45 50 50)"
      />
      <polygon
        points="50,20 70,40 60,60 40,60 30,40"
        fill="#134e4a"
        opacity="0.9"
        transform="rotate(45 50 50)"
      />
    </svg>
  </div>
);

const GeometricAccent = ({ className = "" }) => (
  <div className={`${className} absolute`}>
    <div className="w-2 h-20 bg-emerald-500 mb-4"></div>
    <div className="w-2 h-16 bg-emerald-400 mb-4"></div>
    <div className="w-2 h-12 bg-emerald-300"></div>
  </div>
);

interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  salary?: string;
  description: string;
  requirements: string[];
  responsibilities?: string[];
  benefits?: string[];
  featured: boolean;
  createdAt: string;
  _count: {
    applications: number;
  };
}

const departments = [
  "All",
  "Operations",
  "Client Relations",
  "Marketing",
  "Human Resources",
  "Analytics",
];
const jobTypes = ["All", "Full-time", "Part-time", "Contract", "Internship"];
const locations = [
  "All",
  "Remote",
  "New York",
  "California",
  "Texas",
  "Florida",
];

export default function CareersPage() {
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalJobs, setTotalJobs] = useState(0);

  useEffect(() => {
    fetchJobs();
  }, [
    currentPage,
    selectedDepartment,
    selectedType,
    selectedLocation,
    searchTerm,
  ]);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: "10",
      });

      if (selectedDepartment !== "All") {
        params.append("department", selectedDepartment);
      }
      if (selectedType !== "All") {
        params.append("type", selectedType);
      }
      if (selectedLocation !== "All") {
        params.append("location", selectedLocation);
      }
      if (searchTerm) {
        params.append("search", searchTerm);
      }

      const response = await fetch(`/api/jobs?${params}`);
      if (response.ok) {
        const data = await response.json();
        setJobs(data.jobs || []);
        setTotalPages(data.pagination?.pages || 1);
        setTotalJobs(data.pagination?.total || 0);
      } else {
        console.error("Failed to fetch jobs");
        setJobs([]);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredJobs = jobs.filter((job) => {
    if (!searchTerm) return true;
    return (
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.department.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="min-h-screen bg-background text-foreground pt-20">
      {/* Header */}
      <section className="py-20 bg-slate-900 dark:bg-slate-950 text-white relative">
        <GeometricAccent className="left-0 top-20" />

        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link
              href="/"
              className="inline-flex items-center text-emerald-400 hover:text-emerald-300 mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>

            <div className="flex items-center mb-8">
              <div className="w-1 h-12 bg-emerald-500 mr-4"></div>
              <GeometricDiamond size="w-12 h-12" className="mr-4" />
              <div>
                <h1 className="text-5xl md:text-6xl font-bold mb-4">
                  Join Our Team
                </h1>
                <p className="text-xl text-gray-300 max-w-3xl">
                  Discover exciting career opportunities and become part of our
                  growing team of professionals dedicated to transforming
                  businesses worldwide.
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-400 mb-2">
                  200+
                </div>
                <div className="text-gray-300">Team Members</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-400 mb-2">
                  15+
                </div>
                <div className="text-gray-300">Countries</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-400 mb-2">
                  95%
                </div>
                <div className="text-gray-300">Employee Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-400 mb-2">
                  {totalJobs}
                </div>
                <div className="text-gray-300">Open Positions</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="space-y-4">
            {/* Search */}
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search positions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Filters:</span>
              </div>

              <div className="flex flex-wrap gap-2">
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="px-3 py-1 border rounded-md text-sm focus:ring-2 focus:ring-emerald-500"
                >
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept} Department
                    </option>
                  ))}
                </select>

                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="px-3 py-1 border rounded-md text-sm focus:ring-2 focus:ring-emerald-500"
                >
                  {jobTypes.map((type) => (
                    <option key={type} value={type}>
                      {type} {type !== "All" ? "Position" : ""}
                    </option>
                  ))}
                </select>

                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="px-3 py-1 border rounded-md text-sm focus:ring-2 focus:ring-emerald-500"
                >
                  {locations.map((location) => (
                    <option key={location} value={location}>
                      {location} {location !== "All" ? "Location" : "Locations"}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">
              {filteredJobs.length} Position
              {filteredJobs.length !== 1 ? "s" : ""} Available
            </h2>
            <p className="text-muted-foreground">
              Find your next career opportunity with MJDAT Solutions
            </p>
          </div>

          {loading ? (
            <div className="space-y-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="animate-pulse">
                  <Card className="h-full">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-start gap-4 mb-4">
                            <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                            <div className="flex-1">
                              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-3"></div>
                              <div className="grid grid-cols-3 gap-4 mb-4">
                                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                              </div>
                              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                            </div>
                          </div>
                        </div>
                        <div className="h-10 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {filteredJobs.map((job, index) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -2 }}
                >
                  <Card className="hover:shadow-xl transition-all duration-300 border-2 hover:border-emerald-500/20 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500"></div>
                    {job.featured && (
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-emerald-500 text-white">
                          Featured
                        </Badge>
                      </div>
                    )}
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-start gap-4 mb-4">
                            <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                              <Briefcase className="h-6 w-6 text-emerald-500" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h3 className="text-xl font-semibold">
                                  {job.title}
                                </h3>
                                <Badge variant="secondary">{job.type}</Badge>
                              </div>
                              <p className="text-muted-foreground mb-3">
                                {job.department}
                              </p>

                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground mb-4">
                                <div className="flex items-center">
                                  <MapPin className="h-4 w-4 mr-2" />
                                  {job.location}
                                </div>
                                <div className="flex items-center">
                                  <Clock className="h-4 w-4 mr-2" />
                                  {job.experience}
                                </div>
                                {job.salary && (
                                  <div className="flex items-center">
                                    <TrendingUp className="h-4 w-4 mr-2" />
                                    {job.salary}
                                  </div>
                                )}
                              </div>

                              <p className="text-muted-foreground line-clamp-2 mb-4">
                                {job.description}
                              </p>

                              <div className="flex items-center justify-between">
                                <div className="flex items-center text-sm text-muted-foreground">
                                  <Calendar className="h-4 w-4 mr-1" />
                                  Posted{" "}
                                  {new Date(job.createdAt).toLocaleDateString()}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  {job._count.applications} applications
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col gap-2 lg:flex-shrink-0">
                          <Link href={`/apply/${job.id}`}>
                            <Button className="bg-emerald-500 hover:bg-emerald-600 w-full lg:w-auto">
                              Apply Now
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </Link>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full lg:w-auto bg-transparent"
                          >
                            View Details
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}

          {filteredJobs.length === 0 && !loading && (
            <div className="text-center py-12">
              <Briefcase className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No positions found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search criteria or check back later for new
                opportunities.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Pagination */}
      {totalPages > 1 && (
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="flex justify-center">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      onClick={() => setCurrentPage(page)}
                      size="sm"
                      className={
                        currentPage === page
                          ? "bg-emerald-500 hover:bg-emerald-600"
                          : ""
                      }
                    >
                      {page}
                    </Button>
                  )
                )}
                <Button
                  variant="outline"
                  onClick={() =>
                    setCurrentPage(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Why Work With Us */}
      <section className="py-20 bg-slate-900 dark:bg-slate-950 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center mb-6">
              <div className="w-1 h-12 bg-emerald-500 mr-4"></div>
              <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                Why Choose MJDAT
              </Badge>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why Work With Us?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Join a company that values innovation, growth, and work-life
              balance while making a real impact on businesses worldwide.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: "Collaborative Culture",
                description:
                  "Work with talented professionals in a supportive and inclusive environment that encourages collaboration and innovation.",
              },
              {
                icon: TrendingUp,
                title: "Career Growth",
                description:
                  "Advance your career with comprehensive training programs, mentorship opportunities, and clear advancement paths.",
              },
              {
                icon: CheckCircle,
                title: "Work-Life Balance",
                description:
                  "Enjoy flexible working arrangements, generous PTO, and wellness programs that support your personal and professional life.",
              },
              {
                icon: Briefcase,
                title: "Competitive Benefits",
                description:
                  "Receive comprehensive health insurance, retirement plans, performance bonuses, and professional development support.",
              },
              {
                icon: MapPin,
                title: "Global Opportunities",
                description:
                  "Work with international clients and teams, gaining exposure to diverse markets and business practices worldwide.",
              },
              {
                icon: Clock,
                title: "Innovation Focus",
                description:
                  "Be part of cutting-edge projects using the latest technologies and methodologies in business process outsourcing.",
              },
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full bg-slate-800 border-slate-700 hover:border-emerald-500/20 transition-colors">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <benefit.icon className="h-6 w-6 text-emerald-400" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-white">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-300">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
