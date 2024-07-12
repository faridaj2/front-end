import React from 'react'

function Scroll({ children }) {
    return (
        <div className='h-screen overflow-y-auto scroll mx-3'>
            {children}
            <div className='h-24'>

            </div>
        </div>
    )
}

export default Scroll