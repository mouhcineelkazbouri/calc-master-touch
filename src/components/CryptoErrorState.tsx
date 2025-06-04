
import React from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'

interface CryptoErrorStateProps {
  error: string
  onRetry: () => void
}

const CryptoErrorState = ({ error, onRetry }: CryptoErrorStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <AlertTriangle className="w-12 h-12 text-red-500 mb-4" />
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Failed to load crypto data</h3>
      <p className="text-gray-600 mb-4 max-w-md">
        {error || 'Unable to fetch cryptocurrency prices. Please check your connection and try again.'}
      </p>
      <button
        onClick={onRetry}
        className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
      >
        <RefreshCw className="w-4 h-4" />
        Try Again
      </button>
    </div>
  )
}

export default CryptoErrorState
