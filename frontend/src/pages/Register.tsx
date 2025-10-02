import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState<"user" | "admin">("user");
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            await register(username, password, role);
            navigate("/");
        } catch (err: any) {
            alert(err.message);
        }
    };

    return (
        <div className="p-6 max-w-md mx-auto">
            <h1 className="text-2xl mb-4">สมัครสมาชิก</h1>
            <input className="border p-2 mb-2 w-full" placeholder="ชื่อผู้ใช้"
                value={username} onChange={e => setUsername(e.target.value)} />
            <input className="border p-2 mb-2 w-full" placeholder="รหัสผ่าน" type="password"
                value={password} onChange={e => setPassword(e.target.value)} />
            <select value={role} onChange={e => setRole(e.target.value as "user" | "admin")}
                className="border p-2 mb-2 w-full">
                <option value="user">ผู้ใช้</option>
                <option value="admin">ผู้ดูแลระบบ</option>
            </select>
            <button onClick={handleRegister} className="bg-green-500 text-white px-4 py-2 rounded">
                Register
            </button>
        </div>
    );
}
