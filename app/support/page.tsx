"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  ArrowLeft,
  Phone,
  Mail,
  MessageCircle,
  Clock,
  Search,
  ChevronDown,
  ChevronUp,
  Users,
  Zap,
  HelpCircle,
  ExternalLink,
  Send,
  MessageSquare,
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

interface FAQ {
  id: number;
  category: string;
  question: string;
  answer: string;
}

const supportChannels = [
  {
    icon: Phone,
    title: "Phone Support",
    description: "Speak directly with our support team",
    contact: "+1 (555) 123-4567",
    availability: "24/7 for emergencies, 8 AM - 8 PM EST for general support",
    action: "Call Now",
  },
  {
    icon: Mail,
    title: "Email Support",
    description: "Send us detailed questions or requests",
    contact: "support@mjdatsolutions.com",
    availability: "Response within 2-4 hours during business hours",
    action: "Send Email",
  },
  {
    icon: MessageCircle,
    title: "Live Chat",
    description: "Get instant help from our chat agents",
    contact: "Available on website",
    availability: "8 AM - 8 PM EST, Monday - Friday",
    action: "Start Chat",
  },
  {
    icon: MessageSquare,
    title: "Support Portal",
    description: "Access tickets, documentation, and resources",
    contact: "portal.mjdatsolutions.com",
    availability: "Available 24/7",
    action: "Access Portal",
  },
];

const categories = ["All", "General", "Billing", "Technical", "Services"];

