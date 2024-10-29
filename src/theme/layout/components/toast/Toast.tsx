import ReactDOM from 'react-dom'
import { useToast } from '../../../../shared/context/ToastContext'
import './toast.css'

const Toast = () => {
  const { toasts, removeToast } = useToast()

  return ReactDOM.createPortal(
    <div className='toast-container'>
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`toast ${toast.type}`}
          onClick={() => removeToast(toast.id)}
        >
          {toast.message}
        </div>
      ))}
    </div>,
    document.body
  )
}

export default Toast
