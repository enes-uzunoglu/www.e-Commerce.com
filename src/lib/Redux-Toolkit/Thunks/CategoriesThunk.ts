import { Category } from "@/types/CategoryType";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const categoriesThunk = createAsyncThunk<Category[]>(
    "categoriesThunk",  // Thunk'ın adı
    async () => {
        const response = await axios.get<Category[]>("https://workintech-fe-ecommerce.onrender.com/categories");
        return response.data;  // Dönen veriyi action.payload olarak kullanacağız
    });
