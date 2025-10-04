import { Request, Response } from "express";
import { OrderModel } from "../models/Order";
import db from "../db";

const orderModel = new OrderModel(db);

export const createOrder = async (req: Request, res: Response) => {
  const user_id = (req as any).user.id;
  const { items, total_price } = req.body;

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: "No items provided" });
  }

  const orderId = await orderModel.create({ user_id, total_price, status: "pending" }, items);
  res.status(201).json({ orderId });
};

export const getUserOrders = async (req: Request, res: Response) => {
  const user_id = (req as any).user.id;
  const orders = await orderModel.getByUser(user_id);
  res.json(orders);
};

export const getAllOrders = async (_: Request, res: Response) => {
  const orders = await orderModel.getAll();
  res.json(orders);
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  await orderModel.updateStatus(Number(id), status);
  res.json({ message: "Order status updated" });
};
