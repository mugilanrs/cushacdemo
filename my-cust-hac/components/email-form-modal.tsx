"use client"

import type React from "react"

import { useState } from "react"

interface EmailFormModalProps {
  onClose: () => void
}

export default function EmailFormModal({ onClose }: EmailFormModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [statusMessage, setStatusMessage] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")

    // Simulate form submission
    setTimeout(() => {
      setStatus("success")
      setStatusMessage("✓ Email sent successfully! We'll get back to you soon.")
      setFormData({ name: "", email: "", message: "" })

      // Auto-close after 3 seconds
      setTimeout(() => {
        onClose()
      }, 3000)
    }, 1500)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-background rounded-lg shadow-2xl w-full max-w-md border border-slate-200 dark:border-slate-700">
        {/* Header */}
        <div className="bg-primary text-secondary px-6 py-4 flex items-center justify-between rounded-t-lg">
          <h2 className="text-xl font-bold">Contact us through Email</h2>
          <button
            onClick={onClose}
            className="text-secondary hover:bg-accent hover:text-white rounded p-1 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {status === "success" && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
              {statusMessage}
            </div>
          )}

          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-foreground mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-foreground bg-input placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="Your name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-foreground bg-input placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="your.email@example.com"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-semibold text-foreground mb-1">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
              className="w-full border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-foreground bg-input placeholder-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="Your message..."
            />
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full bg-accent text-white py-2 rounded-lg hover:bg-accent/90 disabled:bg-muted disabled:cursor-not-allowed transition-colors font-semibold"
          >
            {status === "loading" ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  )
}
