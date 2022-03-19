import React from 'react'

function Notifications({
    setErrorM,
    errorM
}) {
    return (
        <div className='fixed z-10 pt-28 left-0 top-0 w-full h-full overflow-auto bg-black opacity-40' >

            <div className='bg-gray-100 m-auto p-3 border-2 border-black w-4/5 flex justify-between items-center'>
                <p className='font-bold text-black'>{errorM}</p>
                <button onClick={() => setErrorM(null)} className='text-2xl'>&times;</button>
            </div>

        </div>
    )
}

export default Notifications