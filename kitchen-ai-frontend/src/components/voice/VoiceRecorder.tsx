import { useState } from 'react'
import { Mic, MicOff, Send, X, Volume2, Wifi, WifiOff } from 'lucide-react'
import { useVoiceRecording } from '../../hooks/useVoiceRecording'
import { kitchenAPI } from '../../services/api'
import { useRealTime } from '../../contexts/RealTimeContext'

interface VoiceRecorderProps {
  onClose: () => void
}

const VoiceRecorder: React.FC<VoiceRecorderProps> = ({ onClose }) => {
  const [transcript, setTranscript] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [backendError, setBackendError] = useState<string | null>(null)
  
  const { isConnected } = useRealTime()
  
  const { 
    isRecording, 
    startRecording, 
    stopRecording, 
    error 
  } = useVoiceRecording()

  const handleSendCommand = async () => {
    if (!transcript.trim()) return

    setIsProcessing(true)
    setResult(null)
    setBackendError(null)
    
    try {
      console.log('🎤 Sending voice command to Kitchen AI backend:', transcript)
      
      // Try to send to real backend first
      const response = await kitchenAPI.sendVoiceCommand(transcript)
      
      console.log('✅ Backend response:', response)
      setResult(response)
      
    } catch (error: any) {
      console.error('❌ Backend error:', error)
      
      // Check if it's a network error (backend not running)
      if (error.code === 'ECONNREFUSED' || error.message.includes('Network Error')) {
        setBackendError('Backend not running on localhost:8000')
        
        // Show mock response as fallback
        const mockResponse = {
          success: true,
          transcript: transcript,
          agent_used: transcript.includes('inventory') ? 'sourcing' : 
                     transcript.includes('temperature') ? 'quality' : 
                     transcript.includes('customer') ? 'customer' : 'operations',
          result: {
            status: 'mock_response',
            message: `Mock response for: "${transcript}" (Backend not connected)`,
            data: {
              command_understood: true,
              processing_time: '0.8s',
              confidence: 0.95,
              note: 'This is a mock response. Start your Kitchen AI backend for real agent responses.'
            }
          }
        }
        setResult(mockResponse)
      } else {
        setResult({ 
          success: false, 
          error: error.response?.data?.detail || error.message || 'Unknown error'
        })
      }
    } finally {
      setIsProcessing(false)
    }
  }

  const demoCommands = [
    "check kitchen inventory status",
    "what is the current temperature",
    "analyze food quality from camera",
    "show supplier information",
    "monitor quality and safety levels",
    "send notification to customer",
    "emergency alert kitchen fire detected"
  ]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-grandstander font-bold text-gray-900">
              🎤 Voice Commands
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
              Showing mock responses. Start your Kitchen AI backend for real agent responses.
            </p>
          </div>
        )}

        {/* Recording Interface */}
        <div className="text-center mb-6">
          <button
            onClick={isRecording ? stopRecording : startRecording}
            className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-200 ${
              isRecording 
                ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                : 'bg-heysalad-primary hover:bg-red-600'
            }`}
          >
            {isRecording ? (
              <MicOff className="h-8 w-8 text-white" />
            ) : (
              <Mic className="h-8 w-8 text-white" />
            )}
          </button>
          
          <p className="text-sm font-figtree text-gray-600">
            {isRecording ? 'Recording... Click to stop' : 'Click to start recording'}
          </p>
          
          {error && (
            <p className="text-sm font-figtree text-red-600 mt-2">
              {error}
            </p>
          )}
        </div>

        {/* Transcript Input */}
        <div className="mb-4">
          <label className="block text-sm font-figtree font-medium text-gray-700 mb-2">
            Command Text:
          </label>
          <textarea
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            placeholder="Type a command or use voice recording..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-heysalad-primary focus:border-transparent resize-none font-figtree"
            rows={3}
          />
        </div>

        {/* Demo Commands */}
        <div className="mb-4">
          <p className="text-sm font-figtree font-medium text-gray-700 mb-2">
            Try these commands:
          </p>
          <div className="space-y-1 max-h-32 overflow-y-auto">
            {demoCommands.map((command, index) => (
              <button
                key={index}
                onClick={() => setTranscript(command)}
                className="block w-full text-left text-xs font-figtree text-heysalad-primary hover:bg-heysalad-accent px-2 py-1 rounded transition-colors"
              >
                <Volume2 className="h-3 w-3 inline mr-1" />
                "{command}"
              </button>
            ))}
          </div>
        </div>

        {/* Send Button */}
        <button
          onClick={handleSendCommand}
          disabled={!transcript.trim() || isProcessing}
          className="w-full bg-heysalad-primary text-white py-3 px-4 rounded-heysalad font-figtree font-medium hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center space-x-2 mb-4"
        >
          {isProcessing ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
              <span>Processing...</span>
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              <span>Send to Kitchen AI</span>
            </>
          )}
        </button>

        {/* Results */}
        {result && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-figtree font-medium text-gray-900 mb-2">
              🍅 Kitchen AI Response:
            </h3>
            <div className="text-sm font-figtree text-gray-700">
              {result.success ? (
                <div className="space-y-2">
                  <p className="text-green-600">
                    ✅ {result.result?.status === 'mock_response' ? 'Mock Response' : 'Command Processed'}
                  </p>
                  <p><strong>Transcript:</strong> "{result.transcript}"</p>
                  <p><strong>Agent:</strong> {result.agent_used}</p>
                  <p><strong>Status:</strong> {result.result?.status}</p>
                  <p><strong>Response:</strong> {result.result?.message}</p>
                  {result.result?.data && (
                    <div className="mt-2 p-2 bg-white rounded border text-xs space-y-1">
                      <p><strong>Confidence:</strong> {(result.result.data.confidence * 100).toFixed(1)}%</p>
                      <p><strong>Processing Time:</strong> {result.result.data.processing_time}</p>
                      {result.result.data.note && (
                        <p className="text-blue-600"><strong>Note:</strong> {result.result.data.note}</p>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-red-600">❌ {result.error || 'Command failed'}</p>
              )}
            </div>
          </div>
        )}

        {/* Backend Connection Info */}
        <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center space-x-2 mb-2">
            {isConnected ? (
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            ) : (
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            )}
            <p className="text-xs font-figtree font-medium text-blue-900">
              Backend Status: {isConnected ? 'Connected' : 'Disconnected'}
            </p>
          </div>
          <p className="text-xs font-figtree text-blue-700">
            {isConnected 
              ? '✅ Real-time connection to Kitchen AI backend active'
              : '⚠️ Make sure your Kitchen AI backend is running on localhost:8000'
            }
          </p>
        </div>
      </div>
    </div>
  )
}

export default VoiceRecorder