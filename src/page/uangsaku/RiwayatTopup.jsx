import DashboardTemplate from "../../components/DashboardTemplate";
import AuthUser from "../../utils/AuthUser";
import { useEffect, useState, useRef } from "react";
import Utils from "../../utils/Utilis";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@nextui-org/react";

const RiwayatTopup = () => {
    const navigate = useNavigate();
    const { http } = new AuthUser();
    const { toast, Toaster } = new Utils();

    const [riwayat, setRiwayat] = useState([]);
    const { addComa } = new Utils();
    const [data, setData] = useState();
    const [modal, setModal] = useState(false);
    const [pending, setPending] = useState();
    const modalEl = useRef(null);
    const [realtimeId, setRealtimeId] = useState();
    useEffect(() => {
        getRiwayat();
    }, []);
    function copyText(textToCopy) {
        navigator.clipboard.writeText(textToCopy);
        toast("Tersalin");
    }

    const getRiwayat = () => {
        http.get("/api/user/riwayat-uang-saku")
            .then((res) => {
                setRiwayat(res.data);
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        const click = (e) => {
            if (modal && e.target === modalEl.current) {
                setModal(false);
                setPending();
                setRealtimeId();
            }
        };
        document.addEventListener("click", click);
        return () => {
            document.removeEventListener("click", click);
        };
    }, [modal]);

    useEffect(() => {
        let id;
        if (realtimeId) {
            id = setInterval(() => {
                getData(realtimeId);
            }, 5000);
        }
        return () => clearInterval(id);
    }, [realtimeId]);

    const openModal = (item) => {
        setData(item);
        if (item.status == "PAID" || item.status == "UNPAID") {
            setModal(true);
        } else {
            return toast("Kadaluarsa / Gagal");
        }
        if (item.status != "PAID") {
            const data = {
                refKode: item.ref_kode,
                idRefrence: item.id_refrence,
            };
            http.get("/api/user/get-status-trx", { params: data }).then(
                (res) => {
                    setPending(res.data.data);
                    setRealtimeId(item.id);
                },
            );
        }
    };
    function getData(id) {
        http.get("/api/user/check-status-realtime", {
            params: { id },
            timeout: 5000,
        })
            .then((res) => {
                if (res.data.status != false) {
                    setData(res.data);
                    setRealtimeId();
                    getRiwayat();
                }
            })
            .catch((er) => console.log(er));
    }

    return (
        <DashboardTemplate>
            <Toaster />
            <div className="px-2 pb-20">
                <div
                    className="flex gap-2 cursor-pointer text-white py-5"
                    onClick={() => navigate("/uang-saku")}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-chevron-left"
                    >
                        <path d="m15 18-6-6 6-6" />
                    </svg>
                    <span>Riwayat Transaksi</span>
                </div>

                <div className="relative scroll overflow-y-auto shadow-md sm:rounded-lg bg-dark">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-white uppercase bg-gray-500">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Metode
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Jumlah
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Pembayaran
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {riwayat?.map((item) => (
                                <tr
                                    className="odd:bg-brown text-white/70 even:bg-dark border-b border-white/40"
                                    key={item.id}
                                >
                                    <td className="px-6 py-4">
                                        <button
                                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                            onClick={() => openModal(item)}
                                        >
                                            Lihat
                                        </button>
                                    </td>
                                    <td
                                        scope="row"
                                        className="px-6 py-4 font-medium whitespace-nowrap dark:text-white"
                                    >
                                        {item.metode}
                                    </td>
                                    <td className="px-6 py-4">{item.status}</td>
                                    <td className="px-6 py-4">
                                        Rp.{addComa(item.nominal)}
                                    </td>
                                    <td className="px-6 py-4 truncate">
                                        {item.nama_pembayaran}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div
                ref={modalEl}
                className={`fixed bg-black/50 backdrop-blur w-full h-full top-0 left-0 flex items-center justify-center ${!modal && "hidden"}`}
            >
                <div className="relative rounded-2xl overflow-hidden max-w-sm bg-dark w-full text-white rounded-2xl p-4 h-96">
                    <div className="">
                        <div className="text-center tracking-wider leading-loose">
                            Status Transaksi
                        </div>
                        <div className="flex py-3 justify-between border-b">
                            <div className="text-white/80 font-light tracking-wider">
                                Nomor Refrensi
                            </div>
                            <div>{data?.ref_kode}</div>
                        </div>
                        <div className="flex py-3 justify-between border-b">
                            <div className="text-white/80 font-light tracking-wider">
                                Metode
                            </div>
                            <div>{data?.metode}</div>
                        </div>
                        <div className="flex py-3 justify-between border-b">
                            <div className="text-white/80 font-light tracking-wider">
                                Status
                            </div>
                            <div>
                                {data?.status == "PAID" && "TELAH DIBAYAR"}
                            </div>
                        </div>
                        <div className="flex py-3 justify-between border-b">
                            <div className="text-white/80 font-light tracking-wider">
                                Waktu
                            </div>
                            <div>{data?.waktu_pembayaran}</div>
                        </div>
                        <div className="flex py-3 justify-between">
                            <div className="text-white/80 font-light tracking-wider">
                                Total
                            </div>
                            <div>Rp. {addComa(data?.nominal)}</div>
                        </div>
                    </div>
                    <div
                        className={`absolute w-full h-full bg-dark top-0 left-0 p-6 overflow-y-auto scroll ${data?.status == "PAID" && "hidden"}`}
                    >
                        <div
                            className={`text-center border-b border-white/20 p-4 ${pending?.qr_url && "hidden"}`}
                        >
                            {data?.ref_kode}
                        </div>
                        <div className="text-center p-4">
                            <div
                                className={`text-white/60 ${pending?.qr_url && "hidden"}`}
                            >
                                Nomor {pending?.payment_method}
                            </div>
                            <div
                                className={`mb-2 bg-white ${!pending?.qr_url && "hidden"}`}
                            >
                                <img
                                    className="w-full"
                                    src={
                                        pending?.url_qr
                                            ? pending?.url_qr
                                            : pending?.qr_url
                                    }
                                    alt=""
                                />
                            </div>
                            <div
                                className={`p-4 flex gap-2 items-center justify-center ${pending?.qr_url && "hidden"}`}
                            >
                                {pending?.qr_url
                                    ? pending?.url_qr
                                    : pending?.pay_code}{" "}
                                <button
                                    onClick={() =>
                                        copyText(
                                            pending?.url_qr
                                                ? pending?.url_qr
                                                : pending?.pay_code,
                                        )
                                    }
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="lucide lucide-copy"
                                    >
                                        <rect
                                            width="14"
                                            height="14"
                                            x="8"
                                            y="8"
                                            rx="2"
                                            ry="2"
                                        />
                                        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div
                            className={`flex justify-between p-4 border-b border-white/20 ${pending?.qr_url && "hidden"}`}
                        >
                            <div className="text-white/60">Kode Pembayaran</div>
                            <div>{pending?.merchant_ref}</div>
                        </div>
                        <div className="flex justify-between p-4 border-b border-white/20">
                            <div className="text-white/60">Nama</div>
                            <div>{pending?.customer_name}</div>
                        </div>
                        <div className="flex justify-between p-4 border-b border-white/20">
                            <div className="text-white/60">Payment Method</div>
                            <div>{pending?.payment_method}</div>
                        </div>
                        <div className="flex justify-between p-4">
                            <div className="text-white/60">Nominal</div>
                            <div>Rp. {addComa(pending?.amount)}</div>
                        </div>
                        {!pending && (
                            <div className="absolute top-0 left-0 bg-dark w-full h-full flex items-center justify-center">
                                <Spinner />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </DashboardTemplate>
    );
};
export default RiwayatTopup;
