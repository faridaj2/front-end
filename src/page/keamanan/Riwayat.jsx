/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import DashboardTemplate from "../../components/DashboardTemplate";
import AuthUser from "../../utils/AuthUser";
import { Chip, Divider, Pagination, Spinner } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
function Riwayat() {
    const navigate = useNavigate();
    const { user, http } = new AuthUser();
    const [data, setData] = useState();
    const [page, setPage] = useState(1);

    useEffect(() => {
        getRiwayat();
    }, []);
    useEffect(() => {
        getRiwayat();
    }, [page]);

    const getRiwayat = () => {
        http.get(`/api/user/riwayat/${user.id}?page=${page}`).then((res) => {
            const d = res.data;
            setData(d.poinPelanggaran);
        });
    };

    return (
        <DashboardTemplate>
            <div className="">
                <div className="mx-3">
                    <div className="flex justify-between py-3">
                        <div className="font-bold text-green-700">
                            Riwayat Pelanggaran
                        </div>
                        <div
                            className="cursor-pointer text-sm text-green-500"
                            onClick={() => navigate("/poin")}
                        >
                            Kembali
                        </div>
                    </div>
                    <div className="mt-2 flex flex-col gap-2">
                        {data ? (
                            data.data?.map((item) => (
                                <div
                                    className="p-3 rounded-xl shadow-md shadow-violet-700/10 bg-brown text-white"
                                    key={item.id}
                                >
                                    <div className="flex justify-between items-center">
                                        <div className="text-tiny text-gray-500">
                                            Pelanggaran
                                        </div>
                                        <div className="text-xs">
                                            {item.tanggal}
                                        </div>
                                    </div>
                                    <div className="mt-2">
                                        {item.pelanggaran}
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
            </div>
        </DashboardTemplate>
    );
}

export default Riwayat;
