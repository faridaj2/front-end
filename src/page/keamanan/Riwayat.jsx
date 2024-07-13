/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import DashboardTemplate from "../../components/DashboardTemplate"
import AuthUser from "../../utils/AuthUser"
import { Chip, Divider, Pagination, Spinner } from "@nextui-org/react"
import { useNavigate } from "react-router-dom"
function Riwayat() {
    const navigate = useNavigate()
    const { user, http } = new AuthUser()
    const [data, setData] = useState()
    const [page, setPage] = useState(1)

    useEffect(() => {
        getRiwayat()
    }, [])
    useEffect(() => {
        getRiwayat()
    }, [page])

    const getRiwayat = () => {
        http.get(`/api/user/riwayat/${user.id}?page=${page}`)
            .then(res => {
                const d = res.data
                setData(d.poinPelanggaran)
            })
    }

    return (
        <DashboardTemplate>
            <div className='w-full flex justify-center items-center border-b-1 py-2 bg-white fixed z-50 pb-5'>Riwayat Pelanggaran</div>
            <div className="mt-16">
                <div className='bg-white rounded-xl border-1 shadow-xl shadow-violet-500/20 py-3 px-4 mx-3 mt-2'>
                    <div className='flex justify-between'>
                        <div className='font-bold'>Riwayat Pelanggaran</div>
                        <div className='text-primary cursor-pointer' onClick={() => navigate('/poin')}>Kembali</div>
                    </div>
                    <div className='mt-2 flex flex-col gap-2'>
                        {data ? data.data?.map(item => (
                            <div className='border p-2 rounded-xl shadow-md shadow-violet-700/10 bg-white' key={item.id}>
                                <div className='flex justify-between items-center'>
                                    <div className='text-tiny text-gray-500'>Pelanggaran</div>
                                    <Chip color='primary' size='sm'>{item.tanggal}</Chip>
                                </div>
                                <Divider className='my-2' />
                                <div>
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
            </div>
        </DashboardTemplate>
    )
}

export default Riwayat