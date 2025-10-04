import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface ErrorMessageProps {
  error: string;
  onRetry?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div className="flex-shrink-0 w-5 h-5 mt-0.5">
          <AlertTriangle className="w-5 h-5 text-red-500" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-sm font-medium text-red-800 mb-1">Error</h3>
              <p className="text-sm text-red-700 leading-relaxed">{error}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;
