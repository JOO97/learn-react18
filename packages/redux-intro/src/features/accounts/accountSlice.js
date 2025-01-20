import { createSlice } from '@reduxjs/toolkit'

const accountSlice = createSlice({
  name: 'account',
  initialState: {
    balance: 0,
    loan: 0,
    loanPurpose: '',
    isLoading: false
  },
  reducers: {
    deposit(state, action) {
      state.balance = state.balance + action.payload
      state.isLoading = false
    },
    withdraw(state, action) {
      state.balance = state.balance = action.payload
    },
    requestLoan: {
      prepare(amount, purpose) {
        return {
          payload: {
            amount,
            purpose
          }
        }
      },
      // action只接收一个入参
      reducer(state, action) {
        if (state.loan > 0) return
        state.loan = state.loan + action.payload.amount
        state.balance = state.balance + action.payload.amount
        state.loanPurpose = action.payload.purpose
      }
    },
    payLoan(state) {
      state.loanPurpose = ''
      state.balance = state.balance - state.loan
      state.loan = 0
    },
    convertingCurrency(state) {
      state.isLoading = true
    }
  }
})

export const { withdraw, requestLoan, payLoan } = accountSlice.actions

/* thunk */
export function deposit(amount, currency) {
  if (currency === 'USD')
    return {
      type: 'account/deposit',
      payload: amount
    }
  return async (dispatch, getState) => {
    dispatch({ type: 'account/convertingCurrency' })

    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    )
    const data = await res.json()
    const converted = data.rates.USD

    dispatch({ type: 'account/deposit', payload: converted })
  }
}

export default accountSlice.reducer
