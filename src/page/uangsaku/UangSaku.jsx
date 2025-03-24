/* eslint-disable react-hooks/exhaustive-deps */
import { Chip, Select, SelectItem } from "@nextui-org/react";
import DashboardTemplate from "../../components/DashboardTemplate";
import AuthUser from "../../utils/AuthUser";
import Utils from "../../utils/Utilis";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ModalPayment from "../../components/ModalPayment";
import { useNavigate } from "react-router-dom";
function UangSaku() {
    const navigate = useNavigate();
    const { http, user } = new AuthUser();
    const { addComa } = new Utils();

    // Var
    const [money, setMoney] = useState();
    const [month, setMonth] = useState();
    const [selected, setSelected] = useState(); //Bulan yang terpilih
    const [riwayat, setRiwayat] = useState();
    const [modalP, setModalP] = useState(false);

    // Use Effect
    useEffect(() => {
        getMonth();
        getTotal();
    }, []);
    const [first, setFirst] = useState(false);
    useEffect(() => {
        if (!month || month.length === 0) return;
        if (first) return;
        setFirst(true);
        setSelected(month[0].value);
    }, [month]);
    useEffect(() => {
        if (!selected) return;
        getRiwayat();
        console.log(riwayat);
    }, [selected]);

    const openPayment = () => {
        setModalP(true);
    };

    // Fung
    const getRiwayat = () => {
        http.get(`/api/user/get-riwayat?id=${user.id}&date=${selected}`).then(
            (res) => setRiwayat(res.data),
        );
    };
    const getMonth = () => {
        http.get(`/api/user/get-month?id=${user.id}`).then((res) => {
            setMonth(res.data);
        });
    };
    const getTotal = () => {
        http.get(`/api/user/get-user?id=${user.id}`).then((res) =>
            setMoney(res.data.uang_saku),
        );
    };
    return (
        <DashboardTemplate>
            <div className="h-full">
                <div className="h-2"></div>
                <div className="text-white bg-brown mx-4 text-center text-2xl mb-2 p-5 rounded-2xl">
                    Rp. {money ? addComa(money) : 0}
                </div>
                {/*<div className="flex px-5">
                    <button
                        type="button"
                        onClick={openPayment}
                        className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                    >
                        Isi Saldo
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate("/riwayat-top-up")}
                        className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                    >
                        Riwayat
                    </button>
                </div>*/}
                <div className="flex justify-between text-white items-center p-4 rounded-xl ">
                    <span>Riwayat</span>
                    <div className="w-1/2">
                        <Select
                            classNames="rounded-xl bg-black"
                            color="primary"
                            size="sm"
                            variant="underlined"
                            radius="lg"
                            label="Pilih bulan"
                            selectedKeys={[selected]}
                            onChange={(e) => setSelected(e.target.value)}
                        >
                            {month &&
                                month?.map((item) => (
                                    <SelectItem
                                        key={item.value}
                                        value={item.value}
                                    >
                                        {item.month_year}
                                    </SelectItem>
                                ))}
                        </Select>
                    </div>
                </div>
                <div className="flex flex-col mt-2 gap-2 px-2">
                    <AnimatePresence>
                        {riwayat?.map((item) => (
                            <motion.div
                                key={item.id}
                                className="text-white bg-brown rounded-2xl p-4"
                                initial={{ y: 10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -50, opacity: 0 }}
                            >
                                <div className="flex justify-between transition-all items-center">
                                    <div className="text-tiny">{item.date}</div>
                                    <div
                                        className={`${item.jenis == "masuk" ? "text-yellow-300" : "text-red-500"}`}
                                    >
                                        {`${item.jenis == "masuk" ? "+" : "-"}`}
                                        Rp. {addComa(item.uang)}
                                    </div>
                                </div>
                                <div className="text-white/50">
                                    {item.keterangan}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
            {modalP && <ModalPayment close={setModalP} />}
        </DashboardTemplate>
    );
}

export default UangSaku;
