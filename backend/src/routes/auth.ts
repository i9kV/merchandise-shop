import { Router } from "express";
import { users } from "../data/users";
import { User } from "../types";

const router = Router();

// mock login
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  const found = users.find(
    (u) => u.username === username && u.password === password
  );
  if (!found)
    return res.status(401).json({ message: "ชื่อผู้ใช้หรือรหัสผ่านผิด" });
  res.json({ id: found.id, username: found.username, role: found.role });
});

// mock register
router.post("/register", (req, res) => {
  const { username, password, role } = req.body;
  if (users.find((u) => u.username === username)) {
    return res.status(400).json({ message: "มีผู้ใช้นี้แล้ว" });
  }
  const newUser: User = { id: Date.now(), username, password, role };
  users.push(newUser);
  res.json(newUser);
});

export default router;
