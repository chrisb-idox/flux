import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { SendIcon, XIcon, SparklesIcon, FileTextIcon } from 'lucide-react';
import { mockDocuments } from '../data/mockDocuments';
import { statusColors } from './DocumentCard';
interface ChatInterfaceProps {
  onExit: () => void;
  onDocumentSelect: (docId: string) => void;
}
interface ChatMessage {
  id: string;
  content: React.ReactNode;
  sender: 'user' | 'flint';
  timestamp: string;
}
// Pick real documents from mock data for AI responses
const getSpecDocuments = () => {
  const specs = mockDocuments.filter((d) => d.documentType === 'Specification');
  return specs.slice(0, 3);
};
const getMechDocuments = () => {
  const mechs = mockDocuments.filter(
    (d) =>
    d.documentType === 'Drawing' &&
    d.folderId === 'folder-drawings-mechanical'
  );
  return mechs.slice(0, 3);
};
const getSafetyDocuments = () => {
  const safety = mockDocuments.filter(
    (d) =>
    d.documentType === 'Procedure' &&
    d.folderId === 'folder-procedures-safety'
  );
  return safety.slice(0, 3);
};
export function ChatInterface({
  onExit,
  onDocumentSelect
}: ChatInterfaceProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);
  const buildResponseForQuery = (query: string): React.ReactNode => {
    const lowerQuery = query.toLowerCase();
    if (
    lowerQuery.includes('tensile') ||
    lowerQuery.includes('pressure') ||
    lowerQuery.includes('spec') ||
    lowerQuery.includes('revision'))
    {
      const docs = getSpecDocuments();
      return (
        <div>
          <p className="mb-3">
            Based on the project documents, here are the relevant
            specifications:
          </p>
          <div className="space-y-2 mb-3">
            {docs.map((doc) =>
            <button
              key={doc.id}
              onClick={() => onDocumentSelect(doc.id)}
              className="w-full flex items-center gap-3 p-3 bg-neutral-50 border border-neutral-200 rounded-lg hover:bg-neutral-100 hover:border-[#0461BA]/30 transition-colors group text-left">
              
                <div className="w-10 h-10 rounded-md bg-[#E8F1FB] flex items-center justify-center text-[#0461BA] shrink-0">
                  <FileTextIcon size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-neutral-900 group-hover:text-[#0461BA] transition-colors truncate">
                    {doc.id}
                  </div>
                  <div className="text-xs text-neutral-500 truncate">
                    {doc.title}
                  </div>
                </div>
                <span
                className={`text-[10px] font-medium px-2 py-0.5 rounded-md border whitespace-nowrap shrink-0 ${statusColors[doc.status]}`}>
                
                  {doc.status}
                </span>
              </button>
            )}
          </div>
          <p className="text-sm text-neutral-600">
            Click any document above to view it in the document grid.
          </p>
        </div>);

    }
    if (
    lowerQuery.includes('piping') ||
    lowerQuery.includes('material') ||
    lowerQuery.includes('compare'))
    {
      const docs = getMechDocuments();
      return (
        <div>
          <p className="mb-3">
            Here are the relevant mechanical drawings for piping and material
            standards:
          </p>
          <div className="space-y-2 mb-3">
            {docs.map((doc) =>
            <button
              key={doc.id}
              onClick={() => onDocumentSelect(doc.id)}
              className="w-full flex items-center gap-3 p-3 bg-neutral-50 border border-neutral-200 rounded-lg hover:bg-neutral-100 hover:border-[#0461BA]/30 transition-colors group text-left">
              
                <div className="w-10 h-10 rounded-md bg-[#E8F1FB] flex items-center justify-center text-[#0461BA] shrink-0">
                  <FileTextIcon size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-neutral-900 group-hover:text-[#0461BA] transition-colors truncate">
                    {doc.id}
                  </div>
                  <div className="text-xs text-neutral-500 truncate">
                    {doc.title}
                  </div>
                </div>
                <span
                className={`text-[10px] font-medium px-2 py-0.5 rounded-md border whitespace-nowrap shrink-0 ${statusColors[doc.status]}`}>
                
                  {doc.status}
                </span>
              </button>
            )}
          </div>
          <p className="text-sm text-neutral-600">
            Click any document above to view it in the document grid.
          </p>
        </div>);

    }
    if (
    lowerQuery.includes('safety') ||
    lowerQuery.includes('procedure') ||
    lowerQuery.includes('confined'))
    {
      const docs = getSafetyDocuments();
      return (
        <div>
          <p className="mb-3">
            Here are the relevant safety procedures for your query:
          </p>
          <div className="space-y-2 mb-3">
            {docs.map((doc) =>
            <button
              key={doc.id}
              onClick={() => onDocumentSelect(doc.id)}
              className="w-full flex items-center gap-3 p-3 bg-neutral-50 border border-neutral-200 rounded-lg hover:bg-neutral-100 hover:border-[#0461BA]/30 transition-colors group text-left">
              
                <div className="w-10 h-10 rounded-md bg-[#E8F1FB] flex items-center justify-center text-[#0461BA] shrink-0">
                  <FileTextIcon size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-neutral-900 group-hover:text-[#0461BA] transition-colors truncate">
                    {doc.id}
                  </div>
                  <div className="text-xs text-neutral-500 truncate">
                    {doc.title}
                  </div>
                </div>
                <span
                className={`text-[10px] font-medium px-2 py-0.5 rounded-md border whitespace-nowrap shrink-0 ${statusColors[doc.status]}`}>
                
                  {doc.status}
                </span>
              </button>
            )}
          </div>
          <p className="text-sm text-neutral-600">
            Click any document above to view it in the document grid.
          </p>
        </div>);

    }
    // Default fallback with random documents
    const docs = mockDocuments.slice(0, 3);
    return (
      <div>
        <p className="mb-3">
          Here are some relevant documents I found related to your query:
        </p>
        <div className="space-y-2 mb-3">
          {docs.map((doc) =>
          <button
            key={doc.id}
            onClick={() => onDocumentSelect(doc.id)}
            className="w-full flex items-center gap-3 p-3 bg-neutral-50 border border-neutral-200 rounded-lg hover:bg-neutral-100 hover:border-[#0461BA]/30 transition-colors group text-left">
            
              <div className="w-10 h-10 rounded-md bg-[#E8F1FB] flex items-center justify-center text-[#0461BA] shrink-0">
                <FileTextIcon size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-neutral-900 group-hover:text-[#0461BA] transition-colors truncate">
                  {doc.id}
                </div>
                <div className="text-xs text-neutral-500 truncate">
                  {doc.title}
                </div>
              </div>
              <span
              className={`text-[10px] font-medium px-2 py-0.5 rounded-md border whitespace-nowrap shrink-0 ${statusColors[doc.status]}`}>
              
                {doc.status}
              </span>
            </button>
          )}
        </div>
        <p className="text-sm text-neutral-600">
          Click any document above to view it in the document grid.
        </p>
      </div>);

  };
  const handleSend = (overrideValue?: string) => {
    const text = overrideValue || inputValue;
    if (!text.trim()) return;
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      content: text,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      })
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const flintMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: buildResponseForQuery(text),
        sender: 'flint',
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        })
      };
      setMessages((prev) => [...prev, flintMsg]);
    }, 1200);
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  const suggestions = [
  "What's the latest revision of the pressure vessel spec?",
  'Compare piping material standards',
  'Summarize safety procedures for Unit 200'];

  return (
    <motion.div
      initial={{
        opacity: 0
      }}
      animate={{
        opacity: 1
      }}
      exit={{
        opacity: 0
      }}
      transition={{
        duration: 0.25
      }}
      className="fixed inset-0 bg-[#F8FAFC] z-30 flex flex-col">
      
      {/* Header */}
      <header className="bg-white border-b border-neutral-200 px-4 py-3 shrink-0">
        <div className="max-w-[960px] mx-auto flex items-center justify-between">
          <button
            onClick={onExit}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-sm font-medium transition-colors focus:ring-2 focus:ring-[#0461BA] focus:ring-offset-2">
            
            <XIcon size={16} />
            Exit Chat
          </button>
          <div className="flex items-center gap-2">
            <SparklesIcon size={18} className="text-[#0461BA]" />
            <h1 className="text-lg font-semibold text-neutral-900">
              Ask Flint
            </h1>
          </div>
          <div className="w-[100px]" />
        </div>
      </header>

      {/* Messages Area / Empty State */}
      <div
        className="flex-1 overflow-y-auto flex flex-col"
        role="log"
        aria-live="polite"
        aria-label="Chat messages">
        
        {messages.length === 0 ?
        <div className="flex-1 flex flex-col items-center justify-center p-4 max-w-2xl mx-auto w-full">
            <div className="w-16 h-16 bg-[#E8F1FB] rounded-full flex items-center justify-center mb-4 shadow-sm">
              <SparklesIcon size={32} className="text-[#0461BA]" />
            </div>
            <h2 className="text-3xl font-bold text-neutral-900 mb-2">
              Ask Flint
            </h2>
            <p className="text-neutral-500 mb-6 text-center text-lg">
              Your AI engineering assistant. Ask about document specifications,
              project details, or compliance requirements.
            </p>

            {/* Centered Input for Empty State */}
            <div className="w-full relative shadow-sm rounded-full bg-white border border-neutral-200 focus-within:ring-2 focus-within:ring-[#0461BA] focus-within:border-transparent transition-all">
              <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="E.g., What is the required tensile strength for the primary support beams?"
              className="w-full pl-6 pr-16 py-4 rounded-full bg-transparent text-neutral-900 placeholder-neutral-400 focus:outline-none text-base"
              autoFocus />
            
              <button
              onClick={() => handleSend()}
              disabled={!inputValue.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#0461BA] hover:bg-[#035299] disabled:bg-neutral-200 disabled:text-neutral-400 disabled:cursor-not-allowed text-white flex items-center justify-center transition-colors">
              
                <SendIcon size={18} className="ml-0.5" />
              </button>
            </div>

            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {suggestions.map((s) =>
            <button
              key={s}
              onClick={() => handleSend(s)}
              className="px-4 py-2 bg-white border border-neutral-200 rounded-full text-sm text-neutral-600 hover:bg-neutral-50 hover:text-[#0461BA] transition-colors">
              
                  {s}
                </button>
            )}
            </div>
          </div> :

        <div className="max-w-[960px] mx-auto w-full px-4 py-4 space-y-4">
            {messages.map((message, index) => {
            const showTimestamp =
            index === 0 ||
            messages[index - 1].timestamp !== message.timestamp;
            return (
              <div key={message.id}>
                  {showTimestamp &&
                <div className="flex justify-center mb-5">
                      <span className="text-xs font-medium text-neutral-400 bg-neutral-100 px-3 py-1 rounded-full">
                        {message.timestamp}
                      </span>
                    </div>
                }
                  <motion.div
                  initial={{
                    opacity: 0,
                    y: 10
                  }}
                  animate={{
                    opacity: 1,
                    y: 0
                  }}
                  transition={{
                    duration: 0.25
                  }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  
                    {message.sender === 'flint' &&
                  <div className="w-8 h-8 rounded-full bg-[#E8F1FB] flex items-center justify-center shrink-0 mr-3 mt-1">
                        <SparklesIcon size={14} className="text-[#0461BA]" />
                      </div>
                  }
                    <div
                    className={`max-w-[75%] px-5 py-4 shadow-sm ${message.sender === 'user' ? 'bg-[#0461BA] text-white rounded-2xl rounded-br-sm ml-auto' : 'bg-white border border-neutral-200 text-neutral-900 rounded-2xl rounded-bl-sm'}`}>
                    
                      {message.sender === 'flint' &&
                    <p className="text-xs font-bold text-[#0461BA] mb-2 uppercase tracking-wider">
                          Flint AI
                        </p>
                    }
                      <div className="text-[15px] leading-relaxed">
                        {message.content}
                      </div>
                    </div>
                  </motion.div>
                </div>);

          })}

            {isTyping &&
          <div className="flex justify-start">
                <div className="w-8 h-8 rounded-full bg-[#E8F1FB] flex items-center justify-center shrink-0 mr-3 mt-1">
                  <SparklesIcon size={14} className="text-[#0461BA]" />
                </div>
                <div className="bg-white border border-neutral-200 rounded-2xl rounded-bl-sm px-5 py-4 shadow-sm flex items-center gap-1.5">
                  <motion.div
                animate={{
                  y: [0, -5, 0]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 0.6,
                  delay: 0
                }}
                className="w-2 h-2 bg-neutral-300 rounded-full" />
              
                  <motion.div
                animate={{
                  y: [0, -5, 0]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 0.6,
                  delay: 0.2
                }}
                className="w-2 h-2 bg-neutral-300 rounded-full" />
              
                  <motion.div
                animate={{
                  y: [0, -5, 0]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 0.6,
                  delay: 0.4
                }}
                className="w-2 h-2 bg-neutral-300 rounded-full" />
              
                </div>
              </div>
          }
            <div ref={messagesEndRef} />
          </div>
        }
      </div>

      {/* Input Area (Only show when there are messages) */}
      {messages.length > 0 &&
      <div className="bg-white border-t border-neutral-200 p-4 shrink-0">
          <div className="max-w-[960px] mx-auto flex items-center gap-3">
            <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask a follow-up question..."
            className="flex-1 px-5 py-3.5 rounded-full bg-neutral-50 border border-neutral-200 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#0461BA] focus:border-transparent text-sm transition-shadow"
            aria-label="Message input" />
          
            <button
            onClick={() => handleSend()}
            disabled={!inputValue.trim()}
            className="w-12 h-12 rounded-full bg-[#0461BA] hover:bg-[#035299] disabled:bg-neutral-200 disabled:text-neutral-400 disabled:cursor-not-allowed text-white flex items-center justify-center transition-colors shrink-0 shadow-sm"
            aria-label="Send message">
            
              <SendIcon size={20} className="ml-0.5" />
            </button>
          </div>
        </div>
      }
    </motion.div>);

}