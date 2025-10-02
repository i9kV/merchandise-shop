import { useEffect, useState } from "react";
import { api } from "../services/api";
import type { Product } from "../types/product";

export default function Home() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        api.get("/products").then(setProducts);
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-xl mb-4">สินค้า</h1>
            <ul>
                {products.map(p => (
                    <li key={p.id}>{p.name} - {p.price} บาท</li>
                ))}
            </ul>
        </div>
    );
}
