import { useState } from 'react';
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

    const [state, setState] = useState(false);

    function addPicture() {
        setState(true);
    }

    return (
        <div className='fixed flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay z-40 h-screen'>

            <form className='mt-3 flex flex-col' onSubmit={type === "banner" ? changeBanner : changePic}>
                <input className='hidden' type='file' name='picture' id='file-input' required onChange={addPicture} />
                <label className='w-80 h-80 border-2 flex flex-col justify-center items-center text-2xl mb-2 text-white' htmlFor='file-input'> <AiOutlineCloudUpload />{state ? "Picture ready for uploading!" : "Choose a file..."}</label>
                <button className='bg-red-600 p-1 rounded mb-2'>Upload photo</button>

            </form>
            <button className='bg-red-600 p-1 rounded' onClick={() => type === "banner" ? setToggleInputBanner(!toggleInputBanner) : setToggleInput(!toggleInput)}>Cancel</button>
            
        </div>
    )
}

export default UploadImage