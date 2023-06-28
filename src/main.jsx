import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './pages/app/App'
import './index.css'
import { createStore } from "redux";
import { Provider } from "react-redux";
import myReducer from '../src/reducers'

const store = createStore(myReducer);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
