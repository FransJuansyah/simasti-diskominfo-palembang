import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Aset from './pages/Aset'
import { Peminjaman } from './pages/Peminjaman'
import Maintenance from './pages/Maintenance'
import Users from './pages/Users'
import Laporan from './pages/Laporan'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route element={<Layout />}>
          <Route path="/dashboard"   element={<Dashboard />} />
          <Route path="/aset"        element={<Aset />} />
          <Route path="/peminjaman"  element={<Peminjaman />} />
          <Route path="/maintenance" element={<Maintenance />} />
          <Route path="/users"       element={<Users />} />
          <Route path="/laporan"     element={<Laporan />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
