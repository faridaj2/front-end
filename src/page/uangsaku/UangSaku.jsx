/* eslint-disable react-hooks/exhaustive-deps */
import { Chip, Select, SelectItem } from "@nextui-org/react"
import DashboardTemplate from "../../components/DashboardTemplate"
import AuthUser from "../../utils/AuthUser"
import Utils from "../../utils/Utilis"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from 'framer-motion'
function UangSaku() {
    const { http, user } = new AuthUser()
    const { addComa } = new Utils()

    // Var
    const [money, setMoney] = useState()
    const [month, setMonth] = useState()
    const [selected, setSelected] = useState() //Bulan yang terpilih
    const [riwayat, setRiwayat] = useState()

    // Use Effect
    useEffect(() => {
        getMonth()
        getTotal()
    }, [])
    const [first, setFirst] = useState(false)
    useEffect(() => {
        if (!month || month.length === 0) return
        if (first) return
        setFirst(true)
        setSelected(month[0].value)
    }, [month])
    useEffect(() => {
        if (!selected) return
        getRiwayat()
        console.log(riwayat)
    }, [selected])


    // Fung
    const getRiwayat = () => {
        http.get(`/api/user/get-riwayat?id=${user.id}&date=${selected}`)
            .then(res => setRiwayat(res.data))
    }
    const getMonth = () => {
        http.get(`/api/user/get-month?id=${user.id}`)
            .then(res => {
                setMonth(res.data)
            })
    }
    const getTotal = () => {
        http.get(`/api/user/get-user?id=${user.id}`)
            .then(res => setMoney(res.data.uang_saku))
    }
    return (
        <DashboardTemplate>

            <div className="h-full mt-14">
                <div className="text-center my-10 text-4xl flex justify-center">
                    <div className="mx-4 relative">
                        <img src="/icon/apps/addons/title.png" alt="" />
                        <div className='absolute left-[50%] w-52 text-center text-2xl top-[50%] translate-x-[-50%] translate-y-[-50%] text-green-200 font-semibold'>Rp. {money ? addComa(money) : 0}</div>
                    </div>
                    {/* <div className="font-black font-mono bg-green-700 text-white p-5 rounded-xl shadow-xl shadow-violet-700/20 border-2 border-white">Rp. {money ? addComa(money) : 0}</div> */}
                </div>
                <div className="bg-white flex justify-between border-green-400 bg-gradient-to-b from-green-50 items-center p-4 mx-4 rounded-xl border-1 shadow-md">
                    <span>Riwayat</span>
                    <div className="w-1/2">
                        <Select className="bg-white" size="sm" variant="flat" radius="lg" label="Pilih bulan" selectedKeys={[selected]} onChange={(e) => setSelected(e.target.value)}>
                            {month && month?.map(item => (
                                <SelectItem key={item.value} value={item.value}>{item.month_year}</SelectItem>
                            ))}
                        </Select>
                    </div>
                </div>
                <div className="flex flex-col mt-2 gap-2 px-2">
                    <AnimatePresence>
                        {riwayat?.map(item => (
                            <motion.div
                                key={item.id} className="bg-white p-2 border-1 border-green-400 bg-gradient-to-b from-green-50 mx-2 shadow-md rounded-xl items-center px-2 group"
                                initial={{ y: 10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -50, opacity: 0 }}
                            >
                                <div className="flex justify-between transition-all items-center">
                                    <div className="text-tiny">{item.date}</div>
                                    <Chip className={`${item.jenis == 'masuk' ? 'bg-green-500' : 'bg-red-500'} text-white`} size="sm" variant="shadow">Rp. {addComa(item.uang)}</Chip>
                                </div>
                                <div className="h-group-hover:h-['auto'] overflow-hidden transition-all ease-in-out border-t-1 border-green-500 p-2 rounded-s mt-2 text-xs">
                                    {item.keterangan}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </DashboardTemplate >
    )
}

export default UangSaku