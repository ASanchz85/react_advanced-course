import supabase from './supabaseClient'

const uploadProfilePicture = async (userId: string, imageUrl: string) => {
  try {
    const response = await fetch(imageUrl)
    const blob = await response.blob()

    const { data, error } = await supabase.storage
      .from('images')
      .upload(`${userId}/avatar.jpg`, blob, {
        cacheControl: '3600',
        upsert: true,
        contentType: 'image/jpeg'
      })

    if (error) {
      console.error('Error uploading image:', error)
      return null
    }

    return data?.path
  } catch (error) {
    console.error('Error fetching image from URL:', error)
    return null
  }
}

export default uploadProfilePicture
