const API_URL = "http://localhost:4000/api";

export const api = {
  get: async (url: string) => {
    const res = await fetch(API_URL + url);
    return res.json();
  },
  post: async (url: string, data: any) => {
    const res = await fetch(API_URL + url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },
  delete: async (url: string) => {
    const res = await fetch(API_URL + url, { method: "DELETE" });
    return res.json();
  },
};
