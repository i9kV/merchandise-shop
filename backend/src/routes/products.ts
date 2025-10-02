import { Router } from "express";
import { products } from "../data/products";

const router = Router();

router.get("/", (_, res) => res.json(products));

router.post("/", (req, res) => {
  const { name, price } = req.body;
  const newProduct = { id: Date.now(), name, price };
  products.push(newProduct);
  res.json(newProduct);
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return res.status(404).json({ message: "ไม่พบสินค้า" });
  const deleted = products.splice(index, 1);
  res.json(deleted[0]);
});

export default router;
