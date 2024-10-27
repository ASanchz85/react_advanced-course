import {
  createBrowserRouter,
  createRoutesFromElements,
  Route
} from 'react-router-dom'
import { ChatRoom, CustomTheme, Login, NterHelp } from '../../pages'
import Layout from '../../theme/layout/Layout'
import GuardRoute from './GuardRoute'

const routes = createRoutesFromElements(
  <>
    <Route
      path='/login'
      element={<Login />}
    />
    {/* <Route
      path='/'
      element={<Layout />}
    > */}
    <Route
      path='/'
      element={
        <GuardRoute>
          <Layout />
        </GuardRoute>
      }
    >
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
    </Route>
  </>
)

const mainRouting = createBrowserRouter(routes)

export default mainRouting
