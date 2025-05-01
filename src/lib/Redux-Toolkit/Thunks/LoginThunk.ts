'use client'
import { LoginFormProps } from "@/components/LoginForm";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loginThunk = createAsyncThunk(
    'loginThunk',  // Thunk'ın adı
    async (userData: LoginFormProps) => {
      const response = await axios.post('https://workintech-fe-ecommerce.onrender.com/login', userData);
      return response.data;  // Dönen veriyi action.payload olarak kullanacağız
    }
  );