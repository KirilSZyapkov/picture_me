import React from 'react';
import { AiOutlineCloudUpload } from "react-icons/ai";

function UploadImage({
    setToggleInputBanner,
    changeBanner,
    toggleInputBanner,
    type,
    changePic,
    setToggleInput,
    toggleInput
}) {

    
    return (
        <div className='absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-stone-400 z-40'>

            <form className='mt-3 flex flex-col' onSubmit={type === "banner" ? changeBanner : changePic}>
                <input className='hidden' type='file' name='picture' id='file-input' required />
                <label className='w-60 h-60 border-2 flex flex-col justify-center items-center text-2xl mb-2' htmlFor='file-input'> <AiOutlineCloudUpload /> Choose a file...</label>
                <button className='bg-red-600 p-1 rounded mb-2'>Upload photo</button>

            </form>
            <button className='bg-red-600 p-1 rounded' onClick={() => type === "banner" ? setToggleInputBanner(!toggleInputBanner) : setToggleInput(!toggleInput)}>Cancel</button>
        </div>
    )
}

export default UploadImage