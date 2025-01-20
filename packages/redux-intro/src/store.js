import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { configureStore } from '@reduxjs/toolkit'

import accountReducer from './features/accounts/accountSlice'
import customerReducer from './features/customers/customerSlice'

/* 原生redux写法 */
// const rootReducer = combineReducers({
//   account: accountReducer, /* slice */
//   customer: customerReducer
// })
// const store = createStore(
//   rootReducer,
//   composeWithDevTools(applyMiddleware(thunk))
// )

// redux toolkit
const store = configureStore({
  reducer: {
    account: accountReducer,
    customer: customerReducer
  }
})

export default store
