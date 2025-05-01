//store.ts kullanman gerekiyor. Çünkü Redux store sadece JavaScript/TypeScript objeleriyle çalışır, JSX içermez.
'use client'
import { configureStore } from '@reduxjs/toolkit';
import ClientReducer from './Slices/ClientSlice'; //  default export oldugu ıcın ClientReducer bu ısımle dahıl ettık.
import ProductReducer from './Slices/ProductSlice'; // ProductSlice'dan ProductReducer'ı içe aktarıyoruz

export const store = configureStore({
  reducer: {
    client: ClientReducer, // clientReducer'ı store'a ekliyoruz
    product: ProductReducer, // ProductReducer'ı store'a ekliyoruz
  },
});

// `RootState` ve `AppDispatch` türlerini doğrudan store'dan çıkarıyoruz
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

