import { createSlice } from "@reduxjs/toolkit"
import cartItems from '../../../cartItems'

// - initial state for cartSlice
const initialState = {
    cartItems: cartItems,
    amount: cartItems.length,
    total: 0,
    isLoading: true
}


// - createSlice fuction with passed object
// - export reducer of this slice and put it into the store 
const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        clearCart: (state) => {
            state.cartItems = []
        },
        removeItem: (state, action) => {
            const itemId = action.payload
            state.cartItems = state.cartItems.filter((item) => item.id !== itemId)
        },
        toggle: (state, { payload }) => {
            const { type, id } = payload;
            const cartItem = state.cartItems.find((item) => item.id === id);
            cartItem.amount = type === "upvote" ? cartItem.amount + 1 : cartItem.amount - 1
        },
        calculateTotal: (state) => {
            let amount = 0
            let total = 0
            state.cartItems.forEach((item) => {
                amount += item.amount
                total += item.amount * item.price
            })
            state.amount = amount;
            state.total = total;
        }
    }
})

// export the actions
export const { clearCart, removeItem, toggle, calculateTotal } = cartSlice.actions

// - export the reducer object from this slice
export default cartSlice.reducer