'use client'
import ProductCard from "@/components/ProductCard";
import { AppDispatch, RootState } from "@/lib/Redux-Toolkit/store";
import { productListThunk } from "@/lib/Redux-Toolkit/Thunks/ProductListThunk";
import { Product } from "@/types/ProductType";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";


export default function Product() {

  const dispatch = useDispatch<AppDispatch>();
  dispatch(productListThunk({limit: 587}));
  const products = useSelector((state:RootState) => state.product.productList.products);
  const id = useParams().id; // URL'den id'yi alıyoruz
  const product = products?.find((product) => product.id === Number(id)); // id'ye göre ürünü buluyoruz. products dizisinde id'si id'ye eşit olan ürünü buluyoruz.


    return (
      <>
        <ProductCard {...product as Product} /> 
        {/* önerilmeyen çözüm buymuş */}
        {/* // ...product ile tüm özellikleri gönderiyoruz. */}
      </>
    );
  }
  
