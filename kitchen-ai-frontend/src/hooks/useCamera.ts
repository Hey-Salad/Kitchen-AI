import { useState, useRef } from 'react'

export const useCamera = () => {
  const [image, setImage] = useState<string | null>(null)
  const [error] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const captureFromFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const clearImage = () => {
    setImage(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return {
    image,
    captureFromFile,
    triggerFileInput,
    clearImage,
    fileInputRef,
    error
  }
}