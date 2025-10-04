import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const verifyUser = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;
    (req as any).user = decoded;
    next();
  } catch {
    res.status(403).json({ message: "Invalid token" });
  }
};

export const verifyAdmin = (req: Request, res: Response, next: NextFunction) => {
  verifyUser(req, res, () => {
    if ((req as any).user.role !== "admin") {
      return res.status(403).json({ message: "Admin only" });
    }
    next();
  });
};
