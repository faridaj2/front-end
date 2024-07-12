import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { NextUIProvider } from "@nextui-org/react";

// Component
import Home from './page/home/Home';
import Dashboard from './page/dashboard/Dashboard';
import Informasi from './page/dashboard/Informasi';
import Tagihan from './page/dashboard/Tagihan';
import DetailTagihan from './page/dashboard/DetailTagihan';
import UangSaku from './page/uangsaku/UangSaku';
import Poin from './page/keamanan/Poin';
import Riwayat from './page/keamanan/Riwayat';


function App() {

  return (
    <NextUIProvider>
      <Router>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/home' element={<Dashboard />} />
          <Route exact path='/informasi' element={<Informasi />} />
          <Route exact path='/tagihan' element={<Tagihan />} />
          <Route exact path='/tagihan/:id' element={<DetailTagihan />} />
          <Route exact path='/uang-saku' element={<UangSaku />} />
          <Route exact path='/poin' element={<Poin />} />
          <Route exact path='/riwayat' element={<Riwayat />} />
        </Routes>
      </Router>
    </NextUIProvider>
  )
}

export default App
