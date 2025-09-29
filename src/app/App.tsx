import { BrowserRouter } from 'react-router-dom'

import { AppRoutes } from '@/app/App.routes'

function App() {

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
