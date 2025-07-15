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
  CheckCircle,
  TrendingUp,
  Shield,
  Award,
  FileText,
  UserCheck,
  DollarSign,
  BarChart,
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

const services = [
  {
    icon: UserCheck,
    title: "Talent Acquisition",
    description:
      "End-to-end recruitment services from job posting to onboarding",
    features: [
      "Job posting and advertising",
      "Candidate screening and interviews",
      "Background checks",
      "Onboarding support",
    ],
  },
  {
    icon: DollarSign,
    title: "Payroll Processing",
    description: "Comprehensive payroll management and compliance services",
    features: [
      "Payroll calculation and processing",
      "Tax compliance",
      "Benefits administration",
      "Direct deposit setup",
    ],
  },
  {
    icon: BarChart,
    title: "Performance Management",
    description: "Employee performance tracking and development programs",
    features: [
      "Performance reviews",
      "Goal setting and tracking",
      "Training programs",
      "Career development plans",
    ],
  },
  {
    icon: FileText,
    title: "HR Administration",
    description: "Complete HR administrative support and documentation",
    features: [
      "Employee records management",
      "Policy development",
      "Compliance monitoring",
      "HR reporting",
    ],
  },
  {
    icon: Shield,
    title: "Compliance Management",
    description: "Ensure adherence to employment laws and regulations",
    features: [
      "Legal compliance audits",
      "Policy updates",
      "Training on regulations",
      "Risk assessment",
    ],
  },
  {
    icon: Users,
    title: "Employee Relations",
    description: "Foster positive workplace culture and resolve conflicts",
    features: [
      "Conflict resolution",
      "Employee engagement",
      "Culture development",
      "Exit interviews",
    ],
  },
];

const benefits = [
  "Reduce HR operational costs by up to 40%",
  "Access to HR expertise and best practices",
  "Improved compliance and reduced legal risks",
  "Enhanced employee satisfaction and retention",
  "Scalable solutions that grow with your business",
  "24/7 HR support and consultation",
];

const industries = [
  "Technology & Software",
  "Healthcare & Medical",
  "Financial Services",
  "Manufacturing",
  "Retail & E-commerce",
  "Professional Services",
];

export default function HumanResourcesPage() {
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
              <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center mr-4">
                <Users className="h-6 w-6 text-emerald-400" />
              </div>
              <div>
                <h1 className="text-5xl md:text-6xl font-bold mb-4">
                  Human Resources
                </h1>
                <p className="text-xl text-gray-300 max-w-4xl">
                  Comprehensive HR solutions to manage your workforce
                  effectively and drive organizational success.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Service Overview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Badge className="mb-6 bg-emerald-500/20 text-emerald-600 border-emerald-500/30">
                HR Outsourcing Excellence
              </Badge>
              <h2 className="text-4xl font-bold mb-6">
                Transform Your HR Operations
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Our Human Resources outsourcing services provide comprehensive
                workforce management solutions that allow you to focus on your
                core business while we handle the complexities of HR
                administration, compliance, and employee relations.
              </p>

              <div className="space-y-4 mb-8">
                {benefits.slice(0, 3).map((benefit, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-emerald-500 mr-3 flex-shrink-0" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>

              <Button className="bg-emerald-500 hover:bg-emerald-600" size="lg">
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Card className="border-2 border-emerald-500/20 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500"></div>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6">
                    Why Choose Our HR Services?
                  </h3>
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                        <Award className="h-5 w-5 text-emerald-500" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">
                          Expert HR Professionals
                        </h4>
                        <p className="text-muted-foreground text-sm">
                          Certified HR specialists with industry expertise
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                        <Shield className="h-5 w-5 text-emerald-500" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">
                          Compliance Assurance
                        </h4>
                        <p className="text-muted-foreground text-sm">
                          Stay compliant with all employment laws and
                          regulations
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                        <TrendingUp className="h-5 w-5 text-emerald-500" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">
                          Scalable Solutions
                        </h4>
                        <p className="text-muted-foreground text-sm">
                          Services that grow and adapt with your business needs
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-slate-900 dark:bg-slate-950 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-6 bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
              Our HR Services
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Comprehensive HR Solutions
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From recruitment to retirement, we handle every aspect of your
              human resources needs.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full bg-slate-800 border-slate-700 hover:border-emerald-500/20 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center mb-4">
                      <service.icon className="h-6 w-6 text-emerald-400" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-white">
                      {service.title}
                    </h3>
                    <p className="text-gray-300 mb-4">{service.description}</p>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li
                          key={idx}
                          className="flex items-center text-sm text-gray-300"
                        >
                          <CheckCircle className="h-4 w-4 text-emerald-400 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <GeometricDiamond size="w-20 h-20" className="mb-8" />
              <h2 className="text-4xl font-bold mb-6">Key Benefits</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Partnering with MJDAT Solutions for your HR needs delivers
                measurable benefits to your organization.
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
                      our HR services can transform your business.
                    </p>
                    <Button className="w-full bg-emerald-500 hover:bg-emerald-600">
                      Schedule Consultation
                    </Button>
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
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Transform Your HR?
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Let MJDAT Solutions handle your HR complexities while you focus on
              growing your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/#contact">
                <Button
                  size="lg"
                  variant="secondary"
                  className="px-8 py-4 text-lg"
                >
                  Get Free Quote
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/support">
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 py-4 text-lg bg-transparent border-white text-white hover:bg-white hover:text-emerald-600"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
