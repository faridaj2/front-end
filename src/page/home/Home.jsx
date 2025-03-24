/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Template from "../../components/Template";

import { Button, DatePicker, Image, Input } from "@nextui-org/react";

import Utils from "../../utils/Utilis";
import AuthUser from "../../utils/AuthUser";
import { useNavigate } from "react-router-dom";

import { I18nProvider } from "@react-aria/i18n";

function Home() {
    const [nis, setNis] = useState();
    const [dob, setDob] = useState();

    const navigate = useNavigate();

    const { getDate, toast, Toaster } = new Utils();
    const { saveUser, user, axios } = new AuthUser();

    useEffect(() => {
        if (user) {
            console.log(user);
            navigate("/home");
        }
    }, []);

    const submitHandler = async (e) => {
        e.preventDefault();
        let idToast = null;
        if (!dob) return toast("Tanggal Lahir Tidak Boleh Kosong");
        if (!nis) return toast("NIS Tidak Boleh Kosong");
        const data = {
            nis: nis,
            dob: getDate(dob),
        };
        try {
            idToast = toast.loading("Silahkan Tunggu.");
            const response = await axios.post("/api/user/login", data);
            saveUser(response.data);
            if (response) {
                toast.success("Anda akan dialihkan", { id: idToast });
                navigate("/home");
            }
        } catch (error) {
            toast.error("Terjadi kesalahan", { id: idToast });
            console.log(error);
        }
    };

    return (
        <Template>
            <Toaster />
            <div className="flex items-end justify-center w-full h-screen">
                <div className="absolute w-full h-full bg-black">
                    <img src="/image/login/santri.jpg" className="w-full h-full object-cover opacity-50" alt="" />
                </div>
                {/* Center */}
                <div className="w-full max-w-sm relative">
                    <div className="flex justify-center flex-col items-center mb-10">
                        <Image src="/icon/android-chrome-512x512.png" width={100} />
                        <h1 className="font-bold mt-2 text-4xl text-center text-white uppercase">
                            PP. Darussalam Blokagung 2
                        </h1>
                        {/* <p className='text-white'>Text</p> */}
                    </div>
                    <div className="px-10">
                        {/* <div className='w-full max-w-sm object-fill object-center h-56 rounded-xl relative'>
                            <motion.div
                                className='absolute'
                                animate={{ y: [140, 120, 140], x: [-10, -10, -10], transition: { duration: 2.5, repeat: Infinity } }}
                            >
                                <Chip color='primary' variant='dot' className='backdrop-blur-md'>Cek Pembayaran</Chip>
                            </motion.div>
                            <motion.div
                                className='absolute'
                                initial={{ y: 100 }}
                                animate={{ y: [100, 80, 100], x: ['140%', '140%', '140%'], transition: { delay: .5, duration: 2.5, repeat: Infinity } }}
                            >
                                <Chip color='primary' variant='dot' className='backdrop-blur-md'>Cek Siswa</Chip>
                            </motion.div>
                            <img src="splash.png" alt="" className='w-full h-full' />
                        </div> */}
                    </div>
                    <div className="bg-white pt-5 pb-20 mb-2 rounded-2xl mx-2">
                        <form className="flex flex-col gap-2 px-5" onSubmit={submitHandler}>
                            <Input
                                type="number"
                                variant="bordered"
                                className="shadow-md shadow-green-700/20 rounded-xl"
                                placeholder="Masukkan NIS Santri"
                                aria-label="Input"
                                value={nis}
                                onValueChange={setNis}
                            />
                            <I18nProvider locale="id-ID">
                                <DatePicker
                                    variant="bordered"
                                    className="shadow-md shadow-green-700/20 rounded-xl"
                                    aria-label="Date Picker"
                                    value={dob}
                                    onChange={setDob}
                                    showMonthAndYearPickers
                                />
                            </I18nProvider>
                            <Button color="primary" variant="shadow" type="submit">
                                Masuk
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </Template>
    );
}

export default Home;
