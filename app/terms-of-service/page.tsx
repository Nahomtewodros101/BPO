"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import {
  ArrowLeft,
  FileText,
  Scale,
  AlertTriangle,
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

export default function TermsOfServicePage() {
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
                <Scale className="h-6 w-6 text-emerald-400" />
              </div>
              <div>
                <h1 className="text-5xl md:text-6xl font-bold mb-4">
                  Terms of Service
                </h1>
                <p className="text-xl text-gray-300">
                  Please read these terms carefully before using our services.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span>Last updated: January 1, 2024</span>
              <span>•</span>
              <span>Effective date: January 1, 2024</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Acceptance of Terms */}
            <Card className="mb-8 border-2 border-emerald-500/20">
              <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500"></div>
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <CheckCircle className="h-6 w-6 text-emerald-500 mr-3" />
                  <h2 className="text-2xl font-bold">Acceptance of Terms</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  By accessing and using MJDAT Solutions' website and services,
                  you accept and agree to be bound by the terms and provision of
                  this agreement. These Terms of Service govern your use of our
                  website, services, and any related applications or platforms.
                </p>
              </CardContent>
            </Card>

            {/* Services Description */}
            <Card className="mb-8">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6">
                  Services Description
                </h2>

                <p className="text-muted-foreground mb-4">
                  MJDAT Solutions provides business process outsourcing (BPO)
                  services including but not limited to:
                </p>

                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-semibold mb-2">Human Resources</h4>
                    <p className="text-muted-foreground text-sm">
                      Recruitment, payroll, and HR administration
                    </p>
                  </div>

                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-semibold mb-2">Financial Services</h4>
                    <p className="text-muted-foreground text-sm">
                      Accounting, bookkeeping, and financial analysis
                    </p>
                  </div>

                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-semibold mb-2">Digital Marketing</h4>
                    <p className="text-muted-foreground text-sm">
                      SEO, social media, and content marketing
                    </p>
                  </div>

                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-semibold mb-2">IT Support</h4>
                    <p className="text-muted-foreground text-sm">
                      Technical support and system maintenance
                    </p>
                  </div>
                </div>

                <p className="text-muted-foreground">
                  Specific service details, deliverables, and timelines are
                  outlined in individual service agreements between MJDAT
                  Solutions and clients.
                </p>
              </CardContent>
            </Card>

            {/* User Responsibilities */}
            <Card className="mb-8">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6">
                  User Responsibilities
                </h2>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-emerald-500/10 rounded-full flex items-center justify-center mr-3 mt-1">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">
                        Accurate Information
                      </h4>
                      <p className="text-muted-foreground text-sm">
                        Provide accurate, current, and complete information when
                        using our services
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-emerald-500/10 rounded-full flex items-center justify-center mr-3 mt-1">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Compliance</h4>
                      <p className="text-muted-foreground text-sm">
                        Comply with all applicable laws and regulations
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-emerald-500/10 rounded-full flex items-center justify-center mr-3 mt-1">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Authorized Use</h4>
                      <p className="text-muted-foreground text-sm">
                        Use our services only for authorized business purposes
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-emerald-500/10 rounded-full flex items-center justify-center mr-3 mt-1">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Security</h4>
                      <p className="text-muted-foreground text-sm">
                        Maintain the confidentiality of account credentials and
                        access information
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Prohibited Uses */}
            <Card className="mb-8 border-2 border-red-500/20">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <AlertTriangle className="h-6 w-6 text-red-500 mr-3" />
                  <h2 className="text-2xl font-bold">Prohibited Uses</h2>
                </div>

                <p className="text-muted-foreground mb-4">
                  You may not use our services for any of the following
                  prohibited activities:
                </p>

                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                    <span className="text-sm">
                      Illegal activities or violation of any laws or regulations
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                    <span className="text-sm">
                      Harassment, abuse, or harm to other persons
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                    <span className="text-sm">
                      Transmission of viruses, malware, or other harmful code
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                    <span className="text-sm">
                      Unauthorized access to our systems or other users'
                      accounts
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                    <span className="text-sm">
                      Interference with the proper functioning of our services
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Terms */}
            <Card className="mb-8">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6">Payment Terms</h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-emerald-600">
                      Fees and Billing
                    </h3>
                    <p className="text-muted-foreground mb-3">
                      Service fees are outlined in individual service
                      agreements. Payment terms include:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                      <li>
                        Monthly or project-based billing as specified in service
                        agreements
                      </li>
                      <li>Payment due within 30 days of invoice date</li>
                      <li>Late payment fees may apply for overdue accounts</li>
                      <li>
                        All fees are non-refundable unless otherwise specified
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-emerald-600">
                      Suspension of Services
                    </h3>
                    <p className="text-muted-foreground">
                      We reserve the right to suspend or terminate services for
                      non-payment or breach of these terms. Suspended services
                      may be restored upon resolution of outstanding issues.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Limitation of Liability */}
            <Card className="mb-8">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6">
                  Limitation of Liability
                </h2>

                <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg mb-4">
                  <p className="text-sm font-medium text-yellow-600 mb-2">
                    Important Legal Notice
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Please read this section carefully as it limits our
                    liability to you.
                  </p>
                </div>

                <div className="space-y-4 text-muted-foreground">
                  <p>
                    MJDAT Solutions shall not be liable for any indirect,
                    incidental, special, consequential, or punitive damages,
                    including without limitation, loss of profits, data, use,
                    goodwill, or other intangible losses.
                  </p>

                  <p>
                    Our total liability to you for all damages, losses, and
                    causes of action shall not exceed the amount paid by you to
                    MJDAT Solutions in the twelve (12) months preceding the
                    claim.
                  </p>

                  <p>
                    Some jurisdictions do not allow the exclusion or limitation
                    of liability for consequential or incidental damages, so the
                    above limitation may not apply to you.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Termination */}
            <Card className="mb-8">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6">Termination</h2>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Termination by You</h4>
                    <p className="text-muted-foreground text-sm">
                      You may terminate your use of our services at any time by
                      providing written notice as specified in your service
                      agreement.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Termination by Us</h4>
                    <p className="text-muted-foreground text-sm">
                      We may terminate or suspend your access to our services
                      immediately, without prior notice, for conduct that we
                      believe violates these Terms of Service or is harmful to
                      other users, us, or third parties.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">
                      Effect of Termination
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      Upon termination, your right to use our services will
                      cease immediately. All provisions that by their nature
                      should survive termination shall survive, including
                      ownership provisions, warranty disclaimers, and
                      limitations of liability.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="border-2 border-emerald-500/20">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <FileText className="h-6 w-6 text-emerald-500 mr-3" />
                  <h2 className="text-2xl font-bold">Contact Information</h2>
                </div>

                <p className="text-muted-foreground mb-4">
                  If you have any questions about these Terms of Service, please
                  contact us:
                </p>

                <div className="space-y-2 text-sm">
                  <p>
                    <strong>Email:</strong> legal@mjdatsolutions.com
                  </p>
                  <p>
                    <strong>Phone:</strong> +1 (555) 123-4567
                  </p>
                  <p>
                    <strong>Address:</strong> 123 Business Ave, Suite 100, New
                    York, NY 10001
                  </p>
                </div>

                <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm font-medium mb-2">Changes to Terms</p>
                  <p className="text-sm text-muted-foreground">
                    We reserve the right to modify these terms at any time.
                    Changes will be effective immediately upon posting. Your
                    continued use of our services constitutes acceptance of the
                    modified terms.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
