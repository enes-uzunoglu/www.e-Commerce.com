'use client'
import {  createSlice, PayloadAction } from '@reduxjs/toolkit'
import { loginThunk } from '../Thunks/LoginThunk';
import { signupThunk } from '../Thunks/SignupThunk';

interface ClientState {
    user: object|null;
    adressList:object[];
    creditCards:object[];
    roles:object[];
    theme:string;
    language:string;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';  // İstek durumu
    error: string | null;  // Hata mesajı için
  }

const initialState: ClientState = {
    user: null,
    adressList: [],
    creditCards: [],
    roles: [],
    theme: 'light',
    language: 'tr',
    status: 'idle',  // 'idle', 'loading', 'succeeded', 'failed'
    error: null,  // Hata mesajı için
}

const ClientSlice = createSlice({
    name: 'client',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<object>) => {
            state.user = action.payload
        },
        // action type ve payload verilerini tutan bir objedir.
        setRoles: (state, action: PayloadAction<object[]>) => {
            state.roles = action.payload
        },
        setTheme:(state,action:PayloadAction<string>)=>{
            state.theme = action.payload
        },
        setLanguage:(state,action:PayloadAction<string>)=>{
            state.language = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
          .addCase(loginThunk.pending, (state) => {
            state.status = 'loading';  // İstek yapılırken 'loading' durumu
          })
          .addCase(loginThunk.fulfilled, (state, action) => {
            state.status = 'succeeded';  // İstek başarılı olursa 'succeeded'
            state.user = action.payload;  // Dönen veriyi user'a atıyoruz
          })
          .addCase(loginThunk.rejected, (state, action) => {
            state.status = 'failed';  // İstek başarısız olursa 'failed'
            state.error = action.error.message || 'Bir hata oluştu'; // thunk adılyla bır obje var ve ıcınde pendıng / fulfilled / rejected actionları var. (tamamen createAsyncThunk ile ilgili bir durumdur.) bunlarda bır obje seklınde ve message ya da payload gıbı ozellıklerı var.
          })

          .addCase(signupThunk.pending, (state) => {
            state.status = 'loading';  
          })
          .addCase(signupThunk.fulfilled, (state, action) => {
            state.status = 'succeeded';  
            state.user = action.payload; 
          })
          .addCase(signupThunk.rejected, (state, action) => {
            state.status = 'failed';  
            state.error = action.error.message || 'Bir hata oluştu'; 
          });
        }
})

export const { setUser,setRoles,setTheme,setLanguage } = ClientSlice.actions
export default ClientSlice.reducer