
import React from 'react'

const CryptoLoadingState = () => {
  return (
    <div className="space-y-4">
      {/* From Currency Loading */}
      <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200">
        <div className="h-4 bg-gray-200 rounded w-12 mb-2 animate-pulse"></div>
        <div className="flex gap-3">
          <div className="flex-1">
            <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="flex-1">
            <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <div className="h-3 bg-gray-200 rounded w-20 animate-pulse"></div>
          <div className="flex items-center gap-1">
            <div className="h-3 bg-gray-200 rounded w-12 animate-pulse"></div>
            <div className="h-5 bg-gray-200 rounded w-16 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Swap Button */}
      <div className="flex justify-center">
        <div className="p-3 bg-gray-200 rounded-full animate-pulse w-12 h-12"></div>
      </div>

      {/* To Currency Loading */}
      <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200">
        <div className="h-4 bg-gray-200 rounded w-8 mb-2 animate-pulse"></div>
        <div className="flex gap-3">
          <div className="flex-1">
            <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="flex-1">
            <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <div className="h-3 bg-gray-200 rounded w-20 animate-pulse"></div>
          <div className="flex items-center gap-1">
            <div className="h-3 bg-gray-200 rounded w-12 animate-pulse"></div>
            <div className="h-5 bg-gray-200 rounded w-16 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Refresh Button */}
      <div className="w-full h-12 bg-gray-200 rounded-2xl animate-pulse"></div>
    </div>
  )
}

export default CryptoLoadingState
