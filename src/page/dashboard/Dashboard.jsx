import React from 'react'

// Component
import DashboardTemplate from '../../components/DashboardTemplate'
import Scroll from '../../components/Scroll'
import { Image } from '@nextui-org/react';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import { Autoplay } from 'swiper/modules';

// Icon

function Dashboard() {
    return (
        <DashboardTemplate>
            <div className='w-full flex justify-center items-center border-b-1 py-2 bg-white'>Dashboard</div>
            <Scroll>
                {/* <div className='rounded-md overflow-hidden mt-2'>
                    <Swiper
                        loop={true}
                        slidesPerView={1}
                        centeredSlides={true}
                        autoplay={{
                            delay: 5000, // Delay in milliseconds (5 seconds)
                            disableOnInteraction: false, // Autoplay continues even when user interacts with Swiper
                        }}
                        modules={[Autoplay]}
                    >
                        {Array.from({ length: 10 }, (_, i) => (
                            <SwiperSlide key={i}><Image src={`https://picsum.photos/500/200?random=${i}`} alt="" /></SwiperSlide>
                        ))}
                    </Swiper>
                </div> */}
                <div className='bg-white rounded-xl border-1 p-2 mt-2 shadow-md shadow-violet-700/20'>
                    <div className='text-gray-700 text-medium font-semibold mb-2'>
                        Informasi Narahubung
                    </div>
                    <div>
                        <div className='flex justify-between items-center mb-1'>
                            <div className='text-tiny'>Pondok</div>
                            <div className='text-blue-700 cursor-pointer text-sm'><a href="https://wa.me/628127604401" target='_blank'>0812 7604 401</a></div>
                        </div>
                        <div className='flex justify-between items-center mb-1'>
                            <div className='text-tiny'>Bendahara</div>
                            <div className='text-blue-700 cursor-pointer text-sm'><a href="https://wa.me/6281249991951" target='_blank'>0812 4999 1951</a></div>
                        </div>
                        <div className='flex justify-between items-center mb-1'>
                            <div className='text-tiny'>Sekretaris</div>
                            <div className='text-blue-700 cursor-pointer text-sm'><a href="https://wa.me/6281946728375" target='_blank'>0819 4672 8375</a></div>
                        </div>
                    </div>
                </div>
            </Scroll>
        </DashboardTemplate>
    )
}

export default Dashboard