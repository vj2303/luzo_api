"use client"
import React from 'react'
import Image from 'next/image'
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import "swiper/css";
import "swiper/css/pagination";

const Requirements = () => {
    const requirements = [
        "Public Instagram account with 10k+ followers", "Experience in content creation", "Excellent verbal & reel making skills", "Willingness to do an instagram collaboration"
    ]
    return (
        <div className='px-[20px] py-[20px] bg-[#ECF4FF]'>
            <h2 className='text-[20px] font-semibold pb-5'>Here are some touchstones we expect from you :</h2>
            <ul className='flex flex-col text-[14px] text-[#707070] gap-[5px]'>
                {
                    requirements.map((ele) => {
                        return <li key={ele} className='list-disc list-inside marker:text-[#707070] marker:font-bold'>{ele}</li>
                    })
                }
            </ul>
        </div>
    )
}

export default Requirements