import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { categoriesThunk } from "../Thunks/CategoriesThunk";
import { Category } from "@/types/CategoryType";
import { productListThunk } from "../Thunks/ProductListThunk";

interface ProductState {
    categories: Category[];
    productList: object;
    total: number;
    limit: number;
    ofset: number;
    filter: string;
    status: string;
    error: string | null;
}

const initialState: ProductState = {
    categories: [],
    productList: {},
    total: 0,
    limit: 25,
    ofset: 0,
    filter: "",
    status: "idle", // "idle" | "loading" | "succeeded" | "failed"
    error: null,
};

const ProductSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setCategories: (state, action: PayloadAction<Category[]>) => {
            state.categories = action.payload;
        },
        setProductList: (state, action: PayloadAction<object[]>) => {
            state.productList = action.payload;
        },
        setTotal: (state, action: PayloadAction<number>) => {
            state.total = action.payload;
        },
        setLimit: (state, action: PayloadAction<number>) => {
            state.limit = action.payload;
        },
        setOfset: (state, action: PayloadAction<number>) => {
            state.ofset = action.payload;
        },
        setFilter: (state, action: PayloadAction<string>) => {
            state.filter = action.payload;
        }
    },
    extraReducers: (builder) => {
    builder
            .addCase(categoriesThunk.pending, (state) => {
                state.status = "Loading";
            })
            .addCase(categoriesThunk.fulfilled, (state, action: PayloadAction<Category[]>) => {
                state.categories = action.payload;
                state.status = "Succeeded";
            })
            .addCase(categoriesThunk.rejected, (state,action) => {
                state.status = "Failed";
                console.error("Error fetching categories:", action.error.message);
            })
            .addCase(productListThunk.pending, (state) => {
                state.status = "Loading";
            }   )
            .addCase(productListThunk.fulfilled, (state, action: PayloadAction<object>) => {
                state.productList = action.payload;
                state.status = "Succeeded";
            })
            .addCase(productListThunk.rejected, (state, action) => {
                state.status = "Failed";
                state.error = action.error.message || "Unknown error";
            })
                
    },
});

export const { setCategories, setProductList, setTotal, setLimit, setOfset, setFilter } = ProductSlice.actions;
export default ProductSlice.reducer;
