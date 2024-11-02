/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
// Component
import DashboardTemplate from '../../components/DashboardTemplate'
import Scroll from '../../components/Scroll'
import { Chip, Divider, Spinner } from '@nextui-org/react'

import Title from '../../components/Title'

// Utilitas
import AuthUser from '../../utils/AuthUser'
function DetailTagihan() {
    const { id } = useParams()
    const { http } = new AuthUser

    const [data, setData] = useState()
    const [income, setIncome] = useState()
    useEffect(() => {
        getDetailTagihan()
    }, [])

    const addComa = (input) => {
        if (!input) return
        if (typeof input !== 'string') {
            input = input.toString()
        }
        let num = input.replace(/\D/g, '')
        num = num.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
        return num
    }

    const generateArrayMonth = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);

        const monthYearRange = [];

        while (start <= end) {
            const monthNames = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
            const month = monthNames[start.getMonth()];
            const year = start.getFullYear();
            monthYearRange.push(`${month}-${year}`);

            start.setMonth(start.getMonth() + 1);
        }

        return monthYearRange;
    }

    const getDetailTagihan = () => {
        http.get(`/api/user/get-detail-tagihan/${id}`)
            .then(res => {
                const data = res.data.pembayaran
                const d = {
                    name: data.payment_name,
                    desc: data.desc,
                    type: parseInt(data.bulanan) === 0 ? 'Kontan' : 'Bulanan',
                    tenggat: data.tenggat,
                    startDate: data.start_date,
                    endDate: data.end_date,
                    meta: data.meta ? JSON.parse(data.meta) : [],
                    default: data.default,
                    groupId: data.group_payment_id
                }
                if (parseInt(data.bulanan) === 1 && data.meta) {
                    let array1 = generateArrayMonth(data.start_date, data.end_date)
                    let array2 = JSON.parse(data.meta)

                    const mapArray2 = array2.reduce((acc, obj) => {
                        acc[obj.month] = obj
                        return acc
                    }, {})

                    const mergedArray = array1.map(month => {
                        const price = mapArray2[month] ? mapArray2[month].price : data.default
                        return { month, price }
                    })

                    d.arrayMonth = mergedArray
                } else {
                    let month = generateArrayMonth(data.start_date, data.end_date)

                    const merged = month.map(item => {
                        return { month: item, price: data.default }
                    })
                    d.arrayMonth = merged
                }
                setData(d)

                // Income
                let respon = res.data.data
                const newArray = respon.map(item => {
                    return { month: item.month, price: item.jumlah_pembayaran, dop: item.dop }
                })
                setIncome(newArray)
            })
            .catch(error => console.log(error))
        const getStatus = (month, price) => {
            let status = income.find(item => item.month === month)
            price = parseInt(price)
            if (status) {
                if (status.price === price) {
                    return 'Lunas'
                } else if (status.price > price) {
                    let lebih = status.price - price
                    return `Lebih Rp. ${addComa(lebih)}`
                } else {
                    let kurang = price - status.price
                    return `Kurang Rp.${addComa(kurang)}`
                }
            } else {
                return 'Belum Lunas'
            }

        }
    }
    const getStatus = (month, price) => {
        let status = income.find(item => item.month === month)
        price = parseInt(price)
        if (status) {
            if (status.price >= price) {
                return 'Lunas'
            } else {
                return 'Belum Lunas'
            }
        } else {
            return 'Belum Lunas'
        }

    }
    const getTotal = month => {
        let find = income.find(item => item.month === month)
        if (find) {
            return addComa(find.price)
        } else {
            return '0'
        }

    }

    return (
        <DashboardTemplate>
            <div className='w-full flex justify-center items-center py-2 bg-white fixed z-50 pb-5'>
                <Title>
                    Detail Tagihan
                </Title>
            </div>

            <Scroll>
                <div className='flex justify-between px-2 pt-16'>
                    <div className='text-green-700 max-w-40'>
                        <div>Detail</div>
                        <div className='font-semibold truncate'>{data && data.name}</div>
                    </div>
                    <div className='text-green-700 text-right'>
                        <div>Jenis</div>
                        <div className='font-semibold'>{data && data.type === 'Bulanan' ? 'Bulanan' : 'Kontan'}</div>
                    </div>
                </div>
                <Divider className='my-2' />

                {data ? data.type === 'Bulanan' && (
                    data.arrayMonth.map(item => (
                        <div key={item.month} className='mb-3 mr-1'>
                            <div className='bg-white shadow-md p-4 rounded-3xl border-1'>
                                <div className='flex justify-between items-center'>
                                    <Chip color='primary' variant='shadow'>{item.month}</Chip>
                                    <Chip color={`${getStatus(item.month, item.price) == 'Lunas' ? 'primary' : 'danger'}`} variant='shadow' className='text-tiny'>{getStatus(item.month, item.price)}</Chip>

                                </div>
                                <Divider className='my-2' />
                                <div className='flex justify-between w-full'>
                                    <div>
                                        <div className='text-tiny'>Nominal</div>
                                        <div>Rp. {addComa(item.price)}</div>
                                    </div>
                                    <div className='flex flex-col items-end'>
                                        <div className='text-tiny'>Telah dibayar</div>
                                        <div>Rp. {getTotal(item.month)}</div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    ))
                ) : <div className='flex justify-center'><Spinner /></div>}
                {data && data.type === 'Kontan' &&
                    <div key={1} className='mb-3'>
                        <div className='bg-white shadow-md p-4 rounded-3xl border-1'>
                            <div className='flex justify-between items-center'>
                                <Chip color='primary' variant='shadow'>{data.tenggat}</Chip>
                                <Chip color={`${getStatus(data.tenggat, data.default) == 'Lunas' ? 'primary' : 'danger'}`} variant='shadow' className='text-tiny'>{getStatus(data.tenggat, data.default)}</Chip>

                            </div>
                            <Divider className='my-2' />
                            <div className='flex justify-between w-full'>
                                <div>
                                    <div className='text-tiny'>Nominal</div>
                                    <div>Rp. {addComa(data.default)}</div>
                                </div>
                                <div className='flex flex-col items-end'>
                                    <div className='text-tiny'>Telah dibayar</div>
                                    <div>Rp. {getTotal(data.tenggat)}</div>
                                </div>

                            </div>
                        </div>
                    </div>
                }
                <div className='h-20'>

                </div>
            </Scroll>
        </DashboardTemplate>
    )
}

export default DetailTagihan