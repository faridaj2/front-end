/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
// Component
import Scroll from '../../components/Scroll'
import DashboardTemplate from '../../components/DashboardTemplate'
import { easeInOut, motion } from 'framer-motion'

// Icon
import { FcMoneyTransfer } from "react-icons/fc"
import { FcPrevious } from "react-icons/fc"

// Utilitas
import AuthUser from '../../utils/AuthUser'
import { Spinner } from '@nextui-org/react'

function Tagihan() {
    const navigate = useNavigate()
    const { http } = new AuthUser
    const [tagihan, setTagihan] = useState()
    const [done, setDone] = useState()

    const [open, setOpen] = useState(false)

    useEffect(() => {
        getTagihan()
    }, [])

    const getTagihan = () => {
        http.get('/api/user/get-user-tagihan')
            .then(res => {
                const data = res.data.pembayaran
                setTagihan(data)
                const done = res.data.done
                setDone(Object.values(done))
            })
            .catch(error => console.log(error))
    }
    return (
        <DashboardTemplate>
            <div className='w-full flex justify-center items-center border-b-1 py-2 bg-white fixed z-50 pb-5'>Tagihan</div>
            <Scroll>
                <div className='font-bold text-violet-800'>
                    Tagihan Aktif
                </div>
                <div className='mt-4'>
                    {tagihan ?
                        tagihan.map(data => (
                            <div className='group rounded-3xl bg-white p-3 border-1 flex gap-4 items-center cursor-pointer transition-all mb-2' key={data.id} onClick={() => navigate(`/tagihan/${data.id}`)}>
                                <div className='text-2xl border-1 p-2 rounded-2xl shadow-md shadow-violet-700/30 group-hover:-translate-y-2 group-hover:shadow-lg transition-all'>
                                    <FcMoneyTransfer />
                                </div>
                                <div className='group-hover:scale-105 transition-all group-hover:-translate-y-2'>
                                    <div className='text-gray-700 truncate max-w-64'>{data.payment_name}</div>
                                    <div className='text-tiny text-gray-500 truncate max-w-64'>Berlaku - {data.bulanan ? 'Bulanan' : 'Kontan'}</div>
                                </div>
                            </div>
                        ))
                        :
                        <div className='flex justify-center'>
                            <Spinner />
                        </div>
                    }
                    <div className='font-bold my-5 text-violet-800 flex justify-between items-center cursor-pointer' onClick={() => setOpen(!open)}>
                        <div>
                            Riwayat Tagihan
                        </div>
                        <motion.div
                            initial={{ rotate: 0 }}
                            animate={{ rotate: open ? 180 : 0 }}
                            transition={{ duration: 0.2, ease: easeInOut }}
                        >
                            <FcPrevious className='rotate-90' />
                        </motion.div>
                    </div>
                    <motion.div
                        initial={open ? { height: 'auto' } : { height: 0 }}
                        animate={open ? { height: 'auto' } : { height: 0 }}
                        transition={{ duration: 0.2, ease: easeInOut }}
                        style={{ overflow: 'hidden' }}
                    >
                        {
                            done &&
                            done.map(data => (
                                <div className='group rounded-3xl bg-white p-3 border-1 flex gap-4 items-center cursor-pointer transition-all mb-2' key={data.id} onClick={() => navigate(`/tagihan/${data.id}`)}>
                                    <div className='text-2xl border-1 p-2 rounded-2xl shadow-md shadow-violet-700/30 group-hover:-translate-y-2 group-hover:shadow-lg transition-all'>
                                        <FcMoneyTransfer />
                                    </div>
                                    <div className='group-hover:scale-105 transition-all group-hover:-translate-y-2'>
                                        <div className='text-gray-700 truncate max-w-64'>{data.payment_name}</div>
                                        <div className='text-tiny text-gray-500 truncate max-w-64'>Lunas - {data.bulanan ? 'Bulanan' : 'Kontan'}</div>
                                    </div>
                                </div>
                            ))
                        }
                        {
                            done && done.length === 0 && <div className='w-full text-tiny text-center'>Tidak ada riwayat tagihan</div>
                        }

                    </motion.div>

                </div>
            </Scroll>
        </DashboardTemplate>
    )
}

export default Tagihan