import { createContext, useContext, useState, ReactNode } from 'react'
import { TOAST_DURATION } from '../config/constants'
import type { Toast, ToastType } from '../types/toast'

interface ToastContextType {
  toasts: Toast[]
  addToast: (toast: { message: string; type: ToastType }) => void
  removeToast: (id: string) => void
  duration: number
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = ({
    message,
    type
  }: {
    message: string
    type: ToastType
  }) => {
    const id = Math.random().toString(36).slice(2, 11)
    setToasts((prevToasts) => [...prevToasts, { id, message, type }])
    setTimeout(() => removeToast(id), TOAST_DURATION)
  }

  const removeToast = (id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id))
  }

  return (
    <ToastContext.Provider
      value={{ toasts, addToast, removeToast, duration: TOAST_DURATION }}
    >
      {children}
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}
