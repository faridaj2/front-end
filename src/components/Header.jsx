import React from 'react'

function Header({ children }) {
    return (
        <div className=''>
            <div className='w-full text-center shadow'>{children}</div>
        </div>
    )
}

export default Header