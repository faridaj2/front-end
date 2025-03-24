import { useState, useEffect, useRef } from "react";
import Utils from "../utils/Utilis";
import AuthUser from "../utils/AuthUser";
import { useNavigate } from "react-router-dom";

const ModalPayment = ({ close }) => {
    const navigate = useNavigate();
    const { addComa } = new Utils();
    const { user, http } = new AuthUser();
    const [jumlah, setJumlah] = useState("");
    const bgModal = useRef(null);
    const [loading, setLoading] = useState(false);
    const [refPayment, setRefPayment] = useState("");
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (bgModal.current && bgModal.current == event.target) {
                close(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    useEffect(() => {
        setJumlah(addComa(jumlah));
    }, [jumlah]);

    const process = () => {
        let money = jumlah.replace(/\./g, "");
        http.get(`/api/user/get-payment-ref?jumlah=${money}`)
            .then((res) => {
                checkout.process(res.data, {
                    defaultLanguage: "id",
                    successEvent: function (result) {
                        console.log(result);
                        navigate(`/payment-success/${result.merchantOrderId}`);
                    },
                });
            })
            .catch((res) => console.log(res));
        setLoading(true);
    };

    const change = (change) => {
        setJumlah(change);
    };
    const amount = [50000, 100000, 150000, 200000, 250000, 300000];
    return (
        <div
            className="fixed w-full h-full bg-black/50 top-0 left-0 z-[10000] backdrop-blur-md flex justify-center items-center"
            ref={bgModal}
        >
            <div className="bg-dark rounded-xl min-h-96 max-w-sm w-full mx-2 p-5 relative">
                <div className={`${loading && "hidden"}`}>
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
                                className="text-white border bg-brown rounded-2xl p-3"
                                onClick={() => change(item)}
                            >
                                {addComa(item)}
                            </button>
                        ))}
                    </div>
                    <button
                        className="w-full mt-2 border rounded-2xl p-3 bg-blue-500"
                        onClick={process}
                    >
                        Lakukan Pembayaran
                    </button>
                </div>
                <div
                    className={`${!loading ? "hidden" : "flex items-center justify-center h-96"}`}
                >
                    Loading ...
                </div>
            </div>
        </div>
    );
};
export default ModalPayment;
