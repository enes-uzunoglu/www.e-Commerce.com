import { Role } from '@/types/SignupFormState';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// import { SignupFormState } from '@/types/SignupFormState';  // SignupFormState tipini içe aktarıyoruz

export interface SignupFormPayload {
  name: string;
      email: string;
      password: string;
      roleId: string;
      //roles: Role[]; // Rol listesini tutan dizi // bu da bi type aynı javadakı composition gibi dusun
      storeName: string;
      storePhone: string;
      storeTaxNo: string;
      storeBankAccount: string;
  
}

export const signupThunk = createAsyncThunk(
    'signupThunk',  // Thunk'ın adı
    async (userData: SignupFormPayload) => {
      const response = await axios.post('https://workintech-fe-ecommerce.onrender.com/signup', userData);
      return response.data;  // Dönen veriyi action.payload olarak kullanacağız
    }
  );
