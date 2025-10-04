import { Router } from "express";
import {
  createOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
} from "../controllers/orderController";
import { verifyUser, verifyAdmin } from "../middleware/authMiddleware";

const router = Router();

router.post("/", verifyUser, createOrder);
router.get("/my", verifyUser, getUserOrders);
router.get("/", verifyAdmin, getAllOrders);
router.put("/:id/status", verifyAdmin, updateOrderStatus);

export default router;
