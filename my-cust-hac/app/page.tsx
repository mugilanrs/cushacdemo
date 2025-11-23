"use client"

import { useState } from "react"
import Navbar from "@/components/navbar"
import ChatModal from "@/components/chat-modal"
import EmailFormModal from "@/components/email-form-modal"
import FAQPage from "@/components/faq-page"

export default function Home() {
  const [activeModal, setActiveModal] = useState<string | null>(null)

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section with Centered Buttons */}
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
        <div className="flex flex-col gap-6 items-center">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Chat with AI Button */}
            <button
              onClick={() => setActiveModal("chat")}
              className="px-8 py-4 bg-accent text-white rounded-lg hover:bg-accent/90 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl"
            >
              💬 Chat with our AI Assistant
            </button>

            {/* Contact Email Button */}
            <button
              onClick={() => setActiveModal("email")}
              className="px-8 py-4 bg-accent text-white rounded-lg hover:bg-accent/90 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl"
            >
              ✉️ Contact us through Email
            </button>

            {/* FAQs Button */}
            <button
              onClick={() => setActiveModal("faq")}
              className="px-8 py-4 bg-accent text-white rounded-lg hover:bg-accent/90 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl"
            >
              ❓ Our FAQs
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      {activeModal === "chat" && <ChatModal onClose={() => setActiveModal(null)} />}
      {activeModal === "email" && <EmailFormModal onClose={() => setActiveModal(null)} />}
      {activeModal === "faq" && <FAQPage onClose={() => setActiveModal(null)} />}
    </main>
  )
}
