import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import 'normalize.css/normalize.css'
import { ConfigProvider } from 'antd'
import { Provider } from 'react-redux'
import store from './store'
import './assets/styles/index.scss'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/es/integration/react'
import zh_CN from 'antd/lib/locale-provider/zh_CN'
ReactDOM.render(
  <ConfigProvider locale={zh_CN}>
    <Provider store={store}>
      <PersistGate persistor={persistStore(store)}>
        <App />
      </PersistGate>
    </Provider>
  </ConfigProvider>,
  document.getElementById('root')
)
