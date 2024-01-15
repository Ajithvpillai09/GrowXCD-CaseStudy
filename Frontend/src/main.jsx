import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import ErrorBoundary from './pages/ErrorBoundary.jsx'
import App from './App.jsx'
import './index.css'


ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
            <App />
            {/* <ToastContainer position="top-center"/> */}
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>,
)
