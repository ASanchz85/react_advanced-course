import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

interface GuardRouteProps {
  children: JSX.Element
}

const GuardRoute = ({ children }: GuardRouteProps) => {
  const { session, loading } = useAuth()

  if (loading) {
    return <div>Loading...</div>
  }

  if (!session) {
    return (
      <Navigate
        // to='/'
        to='/login'
        replace
      />
    )
  }

  return children
}

export default GuardRoute
