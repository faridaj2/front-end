import { useState, useEffect, useRef } from "react";
import Utils from "../utils/Utilis";
import AuthUser from "../utils/AuthUser";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@nextui-org/react";

const ModalPayment = ({ close, refresh }) => {
    const navigate = useNavigate();
    const { addComa } = new Utils();
    const { user, http } = new AuthUser();
    const [jumlah, setJumlah] = useState("");
    const bgModal = useRef(null);
    const [refPayment, setRefPayment] = useState("");
    const [state, setState] = useState(0);
    const [money, setMoney] = useState();
    const [method, setMethod] = useState();
    const [selectedMethod, setSelectedMethod] = useState();
    const [detail, setDetail] = useState([]);
    const [cusNumber, setCusNumber] = useState();
    const [bill, setBill] = useState();
    const [historyId, setHistoryId] = useState();
    const [trx, setTrx] = useState();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (bgModal.current && bgModal.current == event.target) {
                close(false);
                setHistoryId();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        let id;
        if (historyId) {
            id = setInterval(() => {
                getTrx(historyId);
            }, 5000);
        }
        return () => {
            clearInterval(id);
        };
    }, [historyId]);

    useEffect(() => {
        setJumlah(addComa(jumlah));
    }, [jumlah]);

    const process = () => {
        let money = jumlah.replace(/\./g, "");
        if (money == "") return;

        http.get("/api/user/get-list").then((res) => {
            const data = [];
            const accept = [
                "QRIS",
                "BCAVA",
                "BSI",
                "BRIVA",
                "MANDIRIVA",
                "BNIVA",
            ];
            accept.forEach((item) => {
                const acc = res.data.data.find((method) => method.nama == item);
                data.push(acc);
            });
            setMethod(data);
        });

        setMoney(money);
        setState(1);
    };

    const change = (change) => {
        setJumlah(change);
    };
    const nextDetail = () => {
        if (!selectedMethod) return;
        const admin = method.find((item) => item.nama == selectedMethod).biaya;
        const dtl = {
            nominal: money,
            metode: selectedMethod,
            admin: admin > 100 ? admin : Math.ceil(money * (admin / 100)),
        };
        setDetail(dtl);
        setState(2);
    };

    const createBill = () => {
        const formData = { ...detail };
        if (selectedMethod == "OVO") {
            formData.cusNumber = cusNumber;
        }
        setState(3);
        http.post("api/user/create-bill", formData).then((res) => {
            if (res.data.status) {
                const data = res.data.data;
                data.guide = res.data.payment_guide;
                data.metode = method.find(
                    (item) => item.nama == selectedMethod,
                ).metode;
                setBill(data);
                let idHistory = res.data.id_history;
                setHistoryId(idHistory);
            } else {
                setState(2);
                setBill();
            }
        });
    };
    function getTrx(id) {
        http.get("/api/user/check-status-realtime", {
            params: { id },
            timeout: 5000,
        })
            .then((res) => {
                if (res.data.status != false) {
                    setTrx(res.data);
                    setHistoryId();
                    refresh();
                }
            })
            .catch((er) => console.log(er));
    }
    const amount = [50000, 100000, 150000, 200000, 250000, 300000];
    return (
        <div
            className="fixed w-full h-full bg-black/50 top-0 left-0 z-[10000] backdrop-blur-md flex justify-center items-center"
            ref={bgModal}
        >
            <div className="bg-dark rounded-xl min-h-96 max-w-sm w-full mx-2 p-5 relative overflow-hidden">
                <div>
                    <label
                        htmlFor="nominal"
                        className="block mb-2 text-sm font-medium text-white"
                    >
                        Nominal Top Up
                    </label>
                    <input
                        type="text"
                        id="nominal"
                        className="w-full p-3 rounded-2xl bg-white/70 border text-black"
                        placeholder="50.0000"
                        value={jumlah}
                        onChange={(e) => change(e.target.value)}
                        required
                    />
                </div>
                <div className="grid grid-cols-2 gap-2 mt-3">
                    {amount.map((item) => (
                        <button
                            key={item}
                            type="button"
                            className="text-white bg-brown rounded-2xl p-3"
                            onClick={() => change(item)}
                        >
                            {addComa(item)}
                        </button>
                    ))}
                </div>
                <button
                    className="w-full mt-2 border rounded-2xl p-3 bg-brown text-white"
                    onClick={process}
                >
                    Metode Pembayaran
                </button>
                <div
                    className={`absolute p-4 top-0 left-0 w-full h-full bg-dark transition-all text-white ${state != 1 && "translate-y-full"}`}
                >
                    <div className="flex gap-2">
                        <button onClick={() => setState(0)}>
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
                        </button>
                        <div className="">Pilih Metode Pembayaran</div>
                    </div>
                    <div className="mt-2 ">
                        <div
                            className={`grid grid-cols-1 pt-2 gap-2 overflow-y-auto pr-1 scroll max-h-[17rem] ${!method && "hidden"}`}
                        >
                            {method?.map((item) => (
                                <div
                                    className={`bg-brown p-2 rounded-2xl cursor-pointer ${selectedMethod == item.nama && "border bg-gradient-to-b from-blue-500/20"}`}
                                    key={item.nama}
                                    onClick={() => setSelectedMethod(item.nama)}
                                >
                                    <div>{item.nama}</div>
                                    <div className="text-tiny tracking-wide text-white/50">
                                        Metode : {item.metode}
                                    </div>
                                    <div className="text-tiny tracking-wide text-white/50">
                                        Admin :{" "}
                                        {item.biaya < 100
                                            ? item.biaya + "%"
                                            : "Rp." + addComa(item.biaya)}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button
                            className={`w-full my-2 rounded-2xl py-2 border ${!method && "hidden"}`}
                            onClick={nextDetail}
                        >
                            Lanjut
                        </button>
                        {!method && (
                            <div className="w-full h-72 flex items-center justify-center">
                                <Spinner />
                            </div>
                        )}
                    </div>
                </div>
                <div
                    className={`absolute p-4 top-0 left-0 w-full h-full bg-dark transition-all text-white ${state != 2 && "translate-y-full"}`}
                >
                    <div className="flex gap-2">
                        <button onClick={() => setState(1)}>
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
                        </button>
                        <div className="">Detail</div>
                    </div>
                    <div className="flex flex-col h-full">
                        <div className="border-b border-white/20 flex justify-between p-2">
                            <div className="tracking-wide text-white/60">
                                Metode Pembayaran
                            </div>
                            <div>{detail.metode}</div>
                        </div>
                        <div className="border-b border-white/20 flex justify-between p-2">
                            <div className="tracking-wide text-white/60">
                                Nominal Pembayaran
                            </div>
                            <div>Rp. {addComa(detail.nominal)}</div>
                        </div>
                        <div className="border-b border-white/20 flex justify-between p-2">
                            <div className="tracking-wide text-white/60">
                                Biaya Admin
                            </div>
                            <div>Rp. {addComa(detail.admin)}</div>
                        </div>
                        <div
                            className={`border-b border-white/20 flex justify-between p-2 bg-white/20 mt-auto ${selectedMethod != "OVO" && "mb-20"}`}
                        >
                            <div className="tracking-wide text-white">
                                Total
                            </div>
                            <div>
                                Rp.{" "}
                                {addComa(
                                    parseInt(detail.admin) +
                                        parseInt(detail.nominal),
                                )}
                            </div>
                        </div>
                        <div
                            className={`my-3 w-full ${selectedMethod != "OVO" && "hidden"}`}
                        >
                            <input
                                className="w-full p-2 rounded-2xl text-dark"
                                type="text"
                                placeholder="0812345678"
                                onChange={(event) =>
                                    setCusNumber(event.target.value)
                                }
                            />
                            <span className="text-xs text-white/70">
                                *Untuk metode Pembayaran OVO wajib memasukkan
                                pada nomor yang terdaftar OVO
                            </span>
                        </div>
                        <button
                            className="mb-5 bg-brown border rounded-2xl py-3"
                            onClick={createBill}
                        >
                            Buat Tagihan
                        </button>
                    </div>
                </div>
                <div
                    className={`absolute p-4 top-0 left-0 w-full h-full bg-dark transition-all text-white ${state != 3 && "translate-y-full"}`}
                >
                    <div className="flex gap-2">
                        <button onClick={() => setState(2)}>
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
                        </button>
                        <div className="">Tagihan</div>
                    </div>
                    {bill && (
                        <div className="relative overflow-y-auto scroll">
                            <div className="text-center border-b border-white/20 p-4">
                                {bill?.ref_kode}
                            </div>
                            <div className="text-center p-4">
                                <div
                                    className={`bg-white ${bill?.code_payment != "QRIS" && "hidden"}`}
                                >
                                    <img
                                        className="w-full"
                                        src={bill?.target}
                                        alt=""
                                    />
                                </div>
                                <div
                                    className={`text-white/60 ${bill?.code_payment == "QRIS" && "hidden"}`}
                                >
                                    Nomor {bill.code_payment}
                                </div>
                                <div
                                    className={`p-4 flex gap-2 items-center justify-center ${bill?.code_payment == "QRIS" && "hidden"}`}
                                >
                                    {bill.target}{" "}
                                    <button
                                        onClick={() =>
                                            navigator.clipboard.writeText(
                                                bill.target,
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
                            <div className="flex justify-between p-4 border-b border-white/20">
                                <div className="text-white/60">Nama</div>
                                <div>{bill.nama}</div>
                            </div>
                            <div className="flex justify-between p-4 border-b border-white/20">
                                <div className="text-white/60">
                                    Payment Method
                                </div>
                                <div>{bill.code_payment}</div>
                            </div>
                            <div className="flex justify-between p-4">
                                <div className="text-white/60">Nominal</div>
                                <div>Rp. {addComa(bill.nominal)}</div>
                            </div>
                            <div
                                className={`w-full h-full bg-dark top-0 left-0 absolute flex items-center justify-center ${!trx && "hidden"}`}
                            >
                                <div className="bg-brown p-10 rounded-2xl">
                                    Pembayaran Sukses
                                    <div className="flex justify-center mt-4">
                                        <button
                                            onClick={() => close(false)}
                                            className="border p-1 px-4 rounded-2xl"
                                        >
                                            Kembali
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {!bill && (
                        <div className="w-full h-72 flex items-center justify-center">
                            <Spinner />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
export default ModalPayment;
