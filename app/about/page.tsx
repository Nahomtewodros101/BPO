"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Users,
  Award,
  Shield,
  Globe,
  TrendingUp,
  Target,
  Calendar,
  MapPin,
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

const HexagonalRings = ({ className = "" }) => (
  <div className={`${className} relative`}>
    <svg viewBox="0 0 300 200" className="w-full h-full">
      <g stroke="currentColor" strokeWidth="2" fill="none" opacity="0.6">
        <polygon points="50,30 70,20 90,30 90,50 70,60 50,50" />
        <polygon points="90,30 110,20 130,30 130,50 110,60 90,50" />
        <polygon points="130,30 150,20 170,30 170,50 150,60 130,50" />
        <polygon points="30,70 50,60 70,70 70,90 50,100 30,90" />
        <polygon points="70,70 90,60 110,70 110,90 90,100 70,90" />
        <polygon
          points="110,70 130,60 150,70 150,90 130,100 110,90"
          className="fill-emerald-500 fill-opacity-80"
        />
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
);

const GeometricAccent = ({ className = "" }) => (
  <div className={`${className} absolute`}>
    <div className="w-2 h-20 bg-emerald-500 mb-4"></div>
    <div className="w-2 h-16 bg-emerald-400 mb-4"></div>
    <div className="w-2 h-12 bg-emerald-300"></div>
  </div>
);

const milestones = [
  {
    year: "2014",
    title: "Company Founded",
    description:
      "MJDAT Solutions was established with a vision to transform business operations through innovative BPO services.",
  },
  {
    year: "2016",
    title: "First 100 Clients",
    description:
      "Reached our first major milestone by serving 100+ satisfied clients across various industries.",
  },
  {
    year: "2018",
    title: "International Expansion",
    description:
      "Expanded operations to serve clients globally, establishing offices in multiple countries.",
  },
  {
    year: "2020",
    title: "ISO Certification",
    description:
      "Achieved ISO 9001:2015 and ISO 27001 certifications, demonstrating our commitment to quality and security.",
  },
  {
    year: "2022",
    title: "AI Integration",
    description:
      "Launched AI-powered solutions to enhance service delivery and operational efficiency.",
  },
  {
    year: "2024",
    title: "500+ Clients",
    description:
      "Celebrating our growth to serve over 500 clients worldwide with 98% satisfaction rate.",
  },
];

const leadership = [
  {
    name: "Michael Johnson",
    position: "Chief Executive Officer",
    bio: "With over 15 years in BPO industry, Michael leads MJDAT Solutions with a vision for innovation and excellence.",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    name: "Sarah Davis",
    position: "Chief Operating Officer",
    bio: "Sarah oversees global operations, ensuring seamless service delivery and client satisfaction across all regions.",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    name: "David Chen",
    position: "Chief Technology Officer",
    bio: "David drives technological innovation, implementing cutting-edge solutions to enhance our service capabilities.",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    name: "Emily Rodriguez",
    position: "Chief Financial Officer",
    bio: "Emily manages financial strategy and operations, ensuring sustainable growth and fiscal responsibility.",
    image: "/placeholder.svg?height=300&width=300",
  },
];

