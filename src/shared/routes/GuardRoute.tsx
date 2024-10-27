import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

interface GuardRouteProps {
  children: JSX.Element
}

const GuardRoute = ({ children }: GuardRouteProps) => {
  const { session } = useAuth()

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
