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
  BarChart3,
  TrendingUp,
  Award,
  CheckCircle,
  HeadphonesIcon,
  Code,
  PieChart,
  Calendar,
  Settings,
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
const Implementations = [
  {
    title: "Onboarding",
    description:
      "Initial consultation to assess specific needs and challenges.",
  },
  {
    title: "Execution",
    description: "Deployment of dedicated teams for each service area.",
  },
  {
    title: "Scalability",
    description: "Expansion of services as business needs grow.",
  },
  {
    title: " Monitoring and Optimization",
    description: "Continuous performance monitoring.",
  },
];
const services = [
  {
    icon: Users,
    title: "Freight Management:",
    description:
      "Complete HR management including recruitment, payroll, and employee relations.",
    features: [
      "Shipment coordination for smooth pickupsand deliveries",
      "Payroll Processing",
      "Route optimization for cost-effective  transportation.",
      "Load planning to maximize truck space utilization",
    ],
    href: "/contact",
    color: "bg-blue-500",
  },
  {
    icon: BarChart3,
    title: "Finance & Accounting",
    description:
      "Comprehensive financial services from bookkeeping to strategic financial planning.",
    features: [
      "Bookkeeping",
      "Tax Preparation",
      "Financial Analysis",
      "Budget Planning",
    ],
    href: "/contact",
    color: "bg-green-500",
  },
  {
    icon: HeadphonesIcon,
    title: "Customer Support",
    description:
      "24/7 multilingual customer service across all channels and platforms.",
    features: [
      "Live Chat Support",
      "Email Management",
      "Phone Support",
      "Social Media",
    ],
    href: "/contact",
    color: "bg-purple-500",
  },
  {
    icon: TrendingUp,
    title: "Administrative and Back-Office Support",
    description: "Data entry and management",
    features: [
      "Data entry and management.",
      "Performance and financial reporting",
    ],
    href: "/contact",
    color: "bg-pink-500",
  },
  {
    icon: Code,
    title: "IT Services",
    description:
      "Complete IT infrastructure management and cybersecurity solutions.",
    features: [
      "Cloud Migration",
      "Security Audits",
      "24/7 Monitoring",
      "Technical Support",
    ],
    href: "/contact",
    color: "bg-indigo-500",
  },
  {
    icon: PieChart,
    title: "Data Analytics",
    description:
      "Transform your data into actionable insights for better business decisions.",
    features: [
      "Business Intelligence",
      "Data Visualization",
      "Predictive Analytics",
      "Reporting",
    ],
    href: "/contact",
    color: "bg-orange-500",
  },
  {
    icon: Settings,
    title: "Process Automation",
    description:
      "Streamline operations with intelligent automation and workflow optimization.",
    features: [
      "Workflow Design",
      "RPA Implementation",
      "Process Optimization",
      "Integration",
    ],
    href: "/contact",
    color: "bg-teal-500",
  },
  {
    icon: Award,
    title: "Quality Assurance",
    description:
      "Rigorous testing and quality control processes to ensure excellence.",
    features: [
      "Process Auditing",
      "Performance Metrics",
      "Continuous Improvement",
      "Compliance",
    ],
    href: "/contact",
    color: "bg-red-500",
  },
];

const benefits = [
  "Reduce operational costs by up to 60%",
  "Access to global talent pool",
  "24/7 service availability",
  "Scalable solutions that grow with your business",
  "Industry-leading security and compliance",
  "Dedicated account management",
];

const industries = [
  "Healthcare & Medical",
  "Financial Services",
  "Technology & Software",
  "Manufacturing",
  "Retail & E-commerce",
  "Professional Services",
  "Education",
  "Real Estate",
];

export default function ServicesPage() {
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
                  Problem Statement
                </h1>
                <p className="text-xl text-gray-300 max-w-4xl">
                  Business owners, particularly logistics carriers, face
                  increasing challenges in maintaining cost efficiency, managing
                  daily operations, and staying competitive in a dynamic market.
                  They require innovative, comprehensive systems that can handle
                  repetitive, stressful tasks while enabling growth and
                  expansion. MJDAT Solutions addresses these needs by offering
                  cost-effective, scalable, and innovative services tailored to
                  their requirements
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-400 mb-2">
                  8+
                </div>
                <div className="text-gray-300">Service Categories</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-400 mb-2">
                  50+
                </div>
                <div className="text-gray-300">Clients Served</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-400 mb-2">
                  99.9%
                </div>
                <div className="text-gray-300">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-400 mb-2">
                  24/7
                </div>
                <div className="text-gray-300">Support</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
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
                Our Plan
              </Badge>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Implementation Plan
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A movement of growth, innovation, and success in transforming
              businesses worldwide.
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-emerald-500/20"></div>

            <div className="space-y-12">
              {Implementations.map((milestone, index) => (
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
                        <div className="flex items-center mb-3"></div>
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
      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-6 bg-emerald-500/20 text-emerald-600 border-emerald-500/30">
              Complete Solutions
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Transform Your Business Operations
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From human resources to data analytics, we provide end-to-end BPO
              services tailored to your industry needs.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Link href={service.href}>
                  <Card className="h-full hover:shadow-xl transition-all duration-300 border-2 hover:border-emerald-500/20 cursor-pointer group">
                    <CardContent className="p-6">
                      <div
                        className={`w-12 h-12 ${service.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                      >
                        <service.icon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold mb-3 group-hover:text-emerald-600 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground mb-4 text-sm">
                        {service.description}
                      </p>
                      <ul className="space-y-2">
                        {service.features.map((feature, featureIndex) => (
                          <li
                            key={featureIndex}
                            className="flex items-center text-sm"
                          >
                            <CheckCircle className="h-3 w-3 text-emerald-500 mr-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-4 pt-4 border-t">
                        <div className="flex items-center text-emerald-600 text-sm font-medium group-hover:text-emerald-700">
                          Learn More
                          <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Badge className="mb-6 bg-emerald-500/20 text-emerald-600 border-emerald-500/30">
                Why Choose Us
              </Badge>
              <h2 className="text-4xl font-bold mb-6">
                Key Benefits of Our Services
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Partnering with MJDAT Solutions delivers measurable benefits
                that transform your business operations and drive sustainable
                growth.
              </p>

              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center"
                  >
                    <CheckCircle className="h-5 w-5 text-emerald-500 mr-3 flex-shrink-0" />
                    <span>{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Card className="border-2 border-emerald-500/20">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6">
                    Industries We Serve
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {industries.map((industry, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
                        <span className="text-sm">{industry}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 p-6 bg-emerald-500/10 rounded-lg">
                    <h4 className="font-semibold mb-3 text-emerald-600">
                      Ready to Get Started?
                    </h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Contact us today for a free consultation and discover how
                      our services can transform your business.
                    </p>
                    <Link href="/contact">
                      <Button className="w-full bg-emerald-500 hover:bg-emerald-600">
                        Get Free Consultation
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              We invite you to partner with MJDAT Solutions to revolutionize
              your logistics operations and achieve unmatched efficiency.
              Contact us today to discuss how we can tailor our services to meet
              your specific needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="secondary"
                  className="px-8 py-4 text-lg"
                >
                  Get Started Today
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 py-4 text-lg bg-transparent border-white text-white hover:bg-white hover:text-emerald-600"
                >
                  Learn More About Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
