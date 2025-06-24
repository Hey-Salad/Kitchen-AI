import { useState } from 'react'
import { Camera, Upload, X, RotateCcw, Zap, Wifi, WifiOff } from 'lucide-react'
import { useCamera } from '../../hooks/useCamera'
import { kitchenAPI } from '../../services/api'
import { useRealTime } from '../../contexts/RealTimeContext'

interface CameraCaptureProps {
  onClose: () => void
}

const CameraCapture: React.FC<CameraCaptureProps> = ({ onClose }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [backendError, setBackendError] = useState<string | null>(null)
  
  const { isConnected } = useRealTime()
  
  const {
    image,
    captureFromFile,
    triggerFileInput,
    clearImage,
    fileInputRef,
    error
  } = useCamera()

  const handleAnalyze = async () => {
    if (!image) return

    setIsAnalyzing(true)
    setResult(null)
    setBackendError(null)
    
    try {
      console.log('📸 Sending image to Kitchen AI backend for analysis...')
      
      // Convert base64 to blob
      const response = await fetch(image)
      const blob = await response.blob()
      const file = new File([blob], 'capture.jpg', { type: 'image/jpeg' })
      
      // Send to real backend
      const analysisResult = await kitchenAPI.analyzeImage(file)
      
      console.log('✅ Backend analysis result:', analysisResult)
      setResult(analysisResult)
      
    } catch (error: any) {
      console.error('❌ Backend error:', error)
      
      // Check if it's a network error (backend not running)
      if (error.code === 'ECONNREFUSED' || error.message.includes('Network Error')) {
        setBackendError('Backend not running on localhost:8000')
        
        // Show mock response as fallback
        const mockResult = {
          success: true,
          data: {
            quality_score: Math.floor(Math.random() * 15) + 85, // 85-100
            freshness_rating: Math.floor(Math.random() * 20) + 80, // 80-100
            items_detected: ['tomatoes', 'lettuce', 'onions'],
            recommendation: 'approved',
            confidence: 0.89,
            status: 'mock_analysis',
            message: 'Mock analysis result (Backend not connected)',
            notes: 'This is a mock analysis. Start your Kitchen AI backend for real AI-powered quality analysis.'
          }
        }
        setResult(mockResult)
      } else {
        setResult({ 
          success: false, 
          error: error.response?.data?.detail || error.message || 'Analysis failed'
        })
      }
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-grandstander font-bold text-gray-900">
              📸 Quality Analysis
            </h2>
            {/* Connection Status */}
            <div className="flex items-center space-x-1">
              {isConnected ? (
                <div title="Backend connected">
                  <Wifi className="h-4 w-4 text-green-500" />
                </div>
              ) : (
                <div title="Backend disconnected">
                  <WifiOff className="h-4 w-4 text-red-500" />
                </div>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Backend Status Alert */}
        {backendError && (
          <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm font-figtree text-yellow-800">
              ⚠️ <strong>Backend not detected:</strong> {backendError}
            </p>
            <p className="text-xs font-figtree text-yellow-600 mt-1">
              Showing mock analysis. Start your Kitchen AI backend for real AI analysis.
            </p>
          </div>
        )}

        {/* Image Capture/Upload */}
        <div className="mb-6">
          {!image ? (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-sm font-figtree text-gray-600 mb-4">
                Upload an image for AI-powered quality analysis
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={captureFromFile}
                className="hidden"
              />
              <button
                onClick={triggerFileInput}
                className="bg-heysalad-secondary text-white px-4 py-2 rounded-heysalad font-figtree font-medium hover:bg-orange-400 transition-colors duration-200 flex items-center space-x-2 mx-auto"
              >
                <Upload className="h-4 w-4" />
                <span>Choose Image</span>
              </button>
              <p className="text-xs font-figtree text-gray-500 mt-2">
                Supports JPG, PNG, WebP • Max 10MB
              </p>
            </div>
          ) : (
            <div className="relative">
              <img
                src={image}
                alt="Food for analysis"
                className="w-full h-64 object-cover rounded-lg border"
              />
              <button
                onClick={clearImage}
                className="absolute top-2 right-2 p-2 bg-black bg-opacity-50 text-white rounded-lg hover:bg-opacity-70 transition-colors"
                title="Clear image"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
            </div>
          )}
          
          {error && (
            <p className="text-sm font-figtree text-red-600 mt-2">
              {error}
            </p>
          )}
        </div>

        {/* Analyze Button */}
        {image && (
          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className="w-full bg-heysalad-primary text-white py-3 px-4 rounded-heysalad font-figtree font-medium hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center space-x-2 mb-4"
          >
            {isAnalyzing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                <span>Analyzing...</span>
              </>
            ) : (
              <>
                <Zap className="h-4 w-4" />
                <span>Analyze with Kitchen AI</span>
              </>
            )}
          </button>
        )}

        {/* Results */}
        {result && (
          <div className="p-4 bg-gray-50 rounded-lg mb-4">
            <h3 className="font-figtree font-medium text-gray-900 mb-2">
              🍅 Kitchen AI Analysis:
            </h3>
            <div className="text-sm font-figtree text-gray-700">
              {result.success ? (
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Quality Score:</span>
                    <span className={`font-semibold ${result.data.quality_score > 90 ? 'text-green-600' : 'text-yellow-600'}`}>
                      {result.data.quality_score}%
                    </span>
                  </div>
                  
                  {result.data.freshness_rating && (
                    <div className="flex justify-between items-center">
                      <span>Freshness Rating:</span>
                      <span className={`font-semibold ${result.data.freshness_rating > 85 ? 'text-green-600' : 'text-yellow-600'}`}>
                        {result.data.freshness_rating}%
                      </span>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center">
                    <span>Recommendation:</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      result.data.recommendation === 'approved' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {result.data.recommendation}
                    </span>
                  </div>
                  
                  {result.data.items_detected && (
                    <div>
                      <span className="block mb-1">Items Detected:</span>
                      <div className="flex flex-wrap gap-1">
                        {result.data.items_detected.map((item: string, index: number) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="pt-2 border-t border-gray-200">
                    <p className="text-xs text-gray-600">
                      <strong>Confidence:</strong> {((result.data.confidence || 0.89) * 100).toFixed(1)}%
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      <strong>Status:</strong> {result.data.status || 'analyzed'}
                    </p>
                    {result.data.notes && (
                      <p className="text-xs text-blue-600 mt-1">
                        <strong>Notes:</strong> {result.data.notes}
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                <p className="text-red-600">❌ {result.error || 'Analysis failed'}</p>
              )}
            </div>
          </div>
        )}

        {/* Backend Connection Info */}
        <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center space-x-2 mb-2">
            {isConnected ? (
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            ) : (
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            )}
            <p className="text-xs font-figtree font-medium text-blue-900">
              AI Analysis: {isConnected ? 'Real Backend' : 'Mock Mode'}
            </p>
          </div>
          <p className="text-xs font-figtree text-blue-700">
            {isConnected 
              ? '✅ Connected to Kitchen AI backend for real analysis'
              : '⚠️ Start your Kitchen AI backend for real AI-powered analysis'
            }
          </p>
        </div>
      </div>
    </div>
  )
}

export default CameraCapture