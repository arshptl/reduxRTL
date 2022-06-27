import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";

// - url to fetch cart items
const url = "https://course-api.com/react-useReducer-cart-project"

// - initial state for cartSlice
const initialState = {
    cartItems: [],
    amount: 0,
    total: 0,
    isLoading: true
}

export const getCartItems = createAsyncThunk(
    'cart/getCartItems', async (name, thunkAPI) => {
        // console.log(name)
        // console.log(thunkAPI);
        // console.log(thunkAPI.getState())
        // thunkAPI.dispatch(openModal())
        try {
            const resp = await axios(url)
            return resp.data
        } catch (error) {
            return thunkAPI.rejectWithValue('Somthing went wrong')
        }

        // - Promise method
        // return fetch(url).then(resp => resp.json()).catch((err) => console.log(err));
    }
);

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
    },
    extraReducers: {
        [getCartItems.pending]: (state) => {
            state.isLoading = true
        },
        [getCartItems.fulfilled]: (state, action) => {
            console.log(action)
            state.isLoading = false
            state.cartItems = action.payload
        },
        [getCartItems.rejected]: (state, action) => {
            console.log(action)
            state.isLoading = false
        }
    }
})

// export the actions
export const { clearCart, removeItem, toggle, calculateTotal } = cartSlice.actions

// - export the reducer object from this slice
export default cartSlice.reducer