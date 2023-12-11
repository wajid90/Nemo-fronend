import React from 'react'

const Loader = () => {
    return (
        <div className="flex justify-center items-center center-loader h-screen">
            <div className='lds-ellipsis'>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}

export default Loader