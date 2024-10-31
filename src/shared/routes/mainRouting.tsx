import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
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
    <Route
      path='/'
      element={
        <GuardRoute>
          <Layout />
        </GuardRoute>
      }
    >
      <Route
        index
        element={
          <Navigate
            to='global-chat'
            replace
          />
        }
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
    </Route>
    <Route
      path='*'
      element={
        <Navigate
          to='/global-chat'
          replace
        />
      }
    />
  </>
)

const mainRouting = createBrowserRouter(routes)

export default mainRouting
