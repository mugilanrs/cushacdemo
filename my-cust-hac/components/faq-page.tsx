"use client"

import { useState } from "react"

interface FAQItem {
  id: string
  question: string
  answer: string
}

interface FAQPageProps {
  onClose: () => void
}

const faqData: FAQItem[] = [
  {
    id: "1",
    question: "What is the Customer Chat App?",
    answer:
      "The Customer Chat App is a platform designed to help you connect with our support team, get answers to frequently asked questions, and chat with our AI assistant for instant help.",
  },
  {
    id: "2",
    question: "How do I contact support?",
    answer:
      'You can reach our support team by clicking the "Contact us through Email" button on the home page and filling out the contact form. Our team typically responds within 24 hours.',
  },
  {
    id: "3",
    question: "Is the AI assistant available 24/7?",
    answer:
      "Yes, our AI assistant is available around the clock to help answer your questions instantly. For more complex issues, you can contact our human support team via email.",
  },
  {
    id: "4",
    question: "What information do I need to provide when contacting support?",
    answer:
      "Please provide your name, email address, and a detailed description of your issue. This helps our support team assist you more effectively.",
  },
  {
    id: "5",
    question: "Can I chat with the AI assistant anonymously?",
    answer:
      "Yes, the AI assistant chat is completely anonymous. You don't need to create an account or provide any personal information to use the chat feature.",
  },
]

export default function FAQPage({ onClose }: FAQPageProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-lg shadow-2xl w-full max-w-2xl max-h-96 overflow-y-auto border border-slate-200 dark:border-slate-700">
        {/* Header */}
        <div className="sticky top-0 bg-primary text-secondary px-6 py-4 flex items-center justify-between rounded-t-lg">
          <h2 className="text-xl font-bold">Frequently Asked Questions</h2>
          <button
            onClick={onClose}
            className="text-secondary hover:bg-accent hover:text-white rounded p-1 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* FAQ Items */}
        <div className="p-6 space-y-4">
          {faqData.map((faq) => (
            <div
              key={faq.id}
              className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden transition-all"
            >
              <button
                onClick={() => toggleExpand(faq.id)}
                className="w-full px-4 py-3 bg-secondary text-primary flex items-center justify-between hover:bg-accent hover:text-white transition-colors font-semibold text-left"
              >
                <span>{faq.question}</span>
                <span className={`transform transition-transform ${expandedId === faq.id ? "rotate-180" : ""}`}>▼</span>
              </button>
              {expandedId === faq.id && (
                <div className="px-4 py-3 bg-background text-foreground border-t border-slate-200 dark:border-slate-700">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
