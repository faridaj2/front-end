import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
// Icon
import { HiLogout } from "react-icons/hi"
import { useNavigate } from 'react-router-dom'
import { FaMoneyBillTransfer } from "react-icons/fa6"
import { GiPoliceBadge } from "react-icons/gi"

import { FcBusinessman, FcHome, FcMenu } from "react-icons/fc"
import { HiOutlineBanknotes } from "react-icons/hi2"
// Component

// Utils
import AuthUser from '../utils/AuthUser'

function Menu() {
    const navigate = useNavigate()
    const { logout } = new AuthUser()
    const [menu, setMenu] = useState(false)

    const wrap = useRef(null)
    const button = useRef(null)

    const handleLogout = () => {
        logout()
        navigate('/')
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (button.current && !button.current.contains(event.target) && event.target !== button.current && wrap.current && !wrap.current.contains(event.target)) {
                setMenu(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <div className='fixed w-full bottom-0 left-0'>
            <motion.div
                className='p-1'
                ref={wrap}
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: menu ? -100 : 100, opacity: menu ? 1 : 0, scale: menu ? 1 : 0.1 }}
            >
                <div>
                    <div className='grid grid-cols-3 gap-3 py-4 px-5 border bg-white rounded-3xl shadow-md shadow-violet-300'>
                        <div className='text-center flex flex-col justify-center items-center gap-2 cursor-pointer group' onClick={() => navigate('/tagihan')}>
                            <div className='group-hover:translate-y-1 group-hover:text-violet-300 transition-all border rounded-full h-14 w-14 flex items-center justify-center text-2xl text-violet-500 shadow-md shadow-violet-700/30 group-hover:shadow-violet-700/10 bg-white'>
                                <FaMoneyBillTransfer />
                            </div>
                            <span className='text-tiny text-violet-700 group-hover:text-violet-300 transition-all'>Tagihan</span>
                        </div>
                        <div className='text-center flex flex-col justify-center items-center gap-2 cursor-pointer group' onClick={() => navigate('/uang-saku')}>
                            <div className='group-hover:translate-y-1 group-hover:text-violet-300 transition-all border rounded-full h-14 w-14 flex items-center justify-center text-2xl text-violet-500 shadow-md shadow-violet-700/30 group-hover:shadow-violet-700/10 bg-white'>
                                <HiOutlineBanknotes />
                            </div>
                            <span className='text-tiny text-violet-700 group-hover:text-violet-300 transition-all'>Uang Saku</span>
                        </div>
                        <div className='text-center flex flex-col justify-center items-center gap-2 cursor-pointer group' onClick={() => navigate('/poin')}>
                            <div className='group-hover:translate-y-1 group-hover:text-violet-300 transition-all border rounded-full h-14 w-14 flex items-center justify-center text-2xl text-violet-500 shadow-md shadow-violet-700/30 group-hover:shadow-violet-700/10 bg-white'>
                                <GiPoliceBadge />
                            </div>
                            <span className='text-tiny text-violet-700 group-hover:text-violet-300 transition-all'>Poin</span>
                        </div>
                        <div className='text-center flex flex-col justify-center items-center gap-2 cursor-pointer group' onClick={handleLogout}>
                            <div className='group-hover:translate-y-1 group-hover:text-violet-300 transition-all border rounded-full h-14 w-14 flex items-center justify-center text-2xl text-violet-500 shadow-md shadow-violet-700/30 group-hover:shadow-violet-700/10 bg-white'>
                                <HiLogout />
                            </div>
                            <span className='text-tiny text-violet-700 group-hover:text-violet-300 transition-all'>Keluar</span>
                        </div>
                    </div>
                </div>
            </motion.div>
            <div className='w-full backdrop-blur-md border-t-1 pt-2'>
                <div className="flex text-xl">
                    <div className='grow flex flex-col items-center justify-center relative text-violet-700 cursor-pointer' onClick={() => navigate('/informasi')}>
                        <FcBusinessman />
                        <span className='text-tiny mt-1'>Profile</span>
                    </div>
                    <div className='grow flex flex-col items-center justify-center relative text-violet-700 cursor-pointer' onClick={() => navigate('/home')}>
                        <FcHome />
                        <span className='text-tiny mt-1'>Home</span>
                    </div>
                    <div className='grow flex flex-col items-center justify-center relative text-violet-700 cursor-pointer' onClick={() => setMenu(!menu)} ref={button}>
                        <FcMenu />
                        <span className='text-tiny mt-1' >Menu</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Menu