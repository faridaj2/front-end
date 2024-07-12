import React, { useEffect, useRef } from 'react';

function Scroll({ children }) {
    const divRef = useRef();

    const handleClickRef = () => {
        divRef.current.click();
    };
    useEffect(() => {
        handleClickRef()
    }, [])

    return (
        <div className='h-screen overflow-y-auto scroll mx-3' ref={divRef}>
            {children}
            <div className='h-24'>
                <button onClick={handleClickRef} style={{ display: 'none' }}>Klik Ref</button>
            </div>
        </div>
    );
}

export default Scroll;