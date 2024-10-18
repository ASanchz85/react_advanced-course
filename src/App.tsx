import { RouterProvider } from 'react-router-dom'
import Login from './pages/login/Login'
import mainRouting from './shared/routes/mainRouting'
import { useSession } from './shared/hooks'

function App() {
  const { session } = useSession()

  return <>{session ? <RouterProvider router={mainRouting} /> : <Login />}</>
}

export default App
