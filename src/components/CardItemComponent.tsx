import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart, CheckCircle, XCircle, Plus, Minus, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { ScrollArea } from "@/components/ui/scroll-area"
import { motion, AnimatePresence } from 'framer-motion';

// Ürün Tipi
interface Product {
    id: string;
    name: string;
    price: number;
    // Gerekirse diğer ürün özelliklerini ekleyin
    images?: string[];
    [key: string]: any; // Diğer dinamik özellikler için
}

// Sepet Ürünü Tipi
interface CartItem {
    count: number;
    checked: boolean;
    product: Product;
}

// ===============================
// Bileşenler
// ===============================

// Sepet Ürünü Bileşeni
const CartItemComponent: React.FC<{
    item: CartItem;
    dispatch: React.Dispatch<CartAction>;
    onRemove: (productId: string) => void;
}> = ({ item, dispatch, onRemove }) => {
    const totalPrice = item.product.price * item.count;

    return (
        <motion.div
            layout
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="flex items-center justify-between py-2 border-b border-gray-200 last:border-none"
        >
            {/* Onay Kutusu */}
            <Button
                variant="ghost"
                size="icon"
                onClick={() => dispatch({ type: 'TOGGLE_CHECKED', payload: { productId: item.product.id, checked: !item.checked } })}
                className={cn(
                    "mr-2",
                    item.checked
                        ? "text-green-500"
                        : "text-gray-400 hover:text-blue-500"
                )}
            >
                {item.checked ? (
                    <CheckCircle className="h-5 w-5" />
                ) : (
                    <div className="h-5 w-5 rounded-full border-2 border-gray-400" />
                )}
            </Button>

            {/* Ürün Resmi ve Detayları */}
            <div className="flex-1 flex items-center min-w-[100px]">
                {item.product.images && item.product.images.length > 0 ? (
                    <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="h-12 w-12 rounded-md object-cover mr-4"
                    />
                ) : (
                    <div className="h-12 w-12 rounded-md bg-gray-200 mr-4 flex items-center justify-center">
                        <ShoppingCart className="h-6 w-6 text-gray-500" />
                    </div>
                )}
                <div>
                    <div className="font-semibold text-gray-800">{item.product.name}</div>
                    <div className="text-sm text-gray-500">Fiyat: ${item.product.price.toFixed(2)}</div>
                </div>
            </div>

            {/* Adet Kontrolleri */}
            <div className="flex items-center mr-4">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => dispatch({ type: 'DECREASE_ITEM_COUNT', payload: { productId: item.product.id } })}
                    className="hover:bg-gray-200"
                >
                    <Minus className="h-4 w-4" />
                </Button>
                <span className="mx-2 text-gray-700 font-semibold min-w-[20px] text-center">{item.count}</span>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => dispatch({ type: 'INCREASE_ITEM_COUNT', payload: { productId: item.product.id } })}
                    className="hover:bg-gray-200"
                >
                    <Plus className="h-4 w-4" />
                </Button>
            </div>

            {/* Toplam Fiyat */}
            <div className="text-gray-900 font-semibold mr-4">${totalPrice.toFixed(2)}</div>

            {/* Kaldır Butonu */}
            <Button
                variant="ghost"
                size="icon"
                onClick={() => onRemove(item.product.id)}
                className="text-gray-500 hover:text-red-500"
            >
                <Trash2 className="h-4 w-4" />
            </Button>
        </motion.div>
    );
};

// Sepet Dropdown Bileşeni
const CartDropdown: React.FC<{
    cartItems: CartItem[];
    dispatch: React.Dispatch<CartAction>;
}> = ({ cartItems, dispatch }) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Ürünü kaldırma fonksiyonu
    const handleRemoveFromCart = useCallback((productId: string) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: { productId } });
    }, [dispatch]);

    // Dışarı tıklayınca dropdown'ı kapat
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const totalItems = cartItems.reduce((total, item) => total + item.count, 0);
    const totalPrice = cartItems.reduce((total, item) => total + (item.product.price * item.count), 0);

    return (
        <div ref={containerRef} className="relative inline-block text-left">
            {/* Sepet Butonu */}
            <Button
                variant="outline"
                onClick={() => setIsOpen(!isOpen)}
                className="relative"
            >
                <ShoppingCart className="h-6 w-6" />
                {totalItems > 0 && (
                    <Badge
                        variant="secondary"
                        className="absolute -top-1 -right-1 rounded-full text-xs px-1.5"
                    >
                        {totalItems}
                    </Badge>
                )}
            </Button>

            {/* Dropdown İçeriği */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2, type: 'tween' }}
                        className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
                    >
                        <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                            {cartItems.length === 0 ? (
                                <div className="px-4 py-2 text-gray-500">Sepetiniz boş.</div>
                            ) : (
                                <ScrollArea className="h-72">
                                    <div className="px-4 py-2">
                                        <AnimatePresence>
                                            {cartItems.map(item => (
                                                <CartItemComponent
                                                    key={item.product.id}
                                                    item={item}
                                                    dispatch={dispatch}
                                                    onRemove={handleRemoveFromCart}
                                                />
                                            ))}
                                        </AnimatePresence>
                                    </div>
                                </ScrollArea>
                            )}

                            {cartItems.length > 0 && (
                                <div className="border-t border-gray-200 px-4 py-3">
                                    <div className="flex justify-between items-center text-gray-700 font-semibold">
                                        <span>Toplam:</span>
                                        <span>${totalPrice.toFixed(2)}</span>
                                    </div>
                                    <Button className="mt-4 w-full">
                                        Ödeme
                                    </Button>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CartDropdown;
