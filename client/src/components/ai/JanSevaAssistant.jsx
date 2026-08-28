import React, { useState, useRef, useEffect } from 'react';
import API from '../../services/api';
import {
  Sparkles,
  Send,
  Bot,
  User,
  Copy,
  Check,
  RefreshCw,
  ExternalLink,
  ShieldAlert,
  X,
  MessageSquare
} from 'lucide-react';

const JanSevaAssistant = ({ embedded = false }) => {
  const [isOpen, setIsOpen] = useState(embedded);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Namaste! I am **JanSeva Assistant**, your AI guide for Indian Government schemes & digital services. Ask me anything about scheme eligibility, required documents, or application processes!',
      sources: [],
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const messagesEndRef = useRef(null);

  const suggestedQuestions = [
    "Which schemes are available for students?",
    "What documents are required for PM Scholarship?",
    "Which schemes can farmers apply for?",
    "How do I qualify for Ayushman Bharat health insurance?",
    "What is the eligibility for PMAY Housing Scheme?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async (queryText = null) => {
    const textToSend = queryText || input;
    if (!textToSend.trim() || loading) return;

    const userMsg = {
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!queryText) setInput('');
    setLoading(true);

    try {
      const res = await API.post('/assistant/chat', { query: textToSend });
      if (res.data.success && res.data.data) {
        const botMsg = {
          sender: 'bot',
          text: res.data.data.answer,
          sources: res.data.data.sources || [],
          disclaimer: res.data.data.disclaimer,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, botMsg]);
      }
    } catch (err) {
      console.error('[JanSevaAssistant] chat error:', err);
      setMessages(prev => [
        ...prev,
        {
          sender: 'bot',
          text: 'I apologize, but I experienced an intermittent connection issue. Please check the Schemes directory for detailed information.',
          sources: [],
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  if (!embedded && !isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-gov-navy to-gov-deep text-white px-5 py-3.5 rounded-full shadow-2xl hover:scale-105 transition-all duration-200 flex items-center gap-3 group border border-amber-400/40"
      >
        <div className="w-8 h-8 rounded-full bg-amber-400 text-gov-navy flex items-center justify-center font-bold">
          <Sparkles className="w-4 h-4 animate-spin-slow" />
        </div>
        <div className="text-left">
          <p className="text-xs font-bold tracking-wide">JanSeva AI Assistant</p>
          <p className="text-[10px] text-amber-300">Ask Scheme Questions</p>
        </div>
      </button>
    );
  }

  return (
    <div
      className={`${
        embedded
          ? 'w-full h-[600px] border border-slate-200 rounded-2xl shadow-sm bg-white'
          : 'fixed bottom-6 right-6 z-50 w-96 sm:w-[420px] h-[580px] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200'
      } flex flex-col`}
    >
      {/* Bot Header */}
      <div className="bg-gov-navy text-white p-4 flex justify-between items-center border-b border-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center text-gov-navy shadow">
            <Sparkles className="w-5 h-5 text-gov-navy" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-sm leading-tight">JanSeva Assistant</h3>
              <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-1.5 py-0.5 rounded border border-emerald-400/30">
                RAG Online
              </span>
            </div>
            <p className="text-[11px] text-slate-300">AI Public Scheme Guide</p>
          </div>
        </div>

        {!embedded && (
          <button
            onClick={() => setIsOpen(false)}
            className="text-slate-300 hover:text-white p-1 rounded-lg hover:bg-slate-700/50 transition"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Suggested Questions Chips */}
      <div className="bg-slate-50 p-2.5 border-b border-slate-200 overflow-x-auto flex gap-2 no-scrollbar">
        {suggestedQuestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(q)}
            disabled={loading}
            className="shrink-0 text-[11px] bg-white hover:bg-orange-50 hover:text-orange-700 text-slate-700 px-3 py-1.5 rounded-full border border-slate-200 font-medium transition text-left"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Messages Scroll View */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/50">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {m.sender === 'bot' && (
              <div className="w-8 h-8 rounded-full bg-gov-navy text-amber-400 flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                <Bot className="w-4 h-4" />
              </div>
            )}

            <div
              className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed relative group ${
                m.sender === 'user'
                  ? 'bg-gov-navy text-white rounded-br-none shadow'
                  : 'bg-white text-slate-800 border border-slate-200 shadow-sm rounded-bl-none'
              }`}
            >
              <div className="whitespace-pre-line">{m.text}</div>

              {/* Source References */}
              {m.sources && m.sources.length > 0 && (
                <div className="mt-3 pt-2 border-t border-slate-100 space-y-1">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    Official Reference Source:
                  </p>
                  {m.sources.map((src, sIdx) => (
                    <a
                      key={sIdx}
                      href={src.officialUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[11px] text-orange-600 font-medium hover:underline flex items-center gap-1"
                    >
                      • {src.name} ({src.department}) <ExternalLink className="w-3 h-3" />
                    </a>
                  ))}
                </div>
              )}

              {/* Timestamp & Actions */}
              <div className="mt-2 flex items-center justify-between gap-2 text-[10px] text-slate-400 pt-1">
                <span>{m.timestamp}</span>
                {m.sender === 'bot' && (
                  <button
                    onClick={() => copyToClipboard(m.text, idx)}
                    className="hover:text-gov-navy p-1 transition flex items-center gap-1 font-medium"
                    title="Copy Answer"
                  >
                    {copiedIndex === idx ? (
                      <span className="text-emerald-600 flex items-center gap-0.5">
                        <Check className="w-3 h-3" /> Copied
                      </span>
                    ) : (
                      <span className="flex items-center gap-0.5">
                        <Copy className="w-3 h-3" /> Copy
                      </span>
                    )}
                  </button>
                )}
              </div>
            </div>

            {m.sender === 'user' && (
              <div className="w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5 font-bold text-xs">
                U
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex gap-3 items-center text-xs text-slate-500">
            <div className="w-8 h-8 rounded-full bg-gov-navy text-amber-400 flex items-center justify-center">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-white p-3 rounded-2xl border border-slate-200 flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-orange-500 animate-spin" />
              <span>Analyzing government scheme knowledge base...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* AI Disclaimer Notice */}
      <div className="bg-amber-50 px-3 py-1.5 border-t border-amber-200 text-[10px] text-amber-800 flex items-center gap-1.5 font-medium">
        <ShieldAlert className="w-3.5 h-3.5 text-amber-600 shrink-0" />
        <span className="truncate">JanSeva AI is an informational guide. Confirm eligibility on official portals.</span>
      </div>

      {/* Chat Input Field */}
      <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask a question about government schemes..."
          className="flex-1 text-xs bg-slate-100 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-gov-navy"
        />
        <button
          onClick={() => handleSend()}
          disabled={!input.trim() || loading}
          className="w-10 h-10 rounded-xl bg-gov-navy hover:bg-gov-deep disabled:bg-slate-300 text-white flex items-center justify-center transition shadow-md shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default JanSevaAssistant;
