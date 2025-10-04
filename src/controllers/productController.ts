import { Request, Response } from "express";
import { ProductModel } from "../models/Product";
import db from "../db";

const productModel = new ProductModel(db);

export const getProducts = async (_: Request, res: Response) => {
  const products = await productModel.getAll();
  res.json(products);
};

export const getProductById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const product = await productModel.getById(id);
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
};

export const createProduct = async (req: Request, res: Response) => {
  const { name, description, price, stock, image_url } = req.body;
  const id = await productModel.create({ name, description, price, stock, image_url });
  res.status(201).json({ id });
};

export const updateProduct = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  await productModel.update(id, req.body);
  res.json({ message: "Product updated" });
};

export const deleteProduct = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  await productModel.delete(id);
  res.json({ message: "Product deleted" });
};
