/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import DashboardTemplate from "../../components/DashboardTemplate";
import AuthUser from "../../utils/AuthUser";
import { Image } from "@nextui-org/react";

import Scroll from "../../components/Scroll";
function Informasi() {
  const { user, http } = new AuthUser();
  const [data, setData] = useState();

  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    http.get(`/api/user/get-user?id=${user.id}`).then((res) => {
      setData(res.data);
    });
  };
  return (
    <DashboardTemplate>
      <Scroll>
        <div className="h-3"> </div>
        <div className="p-2 bg-brown shadow shadow-green-500/30 rounded-2xl mx-2 mb-2">
          <div className="flex items-center">
            <Image
              src={
                data?.foto
                  ? import.meta.env.VITE_API_BASE_URL +
                    `/storage/photos/` +
                    data?.foto
                  : `https://i.pinimg.com/736x/cd/4b/d9/cd4bd9b0ea2807611ba3a67c331bff0b.jpg`
              }
            />
          </div>
          <div className="mt-2 px-2 text-white">
            <div className="flex justify-between items-center ">
              <div className=" font-light">Nama</div>
              <div className="font-medium text-right">{data?.nama_siswa}</div>
            </div>
            <div className="flex justify-between items-center">
              <div className=" font-light">NIS</div>
              <div className="font-medium text-right">{data?.nis}</div>
            </div>
            <div className="flex justify-between items-center">
              <div className=" font-light">NIK</div>
              <div className="font-medium text-right">{data?.NIK}</div>
            </div>
            <div className="flex justify-between items-center">
              <div className=" font-light">NISN</div>
              <div className="font-medium text-right">{data?.NISN}</div>
            </div>
            <div className="flex justify-between items-center">
              <div className=" font-light">KK</div>
              <div className="font-medium text-right">{data?.KK}</div>
            </div>
            <div className="flex justify-between items-center">
              <div className=" font-light">Domisili</div>
              <div className="font-medium text-right">{data?.domisili}</div>
            </div>
            <div className="flex justify-between items-center">
              <div className=" font-light">KIP</div>
              <div className="font-medium text-right">{data?.KIP}</div>
            </div>
          </div>
        </div>
        <div className="p-2 bg-brown shadow shadow-green-500/30 rounded-2xl mx-2 mb-2 text-white">
          <div className="flex justify-between items-center">
            <div className=" font-light">Kelas Formal</div>
            <div className="font-medium text-right">{data?.formal}</div>
          </div>
          <div className="flex justify-between items-center">
            <div className=" font-light">Kelas Diniyah</div>
            <div className="font-medium text-right">{data?.diniyah}</div>
          </div>
          <div className="flex justify-between items-center">
            <div className=" font-light">Tempat Lahir</div>
            <div className="font-medium text-right">{data?.tempat_lahir}</div>
          </div>
          <div className="flex justify-between items-center">
            <div className=" font-light">Tanggal Lahir</div>
            <div className="font-medium text-right">{data?.tgl_lahir}</div>
          </div>
          <div className="flex justify-between items-center">
            <div className=" font-light">Gender</div>
            <div className="font-medium text-right">{data?.kelamin}</div>
          </div>
          <div className="flex justify-between items-center">
            <div className=" font-light">Kamar</div>
            <div className="font-medium text-right">{data?.kamar}</div>
          </div>
          <div className="flex justify-between items-center">
            <div className=" font-light">Asal Sekolah</div>
            <div className="font-medium text-right">{data?.asal_sekolah}</div>
          </div>
        </div>
        <div className="p-2 bg-brown shadow shadow-green-500/30 rounded-2xl mx-2 mb-2 text-white">
          <div className="flex justify-between items-center">
            <div className=" font-light">Nama Ayah</div>
            <div className="font-medium text-right">{data?.nama_ayah}</div>
          </div>
          <div className="flex justify-between items-center">
            <div className=" font-light">No. Ayah</div>
            <div className="font-medium text-right">{data?.nomor_ayah}</div>
          </div>
          <div className="flex justify-between items-center">
            <div className=" font-light">Nama Ibu</div>
            <div className="font-medium text-right">{data?.nama_ibu}</div>
          </div>
          <div className="flex justify-between items-center">
            <div className=" font-light">No. Ibu</div>
            <div className="font-medium text-right">{data?.nomor_ibu}</div>
          </div>
        </div>
        <div className="text-center text-tiny  mt-5 mx-4 text-white pb-10">
          jika terdapat kesalahan data/ketidaksesuaian data, segera hubungi
          Pesantren/Sekretaris
        </div>
      </Scroll>
    </DashboardTemplate>
  );
}

export default Informasi;
