import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface ShoppingCartState {
  cart: CartItem[];
  payment: object;
  address: object;
}

const initialState: ShoppingCartState = {
  cart: [],
  payment: {},
  address: {},
};

const ShoppingCartSlice = createSlice({
  name: 'shoppingCart',
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<CartItem[]>) => {
      state.cart = action.payload;
    },
    setPayment: (state, action: PayloadAction<object>) => {
      state.payment = action.payload;
    },
    setAddress: (state, action: PayloadAction<object>) => {
      state.address = action.payload;
    },
    addToCart: (state, action: PayloadAction<any>) => {
  const existing = state.cart.find((item: any) => item.id === action.payload.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    state.cart.push({ ...action.payload, quantity: 1 });
  }
  },
}
});

export const { setCart, setPayment, setAddress, addToCart } = ShoppingCartSlice.actions;
export default ShoppingCartSlice.reducer;
