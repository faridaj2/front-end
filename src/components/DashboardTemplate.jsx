/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import AuthUser from '../utils/AuthUser'
import { useNavigate } from 'react-router-dom'

// Component

import Menu from './Menu'
function DashboardTemplate({ children }) {
    const { user, logout } = new AuthUser()
    const navigate = useNavigate()

    useEffect(() => {
        if (!user) logout()
    }, [])

    useEffect(() => {
        if (!user) navigate('/')
    }, [])
    return (
        <div className='max-w-sm mx-auto relative overflow-hidden scroll min-h-screen scroll'>
            <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div></div>
            {children}
            <Menu />

        </div>
    )
}

export default DashboardTemplate