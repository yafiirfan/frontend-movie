import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { FaAngleRight,FaAngleLeft } from "react-icons/fa6";


const BannerHome = () => {
    const bannerData = useSelector(state => state.movieoData.bannerData)
    const imageUrl = useSelector(state=> state.movieoData.imageUrl)
    const [currentImage, setCurrentImage] = useState(0)

    const handleNext = () => {
        if(currentImage < bannerData.length - 1){
            setCurrentImage(preve => preve + 1)
        }
    }
    const handlePrevious = () => {
        if(currentImage > 0){
            setCurrentImage(preve => preve - 1)
        }
    }

    useEffect(()=> {
        const interval = setInterval(() => {
            if(currentImage < bannerData.length - 1){
                handleNext()
            }else{
                setCurrentImage()
            }

        },4000)

        return () => clearInterval(interval)
    },[bannerData, imageUrl])
    
  return (
    <section className='w-full h-full'>
        <div className='flex min-h-full max-h-[95vh] overflow-hidden'>
           {
            bannerData.map((data,index)=> {
                return(
                   <div key={data.id+"bannerHome"+index} className='min-w-full min-h-[450px] lg:min-h-full overflow-hidden relative group transition-all'style={{transform: `translateX(-${currentImage *100}%)`}}>
                        <div className='w-full h-full'>
                            <img src={imageUrl+data.backdrop_path} className='h-full w-full object-cover' />
                        </div>

                        {/* Button Next/ previous*/}
                        <div className='absolute top-0 w-full h-full flex items-center justify-between px-4 group-hover:lg:flex'>
                            <button onClick={handlePrevious} className='bg-transparent hover:border-transparent px-2 py-6 rounded mt-4 text-4xl z-10 text-white'>
                                <FaAngleLeft/>
                            </button>
                            <button onClick={handleNext} className='bg-transparent hover:border-transparent px-2 py-6 rounded mt-4 text-4xl z-10 text-white'>
                                <FaAngleRight/>
                            </button>
                        </div>
                        <div className='absolute top-10 w-full h-full bg-gradient-to-t from-neutral-900 to-transparent'>
                        </div>
                        <div className='container mx-auto'>
                            <div className=' w-full absolute bottom-0 max-w-md px-3 py-2'>
                                <h2 className='font-bold text-2xl lg:text-4xl text-white drop-shadow-2xl'>
                                    {data?.title || data?.name}
                                </h2>
                                <p className='text-ellipsis line-clamp-3 my-2'>{data.overview}</p>
                                <div className='flex items-center gap-4'>
                                    <p>Rating : {Number(data.vote_average).toFixed(1)}+</p>
                                    <span>|</span>
                                    <p>View : {Number(data.popularity).toFixed(0)}</p>
                                </div>
                                <button className='bg-red-600 border-black px-4 py-2 text-white font-bold rounded mt-4 hover:bg-gradient-to-l from-red-700 to-orange-500 shadow-md transition-all hover:scale-105'>
                                    Play Now
                                </button>
                            </div>
                        </div>
                   </div>
                )
            })
           }
        </div>
    </section>
  )
}

export default BannerHome