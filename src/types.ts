export interface User {
  id: number;
  username: string;
  password: string;
  role: "user" | "admin";
}

export interface Product {
  id: number;
  name: string;
  price: number;
}
