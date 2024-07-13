import React from 'react';

function Scroll({ children }) {


    return (
        <div className='h-screen overflow-y-auto scroll mx-3 mt-14' >
            {children}
        </div>
    );
}

export default Scroll;