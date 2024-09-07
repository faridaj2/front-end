import React from 'react'

function Title({ children }) {
    return (
        <div className='w-40 mx-auto relative '>
            <img src="/icon/apps/addons/title.png" alt="" />
            <div className='absolute left-[50%] w-52 text-center top-[50%] translate-x-[-50%] translate-y-[-50%] text-green-200 font-semibold'>{children}</div>
        </div>
    )
}

export default Title