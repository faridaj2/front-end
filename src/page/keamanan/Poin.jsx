/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import DashboardTemplate from '../../components/DashboardTemplate'
import { Chip, Divider, Pagination, Spinner } from '@nextui-org/react'
import { useNavigate } from 'react-router-dom'
// Utilitas
import AuthUser from '../../utils/AuthUser'

function Poin() {
    const navigate = useNavigate()
    const { http, user } = new AuthUser()

    // Data
    const [data, setData] = useState()
    const [poin, setPoin] = useState()
    // Change Pagination
    const [page, setPage] = useState(1)

    // Useeffect
    useEffect(() => {
        getPelanggar()
    }, [])
    useEffect(() => {
        getPelanggar()
    }, [page])


    // Fungsi
    const getPelanggar = () => {
        http.get(`/api/user/pelanggar/${user.id}?page=${page}`)
            .then(res => {
                const d = res.data
                setData(d.poinPelanggaran)
                setPoin(d.poin)
            })
    }

    return (
        <DashboardTemplate>
            <div className='flex justify-center my-5 mt-16'>
                {/* <Badge content="Poin" color='primary'>
                    <div className='text-5xl font-black text-white rounded-lg bg-primary p-3'>{poin ? poin : 0}</div>
                </Badge> */}
                <div className="mx-4 relative">
                    <img src="/icon/apps/addons/title.png" alt="" />
                    <div className='absolute left-[50%] w-52 text-center text-2xl top-[50%] translate-x-[-50%] translate-y-[-50%] text-green-200 font-semibold'>{poin ? poin : 0}</div>
                </div>
            </div>
            <div className='bg-white rounded-xl border-1 shadow-xl shadow-green-500/20 py-3 px-4 mx-3'>
                <div className='flex justify-between'>
                    <div className='font-bold text-green-700'>Pelanggaran</div>
                    <div className='text-green-700 text-xs cursor-pointer' onClick={() => navigate('/riwayat')}>Riwayat</div>
                </div>
                <div className='mt-2 flex flex-col gap-2'>
                    {data ? data.data?.map(item => (
                        <div className='border p-2 rounded-xl shadow-md shadow-violet-700/10 bg-white' key={item.id}>
                            <div className='flex justify-between items-center'>
                                <div className='text-tiny bg-green-700 text-white p-1 rounded-md'>{item.poin_pelanggaran}</div>
                                <Chip className='text-white bg-green-700' size='sm'>{item.tanggal}</Chip>
                            </div>
                            <Divider className='my-2' />
                            <div className='text-sm font-semibold'>
                                {item.pelanggaran}
                            </div>
                        </div>
                    ))
                        :
                        <Spinner />}
                </div>
                <div className='flex justify-center my-2'>
                    {data && data.last_page > 1 && <Pagination total={data.last_page} page={page} onChange={e => setPage(e)} />}

                </div>
            </div>
        </DashboardTemplate>
    )
}

export default Poin