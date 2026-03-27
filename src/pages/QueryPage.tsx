/**
 * Query Page
 * Main interface for querying the RAG system
 */

import { useState } from 'react';
import { sendQuery } from '../services/api';
import { ResponseCard } from '../components/ResponseCard';
import { Loader } from '../components/Loader';
import { Send, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

export function QueryPage() {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!question.trim()) {
      toast.error('Please enter a question');
      return;
    }

    if (question.trim().length < 3) {
      toast.error('Question must be at least 3 characters');
      return;
    }

    setLoading(true);
    setResponse('');

    try {
      const result = await sendQuery(question);

      if (result.success && result.data) {
        setResponse(result.data.answer);
        setHasSearched(true);
        toast.success('Query processed successfully');
      } else {
        setResponse('');
        toast.error(result.error || 'Failed to process query');
      }
    } catch (error) {
      setResponse('');
      toast.error('An error occurred while processing your query');
      console.error('Query error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setQuestion('');
    setResponse('');
    setHasSearched(false);
  };

  return (
    <div className="h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-3 sm:px-5 lg:px-6 py-4 sm:py-5 lg:py-6 h-full flex flex-col overflow-hidden">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
              <Sparkles size={24} className="sm:w-7 sm:h-7" />
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
            Ask Your Question
          </h1>
          <p className="text-gray-300 text-sm sm:text-base">Query our knowledge base with natural language</p>
        </div>

        {/* Query Form */}
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="relative">
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="What would you like to know? (e.g., 'What is RAG?', 'How does machine learning work?')"
              disabled={loading}
              rows={3}
              className="w-full px-6 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed resize-none"
            />

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 mt-4">
              <div className="text-sm text-gray-400">
                {question.length > 0 && `${question.length} characters`}
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                {hasSearched && (
                  <button
                    type="button"
                    onClick={handleClear}
                    className="px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300 font-medium order-2 sm:order-1"
                  >
                    Clear
                  </button>
                )}
                <button
                  type="submit"
                  disabled={loading || !question.trim()}
                  className="flex items-center justify-center gap-2 px-6 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed order-1 sm:order-2"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Send
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-16">
            <Loader />
            <p className="text-gray-300 mt-4 text-center">Processing your question...</p>
          </div>
        )}

        {/* Response Section */}
        {!loading && (
          <>
            {hasSearched && response && (
              <ResponseCard response={response} />
            )}
            {hasSearched && !response && !loading && (
              <div className="mt-8 text-center p-8 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
                <p className="text-yellow-200">No response received. Please try again.</p>
              </div>
            )}
          </>
        )}

        {/* Help Section */}
        {!hasSearched && !loading && (
          <div className="mt-12 grid md:grid-cols-3 gap-4">
            {[
              {
                icon: '💡',
                title: 'Smart Queries',
                description: 'Ask natural language questions about your knowledge base',
              },
              {
                icon: '⚡',
                title: 'Fast Responses',
                description: 'Get instant answers using advanced retrieval techniques',
              },
              {
                icon: '🎯',
                title: 'Accurate Results',
                description: 'Find exactly what you need from your documents',
              },
            ].map((item, index) => (
              <div
                key={index}
                className="backdrop-blur-md bg-white/10 rounded-2xl p-6 border border-white/20 text-center hover:border-white/30 transition-all duration-300"
              >
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-gray-300">{item.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
