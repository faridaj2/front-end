import React, { useEffect, useState } from 'react'

// Component
import DashboardTemplate from '../../components/DashboardTemplate'
import Scroll from '../../components/Scroll'
import { FaRegClipboard } from "react-icons/fa6"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Utils from '../../utils/Utilis'
import AuthUser from '../../utils/AuthUser'

// Icon

// Navigate
import { useNavigate } from 'react-router-dom';
// import { FcIntegratedWebcam } from 'react-icons/fc';


function Dashboard() {
    const navigate = useNavigate()

    const { toast, Toaster } = new Utils()
    const { axios, user } = new AuthUser()


    const open = (numb) => {
        const number = parseInt(numb)
        window.open(`https://wa.me/${number}`, '_blank');
    }

    const bank = [
        {
            "bank": "BCA",
            "rekening": 5650197561,
            "an": "ANAS AJI ILMAWAN"
        },
        {
            "bank": "MUAMALAT",
            "rekening": 7320014538,
            "an": "ANAS AJI ILMAWAN"
        },
        {
            "bank": "BRI",
            "rekening": 808501000726505,
            "an": "ANAS AJI ILMAWAN"
        },
        {
            "bank": "BRI",
            "rekening": 611201015733530,
            "an": "ANAS AJI ILMAWAN"
        },
        {
            "bank": "BSI",
            "rekening": 1115557781,
            "an": "PONDOK PESANTREN DARUSSALAM BLOKAGUNG 2"
        }
    ]

    function copyText(textToCopy) {
        // Create a temporary textarea element
        var tempTextArea = document.createElement('textarea');
        tempTextArea.value = textToCopy;

        // Add the textarea to the document
        document.body.appendChild(tempTextArea);

        // Select the text in the textarea
        tempTextArea.select();

        // Copy the selected text
        document.execCommand('copy');

        // Remove the temporary textarea
        document.body.removeChild(tempTextArea);
        toast.success('Berhasil disalin')
    }

    const getDateNow = () => {
        const date = new Date()
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')
        return `${year}-${month}-${day}`
    }
    const saveStorage = (date) => {
        localStorage.setItem('date', date)
    }
    const getStorage = () => {
        const date = localStorage.getItem('date') || null
        return date
    }

    const [berita, setBerita] = useState()

    useEffect(() => {
        axios.get('https://darussalam2.com/api/get-berita')
            .then(res => setBerita(res.data))
        if (getDateNow() !== getStorage()) {
            saveStorage(getDateNow())
            toast.success('Selamat Datang')

            const apiUrl = 'https://api.fonnte.com/send';
            const token = 'yzbhh1vaZxF3G8m4ojVC';

            const data = {
                target: '085156027913',
                message: `Akun ${user.nama_siswa}, telah diakses di SantriConnect pada ${getDateNow()}`,
            };
            const headers = {
                Authorization: `${token}`,
            };


            axios.post(apiUrl, data, { headers })
                .then(response => {
                    console.log(response.data);
                })
                .catch(error => {
                    console.error(error);
                });
        }
        axios.get(`https://log.darussalam2.com/installed?id=${user.id}`)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const openLink = (link) => {
        window.open(`https://darussalam2.com/warta/${link}`, '_system');
    }

    return (
        <DashboardTemplate>
            <Toaster />
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
                    <div>
                        <Swiper
                            spaceBetween={50}
                            slidesPerView={1}
                            onSlideChange={() => console.log('slide change')}
                            onSwiper={(swiper) => console.log(swiper)}
                        >
                            {
                                berita?.map((item, index) => (
                                    <SwiperSlide key={index} className='my-2' onClick={() => openLink(item.slug)}>
                                        <div className='h-32 rounded-md overflow-hidden border-8 border-white shadow relative cursor-pointer'>
                                            <img src={item.image_url} className='w-full h-full object-cover' alt="" />
                                            <div className='absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-b from-transparent to-black'>
                                                <h1 className='text-white font-semibold truncate'>{item.title}</h1>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))
                            }
                        </Swiper>
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
                                <h3 className='font-semibold text-green-700 text-sm'>Biro Keuangan & Sekretaris</h3>
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
                        <div className='border-1 rounded-lg p-2 shadow border-green-500 flex items-center gap-3 bg-gradient-to-b from-green-100 cursor-pointer' onClick={() => open('625135662738')}>
                            <div>
                                <img src="/icon/apps/addons/phone.png" width={20} alt="" />
                            </div>
                            <div className='flex flex-col'>
                                <h3 className='font-semibold text-green-700 text-sm'>Asrama Putra</h3>
                                <p className='text-xs text-green-700'>0851 3566 2738</p>
                            </div>
                        </div>
                        <div className='border-1 rounded-lg p-2 shadow border-green-500 flex items-center gap-3 bg-gradient-to-b from-green-100 cursor-pointer' onClick={() => open('6285745510324')}>
                            <div>
                                <img src="/icon/apps/addons/phone.png" width={20} alt="" />
                            </div>
                            <div className='flex flex-col'>
                                <h3 className='font-semibold text-green-700 text-sm'>Asrama Putri</h3>
                                <p className='text-xs text-green-700'>0857 4551 0324</p>
                            </div>
                        </div>
                    </div>
                    <div className='mt-7 flex flex-col gap-2'>
                        <div className='text-center font-bold text-green-800'>
                            <h2 className='text-lg'>Rekening Resmi</h2>
                            <h1 className='text-xl'>PP. Darussalam Blokagung 2</h1>
                        </div>
                        <div className='text-sm font-semibold flex flex-col gap-2'>
                            {bank?.map((item, index) => (
                                <div key={index} className='border-1 rounded-lg p-2 flex justify-between shadow border-green-500 items-center gap-3 bg-gradient-to-b from-green-100 text-green-700'>
                                    <div>
                                        <div>Bank : {item.bank}</div>
                                        <div>No Rekening : {item.rekening}</div>
                                        <div>A/N : {item.an}</div>
                                    </div>
                                    <button className='text-xl p-2 bg-white-400 border-1 rounded-full shadow' onClick={() => copyText(item.rekening)}>
                                        <FaRegClipboard />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='h-20'>

                </div>
            </Scroll >
        </DashboardTemplate >
    )
}

export default Dashboard