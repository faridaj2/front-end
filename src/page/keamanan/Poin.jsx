/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import DashboardTemplate from "../../components/DashboardTemplate";
import { Chip, Divider, Pagination, Spinner } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
// Utilitas
import AuthUser from "../../utils/AuthUser";

function Poin() {
    const navigate = useNavigate();
    const { http, user } = new AuthUser();

    // Data
    const [data, setData] = useState();
    const [poin, setPoin] = useState();
    // Change Pagination
    const [page, setPage] = useState(1);

    // Useeffect
    useEffect(() => {
        getPelanggar();
    }, []);
    useEffect(() => {
        getPelanggar();
    }, [page]);

    // Fungsi
    const getPelanggar = () => {
        http.get(`/api/user/pelanggar/${user.id}?page=${page}`).then((res) => {
            const d = res.data;
            setData(d.poinPelanggaran);
            setPoin(d.poin);
        });
    };

    return (
        <DashboardTemplate>
            <div className="text-white flex justify-between bg-brown mx-3 p-5 rounded-2xl text-2xl">
                <div>Poin</div>
                <div className="flex gap-1 items-center">
                    {poin ? poin : 0}
                    <span className="bg-white/30 rounded-full text-white p-2">
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
                            class="lucide lucide-shield"
                        >
                            <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                        </svg>
                    </span>
                </div>
            </div>
            <div className="mt-3 px-4 mx-1">
                <div className="flex justify-between my-5">
                    <div className="font-bold text-green-700">Pelanggaran</div>
                    <div
                        className="text-green-700 text-xs cursor-pointer"
                        onClick={() => navigate("/riwayat")}
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
                            class="lucide lucide-history"
                        >
                            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                            <path d="M3 3v5h5" />
                            <path d="M12 7v5l4 2" />
                        </svg>
                    </div>
                </div>
                <div className="mt-2 flex flex-col gap-2">
                    {data ? (
                        data.data?.map((item) => (
                            <div
                                className="bg-brown text-white p-4 rounded-2xl"
                                key={item.id}
                            >
                                <div className="flex justify-between items-center">
                                    <div className="">{item.pelanggaran}</div>
                                    <div className="">
                                        {item.poin_pelanggaran}
                                    </div>
                                </div>
                                <div className="text-xs text-white/50 mt-1">
                                    {item.tanggal}
                                </div>
                            </div>
                        ))
                    ) : (
                        <Spinner />
                    )}
                </div>
                <div className="flex justify-center my-2">
                    {data && data.last_page > 1 && (
                        <Pagination
                            total={data.last_page}
                            page={page}
                            onChange={(e) => setPage(e)}
                        />
                    )}
                </div>
            </div>
        </DashboardTemplate>
    );
}

export default Poin;
