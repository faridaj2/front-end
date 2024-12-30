/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import DashboardTemplate from '../../components/DashboardTemplate'
import AuthUser from '../../utils/AuthUser'
import { Image } from '@nextui-org/react'

import Scroll from '../../components/Scroll'
function Informasi() {
  const { user, http } = new AuthUser()
  const [data, setData] = useState()

  useEffect(() => {
    getUser()
  }, [])

  const getUser = () => {
    http.get(`/api/user/get-user?id=${user.id}`)
      .then(res => {
        setData(res.data)
      })
  }
  return (
    <DashboardTemplate>
      <Scroll>
        <div className='p-2 bg-white shadow shadow-green-500/30 rounded-2xl m-2 border-1'>
          <div className='flex items-center'>
              <Image
                src={data?.foto ? import.meta.env.VITE_API_BASE_URL+ `/storage/photos/`+ data?.foto : `https://i.pinimg.com/736x/cd/4b/d9/cd4bd9b0ea2807611ba3a67c331bff0b.jpg`}
              />
          </div>
          <div className='mt-2 px-2'>
            <div className='flex justify-between items-center'>
              <div className='text-green-700 font-light'>Nama</div>
              <div className='font-medium text-right'>{data?.nama_siswa}</div>
            </div>
            <div className='flex justify-between items-center'>
              <div className='text-green-700 font-light'>NIS</div>
              <div className='font-medium text-right'>{data?.nis}</div>
            </div>
            <div className='flex justify-between items-center'>
              <div className='text-green-700 font-light'>NIK</div>
              <div className='font-medium text-right'>{data?.NIK}</div>
            </div>
            <div className='flex justify-between items-center'>
              <div className='text-green-700 font-light'>NISN</div>
              <div className='font-medium text-right'>{data?.NISN}</div>
            </div>
            <div className='flex justify-between items-center'>
              <div className='text-green-700 font-light'>KK</div>
              <div className='font-medium text-right'>{data?.KK}</div>
            </div>
            <div className='flex justify-between items-center'>
              <div className='text-green-700 font-light'>Domisili</div>
              <div className='font-medium text-right'>{data?.domisili}</div>
            </div>
            <div className='flex justify-between items-center'>
              <div className='text-green-700 font-light'>KIP</div>
              <div className='font-medium text-right'>{data?.KIP}</div>
            </div>

          </div>
        </div>
        <div className='rounded-xl shadow mx-2 border-1 px-3 py-2'>
          <div className='flex justify-between items-center'>
            <div className='text-green-700 font-light'>Kelas Formal</div>
            <div className='font-medium text-right'>{data?.formal}</div>
          </div>
          <div className='flex justify-between items-center'>
            <div className='text-green-700 font-light'>Kelas Diniyah</div>
            <div className='font-medium text-right'>{data?.diniyah}</div>
          </div>
          <div className='flex justify-between items-center'>
            <div className='text-green-700 font-light'>Tempat Lahir</div>
            <div className='font-medium text-right'>{data?.tempat_lahir}</div>
          </div>
          <div className='flex justify-between items-center'>
            <div className='text-green-700 font-light'>Tanggal Lahir</div>
            <div className='font-medium text-right'>{data?.tgl_lahir}</div>
          </div>
          <div className='flex justify-between items-center'>
            <div className='text-green-700 font-light'>Gender</div>
            <div className='font-medium text-right'>{data?.kelamin}</div>
          </div>
          <div className='flex justify-between items-center'>
            <div className='text-green-700 font-light'>Kamar</div>
            <div className='font-medium text-right'>{data?.kamar}</div>
          </div>
          <div className='flex justify-between items-center'>
            <div className='text-green-700 font-light'>Asal Sekolah</div>
            <div className='font-medium text-right'>{data?.asal_sekolah}</div>
          </div>
        </div>
        <div className='rounded-xl shadow mx-2 border-1 px-3 py-2 mt-2'>
          <div className='flex justify-between items-center'>
            <div className='text-green-700 font-light'>Nama Ayah</div>
            <div className='font-medium text-right'>{data?.nama_ayah}</div>
          </div>
          <div className='flex justify-between items-center'>
            <div className='text-green-700 font-light'>No. Ayah</div>
            <div className='font-medium text-right'>{data?.nomor_ayah}</div>
          </div>
          <div className='flex justify-between items-center'>
            <div className='text-green-700 font-light'>Nama Ibu</div>
            <div className='font-medium text-right'>{data?.nama_ibu}</div>
          </div>
          <div className='flex justify-between items-center'>
            <div className='text-green-700 font-light'>No. Ibu</div>
            <div className='font-medium text-right'>{data?.nomor_ibu}</div>
          </div>
        </div>
        <div className='text-center text-tiny text-green-700 mt-5 mx-4 mb-5'>
          jika terdapat kesalahan data/ketidaksesuaian data, segera hubungi Pesantren/Sekretaris
        </div>
      </Scroll>
    </DashboardTemplate>
  )
}

export default Informasi