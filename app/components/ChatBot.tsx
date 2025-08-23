'use client';

import { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github.css';
import './chatbot.css';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: `# Welcome! 🎮

I'm your **Xbox Handheld Gaming Console** assistant powered by AI. I have comprehensive knowledge about Xbox handheld consoles and can remember our conversation.

## What I can help with:
- **Features & Specs** - Hardware details, performance capabilities
- **Release Information** - Dates, pricing, availability  
- **Game Compatibility** - What games you can play
- **Comparisons** - How it stacks against Steam Deck, Nintendo Switch
- **Xbox Ecosystem** - Game Pass, cloud gaming, backwards compatibility

Ask me anything about Xbox handheld gaming!`,
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  // Auto-scroll to bottom when new messages are added
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputText,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputText;
    setInputText('');
    setIsLoading(true);

    try {
      // Call the ReAct Agent API with chat history
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: currentInput,
          chatHistory: messages, // Send previous messages as context
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get response');
      }

      // Add typing animation delay
      setIsTyping(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      setIsTyping(false);

      const botMessage: Message = {
        id: messages.length + 2,
        text: data.response,
        isBot: true,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Fallback to dummy response if API fails
      const fallbackResponses = [
        "I'm having trouble connecting right now. The Xbox handheld console is rumored to feature custom AMD hardware for optimal gaming performance on the go!",
        "Sorry, I'm experiencing some technical difficulties. Based on leaks, the device might support Xbox Game Pass natively, giving you access to hundreds of games instantly.",
        "I'm temporarily unable to access my full knowledge base. However, the handheld is expected to have excellent battery life, potentially 6-8 hours for most games.",
      ];
      
      const fallbackResponse = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
      
      const botMessage: Message = {
        id: messages.length + 2,
        text: fallbackResponse,
        isBot: true,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Helpful text near chatbot - only show when closed */}
      {!isOpen && (
        <div className="fixed bottom-16 right-4 sm:bottom-20 sm:right-6 z-40 max-w-48 sm:max-w-56">
          <div className="bg-blue-600 text-white text-xs sm:text-sm px-3 py-2 rounded-lg shadow-lg animate-bounce">
            <div className="flex items-center space-x-2">
              <span>👋</span>
              <span>Hi User, Need Help? Ask me about Xbox handheld gaming!</span>
            </div>
            {/* Arrow pointing to chat button */}
            <div className="absolute -bottom-1 right-6 w-3 h-3 bg-blue-600 transform rotate-45"></div>
          </div>
        </div>
      )}

      {/* Chat Icon */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
        <button
          data-chatbot-trigger
          onClick={() => setIsOpen(!isOpen)}
          className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-600 hover:bg-blue-700 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-105"
        >
          {isOpen ? (
            <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          )}
        </button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-16 right-4 sm:bottom-24 sm:right-6 w-[calc(100vw-2rem)] max-w-[480px] h-[70vh] sm:h-[500px] bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden border">
          {/* Header */}
          <div className="bg-blue-600 text-white p-3 sm:p-4 flex items-center space-x-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-sm sm:text-base">Xbox Handheld Assistant</h3>
              <p className="text-xs sm:text-sm opacity-90">AI-powered gaming expert 🎮</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg chat-message ${
                    message.isBot
                      ? 'bg-gray-100 text-gray-800'
                      : 'bg-blue-600 text-white'
                  }`}
                >
                  {message.isBot ? (
                    <div className="text-sm prose prose-sm max-w-none">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeHighlight]}
                        components={{
                          // Custom styling for markdown elements
                          h1: ({ children }) => <h1 className="text-lg font-bold mb-2 text-gray-800">{children}</h1>,
                          h2: ({ children }) => <h2 className="text-base font-semibold mb-2 text-gray-800">{children}</h2>,
                          h3: ({ children }) => <h3 className="text-sm font-semibold mb-1 text-gray-800">{children}</h3>,
                          p: ({ children }) => <p className="mb-2 last:mb-0 text-gray-800">{children}</p>,
                          ul: ({ children }) => <ul className="list-disc list-inside mb-2 space-y-1">{children}</ul>,
                          ol: ({ children }) => <ol className="list-decimal list-inside mb-2 space-y-1">{children}</ol>,
                          li: ({ children }) => <li className="text-gray-700">{children}</li>,
                          strong: ({ children }) => <strong className="font-semibold text-gray-900">{children}</strong>,
                          em: ({ children }) => <em className="italic text-gray-700">{children}</em>,
                          code: ({ children }) => <code className="bg-gray-200 px-1 py-0.5 rounded text-xs font-mono text-gray-800">{children}</code>,
                          pre: ({ children }) => <pre className="bg-gray-200 p-2 rounded mt-2 mb-2 overflow-x-auto">{children}</pre>,
                          blockquote: ({ children }) => <blockquote className="border-l-4 border-blue-500 pl-3 italic text-gray-700 my-2">{children}</blockquote>,
                        }}
                      >
                        {message.text}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    <p className="text-sm">{message.text}</p>
                  )}
                  <p className={`text-xs mt-2 ${
                    message.isBot ? 'text-gray-500' : 'text-blue-100'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            
            {/* Loading indicator */}
            {(isLoading || isTyping) && (
              <div className="flex justify-start">
                <div className="max-w-[80%] p-3 rounded-lg bg-gray-100 text-gray-800">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                    <span className="text-sm text-gray-500">
                      {isLoading ? 'Xbox Assistant is thinking...' : 'Xbox Assistant is typing...'}
                    </span>
                  </div>
                </div>
              </div>
            )}
            
            {/* Scroll anchor */}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 sm:p-4 border-t text-black bg-gray-50">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about Xbox handheld..."
                className="flex-1 p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim() || isLoading}
                className="bg-blue-600 text-white p-2 sm:p-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
