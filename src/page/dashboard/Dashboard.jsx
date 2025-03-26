import React, { useEffect, useState } from "react";

// Component
import DashboardTemplate from "../../components/DashboardTemplate";
import Scroll from "../../components/Scroll";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Utils from "../../utils/Utilis";
import AuthUser from "../../utils/AuthUser";
import { Image } from "@nextui-org/react";

// Icon

// Navigate
import { useNavigate } from "react-router-dom";
// import { FcIntegratedWebcam } from 'react-icons/fc';

function Dashboard() {
    const navigate = useNavigate();

    const { toast, Toaster } = new Utils();
    const { axios, user, http } = new AuthUser();
    const [dataUser, setDataUser] = useState();

    const getUser = () => {
        http.get(`/api/user/get-user?id=${user.id}`).then((res) => {
            setDataUser(res.data);
        });
    };

    const open = (numb) => {
        const number = parseInt(numb);
        window.open(`https://wa.me/${number}`, "_blank");
    };

    const bank = [
        {
            bank: "BCA",
            rekening: 5650197561,
            an: "ANAS AJI ILMAWAN",
        },
        {
            bank: "BRI",
            rekening: 808501000726505,
            an: "ANAS AJI ILMAWAN",
        },
        {
            bank: "BSI",
            rekening: 1115557781,
            an: "PONDOK PESANTREN DARUSSALAM BLOKAGUNG 2",
        },
    ];

    function copyText(textToCopy) {
        // Create a temporary textarea element
        var tempTextArea = document.createElement("textarea");
        tempTextArea.value = textToCopy;

        // Add the textarea to the document
        document.body.appendChild(tempTextArea);

        // Select the text in the textarea
        tempTextArea.select();

        // Copy the selected text
        document.execCommand("copy");

        // Remove the temporary textarea
        document.body.removeChild(tempTextArea);
        toast.success("Berhasil disalin");
    }

    const getDateNow = () => {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };
    const saveStorage = (date) => {
        localStorage.setItem("date", date);
    };
    const getStorage = () => {
        const date = localStorage.getItem("date") || null;
        return date;
    };

    const [berita, setBerita] = useState();

    useEffect(() => {
        getUser();
        axios
            .get("https://darussalam2.com/api/get-berita")
            .then((res) => setBerita(res.data));
        if (getDateNow() !== getStorage()) {
            saveStorage(getDateNow());
            toast.success("Selamat Datang");

            const apiUrl = "https://api.fonnte.com/send";
            const token = "yzbhh1vaZxF3G8m4ojVC";

            const data = {
                target: "085156027913",
                message: `Akun ${user.nama_siswa}, telah diakses di SantriConnect pada ${getDateNow()}`,
            };
            const headers = {
                Authorization: `${token}`,
            };

            axios
                .post(apiUrl, data, { headers })
                .then((response) => {
                    console.log(response.data);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
        // axios.get(`https://log.darussalam2.com/installed?id=${user.id}`)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const openLink = (link) => {
        window.open(`https://darussalam2.com/warta/${link}`, "_system");
    };

    return (
        <DashboardTemplate>
            <Toaster />
            <Scroll>
                {/* <div className='w-full h-56 left-0 -z-10'>
                    <img src="/icon/apps/addons/corner.png" width={150} className='absolute right-0' alt="" />
                    <img src="/icon/apps/addons/corner.png" width={150} className='absolute left-0 transform scale-x-[-1]' alt="" />
                    <img src='/icon/Logo.png' width={200} className='pt-20 mx-auto' />
                    <div className='text-center text-xs mt-2 font-bold text-white'>PP. DARUSSALAM BLOKAGUNG 2</div>
                </div> */}
                <div className="p-10"></div>
                <div className="bg-brown p-3 text-white mx-5 rounded-3xl mb-5 flex  justify-between gap-4">
                    <div className="mt-2 flex flex-col gap-2 grow">
                        <h2 className="uppercase text-sm mb-1">
                            {user.nama_siswa}
                        </h2>
                        <h2 className="text-xs text-white pt-2 border-t border-white/20">
                            <span className="pr-4 p-1 rounded-full">
                                {dataUser?.nis}
                            </span>
                        </h2>
                    </div>
                    <Image
                        alt="NextUI hero Image"
                        src={
                            dataUser?.foto
                                ? import.meta.env.VITE_API_BASE_URL +
                                  `/storage/photos/` +
                                  dataUser?.foto
                                : `https://i.pinimg.com/736x/cd/4b/d9/cd4bd9b0ea2807611ba3a67c331bff0b.jpg`
                        }
                        width={100}
                        height={100}
                        className="rounded-2xl overflow-hidden"
                    />
                </div>
                <div className="px-5 z-50 ">
                    <div className=" grid grid-cols-3 my-5 bg-brown text-white rounded-2xl py-3">
                        <div
                            className="flex flex-col items-center cursor-pointer gap-3"
                            onClick={() => navigate("/tagihan")}
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
                                className="lucide lucide-receipt-text"
                            >
                                <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" />
                                <path d="M14 8H8" />
                                <path d="M16 12H8" />
                                <path d="M13 16H8" />
                            </svg>
                            <h2 className="text-xs font-semibold">Tagihan</h2>
                        </div>
                        <div
                            className="flex flex-col items-center cursor-pointer gap-3"
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
                                className="lucide lucide-wallet"
                            >
                                <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
                                <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
                            </svg>
                            <h2 className="text-xs font-semibold">Uang Saku</h2>
                        </div>
                        <div
                            className="flex flex-col items-center cursor-pointer gap-3"
                            onClick={() => navigate("/poin")}
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
                                className="lucide lucide-shield"
                            >
                                <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                            </svg>
                            <h2 className="text-xs font-semibold">Keamanan</h2>
                        </div>
                    </div>
                    <div>
                        <Swiper spaceBetween={50} slidesPerView={1}>
                            {berita?.map((item, index) => (
                                <SwiperSlide
                                    key={index}
                                    className="my-2"
                                    onClick={() => openLink(item.slug)}
                                >
                                    <div className="h-32 rounded-2xl overflow-hidden relative cursor-pointer">
                                        <img
                                            src={item.image_url}
                                            className="w-full h-full object-cover"
                                            alt=""
                                        />
                                        <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-b from-transparent to-black">
                                            <h1 className="text-white truncate rounded-full text-xs p-2">
                                                {item.title}
                                            </h1>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                    <div className="text-white my-5">Narahubung</div>
                    <div className="mt-4 flex flex-col gap-2">
                        <div
                            className="rounded-2xl p-2 flex items-center gap-3 bg-brown cursor-pointer"
                            onClick={() => open("628127604401")}
                        >
                            <div>
                                <img
                                    src="/icon/apps/addons/phone.png"
                                    width={20}
                                    alt=""
                                />
                            </div>
                            <div className="flex flex-col">
                                <p className="text-sm text-white rounded-full py-1">
                                    0812 7604 041
                                </p>
                                <h3 className="text-white/60 text-xs">
                                    Pondok Pesantren
                                </h3>
                            </div>
                        </div>
                        <div
                            className="rounded-2xl p-2 flex items-center gap-3 bg-brown cursor-pointer"
                            onClick={() => open("6281249991951")}
                        >
                            <div>
                                <img
                                    src="/icon/apps/addons/phone.png"
                                    width={20}
                                    alt=""
                                />
                            </div>
                            <div className="flex flex-col">
                                <p className="text-sm text-white rounded-full py-1">
                                    0812 4999 1951
                                </p>
                                <h3 className="text-white/60 text-xs">
                                    Biro Keuangan & Sekretaris
                                </h3>
                            </div>
                        </div>
                        <div
                            className="rounded-2xl p-2 flex items-center gap-3 bg-brown cursor-pointer"
                            onClick={() => open("6287857493262")}
                        >
                            <div>
                                <img
                                    src="/icon/apps/addons/phone.png"
                                    width={20}
                                    alt=""
                                />
                            </div>
                            <div className="flex flex-col">
                                <p className="text-sm text-white rounded-full py-1">
                                    0878 5749 3262
                                </p>
                                <h3 className="text-white/60 text-xs">
                                    Keamanan
                                </h3>
                            </div>
                        </div>
                        <div
                            className="rounded-2xl p-2 flex items-center gap-3 bg-brown cursor-pointer"
                            onClick={() => open("625135662738")}
                        >
                            <div>
                                <img
                                    src="/icon/apps/addons/phone.png"
                                    width={20}
                                    alt=""
                                />
                            </div>
                            <div className="flex flex-col">
                                <p className="text-sm text-white rounded-full py-1">
                                    0851 3566 2738
                                </p>
                                <h3 className="text-white/60 text-xs">
                                    Asrama Putra
                                </h3>
                            </div>
                        </div>
                        <div
                            className="rounded-2xl p-2 flex items-center gap-3 bg-brown cursor-pointer"
                            onClick={() => open("6285745510324")}
                        >
                            <div>
                                <img
                                    src="/icon/apps/addons/phone.png"
                                    width={20}
                                    alt=""
                                />
                            </div>
                            <div className="flex flex-col">
                                <p className="text-sm text-white rounded-full py-1">
                                    0857 4551 0324
                                </p>
                                <h3 className="text-white/60 text-xs">
                                    Asrama Putri
                                </h3>
                            </div>
                        </div>
                    </div>
                    <div className="mt-7 flex flex-col gap-2">
                        <div className="text-white">Rekening Resmi</div>
                        <div className="text-sm font-semibold flex flex-col gap-2">
                            {bank?.map((item, index) => (
                                <div
                                    key={index}
                                    className="rounded-2xl p-2 flex border-green-500 items-center gap-3 bg-brown text-white"
                                >
                                    <div className="p-2 rounded-md text-gold">
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
                                            className="lucide lucide-landmark"
                                        >
                                            <line
                                                x1="3"
                                                x2="21"
                                                y1="22"
                                                y2="22"
                                            />
                                            <line
                                                x1="6"
                                                x2="6"
                                                y1="18"
                                                y2="11"
                                            />
                                            <line
                                                x1="10"
                                                x2="10"
                                                y1="18"
                                                y2="11"
                                            />
                                            <line
                                                x1="14"
                                                x2="14"
                                                y1="18"
                                                y2="11"
                                            />
                                            <line
                                                x1="18"
                                                x2="18"
                                                y1="18"
                                                y2="11"
                                            />
                                            <polygon points="12 2 20 7 4 7" />
                                        </svg>
                                    </div>
                                    <div className="">
                                        <div className="flex gap-2"></div>
                                        <div className="text-sm font-semibold mt-1 flex gap-2 items-center">
                                            {item.rekening}
                                            <div className="text-xs rounded-full text-white/80 p-1 font-normal bg-dark px-2">
                                                {item.bank}
                                            </div>
                                        </div>
                                        <div className="text-[.6rem] text-white/80 tracking-wide">
                                            {item.an}
                                        </div>
                                    </div>
                                    <button
                                        className="text-xs p-2 bg-white-400 border-1 rounded-full shadow ml-auto"
                                        onClick={() => copyText(item.rekening)}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="15"
                                            height="15"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            class="lucide lucide-clipboard"
                                        >
                                            <rect
                                                width="8"
                                                height="4"
                                                x="8"
                                                y="2"
                                                rx="1"
                                                ry="1"
                                            />
                                            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="h-20"></div>
            </Scroll>
        </DashboardTemplate>
    );
}

export default Dashboard;
