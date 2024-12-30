import DashboardTemplate from "../../components/DashboardTemplate"
import AuthUser from "../../utils/AuthUser"
import { useEffect, useState } from "react"
import Utils from "../../utils/Utilis"
import { useNavigate } from "react-router-dom"

const RiwayatTopup = () => {
    const navigate = useNavigate()
    const { http } = new AuthUser()
    const [riwayat, setRiwayat] = useState([])
    const { addComa } = new Utils()

    const code = [
        {
            "code": "BC",
            "description": "BCA Virtual Account"
        },
        {
            "code": "M2",
            "description": "Mandiri Virtual Account"
        },
        {
            "code": "VA",
            "description": "Maybank Virtual Account"
        },
        {
            "code": "I1",
            "description": "BNI Virtual Account"
        },
        {
            "code": "B1",
            "description": "CIMB Niaga Virtual Account"
        },
        {
            "code": "BT",
            "description": "Permata Bank Virtual Account"
        },
        {
            "code": "A1",
            "description": "ATM Bersama"
        },
        {
            "code": "AG",
            "description": "Bank Artha Graha"
        },
        {
            "code": "NC",
            "description": "Bank Neo Commerce/BNC"
        },
        {
            "code": "BR",
            "description": "BRIVA"
        },
        {
            "code": "S1",
            "description": "Bank Sahabat Sampoerna"
        },
        {
            "code": "DM",
            "description": "Danamon Virtual Account"
        },
        {
            "code": "BV",
            "description": "BSI Virtual Account"
        },
        {
            "code": "FT",
            "description": "Pegadaian/ALFA/Pos"
        },
        {
            "code": "IR",
            "description": "Indomaret"
        },
        {
            "code": "OV",
            "description": "OVO (Support Void)"
        },
        {
            "code": "SA",
            "description": "Shopee Pay Apps (Support Void)"
        },
        {
            "code": "LF",
            "description": "LinkAja Apps (Fixed Fee)"
        },
        {
            "code": "LA",
            "description": "LinkAja Apps (Percentage Fee)"
        },
        {
            "code": "DA",
            "description": "DANA"
        },
        {
            "code": "SL",
            "description": "Shopee Pay Account Link"
        },
        {
            "code": "OL",
            "description": "OVO Account Link"
        },
        {
            "code": "JP",
            "description": "Jenius Pay"
        },
        {
            "code": "SP",
            "description": "Shopee Pay"
        },
        {
            "code": "LQ",
            "description": "LinkAja"
        },
        {
            "code": "NQ",
            "description": "Nobu"
        },
        {
            "code": "DQ",
            "description": "Dana"
        },
        {
            "code": "GQ",
            "description": "Gudang Voucher"
        },
        {
            "code": "SQ",
            "description": "Nusapay"
        },
        {
            "code": "DN",
            "description": "Indodana Paylater"
        },
        {
            "code": "AT",
            "description": "ATOME"
        },
        {
            "code": "VC",
            "description": "(Visa / Master Card / JCB)"
        }
    ]

    useEffect(() => {
        http.get('/api/user/riwayat-uang-saku')
            .then(res => {
                setRiwayat(res.data)
            })
            .catch(err => console.log(err))
    }, [])
    const openModal = item => {
        checkout.process(item, {
            defaultLanguage: "id", //opsional pengaturan bahasa
            successEvent: function (result) {

            },
        });

    }
    return (
        <DashboardTemplate>
            <div className="px-2">
                <div className="my-2 border-2 rounded-xl p-2 font-semibold tracking-wide">Riwayat Transaksi</div>
                <div className="flex gap-2 my-4 cursor-pointer" onClick={() => navigate('/uang-saku')}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-move-left"><path d="M6 8L2 12L6 16" /><path d="M2 12H22" /></svg>
                    <span>Kembali</span>
                </div>


                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Koda Transaksi
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Jumlah
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Pembayaran
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {riwayat?.map(item => (
                                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700" key={item.id}>
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {item.kode_transaksi}
                                    </th>
                                    <td className="px-6 py-4">
                                        Rp.{addComa(item.jumlah)}
                                    </td>
                                    <td className="px-6 py-4 truncate">
                                        {item.nama_pembayaran}
                                    </td>
                                    <td className="px-6 py-4">
                                        <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={() => openModal(item.no_refrence)}>Lihat</button>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>


            </div>
        </DashboardTemplate>
    )
}
export default RiwayatTopup