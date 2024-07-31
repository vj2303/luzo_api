import React from 'react'
import Image from 'next/image'

const Team = () => {
       
       const teams = [
              {
                img: '/teams/anurav.webp',
                name:'Anurav Dave',
                position:'Founder & CEO' 
              },
              {
                img: '/teams/maan.webp',
                name:'Maan Jetley',
                position:'Co-Founder & COO' 
              },
              {
                img: '/teams/nikhil.webp',
                name:'Nikhil Kalwani',
                position:'Co-Founder & CFO' 
              },
       ]


  return (
     

       <div className='px-[10px] bg-[#ECF4FF] mt-[100px]'>
       <h1 className='font-bold text-center text-[30px] py-[40px]'>Our Team</h1>
       <div className='flex flex-col sm:flex-row gap-[80px] justify-center items-center'>
         {teams.map((teamMember, index) => (
          <div key={index} className='flex '>
                <div  className='text-center mb-4 flex flex-col gap-[10px]'>
                  <Image src={teamMember.img} width={185} height={232} alt={teamMember.name} className='h-[30vh]' />
                    <h3 className='text-[#343A40] leading-[18px] text-[14px] font-semibold'>{teamMember.name}</h3>
                    <p className='text-[#707070] leading-[18px]'>{teamMember.position}</p>
                </div>
          </div>
         ))}
       </div>
     </div>
  )
}

export default Team