import React from 'react'

// Component
import DashboardTemplate from '../../components/DashboardTemplate'
import Scroll from '../../components/Scroll'

import 'swiper/css';
// Icon

// Navigate
import { useNavigate } from 'react-router-dom';
// import { FcIntegratedWebcam } from 'react-icons/fc';


function Dashboard() {
    const navigate = useNavigate()

    const open = (numb) => {
        const number = parseInt(numb)
        window.open(`https://wa.me/${number}`, '_blank');
    }

    return (
        <DashboardTemplate>
            <Scroll>
                <div className='w-full h-56 absolute left-0 -z-10'>
                    <img src="/icon/apps/addons/corner.png" width={150} className='absolute right-0' alt="" />
                    <img src="/icon/apps/addons/corner.png" width={150} className='absolute left-0 transform scale-x-[-1]' alt="" />
                    <img src='/icon/Logo.png' width={200} className='pt-20 mx-auto' />
                    <div className='text-center text-xs mt-2 font-bold text-green-700'>PP. DARUSSALAM BLOKAGUNG 2</div>
                </div>
                <div className='px-5 pt-40 z-50'>
                    <div className='mt-2 flex justify-between '>
                        <div className='flex flex-col items-center cursor-pointer' onClick={() => navigate('/tagihan')}>
                            <img src='/icon/apps/menu/invoice.png' width={40} className='mb-2' />
                            <h2 className='text-xs font-semibold text-green-800'>Tagihan</h2>
                        </div>
                        <div className='flex flex-col items-center cursor-pointer' onClick={() => navigate('/uang-saku')}>
                            <img src='/icon/apps/menu/money.png' width={40} className='mb-2' />
                            <h2 className='text-xs font-semibold text-green-800'>Uang Saku</h2>
                        </div>
                        <div className='flex flex-col items-center cursor-pointer' onClick={() => navigate('/poin')}    >
                            <img src='/icon/apps/menu/insurance.png' width={40} className='mb-2' />
                            <h2 className='text-xs font-semibold text-green-800'>Keamanan</h2>
                        </div>
                    </div>
                    <div className='mt-4 flex flex-col gap-2'>
                        <div className='border-1 rounded-lg p-2 shadow border-green-500 flex items-center gap-3 bg-gradient-to-b from-green-100 cursor-pointer' onClick={() => open('628127604401')}>
                            <div>
                                <img src="/icon/apps/addons/phone.png" width={20} alt="" />
                            </div>
                            <div className='flex flex-col'>
                                <h3 className='font-semibold text-green-700 text-sm'>Pondok Pesantren</h3>
                                <p className='text-xs text-green-700'>0812 7604 041</p>
                            </div>
                        </div>
                        <div className='border-1 rounded-lg p-2 shadow border-green-500 flex items-center gap-3 bg-gradient-to-b from-green-100 cursor-pointer' onClick={() => open('6281249991951')}>
                            <div>
                                <img src="/icon/apps/addons/phone.png" width={20} alt="" />
                            </div>
                            <div className='flex flex-col'>
                                <h3 className='font-semibold text-green-700 text-sm'>Biro Keuangan</h3>
                                <p className='text-xs text-green-700'>0812 4999 1951</p>
                            </div>
                        </div>
                        <div className='border-1 rounded-lg p-2 shadow border-green-500 flex items-center gap-3 bg-gradient-to-b from-green-100 cursor-pointer' onClick={() => open('6287857493262')}>
                            <div>
                                <img src="/icon/apps/addons/phone.png" width={20} alt="" />
                            </div>
                            <div className='flex flex-col'>
                                <h3 className='font-semibold text-green-700 text-sm'>Keamanan</h3>
                                <p className='text-xs text-green-700'>0878 5749 3262</p>
                            </div>
                        </div>
                        <div className='border-1 rounded-lg p-2 shadow border-green-500 flex items-center gap-3 bg-gradient-to-b from-green-100 cursor-pointer' onClick={() => open('6281946728375')}>
                            <div>
                                <img src="/icon/apps/addons/phone.png" width={20} alt="" />
                            </div>
                            <div className='flex flex-col'>
                                <h3 className='font-semibold text-green-700 text-sm'>Sekretaris</h3>
                                <p className='text-xs text-green-700'>0819 4672 8375</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Scroll >
        </DashboardTemplate >
    )
}

export default Dashboard