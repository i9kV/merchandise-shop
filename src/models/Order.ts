import { Pool } from "mysql2/promise";
import { Order, OrderItem } from "../types/order";

export class OrderModel {
  constructor(private db: Pool) {}

  async create(order: Order, items: OrderItem[]): Promise<number> {
    const conn = await this.db.getConnection();
    try {
      await conn.beginTransaction();
      const [result]: any = await conn.query(
        "INSERT INTO orders (user_id, total_price, status, created_at) VALUES (?, ?, ?, NOW())",
        [order.user_id, order.total_price, "pending"]
      );
      const orderId = result.insertId;

      for (const item of items) {
        await conn.query(
          "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)",
          [orderId, item.product_id, item.quantity, item.price]
        );
        await conn.query("UPDATE products SET stock = stock - ? WHERE id = ?", [
          item.quantity,
          item.product_id,
        ]);
      }

      await conn.commit();
      return orderId;
    } catch (err) {
      await conn.rollback();
      throw err;
    } finally {
      conn.release();
    }
  }

  async getByUser(userId: number): Promise<Order[]> {
    const [rows] = await this.db.query("SELECT * FROM orders WHERE user_id = ?", [userId]);
    return rows as Order[];
  }

  async getAll(): Promise<Order[]> {
    const [rows] = await this.db.query("SELECT * FROM orders ORDER BY id DESC");
    return rows as Order[];
  }

  async updateStatus(orderId: number, status: string): Promise<void> {
    await this.db.query("UPDATE orders SET status = ? WHERE id = ?", [status, orderId]);
  }
}
