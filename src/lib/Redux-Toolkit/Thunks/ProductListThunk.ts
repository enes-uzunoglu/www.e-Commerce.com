import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const productListThunk = createAsyncThunk(  // createAsyncThunk bu bir fonksiyondur ve bir tipi vardır. boş olsa dahi default olarak. 
// örneğin:createAsyncThunk<ReturnedData>( 
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


/* manuel kontrol olarak yazılmıştır.

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const productListThunk = createAsyncThunk(
  "productListThunk",
  async ({ limit, offset, filter }: { limit?: number; offset?: number; filter?: string }) => {
    let url = `https://workintech-fe-ecommerce.onrender.com/products`;

    if (limit || offset || filter) {
      url += '?';
      if (limit) {
        url += `limit=${limit}`;
      }
      if (offset) {
        url += (limit ? '&' : '') + `offset=${offset}`;
      }
      if (filter) {
        url += ((limit || offset) ? '&' : '') + `filter=${filter}`;
      }
    }

    const response = await axios.get(url);
    return response.data;
  }
);

*/