/**
 * Response Card Component
 * Displays the RAG response in a formatted card
 */

interface ResponseCardProps {
  response: string;
  loading?: boolean;
}

export function ResponseCard({ response, loading }: ResponseCardProps) {
  if (!response && !loading) return null;

  return (
    <div className="animate-fadeIn mt-6">
      <div className="backdrop-blur-md bg-white/10 rounded-2xl p-4 sm:p-6 border border-white/20 shadow-xl">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 mt-2"></div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-gray-300 mb-2">RAG Response</h3>
            <p className="text-gray-200 leading-relaxed break-words whitespace-pre-wrap text-sm sm:text-base">
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <span className="inline-block w-2 h-2 bg-purple-400 rounded-full animate-pulse"></span>
                  Processing your question...
                </span>
              ) : (
                response
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
