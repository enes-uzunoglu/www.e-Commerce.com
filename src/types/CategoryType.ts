export type Category = {
    id: number;
    code: string;
    title: string;
    img: string;
    rating: number;
    gender: "k" | "e"; 
    //burada gender string değil.Literal type oluyor, yani: Sadece "k" veya "e" değerlerinden biri olabilir.
  };    