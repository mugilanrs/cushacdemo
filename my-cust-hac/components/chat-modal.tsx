"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"

interface Message {
  id: string
  text: string
  sender: "user" | "assistant"
  timestamp: Date
}

interface ChatModalProps {
  onClose: () => void
}

export default function ChatModal({ onClose }: ChatModalProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! How can I help you today?",
      sender: "assistant",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: `Thanks for your message: "${input}". This is a simulated response. In a real app, this would connect to an AI service.`,
        sender: "assistant",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-background rounded-lg shadow-2xl w-full max-w-md h-96 flex flex-col border border-slate-200 dark:border-slate-700">
        {/* Header */}
        <div className="bg-primary text-secondary px-6 py-4 flex items-center justify-between rounded-t-lg">
          <h2 className="text-xl font-bold">AI Assistant</h2>
          <button
            onClick={onClose}
            className="text-secondary hover:bg-accent hover:text-white rounded p-1 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-xs px-4 py-2 rounded-lg ${
                  message.sender === "user" ? "bg-accent text-white" : "bg-secondary text-primary"
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-secondary text-primary px-4 py-2 rounded-lg">
                <span className="inline-flex gap-1">
                  <span className="animate-bounce">●</span>
                  <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>
                    ●
                  </span>
                  <span className="animate-bounce" style={{ animationDelay: "0.4s" }}>
                    ●
                  </span>
                </span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t border-slate-200 dark:border-slate-700 p-4 flex gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-foreground bg-input placeholder-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-accent"
            rows={2}
          />
          <button
            onClick={handleSendMessage}
            disabled={isLoading || !input.trim()}
            className="bg-accent text-white px-4 py-2 rounded-lg hover:bg-accent/90 disabled:bg-muted disabled:cursor-not-allowed transition-colors font-semibold"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}
