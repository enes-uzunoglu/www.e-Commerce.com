import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ShoppingCartState {
    cart:object[];
    payment:object;
    address:object;
}

const initialState: ShoppingCartState = {
    cart: [],
    payment: {},
    address: {},
}

const ShoppingCartSlice = createSlice({
    name: 'shoppingCart',
    initialState,
    reducers: {
        setCart: (state, action: PayloadAction<object[]>) => {
            state.cart = action.payload
        },
        setPayment: (state, action: PayloadAction<object>) => {
            state.payment = action.payload
        },
        setAddress: (state, action: PayloadAction<object>) => {
            state.address = action.payload
        },
    }
})

export const { setCart, setPayment, setAddress } = ShoppingCartSlice.actions
export default ShoppingCartSlice.reducer
