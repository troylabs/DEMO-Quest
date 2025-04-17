export async function getUserId(): Promise<string | null> {
    try {
      const res = await fetch('/api/auth/me', {
        method: 'GET',
        credentials: 'include', 
      })
  
      const data = await res.json()
      return data.userId || null
    } catch (err) {
      console.error('Error fetching userId:', err)
      return null
    }
  }