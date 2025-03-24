import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
// Icon
import { useNavigate } from "react-router-dom";
import HomeIcon from "../icon/menu/HomeIcon";
import ProfileIcon from "../icon/menu/ProfileIcon";
// import MenuIcon from "../icon/menu/MenuIcon"
import LogoutIcon from "../icon/menu/LogoutIcon";
// Utils
import AuthUser from "../utils/AuthUser";

function Menu() {
    const navigate = useNavigate();
    const { logout } = new AuthUser();
    const [menu, setMenu] = useState(false);

    const wrap = useRef(null);
    const button = useRef(null);

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                button.current &&
                !button.current.contains(event.target) &&
                event.target !== button.current &&
                wrap.current &&
                !wrap.current.contains(event.target)
            ) {
                setMenu(false);
            }
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return (
        <div className="fixed w-full bottom-0 left-0 z-[5000]">
            {menu && (
                <motion.div
                    className="p-1 bg-dark rounded-2xl overflow-hidden"
                    ref={wrap}
                    initial={{ y: 100, opacity: 0 }}
                    animate={{
                        y: menu ? -100 : 100,
                        opacity: menu ? 1 : 0,
                        scale: menu ? 1 : 0.1,
                    }}
                >
                    <div className="w-full rounded-2xl bg-brown max-w-80 mx-auto">
                        <div className="p-2 rounded-2xl shadow shadow-green-500/30">
                            <div className="text-center tracking-wide text-white py-5">
                                Apakah anda ingin keluar?
                            </div>
                            <div className="flex justify-between gap-1">
                                <button
                                    className="w-full p-3 text-sm text-white/60"
                                    onClick={() => setMenu(!menu)}
                                >
                                    Batal
                                </button>
                                <button
                                    className="w-full rounded-2xl p-3 text-sm bg-red-700 text-green-100"
                                    onClick={() => handleLogout()}
                                >
                                    Keluar
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
            <div className="w-full backdrop-blur-md border-t-1 pt-2">
                <div className="flex text-xl text-white">
                    <div
                        className="grow flex flex-col items-center justify-center relative cursor-pointer"
                        onClick={() => navigate("/informasi")}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="lucide lucide-circle-user"
                        >
                            <circle cx="12" cy="12" r="10" />
                            <circle cx="12" cy="10" r="3" />
                            <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
                        </svg>
                        <span className="text-tiny mt-1">Profile</span>
                    </div>
                    <div
                        className="grow flex flex-col items-center justify-center relative cursor-pointer"
                        onClick={() => navigate("/home")}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="lucide lucide-house"
                        >
                            <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
                            <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                        </svg>
                        <span className="text-tiny mt-1">Home</span>
                    </div>
                    <div
                        className="grow flex flex-col items-center justify-center relative cursor-pointer"
                        onClick={() => setMenu(!menu)}
                        ref={button}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="lucide lucide-log-out"
                        >
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                            <polyline points="16 17 21 12 16 7" />
                            <line x1="21" x2="9" y1="12" y2="12" />
                        </svg>
                        <span className="text-tiny mt-1">Logout</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Menu;
