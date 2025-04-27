import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const productListThunk = createAsyncThunk(
  "productListThunk",
  async ({ limit, offset, filter }: { limit?: number; offset?: number; filter?: string }) => {
    let url = `https://workintech-fe-ecommerce.onrender.com/products`;

    const params = new URLSearchParams();
    if (limit) {
      params.append('limit', String(limit));
    }
    if (offset) {
      params.append('offset', String(offset));
    }
    if (filter) {
      params.append('filter', filter);
    }

    const finalUrl = params.toString() ? `${url}?${params.toString()}` : url;

    const response = await axios.get(finalUrl);
    return response.data;
  }
);