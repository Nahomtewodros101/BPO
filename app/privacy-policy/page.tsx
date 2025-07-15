"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { ArrowLeft, Shield, Eye, Lock, FileText } from "lucide-react";

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

export default function PrivacyPolicyPage() {
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
                <Shield className="h-6 w-6 text-emerald-400" />
              </div>
              <div>
                <h1 className="text-5xl md:text-6xl font-bold mb-4">
                  Privacy Policy
                </h1>
                <p className="text-xl text-gray-300">
                  Your privacy is important to us. Learn how we collect, use,
                  and protect your information.
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
            {/* Introduction */}
            <Card className="mb-8 border-2 border-emerald-500/20">
              <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500"></div>
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <Eye className="h-6 w-6 text-emerald-500 mr-3" />
                  <h2 className="text-2xl font-bold">Introduction</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  MJDAT Solutions ("we," "our," or "us") is committed to
                  protecting your privacy and ensuring the security of your
                  personal information. This Privacy Policy explains how we
                  collect, use, disclose, and safeguard your information when
                  you visit our website, use our services, or interact with us
                  in any way.
                </p>
              </CardContent>
            </Card>

            {/* Information We Collect */}
            <Card className="mb-8">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6">
                  Information We Collect
                </h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-emerald-600">
                      Personal Information
                    </h3>
                    <p className="text-muted-foreground mb-3">
                      We may collect the following personal information:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                      <li>
                        Name, email address, phone number, and mailing address
                      </li>
                      <li>
                        Professional information such as job title, company
                        name, and work experience
                      </li>
                      <li>Resume/CV and other application materials</li>
                      <li>Payment and billing information for our services</li>
                      <li>Communication preferences and marketing consent</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-emerald-600">
                      Automatically Collected Information
                    </h3>
                    <p className="text-muted-foreground mb-3">
                      When you visit our website, we automatically collect:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                      <li>IP address, browser type, and operating system</li>
                      <li>
                        Pages visited, time spent on pages, and click-through
                        rates
                      </li>
                      <li>Referring website and search terms used</li>
                      <li>Device information and mobile identifiers</li>
                      <li>Cookies and similar tracking technologies</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* How We Use Information */}
            <Card className="mb-8">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6">
                  How We Use Your Information
                </h2>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-emerald-500/10 rounded-full flex items-center justify-center mr-3 mt-1">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Service Delivery</h4>
                      <p className="text-muted-foreground text-sm">
                        To provide, maintain, and improve our BPO services and
                        customer support
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-emerald-500/10 rounded-full flex items-center justify-center mr-3 mt-1">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Communication</h4>
                      <p className="text-muted-foreground text-sm">
                        To respond to inquiries, send updates, and provide
                        customer support
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-emerald-500/10 rounded-full flex items-center justify-center mr-3 mt-1">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Marketing</h4>
                      <p className="text-muted-foreground text-sm">
                        To send promotional materials and newsletters (with your
                        consent)
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-emerald-500/10 rounded-full flex items-center justify-center mr-3 mt-1">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Legal Compliance</h4>
                      <p className="text-muted-foreground text-sm">
                        To comply with legal obligations and protect our rights
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Information Sharing */}
            <Card className="mb-8">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6">
                  Information Sharing and Disclosure
                </h2>

                <p className="text-muted-foreground mb-4">
                  We do not sell, trade, or rent your personal information to
                  third parties. We may share your information in the following
                  circumstances:
                </p>

                <div className="space-y-4">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-semibold mb-2">Service Providers</h4>
                    <p className="text-muted-foreground text-sm">
                      With trusted third-party service providers who assist us
                      in operating our business
                    </p>
                  </div>

                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-semibold mb-2">Legal Requirements</h4>
                    <p className="text-muted-foreground text-sm">
                      When required by law, court order, or government
                      regulation
                    </p>
                  </div>

                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-semibold mb-2">Business Transfers</h4>
                    <p className="text-muted-foreground text-sm">
                      In connection with a merger, acquisition, or sale of
                      business assets
                    </p>
                  </div>

                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-semibold mb-2">Consent</h4>
                    <p className="text-muted-foreground text-sm">
                      With your explicit consent for specific purposes
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Data Security */}
            <Card className="mb-8 border-2 border-emerald-500/20">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <Lock className="h-6 w-6 text-emerald-500 mr-3" />
                  <h2 className="text-2xl font-bold">Data Security</h2>
                </div>

                <p className="text-muted-foreground mb-4">
                  We implement appropriate technical and organizational security
                  measures to protect your personal information against
                  unauthorized access, alteration, disclosure, or destruction.
                  Our security measures include:
                </p>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-emerald-500/5 rounded-lg border border-emerald-500/20">
                    <h4 className="font-semibold mb-2 text-emerald-600">
                      Encryption
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      Data encryption in transit and at rest
                    </p>
                  </div>

                  <div className="p-4 bg-emerald-500/5 rounded-lg border border-emerald-500/20">
                    <h4 className="font-semibold mb-2 text-emerald-600">
                      Access Controls
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      Strict access controls and authentication
                    </p>
                  </div>

                  <div className="p-4 bg-emerald-500/5 rounded-lg border border-emerald-500/20">
                    <h4 className="font-semibold mb-2 text-emerald-600">
                      Regular Audits
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      Regular security assessments and audits
                    </p>
                  </div>

                  <div className="p-4 bg-emerald-500/5 rounded-lg border border-emerald-500/20">
                    <h4 className="font-semibold mb-2 text-emerald-600">
                      Staff Training
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      Employee training on data protection
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Your Rights */}
            <Card className="mb-8">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6">
                  Your Rights and Choices
                </h2>

                <p className="text-muted-foreground mb-4">
                  Depending on your location, you may have the following rights
                  regarding your personal information:
                </p>

                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
                    <span>
                      <strong>Access:</strong> Request access to your personal
                      information
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
                    <span>
                      <strong>Correction:</strong> Request correction of
                      inaccurate information
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
                    <span>
                      <strong>Deletion:</strong> Request deletion of your
                      personal information
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
                    <span>
                      <strong>Portability:</strong> Request transfer of your
                      data to another service
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
                    <span>
                      <strong>Opt-out:</strong> Unsubscribe from marketing
                      communications
                    </span>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-emerald-500/10 rounded-lg">
                  <p className="text-sm">
                    To exercise these rights, please contact us at{" "}
                    <a
                      href="mailto:privacy@mjdatsolutions.com"
                      className="text-emerald-600 hover:underline"
                    >
                      privacy@mjdatsolutions.com
                    </a>
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="border-2 border-emerald-500/20">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <FileText className="h-6 w-6 text-emerald-500 mr-3" />
                  <h2 className="text-2xl font-bold">Contact Us</h2>
                </div>

                <p className="text-muted-foreground mb-4">
                  If you have any questions about this Privacy Policy or our
                  data practices, please contact us:
                </p>

                <div className="space-y-2 text-sm">
                  <p>
                    <strong>Email:</strong> privacy@mjdatsolutions.com
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
                  <p className="text-sm font-medium mb-2">
                    Changes to This Policy
                  </p>
                  <p className="text-sm text-muted-foreground">
                    We may update this Privacy Policy from time to time. We will
                    notify you of any changes by posting the new Privacy Policy
                    on this page and updating the "Last updated" date.
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
