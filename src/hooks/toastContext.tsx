import React, { createContext, useContext, useCallback, useState } from 'react'
import { uuid } from 'uuidv4'
import ToastContainer from '../components/toastContainer'

interface ToastContexData {
  addToast(params: Omit<toastProps, 'id'>): void
  removeToast(id: string): void
}

export interface toastProps {
  id: string
  type?: 'success' | 'error' | 'info'
  title: string
  description?: string
}
const ToastContext = createContext<ToastContexData>({} as ToastContexData)

const ToastProvider: React.FC = ({ children }) => {
  const [toasts, setToasts] = useState<toastProps[]>([])

  const addToast = useCallback(
    ({ title, type, description }: Omit<toastProps, 'id'>) => {
      const id = uuid()

      const toast = {
        id,
        title,
        type,
        description
      }

      setToasts((oldToasts) => [...oldToasts, toast])
    },
    []
  )
  const removeToast = useCallback((id: string) => {
    setToasts((state) => state.filter((toast) => toast.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} />
    </ToastContext.Provider>
  )
}

function useToast() {
  const context = useContext(ToastContext)

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }

  return context
}

export { ToastProvider, useToast }
