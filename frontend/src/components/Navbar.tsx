import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
    const { user, logout } = useAuth();

    return (
        <nav className="flex justify-between items-center px-6 py-3 bg-white border-b shadow-sm">
            {/* Logo */}
            <Link to="/" className="text-xl font-semibold text-gray-800 hover:text-blue-600">
                🛍️ SouvenirShop
            </Link>

            {/* Menu */}
            <div className="flex items-center gap-6">
                <Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors">
                    หน้าแรก
                </Link>

                {user?.role === "admin" && (
                    <Link to="/admin" className="text-gray-600 hover:text-blue-600 transition-colors">
                        จัดการสินค้า
                    </Link>
                )}

                {user ? (
                    <>
                        <span className="text-gray-700">{user.username}</span>
                        <button
                            onClick={logout}
                            className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                        >
                            ออกจากระบบ
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="text-gray-600 hover:text-blue-600 transition-colors">
                            เข้าสู่ระบบ
                        </Link>
                        <Link
                            to="/register"
                            className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                        >
                            สมัครสมาชิก
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
}