export default function SupportPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [faqData, setFaqData] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [ticketForm, setTicketForm] = useState({
    name: "",
    email: "",
    subject: "",
    category: "General",
    priority: "Medium",
    description: "",
  });

  useEffect(() => {
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    try {
      // Try to fetch from API (if FAQ API exists)
      const response = await fetch("/api/support/faqs");
      if (response.ok) {
        const data = await response.json();
        setFaqData(data.faqs || []);
      } else {
        // Fallback to static FAQ data
        setFaqData([
          {
            id: 1,
            category: "General",
            question: "What services does MJDAT Solutions offer?",
            answer:
              "MJDAT Solutions offers comprehensive business process outsourcing services including Human Resources, Financial Services, Digital Marketing, IT Support, Process Automation, and Business Consulting. We provide end-to-end solutions tailored to your specific business needs.",
          },
          {
            id: 2,
            category: "General",
            question: "How do I get started with MJDAT Solutions?",
            answer:
              "Getting started is easy! Contact us through our website, phone, or email to schedule a consultation. We'll assess your needs, provide a customized proposal, and guide you through the onboarding process.",
          },
          {
            id: 3,
            category: "Billing",
            question: "What are your pricing models?",
            answer:
              "We offer flexible pricing models including fixed monthly rates, hourly billing, and performance-based pricing. Our pricing depends on the scope of services, complexity, and duration of the engagement. Contact us for a customized quote.",
          },
          {
            id: 4,
            category: "Billing",
            question: "How do I update my billing information?",
            answer:
              "You can update your billing information by logging into your client portal or contacting our billing department at billing@mjdatsolutions.com. Changes typically take effect within 1-2 business days.",
          },
          {
            id: 5,
            category: "Technical",
            question: "What security measures do you have in place?",
            answer:
              "We maintain ISO 27001 certification and implement comprehensive security measures including data encryption, secure access controls, regular security audits, and compliance with industry standards like GDPR and HIPAA where applicable.",
          },
          {
            id: 6,
            category: "Technical",
            question: "Do you provide 24/7 support?",
            answer:
              "Yes, we provide 24/7 support for critical services and emergency situations. Our standard support hours are 8 AM to 8 PM EST, Monday through Friday, with extended hours available for premium support packages.",
          },
          {
            id: 7,
            category: "Services",
            question: "Can you customize services for my industry?",
            answer:
              "We specialize in providing industry-specific solutions across healthcare, finance, retail, technology, and manufacturing sectors. Our team has extensive experience adapting our services to meet unique industry requirements and compliance standards.",
          },
          {
            id: 8,
            category: "Services",
            question: "What is your typical implementation timeline?",
            answer:
              "Implementation timelines vary based on service complexity and scope. Simple services can be deployed within 1-2 weeks, while comprehensive solutions may take 4-8 weeks. We provide detailed project timelines during the planning phase.",
          },
        ]);
      }
    } catch (error) {
      console.error("Error fetching FAQs:", error);
      // Fallback to static data
      setFaqData([
        {
          id: 1,
          category: "General",
          question: "What services does MJDAT Solutions offer?",
          answer:
            "MJDAT Solutions offers comprehensive business process outsourcing services including Human Resources, Financial Services, Digital Marketing, IT Support, Process Automation, and Business Consulting. We provide end-to-end solutions tailored to your specific business needs.",
        },
        {
          id: 2,
          category: "General",
          question: "How do I get started with MJDAT Solutions?",
          answer:
            "Getting started is easy! Contact us through our website, phone, or email to schedule a consultation. We'll assess your needs, provide a customized proposal, and guide you through the onboarding process.",
        },
        {
          id: 3,
          category: "Billing",
          question: "What are your pricing models?",
          answer:
            "We offer flexible pricing models including fixed monthly rates, hourly billing, and performance-based pricing. Our pricing depends on the scope of services, complexity, and duration of the engagement. Contact us for a customized quote.",
        },
        {
          id: 4,
          category: "Billing",
          question: "How do I update my billing information?",
          answer:
            "You can update your billing information by logging into your client portal or contacting our billing department at billing@mjdatsolutions.com. Changes typically take effect within 1-2 business days.",
        },
        {
          id: 5,
          category: "Technical",
          question: "What security measures do you have in place?",
          answer:
            "We maintain ISO 27001 certification and implement comprehensive security measures including data encryption, secure access controls, regular security audits, and compliance with industry standards like GDPR and HIPAA where applicable.",
        },
        {
          id: 6,
          category: "Technical",
          question: "Do you provide 24/7 support?",
          answer:
            "Yes, we provide 24/7 support for critical services and emergency situations. Our standard support hours are 8 AM to 8 PM EST, Monday through Friday, with extended hours available for premium support packages.",
        },
        {
          id: 7,
          category: "Services",
          question: "Can you customize services for my industry?",
          answer:
            "We specialize in providing industry-specific solutions across healthcare, finance, retail, technology, and manufacturing sectors. Our team has extensive experience adapting our services to meet unique industry requirements and compliance standards.",
        },
        {
          id: 8,
          category: "Services",
          question: "What is your typical implementation timeline?",
          answer:
            "Implementation timelines vary based on service complexity and scope. Simple services can be deployed within 1-2 weeks, while comprehensive solutions may take 4-8 weeks. We provide detailed project timelines during the planning phase.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const filteredFaqs = faqData.filter((faq) => {
    const matchesCategory =
      selectedCategory === "All" || faq.category === selectedCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleTicketSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: ticketForm.name.split(" ")[0] || "",
          lastName: ticketForm.name.split(" ").slice(1).join(" ") || "",
          email: ticketForm.email,
          subject: ticketForm.subject,
          message: ticketForm.description,
          category: ticketForm.category,
          priority: ticketForm.priority,
        }),
      });

      if (response.ok) {
        alert(
          "Support ticket submitted successfully! We'll get back to you within 24 hours."
        );
        setTicketForm({
          name: "",
          email: "",
          subject: "",
          category: "General",
          priority: "Medium",
          description: "",
        });
      } else {
        alert("Failed to submit ticket. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting ticket:", error);
      alert("An error occurred. Please try again.");
    }
  };

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
                  Support Center
                </h1>
                <p className="text-xl text-gray-300 max-w-3xl">
                  Get the help you need with our comprehensive support resources
                  and dedicated team.
                </p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-400 mb-2">
                  24/7
                </div>
                <div className="text-gray-300">Emergency Support</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-400 mb-2">
                  &lt; 2 hours
                </div>
                <div className="text-gray-300">Response Time</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-400 mb-2">
                  98%
                </div>
                <div className="text-gray-300">Satisfaction Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-400 mb-2">
                  500+
                </div>
                <div className="text-gray-300">Issues Resolved</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Support Channels */}
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
                Get Help
              </Badge>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              How Can We Help You?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Choose the support channel that works best for you. Our team is
              ready to assist with any questions or issues.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportChannels.map((channel, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 border-2 hover:border-emerald-500/20">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      {channel.icon && (
                        <channel.icon className="h-8 w-8 text-emerald-500" />
                      )}
                    </div>
                    <h3 className="text-xl font-semibold mb-3">
                      {channel.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {channel.description}
                    </p>
                    <div className="space-y-2 mb-6">
                      <p className="font-medium text-sm">{channel.contact}</p>
                      <p className="text-xs text-muted-foreground">
                        {channel.availability}
                      </p>
                    </div>
                    <Button className="w-full bg-emerald-500 hover:bg-emerald-600">
                      {channel.action}
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
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
                FAQ
              </Badge>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Find quick answers to common questions about our services and
              support.
            </p>
          </motion.div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search FAQs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={
                    selectedCategory === category ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={
                    selectedCategory === category
                      ? "bg-emerald-500 hover:bg-emerald-600"
                      : ""
                  }
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* FAQ List */}
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="animate-pulse">
                  <Card>
                    <CardContent className="p-6">
                      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredFaqs.map((faq, index) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="p-0">
                      <button
                        className="w-full p-6 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
                        onClick={() =>
                          setExpandedFaq(expandedFaq === faq.id ? null : faq.id)
                        }
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <Badge variant="secondary" className="text-xs">
                              {faq.category}
                            </Badge>
                          </div>
                          <h3 className="font-semibold text-lg">
                            {faq.question}
                          </h3>
                        </div>
                        {expandedFaq === faq.id ? (
                          <ChevronUp className="h-5 w-5 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-muted-foreground" />
                        )}
                      </button>

                      {expandedFaq === faq.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="px-6 pb-6"
                        >
                          <div className="border-t pt-4">
                            <p className="text-muted-foreground leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}

          {filteredFaqs.length === 0 && !loading && (
            <div className="text-center py-12">
              <HelpCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No FAQs found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search terms or browse all categories.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Submit Ticket Section */}
      <section className="py-20 bg-slate-900 dark:bg-slate-950 text-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center mb-6">
                <div className="w-1 h-12 bg-emerald-500 mr-4"></div>
                <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                  Need More Help?
                </Badge>
              </div>
              <h2 className="text-4xl font-bold mb-6">
                Submit a Support Ticket
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Can't find what you're looking for? Submit a detailed support
                ticket and our team will get back to you within 24 hours.
              </p>

              <div className="space-y-6">
                <div className="flex items-center">
                  <Clock className="h-6 w-6 text-emerald-400 mr-3" />
                  <div>
                    <div className="font-semibold">Quick Response</div>
                    <div className="text-gray-300">
                      Average response time: 2-4 hours
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Users className="h-6 w-6 text-emerald-400 mr-3" />
                  <div>
                    <div className="font-semibold">Expert Support</div>
                    <div className="text-gray-300">
                      Dedicated technical specialists
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Zap className="h-6 w-6 text-emerald-400 mr-3" />
                  <div>
                    <div className="font-semibold">Priority Handling</div>
                    <div className="text-gray-300">
                      Urgent issues get immediate attention
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Card className="bg-slate-800 border-slate-700">
                <CardContent className="p-8">
                  <form onSubmit={handleTicketSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-300">
                          Name *
                        </label>
                        <input
                          type="text"
                          value={ticketForm.name}
                          onChange={(e) =>
                            setTicketForm((prev) => ({
                              ...prev,
                              name: e.target.value,
                            }))
                          }
                          required
                          className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-300">
                          Email *
                        </label>
                        <input
                          type="email"
                          value={ticketForm.email}
                          onChange={(e) =>
                            setTicketForm((prev) => ({
                              ...prev,
                              email: e.target.value,
                            }))
                          }
                          required
                          className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-300">
                        Subject *
                      </label>
                      <input
                        type="text"
                        value={ticketForm.subject}
                        onChange={(e) =>
                          setTicketForm((prev) => ({
                            ...prev,
                            subject: e.target.value,
                          }))
                        }
                        required
                        className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-white"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-300">
                          Category
                        </label>
                        <select
                          value={ticketForm.category}
                          onChange={(e) =>
                            setTicketForm((prev) => ({
                              ...prev,
                              category: e.target.value,
                            }))
                          }
                          className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-white"
                        >
                          <option value="General">General</option>
                          <option value="Technical">Technical</option>
                          <option value="Billing">Billing</option>
                          <option value="Services">Services</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-300">
                          Priority
                        </label>
                        <select
                          value={ticketForm.priority}
                          onChange={(e) =>
                            setTicketForm((prev) => ({
                              ...prev,
                              priority: e.target.value,
                            }))
                          }
                          className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-white"
                        >
                          <option value="Low">Low</option>
                          <option value="Medium">Medium</option>
                          <option value="High">High</option>
                          <option value="Urgent">Urgent</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-300">
                        Description *
                      </label>
                      <textarea
                        value={ticketForm.description}
                        onChange={(e) =>
                          setTicketForm((prev) => ({
                            ...prev,
                            description: e.target.value,
                          }))
                        }
                        required
                        rows={4}
                        placeholder="Please provide detailed information about your issue..."
                        className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-white"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-emerald-500 hover:bg-emerald-600"
                    >
                      Submit Ticket
                      <Send className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
