/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import Template from '../../components/Template'

import { Button, Chip, DatePicker, Image, Input } from '@nextui-org/react'
import { motion } from 'framer-motion'

import Utils from '../../utils/Utilis'
import AuthUser from '../../utils/AuthUser'
import { useNavigate } from 'react-router-dom'

import { I18nProvider } from "@react-aria/i18n";



function Home() {
    const [nis, setNis] = useState()
    const [dob, setDob] = useState()

    const navigate = useNavigate()

    const { getDate, toast, Toaster } = new Utils()
    const { saveUser, user, axios } = new AuthUser()

    useEffect(() => {
        if (user) {
            console.log(user)
            navigate('/home')
        }
    }, [])

    const submitHandler = async (e) => {
        e.preventDefault()
        let idToast = null
        if (!dob) return toast('Tanggal Lahir Tidak Boleh Kosong')
        if (!nis) return toast('NIS Tidak Boleh Kosong')
        const data = {
            nis: nis,
            dob: getDate(dob)
        }
        try {
            idToast = toast.loading('Silahkan Tunggu.')
            const response = await axios.post('/api/user/login', data)
            saveUser(response.data)
            if (response) {
                toast.success('Anda akan dialihkan', { id: idToast })
                navigate('/home')
            }
        } catch (error) {
            toast.error('Terjadi kesalahan', { id: idToast })
            console.log(error)
        }


    }

    return (
        <Template>
            <Toaster />
            <div className='flex items-center justify-center w-full h-screen'>
                {/* Center */}
                <div className='w-full max-w-sm'>
                    <div className='flex justify-center flex-col items-center mb-2'>
                        <Image src='/icon/android-chrome-512x512.png' width={100} />
                        <h1 className='font-semibold mt-2'>PP. Darussalam Blokagung 2</h1>
                    </div>
                    <div className='px-10'>
                        <div className='w-full max-w-sm object-fill object-center h-56 rounded-xl relative'>
                            <motion.div
                                className='absolute'
                                animate={{ y: [140, 120, 140], x: [-10, -10, -10], transition: { duration: 2.5, repeat: Infinity } }}
                            >
                                <Chip color='primary' variant='dot' className='backdrop-blur-md'>Cek Pembayaran</Chip>
                            </motion.div>
                            <motion.div
                                className='absolute'
                                initial={{ y: 100 }}
                                animate={{ y: [100, 80, 100], x: ['140%', '140%', '140%'], transition: { delay: .5, duration: 2.5, repeat: Infinity } }}
                            >
                                <Chip color='primary' variant='dot' className='backdrop-blur-md'>Cek Siswa</Chip>
                            </motion.div>
                            <img src="splash.png" alt="" className='w-full h-full' />
                        </div>
                    </div>
                    <div className=''>
                        <form className='flex flex-col gap-2 px-5' onSubmit={submitHandler}>
                            <Input type='number' variant='bordered' className='shadow-md shadow-violet-700/20 rounded-xl' placeholder='Masukkan NIS Santri' aria-label='Input' value={nis} onValueChange={setNis} />
                            <I18nProvider locale="id-ID">
                                <DatePicker variant='bordered' className='shadow-md shadow-violet-700/20 rounded-xl' aria-label='Date Picker' value={dob} onChange={setDob} showMonthAndYearPickers />
                            </I18nProvider>
                            <Button color='primary' variant='shadow' type='submit'>Masuk</Button>
                        </form>
                    </div>
                </div>
            </div>
        </Template >
    )
}

export default Home