import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app'

import { Provider } from 'react-redux'
// import { Store } from 'redux'

import { store } from './services/store'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
    
      
  </React.StrictMode>,
)