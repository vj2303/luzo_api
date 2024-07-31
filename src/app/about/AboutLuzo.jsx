import Image from 'next/image'
import DownloadLinks from '../../components/DownloadLinks'

const AboutLuzo = () => {
  return (
      <div className="sm:px-[120px] px-[10px] py-[20px] flex flex-col max-w-[1500px] mx-auto">
        <h1 className="font-bold text-[30px] mb-[16px]">Who are we </h1>
        <div className="flex lg:flex-row  flex-col lg:items-center justify-between sm:flex-wrap">
              
              
              <div className="lg:max-w-[40%] flex flex-col gap-[9px]  text-[16px] sm:leading-[30px] order-1 sm:basis-[60%]">
                  <p className='text-[#707070]'>We are a market curated place for &apos;salons, spas, dermatologists & cosmetologists</p>
                  {/* <p>Lorem Ipsum is simply dummy text of the printing&apos;and typesetting industry. Lorem Ipsum has been &apos;the industry&apos;s standard dummy text ever since the &apos;1500s, when an unknown printer took a galley of &apos;type and scrambled it</p> */}
              </div>
         
               <Image src="/img/download.webp" className="rounded-xl sm:py-none py-[20px] lg:max-w-[50%] order-3 " alt="img" width={636} height={477}/>
        
        {/* <DownloadLinks className={"my-[30px]  sm:flex-start justify-center gap-[10px] order-2 sm:order-4"} /> */}
        </div>

    </div>
  )
}

export default AboutLuzo