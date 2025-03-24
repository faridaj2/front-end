/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// Component
import Scroll from "../../components/Scroll";
import DashboardTemplate from "../../components/DashboardTemplate";
import { easeInOut, motion } from "framer-motion";
import Title from "../../components/Title";

// Icon
// import { FcMoneyTransfer } from "react-icons/fc"
// import { FcPrevious } from "react-icons/fc"
import BillIcon from "../../icon/menu/BillIcon";

// Utilitas
import AuthUser from "../../utils/AuthUser";
import { Spinner } from "@nextui-org/react";

function Tagihan() {
    const navigate = useNavigate();
    const { http } = new AuthUser();
    const [tagihan, setTagihan] = useState([]);
    const [done, setDone] = useState([]);

    const [open, setOpen] = useState(false);

    useEffect(() => {
        getTagihan();
    }, []);

    const getTagihan = () => {
        http.get("/api/user/get-user-tagihan")
            .then((res) => {
                const data = res.data.pembayaran;
                setTagihan(Object.values(data));
                const done = res.data.done;
                setDone(Object.values(done));
            })
            .catch((error) => console.log(error));
    };
    return (
        <DashboardTemplate>
            <Scroll>
                {/* <div className='font-bold text-violet-800'>
                    Tagihan Aktif
                </div> */}
                <div className="text-white py-2">Tagihan Aktif</div>

                <div className="mt-4">
                    {tagihan ? (
                        tagihan.map((data) => (
                            <div
                                className="flex gap-2 bg-brown rounded-2xl p-3 cursor-pointer"
                                key={data.id}
                                onClick={() => navigate(`/tagihan/${data.id}`)}
                            >
                                <div className="text-2xl p-2 rounded shadow shadow-green-700/10 group-hover:-translate-y-2 group-hover:shadow-lg transition-all">
                                    <BillIcon />
                                </div>
                                <div className="group-hover:scale-105 transition-all group-hover:-translate-y-2">
                                    <div className="text-green-700 font-semibold truncate max-w-64">
                                        {data.payment_name}
                                    </div>
                                    <div className="text-tiny text-gray-500 truncate max-w-64">
                                        Berlaku -{" "}
                                        {data.bulanan ? "Bulanan" : "Kontan"}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="flex justify-center">
                            <Spinner />
                        </div>
                    )}
                    {tagihan && tagihan.length === 0 && (
                        <div className="w-full text-tiny text-white text-center">
                            Tidak ada tagihan
                        </div>
                    )}
                    <div
                        className="font-bold my-5 text-violet-800 flex justify-between items-center cursor-pointer"
                        onClick={() => setOpen(!open)}
                    >
                        <div className="text-white py-2 flex justify-between w-full">
                            Riwayat Tagihan
                            <span
                                className={`transition-all ${open && "rotate-180"}`}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    class="lucide lucide-chevron-down"
                                >
                                    <path d="m6 9 6 6 6-6" />
                                </svg>
                            </span>
                        </div>
                        {/* <motion.div
                            initial={{ rotate: 0 }}
                            animate={{ rotate: open ? 180 : 0 }}
                            transition={{ duration: 0.2, ease: easeInOut }}
                        >
                            <FcPrevious className='rotate-90' />
                        </motion.div> */}
                    </div>
                    <motion.div
                        initial={open ? { height: "auto" } : { height: 0 }}
                        animate={open ? { height: "auto" } : { height: 0 }}
                        transition={{ duration: 0.2, ease: easeInOut }}
                        style={{ overflow: "hidden" }}
                    >
                        {done &&
                            done.map((data) => (
                                <div
                                    className="flex gap-2 cursor-pointer mb-2 bg-brown rounded-2xl p-2"
                                    key={data.id}
                                    onClick={() =>
                                        navigate(`/tagihan/${data.id}`)
                                    }
                                >
                                    <div className="text-2xl p-2 rounded shadow shadow-green-700/10 group-hover:-translate-y-2 group-hover:shadow-lg transition-all">
                                        <BillIcon />
                                    </div>
                                    <div className="group-hover:scale-105 transition-all group-hover:-translate-y-2">
                                        <div className="text-green-700 font-semibold truncate max-w-64">
                                            {data.payment_name}
                                        </div>
                                        <div className="text-tiny text-gray-500 truncate max-w-64">
                                            Lunas -{" "}
                                            {data.bulanan
                                                ? "Bulanan"
                                                : "Kontan"}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        {done && done.length === 0 && (
                            <div className="w-full text-tiny text-center">
                                Tidak ada riwayat tagihan
                            </div>
                        )}
                    </motion.div>
                </div>
            </Scroll>
        </DashboardTemplate>
    );
}

export default Tagihan;
