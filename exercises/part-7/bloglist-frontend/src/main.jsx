import '@fontsource/roboto'
import '@mantine/core/styles.css'

import ReactDOM from 'react-dom/client'
import App from './App'
import { NotificationContextProvider } from './contexts/NotificationContext.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { UserContextProvider } from './contexts/UserContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import { MantineProvider } from '@mantine/core'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <MantineProvider>
    <UserContextProvider>
      <NotificationContextProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </QueryClientProvider>
      </NotificationContextProvider>
    </UserContextProvider>
  </MantineProvider>,
)