const values = [
  {
    icon: Shield,
    title: "Integrity",
    description:
      "We conduct business with the highest ethical standards and transparency in all our interactions.",
  },
  {
    icon: Users,
    title: "Collaboration",
    description:
      "We believe in the power of teamwork and partnership to achieve exceptional results for our clients.",
  },
  {
    icon: TrendingUp,
    title: "Innovation",
    description:
      "We continuously evolve and adopt new technologies to stay ahead of industry trends and client needs.",
  },
  {
    icon: Target,
    title: "Excellence",
    description:
      "We strive for perfection in every project, delivering quality that exceeds client expectations.",
  },
  {
    icon: Globe,
    title: "Global Perspective",
    description:
      "We bring international expertise and cultural understanding to serve clients worldwide effectively.",
  },
  {
    icon: Award,
    title: "Commitment",
    description:
      "We are dedicated to long-term partnerships and the success of every client we serve.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground pt-20">
      {/* Header */}
      <section className="py-20 bg-slate-900 dark:bg-slate-950 text-white relative">
        <GeometricAccent className="left-0 top-20" />
        <HexagonalRings className="absolute top-10 right-10 w-64 h-40 text-white/10" />

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
                  About MJDAT Solutions
                </h1>
                <p className="text-xl text-gray-300 max-w-4xl">
                  MJDAT Solutions was founded with the mission to transform how
                  businesses operate by providing tailored, efficient, and
                  innovative BPO solutions. With a team of experts from diverse
                  industries, we bring a wealth of knowledge, fresh
                  perspectives, and a problem-solving mindset to every
                  challenge. Our services are designed to reduce operational
                  burdens, improve performance, and ensure compliance, all while
                  allowing our partners to focus on their core competencies.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Card className="h-full border-2 border-emerald-500/20 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500"></div>
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center mr-4">
                      <Target className="h-6 w-6 text-emerald-500" />
                    </div>
                    <h2 className="text-3xl font-bold">Our Mission</h2>
                  </div>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    To empower businesses worldwide by providing innovative,
                    efficient, and scalable business process outsourcing
                    solutions that drive growth, reduce costs, and enhance
                    operational excellence. We are committed to being the
                    trusted partner that enables our clients to focus on their
                    core competencies while we handle the complexity of their
                    business operations.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Card className="h-full border-2 border-emerald-500/20 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500"></div>
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center mr-4">
                      <Globe className="h-6 w-6 text-emerald-500" />
                    </div>
                    <h2 className="text-3xl font-bold">Our Vision</h2>
                  </div>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    To be the global leader in business process outsourcing,
                    recognized for our innovation, quality, and transformative
                    impact on client success. We envision a future where
                    businesses of all sizes can access world-class operational
                    support, enabling them to compete effectively in the global
                    marketplace while maintaining their unique identity and
                    values.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Company Values */}
      <section className="py-20 bg-slate-900 dark:bg-slate-950 text-white relative">
        <GeometricAccent className="left-0 top-20" />
        <HexagonalRings className="absolute bottom-10 right-10 w-48 h-32 text-white/10 rotate-45" />

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
                Our Values
              </Badge>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              What Drives Us
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our core values guide every decision we make and every service we
              deliver, ensuring consistent excellence and integrity.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full bg-slate-800 border-slate-700 hover:border-emerald-500/20 transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <value.icon className="h-8 w-8 text-emerald-400" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-white">
                      {value.title}
                    </h3>
                    <p className="text-gray-300">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Timeline */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center mb-6">
              <div className="w-1 h-12 bg-emerald-500 mr-4"></div>
              <Badge className="bg-emerald-500/20 text-emerald-600 border-emerald-500/30">
                Our Journey
              </Badge>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Milestones & Achievements
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A decade of growth, innovation, and success in transforming
              businesses worldwide.
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-emerald-500/20"></div>

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className={`flex items-center ${
                    index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                  }`}
                >
                  <div className="flex-1">
                    <Card
                      className={`max-w-md ${
                        index % 2 === 0 ? "ml-auto mr-8" : "mr-auto ml-8"
                      } hover:shadow-xl transition-shadow`}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center mb-3">
                          <Calendar className="h-5 w-5 text-emerald-500 mr-2" />
                          <span className="text-2xl font-bold text-emerald-500">
                            {milestone.year}
                          </span>
                        </div>
                        <h3 className="text-xl font-semibold mb-3">
                          {milestone.title}
                        </h3>
                        <p className="text-muted-foreground">
                          {milestone.description}
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="w-4 h-4 bg-emerald-500 rounded-full border-4 border-background relative z-10"></div>

                  <div className="flex-1"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center mb-6">
              <div className="w-1 h-12 bg-emerald-500 mr-4"></div>
              <Badge className="bg-emerald-500/20 text-emerald-600 border-emerald-500/30">
                Leadership
              </Badge>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Meet Our Leadership Team
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Experienced leaders driving innovation and excellence in business
              process outsourcing.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {leadership.map((leader, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 border-2 hover:border-emerald-500/20">
                  <CardContent className="p-6 text-center">
                    <div className="relative mb-6">
                      <img
                        src={leader.image || "/placeholder.svg"}
                        alt={leader.name}
                        className="w-24 h-24 rounded-full mx-auto object-cover"
                      />
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                        <Users className="h-4 w-4 text-white" />
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">
                      {leader.name}
                    </h3>
                    <p className="text-emerald-500 font-medium mb-3">
                      {leader.position}
                    </p>
                    <p className="text-muted-foreground text-sm">
                      {leader.bio}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Presence */}
      <section className="py-20 bg-slate-900 dark:bg-slate-950 text-white relative">
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
                <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                  Global Reach
                </Badge>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Worldwide Presence
              </h2>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                With offices and operations spanning across multiple continents,
                MJDAT Solutions serves clients globally while maintaining local
                expertise and cultural understanding in each market we operate.
              </p>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-emerald-400 mb-2">
                    2+
                  </div>
                  <div className="text-gray-300">Countries</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-emerald-400 mb-2">
                    4
                  </div>
                  <div className="text-gray-300">Office Locations</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-emerald-400 mb-2">
                    2+
                  </div>
                  <div className="text-gray-300">Team Members</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-emerald-400 mb-2">
                    24/7
                  </div>
                  <div className="text-gray-300">Global Support</div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-emerald-400 mr-3" />
                  <span>Headquarters: Addis Ababa ,Ethiopia</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-emerald-400 mr-3" />
                  <span>Regional Offices: London,United States</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-emerald-400 mr-3" />
                  <span>
                    Service Centers: Manila, Bangalore, Mexico City, Dublin
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <HexagonalRings className="w-full h-64 text-emerald-400/40" />
              <div className="absolute bottom-4 right-4">
                <GeometricDiamond size="w-16 h-16" />
                <div className="text-right mt-2">
                  <div className="text-emerald-400 font-bold">
                    Global Excellence
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <GeometricDiamond size="w-20 h-20" className="mx-auto mb-8" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Join hundreds of satisfied clients who have transformed their
              operations with MJDAT Solutions. Let's discuss how we can help
              your business achieve its goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/#contact">
                <Button
                  size="lg"
                  className="bg-emerald-500 hover:bg-emerald-600 px-8 py-4 text-lg"
                >
                  Get Started Today
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/careers">
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 py-4 text-lg bg-transparent"
                >
                  Join Our Team
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
