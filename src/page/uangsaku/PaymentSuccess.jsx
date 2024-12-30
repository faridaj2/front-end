import DashboardTemplate from "../../components/DashboardTemplate"
import { useParams, useNavigate } from "react-router-dom"
const PaymentSuccess = () => {
    const navigate = useNavigate()
    const { code } = useParams()
    return (
        <DashboardTemplate>
            <div class="h-screen flex items-center justify-center">
                <div class="p-6  md:mx-auto">
                    <svg viewBox="0 0 24 24" class="text-green-600 w-16 h-16 mx-auto my-6">
                        <path fill="currentColor"
                            d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z">
                        </path>
                    </svg>
                    <div class="text-center">
                        <h3 class="md:text-2xl text-base text-gray-900 font-semibold text-center">Pembayaran Berhasil!</h3>
                        <div className="border-2 w-full rounded-3xl overflow-hidden my-4">
                            <div className="text-xl font-semibold border-b-2">Kode Transaksi</div>
                            <div className="">{code}</div>
                        </div>
                        <p> Have a great day!  </p>
                        <div class="py-10 text-center">
                            <button onClick={() => navigate('/uang-saku')} class="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3">
                                Kembali
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardTemplate>
    )
}
export default PaymentSuccess