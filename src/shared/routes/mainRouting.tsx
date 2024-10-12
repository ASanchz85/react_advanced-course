import {
  createBrowserRouter,
  createRoutesFromElements,
  Route
} from 'react-router-dom'
import Layout from '../../theme/layout/Layout'
import { ChatRoom, Profile } from '../../pages'

const routes = createRoutesFromElements(
  <>
    <Route
      path='/'
      element={<Layout />}
    >
      <Route
        index
        element={<ChatRoom />}
      />
      <Route
        path='profile'
        element={<Profile />}
      />
    </Route>
  </>
)

const mainRouting = createBrowserRouter(routes)

export default mainRouting
