import {
  createBrowserRouter,
  createRoutesFromElements,
  Route
} from 'react-router-dom'
import { ChatRoom, CustomTheme, Login, NterHelp, Profile } from '../../pages'
import Layout from '../../theme/layout/Layout'

const routes = createRoutesFromElements(
  <>
    <Route
      path='/'
      element={<Layout />}
    >
      <Route
        index
        element={<Login />}
      />
      <Route
        path='global-chat'
        element={<ChatRoom />}
      />
      <Route
        path='chat/:targetUser'
        element={<ChatRoom />}
      />
      <Route
        path='theme'
        element={<CustomTheme />}
      />
      <Route
        path='nter-help'
        element={<NterHelp />}
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
