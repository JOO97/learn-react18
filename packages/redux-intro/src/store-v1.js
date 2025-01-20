import { combineReducers, createStore } from 'redux'

const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: ''
}

function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case 'account/deposit':
      return {
        ...state,
        balance: state.balance + action.payload
      }
    case 'account/withdraw':
      return {
        ...state,
        balance: state.balance - action.payload
      }
    case 'account/requestLoan':
      if (state.loan > 0) return state
      return {
        ...state,
        loan: state.loan + action.payload.loan,
        balance: state.balance + action.payload.loan,
        loanPurpose: action.payload.purpose
      }
    case 'account/payLoan':
      return {
        ...state,
        loan: 0,
        loanPurpose: '',
        balance: state.balance - state.loan
      }
    default:
      return state
  }
}

const initialStateCustomer = {
  fullName: '',
  nationalID: '',
  createdAt: ''
}
function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case 'customer/createCustomer':
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createdAt: action.payload.createdAt
      }
    case 'customer/updateName':
      return { ...state, fullName: action.payload }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer
})
const store = createStore(rootReducer)

function deposit(amount) {
  return {
    type: 'account/deposit',
    payload: amount
  }
}

function withdraw(amount) {
  return {
    type: 'account/withdraw',
    payload: amount
  }
}

function payLoan(amount) {
  return {
    type: 'account/payLoan',
    payload: amount
  }
}

function requestLoan(amount, purpose) {
  return {
    type: 'account/requestLoan',
    payload: {
      loan: amount,
      purpose: purpose
    }
  }
}

store.dispatch(deposit(500))
store.dispatch(requestLoan(500, 'aaa'))
// store.dispatch({
//   type: 'account/requestLoan',
//   payload: {
//     loan: 500,
//     purpose: 'aaa'
//   }
// })

function createCustomer(fullName, nationalID) {
  return {
    type: 'customer/createCustomer',
    payload: { fullName, nationalID, createdAt: new Date().toISOString() }
  }
}

function updateName(fullName) {
  return { type: 'account/updateName', payload: fullName }
}

console.log(store.getState())

export default store
