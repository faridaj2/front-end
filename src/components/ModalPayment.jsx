import { useState, useEffect, useRef } from 'react'
import Utils from '../utils/Utilis'
import AuthUser from '../utils/AuthUser'
import { useNavigate } from 'react-router-dom'

const ModalPayment = ({ close }) => {
    const navigate = useNavigate();
    const { addComa } = new Utils()
    const { user, http } = new AuthUser()
    const [jumlah, setJumlah] = useState('')
    const bgModal = useRef(null)
    const [loading, setLoading] = useState(false)
    const [refPayment, setRefPayment] = useState('')
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (bgModal.current && bgModal.current == event.target) {
                close(false)
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [])
    useEffect(() => {
        setJumlah(addComa(jumlah))
    }, [jumlah])

    const process = () => {
        let money = jumlah.replace(/\./g, '')
        http.get(`/api/user/get-payment-ref?jumlah=${money}`,)
            .then(res => {
                checkout.process(res.data, {
                    defaultLanguage: "id",
                    successEvent: function (result) {
                        console.log(result)
                        navigate(`/payment-success/${result.merchantOrderId}`);

                    }
                });

            })
            .catch(res => console.log(res))
        setLoading(true)
    }

    const change = change => {
        setJumlah(change)
    }
    const amount = [50000, 100000, 150000, 200000, 250000, 300000]
    return (
        <div className="fixed w-full h-full bg-black/50 top-0 left-0 z-[10000] backdrop-blur-md flex justify-center items-center" ref={bgModal}>
            <div className="bg-white rounded-xl min-h-96 max-w-sm w-full mx-2 p-5">
                <div className={`${loading && 'hidden'}`}>
                    <div>
                        <label htmlFor="nominal" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nominal Top Up</label>
                        <input type="text" id="nominal" className="text-xl  bg-gray-50 border border-gray-300 text-gray-900 font-semibold  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="50.0000" value={jumlah} onChange={(e) => change(e.target.value)} required />
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-3">
                        {amount.map(item => (
                            <button key={item} type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" onClick={() => change(item)}>{addComa(item)}</button>
                        ))}
                    </div>
                    <button className='bg-blue-500 w-full p-2 text-white font-bold mt-3 rounded-lg ' onClick={process}>Lakukan Pembayaran</button>
                </div>
                <div className={`${!loading ? 'hidden' : 'flex items-center justify-center h-96'}`}>
                    Loading ...
                </div>
            </div>
        </div >
    )
}
export default ModalPayment