import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: []
  },
  reducers: {
    addItem(state, action) {
      state.cart.push(action.payload)
    },
    deleteItem(state, action) {
      state.cart = state.cart.filter(
        (c) => c.pizzaId !== action.payload
      )
    },
    increaseItemQuantity(state, action) {
      state.cart.forEach((c) => {
        if (c.pizzaId === action.payload) {
          c.quantity++
          c.totalPrice = c.quantity * c.unitPrice
        }
      })
    },
    decreaseItemQuantity(state, action) {
      state.cart.forEach((c) => {
        if (c.pizzaId === action.payload) {
          c.quantity--
          c.totalPrice = c.quantity * c.unitPrice
          //   NOTE: caseReducers
          if (c.quantity === 0)
            cartSlice.caseReducers.deleteItem(state, action)
        }
      })
    },
    clearCart(state) {
      state.cart = []
    }
  }
})

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart
} = cartSlice.actions

export default cartSlice.reducer

export const getCart = (state) => state.cart.cart

export const getTotalCartQuantity = (state) =>
  state.cart.cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  )

export const getTotalCartPrice = (state) =>
  state.cart.cart.reduce(
    (sum, item) => sum + item.totalPrice,
    0
  )

export const getCurrentQuantityById = (id) => (state) =>
  state.cart.cart.find((item) => item.pizzaId === id)
    ?.quantity ?? 0
