/* eslint-disable react-hooks/exhaustive-deps */
import { Select, SelectItem } from "@nextui-org/react"
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
        if (!month) return
        if (first) return
        setFirst(true)
        setSelected(month[0].value)
    }, [month])
    useEffect(() => {
        getRiwayat()
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
            <div className='w-full flex justify-center items-center border-b-1 py-2 bg-white'>Uang Saku</div>
            <div className="h-full">
                <div className="text-center my-10 text-4xl">
                    <div className="font-semibold font-mono">Rp. {money ? addComa(money) : 0}</div>
                </div>
                <div className="bg-white flex justify-between items-center p-4">
                    <span>Riwayat</span>
                    <div className="w-1/2">
                        <Select color="primary" size="sm" variant="bordered" label="Pilih bulan" selectedKeys={[selected]} onChange={(e) => setSelected(e.target.value)}>
                            {month?.map(item => (
                                <SelectItem key={item.value} value={item.value}>{item.month_year}</SelectItem>
                            ))}
                        </Select>
                    </div>
                </div>
                <div className="flex flex-col mt-2 gap-2">
                    <AnimatePresence>
                        {riwayat?.map(item => (
                            <motion.div
                                key={item.id} className="bg-white p-2 border-1 mx-2 shadow-md shadow-violet-300 rounded-md items-center px-2 group"
                                initial={{ y: 10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -50, opacity: 0 }}
                            >
                                <div className="flex justify-between transition-all">
                                    <div className="text-tiny">{item.date}</div>
                                    <div>Rp. {addComa(item.uang)}</div>
                                </div>
                                <div className="h- group-hover:h-['auto'] overflow-hidden transition-all ease-in-out">
                                    {item.keterangan}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </DashboardTemplate>
    )
}

export default UangSaku