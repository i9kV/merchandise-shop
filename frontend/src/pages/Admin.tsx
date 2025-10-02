import { useEffect, useState } from "react";
import { api } from "../services/api";
import type { Product } from "../types/product";

export default function Admin() {
    const [products, setProducts] = useState<Product[]>([]);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");

    const load = () => api.get("/products").then(setProducts);
    // useEffect(load, []);

    useEffect(() => {
        load();
    }, []);

    const add = async () => {
        await api.post("/products", { name, price: Number(price) });
        setName(""); setPrice("");
        load();
    };

    const remove = async (id: number) => {
        await api.delete(`/products/${id}`);
        load();
    };

    return (
        <div className="p-6">
            <h1 className="text-xl mb-4">จัดการสินค้า (Admin)</h1>

            <div className="mb-4">
                <input value={name} onChange={e => setName(e.target.value)} placeholder="ชื่อสินค้า"
                    className="border p-2 mr-2" />
                <input value={price} onChange={e => setPrice(e.target.value)} placeholder="ราคา"
                    className="border p-2 mr-2" />
                <button onClick={add} className="bg-blue-500 text-white px-3 py-1 rounded">เพิ่ม</button>
            </div>

            <ul>
                {products.map(p => (
                    <li key={p.id}>
                        {p.name} - {p.price} บาท
                        <button onClick={() => remove(p.id)} className="ml-2 text-red-500">ลบ</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
