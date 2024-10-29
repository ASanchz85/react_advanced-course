export const TABLE_SQL_NAMES = {
  MESSAGES: 'messages'
}

export const TABLE_SQL_QUERIES = {
  SELECT_ALL: '*' as const,
  INSERT: 'INSERT' as const,
  UPDATE: 'UPDATE' as const,
  DELETE: 'DELETE' as const
}

export const TABLE_REALTIME_EVENTS = {
  POSTGRES_CHANGES: 'postgres_changes' as const
}

export const TABLE_SCHEMA = {
  PUBLIC: 'public' as const
}

export const TABLE_MESSAGE_FIELDS = {
  ID: 'id' as const,
  EMAIL_SENDER: 'email_sender' as const,
  EMAIL_RECEIVER: 'email_receiver' as const,
  CONTENT: 'content' as const,
  CREATED_AT: 'created_at' as const,
  AVATAR_IMAGE: 'avatar_image' as const
}
