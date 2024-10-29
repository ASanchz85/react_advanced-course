import { TOAST_TYPES } from '../config/constants'

type ToastType = (typeof TOAST_TYPES)[keyof typeof TOAST_TYPES]

export interface Toast {
  id: string
  message: string
  type: ToastType
}
