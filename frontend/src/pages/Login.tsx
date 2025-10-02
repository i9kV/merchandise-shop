import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            await login(username, password);
            navigate("/");
        } catch (err: any) {
            alert(err.message);
        }
    };

    return (
        <div className="p-6 max-w-md mx-auto">
            <h1 className="text-2xl mb-4">เข้าสู่ระบบ</h1>
            <input className="border p-2 mb-2 w-full" placeholder="ชื่อผู้ใช้"
                value={username} onChange={e => setUsername(e.target.value)} />
            <input className="border p-2 mb-2 w-full" placeholder="รหัสผ่าน" type="password"
                value={password} onChange={e => setPassword(e.target.value)} />
            <button onClick={handleLogin} className="bg-blue-500 text-white px-4 py-2 rounded">
                Login
            </button>
        </div>
    );
}
