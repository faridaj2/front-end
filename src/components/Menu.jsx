import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
// Icon
import { useNavigate } from 'react-router-dom'
import HomeIcon from "../icon/menu/HomeIcon"
import ProfileIcon from "../icon/menu/ProfileIcon"
// import MenuIcon from "../icon/menu/MenuIcon"
import LogoutIcon from '../icon/menu/LogoutIcon'
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
        <div className='fixed w-full bottom-0 left-0 z-[5000]'>
            <motion.div
                className='p-1 bg-white'
                ref={wrap}
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: menu ? -100 : 100, opacity: menu ? 1 : 0, scale: menu ? 1 : 0.1 }}
            >
                <div className='w-full max-w-80 mx-auto'>
                    <div className='border-1 border-green-500 p-2 rounded shadow shadow-green-500/30'>
                        <div className='text-center font-semibold text-green-600 py-5'>Apakah anda ingin keluar?</div>
                        <div className='flex justify-between gap-1'>
                            <button className='w-full p-3 border-1 border-green-200 text-sm text-green-700' onClick={() => setMenu(!menu)}>
                                Batal
                            </button>
                            <button className='w-full p-3 border-1 border-green-200 text-sm bg-red-700 text-green-100' onClick={() => handleLogout()}>
                                Keluar
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div >
            <div className='w-full backdrop-blur-md border-t-1 pt-2'>
                <div className="flex text-xl">
                    <div className='grow flex flex-col items-center justify-center relative text-black cursor-pointer' onClick={() => navigate('/informasi')}>
                        <ProfileIcon />
                        <span className='text-tiny mt-1'>Profile</span>
                    </div>
                    <div className='grow flex flex-col items-center justify-center relative text-black cursor-pointer' onClick={() => navigate('/home')}>
                        <HomeIcon className="text-green-100" />
                        <span className='text-tiny mt-1'>Home</span>
                    </div>
                    <div className='grow flex flex-col items-center justify-center relative text-black cursor-pointer' onClick={() => setMenu(!menu)} ref={button}>
                        <LogoutIcon />
                        <span className='text-tiny mt-1' >Logout</span>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Menu