import { NextResponse } from "next/server"

// Mock data for chatbot responses
const companyInfo = {
  name: "MJDAT Solutions",
  address: "123 BPO Street, Suite 400, Business City, BC 12345",
  phone: "+1 (555) 123-4567",
  email: "info@mjdatsolutions.com",
  services: [
    "Human Resources",
    "Financial Services",
    "Digital Marketing",
    "IT Support",
    "Process Automation",
    "Business Consulting",
  ],
  hours: "Our support team is available 24/7.",
  mission: "To optimize operations, reduce costs, and enhance customer satisfaction for our partners.",
  careersLink: "/careers",
  contactLink: "/contact",
}

export async function POST(request: Request) {
  try {
    const { message } = await request.json()
    const lowerCaseMessage = message.toLowerCase()
    let responseText =
      "I'm sorry, I don't have information on that. Please try rephrasing your question or visit our contact page."

    if (lowerCaseMessage.includes("hello") || lowerCaseMessage.includes("hi")) {
      responseText = "Hello! How can I assist you today?"
    } else if (lowerCaseMessage.includes("name")) {
      responseText = `We are ${companyInfo.name}.`
    } else if (lowerCaseMessage.includes("address") || lowerCaseMessage.includes("location")) {
      responseText = `Our main office is located at ${companyInfo.address}.`
    } else if (lowerCaseMessage.includes("phone") || lowerCaseMessage.includes("call")) {
      responseText = `You can reach us by phone at ${companyInfo.phone}.`
    } else if (lowerCaseMessage.includes("email")) {
      responseText = `You can email us at ${companyInfo.email}.`
    } else if (lowerCaseMessage.includes("services")) {
      responseText = `We offer a wide range of services including: ${companyInfo.services.join(", ")}. Visit our services page for more details.`
    } else if (lowerCaseMessage.includes("hours") || lowerCaseMessage.includes("support")) {
      responseText = companyInfo.hours
    } else if (lowerCaseMessage.includes("mission")) {
      responseText = `Our mission is: "${companyInfo.mission}"`
    } else if (lowerCaseMessage.includes("jobs") || lowerCaseMessage.includes("careers")) {
      responseText = `You can find our current job openings on our careers page: ${companyInfo.careersLink}`
    } else if (lowerCaseMessage.includes("contact")) {
      responseText = `You can find all our contact details on our contact page: ${companyInfo.contactLink}`
    } else if (lowerCaseMessage.includes("thank you") || lowerCaseMessage.includes("thanks")) {
      responseText = "You're welcome! Is there anything else I can help you with?"
    }

    return NextResponse.json({ response: responseText }, { status: 200 })
  } catch (error) {
    console.error("Chatbot API error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
