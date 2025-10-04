import { Pool } from "mysql2/promise";
import { Product } from "../types/product";

export class ProductModel {
  constructor(private db: Pool) {}

  async getAll(): Promise<Product[]> {
    const [rows] = await this.db.query("SELECT * FROM products ORDER BY id DESC");
    return rows as Product[];
  }

  async getById(id: number): Promise<Product | null> {
    const [rows] = await this.db.query("SELECT * FROM products WHERE id = ?", [id]);
    const result = (rows as Product[])[0];
    return result || null;
  }

  async create(product: Omit<Product, "id">): Promise<number> {
    const [result]: any = await this.db.query(
      "INSERT INTO products (name, description, price, stock, image_url) VALUES (?, ?, ?, ?, ?)",
      [product.name, product.description, product.price, product.stock, product.image_url]
    );
    return result.insertId;
  }

  async update(id: number, product: Partial<Product>): Promise<void> {
    const fields = Object.keys(product).map((key) => `${key} = ?`).join(", ");
    const values = Object.values(product);
    await this.db.query(`UPDATE products SET ${fields} WHERE id = ?`, [...values, id]);
  }

  async delete(id: number): Promise<void> {
    await this.db.query("DELETE FROM products WHERE id = ?", [id]);
  }

  async reduceStock(id: number, quantity: number): Promise<void> {
    await this.db.query("UPDATE products SET stock = stock - ? WHERE id = ?", [quantity, id]);
  }
}
