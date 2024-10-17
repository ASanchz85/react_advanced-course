export interface Message {
  id: number
  content: string
  email_sender: string
  email_receiver: string | null
  created_at: string
}
