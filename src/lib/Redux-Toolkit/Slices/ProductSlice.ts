import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { categoriesThunk } from "../Thunks/CategoriesThunk";
import { Category } from "@/types/CategoryType";
import { productListThunk } from "../Thunks/ProductListThunk";
import { Product } from "@/types/ProductType";

interface ProductState {
    categories: Category[];
    categoryName: string;
    productList: {products:Product[], total: number};
    limit: number;
    offset: number;
    filter: string | string[] | undefined;
    status: string;
    error: string | null;
}

const initialState: ProductState = {
    categories: [],
    categoryName: "",
    productList: {products:[], total:0},
    limit: 25,
    offset: 0,
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
        setCategoryName: (state, action: PayloadAction<string>) => {
            state.categoryName = action.payload;             //  TODO:  BU KISMI SEN KENDİ BACKENDINDE DUZELT
        },
        setProductList: (state, action: PayloadAction<{products:Product[], total: number}>) => {
            state.productList = action.payload;
        },
        setTotal: (state, action: PayloadAction<number>) => {
            state.productList.total = action.payload;
        },
        setLimit: (state, action: PayloadAction<number>) => {
            state.limit = action.payload;
        },
        setOfset: (state, action: PayloadAction<number>) => {
            state.offset = action.payload;
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
            .addCase(productListThunk.fulfilled, (state, action: PayloadAction<{products:Product[], total: number}>) => {
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
