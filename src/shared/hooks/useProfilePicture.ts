import { useState, useEffect } from 'react'
import { useSession } from './useSession'
import supabase from '../services/supabaseClient'

export const useProfilePicture = () => {
  const { userInfo, loading: sessionLoading } = useSession()
  const [profileUrl, setProfileUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProfilePicture = async () => {
    if (!userInfo || !userInfo.user_metadata || !userInfo.user_metadata.email) {
      setError('User information is missing')
      setLoading(false)
      return
    }

    try {
      const userId = userInfo.user_metadata.email
      const { data } = await supabase.storage
        // const { data, error: downloadError } = await supabase.storage
        .from('images')
        .getPublicUrl(`${userId}/avatar.jpg`)

      console.log('useProfilePicture', data)
      // if (downloadError) {
      //   throw new Error(
      //     downloadError.message || 'Error fetching profile picture'
      //   )
      // }

      setProfileUrl(data.publicUrl)
    } catch (err) {
      if (err instanceof Error) {
        console.error('Error fetching profile picture:', err.message)
        setError(err.message)
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!sessionLoading) {
      fetchProfilePicture()
    }
  }, [sessionLoading])

  return { profileUrl, loading, error }
}
