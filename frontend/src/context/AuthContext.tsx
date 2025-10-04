import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { User } from "../types/user";
import { api } from "../services/api";

interface AuthContextType {
    user: User | null;
    login: (username: string, password: string) => Promise<void>;
    register: (username: string, password: string, role: "user" | "admin") => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    const login = async (username: string, password: string) => {
        const res = await api.post("/auth/login", { username, password });
        if (res.message) throw new Error(res.message);
        setUser(res);
    };

    const register = async (username: string, password: string, role: "user" | "admin") => {
        const res = await api.post("/auth/register", { username, password, role });
        if (res.message) throw new Error(res.message);
        setUser(res);
    };

    const logout = () => setUser(null);

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth ต้องใช้ภายใต้ <AuthProvider>");
    return ctx;
};


// import { createContext, useContext, useState } from "react";
// import type { ReactNode } from "react";

// interface User {
//     username: string;
//     role: "user" | "admin";
// }

// interface AuthContextType {
//     user: User | null;
//     login: (userData: User) => void;
//     logout: () => void;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export function AuthProvider({ children }: { children: ReactNode }) {
//     const [user, setUser] = useState<User | null>(null);

//     const login = (userData: User) => setUser(userData);
//     const logout = () => setUser(null);

//     return (
//         <AuthContext.Provider value={{ user, login, logout }}>
//             {children}
//         </AuthContext.Provider>
//     );
// }

// export function useAuth() {
//     const context = useContext(AuthContext);
//     if (!context) throw new Error("useAuth must be used within AuthProvider");
//     return context;
// }
