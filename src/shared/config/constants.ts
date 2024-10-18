export const TABLE_SQL_NAMES = {
  MESSAGES: 'messages',
  ONLINE_USERS: 'online_users'
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

export const TABLE_USER_FIELDS = {
  ID: 'id' as const,
  USER_EMAIL: 'user_email' as const,
  STATUS: 'status' as const,
  LAST_SEEN: 'last_seen' as const
}

export const TABLE_USER_STATUS = {
  ONLINE: 'online' as const,
  OFFLINE: 'offline' as const
}
