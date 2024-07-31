"use client"
import Image from 'next/image'
import { CloudUpload } from 'lucide-react'
import React, { useRef, useState } from 'react'
import { X } from 'lucide-react'

const FileInput = ({ label, onChange, exampleImage }) => {

  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const popupRef = useRef(null)

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
    if (isPopupVisible !== true && popupRef.current !== null) {
      popupRef.current.showModal()
    } else {
      popupRef.current.close()
    }
  };

  return (
    <>
      <div className='flex flex-col gap-[8px]'>
        <span className='flex justify-between font-medium '>
          <p className='max-w-[50%]'>{label}</p>
          <button type='button' className='underline text-[#646464]' onClick={togglePopup}>View Example</button>
        </span>
        <label>
          <input type="file" className='hidden' onChange={onChange} accept="image/*" />
          <p
            className='p-[15px] rounded-2xl border border-[#B9B9B9] w-full flex gap-2 items-center cursor-pointer'
            onClick={() => document.querySelector(`input[type="file"]`).click()}
          >
            <CloudUpload />
            Upload
          </p>
        </label>
        {/* {isPopupVisible && ( */}
        <dialog ref={popupRef} className=''>
          <X className='absolute top-0 right-0' onClick={togglePopup}/>
          <Image
            height={100}
            width={200}
            alt='example'
            src={"/1.png"}
          />
        </dialog>
        {/* )} */}
      </div>
    </>

  )
}

export default FileInput