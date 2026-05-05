import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { Grid, Package, RefreshCw, Wrench, Users, BarChart2, LogOut, Bell, ChevronRight } from 'lucide-react'

const nav = [
  { path:'/dashboard',   label:'Dashboard',      icon:Grid,      sub:'Ringkasan sistem' },
  { path:'/aset',        label:'Data Aset IT',   icon:Package,   sub:'Kelola inventaris' },
  { path:'/peminjaman',  label:'Peminjaman',     icon:RefreshCw, sub:'Pinjam & kembali' },
  { path:'/maintenance', label:'Maintenance',    icon:Wrench,    sub:'Servis & perbaikan' },
  { path:'/users',       label:'Manajemen User', icon:Users,     sub:'Akun & jabatan' },
  { path:'/laporan',     label:'Laporan',        icon:BarChart2, sub:'Export & analisis' },
]

export default function Layout() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return (
    <div style={{ display:'flex', height:'100vh', background:'#F1F5F9', overflow:'hidden' }}>

      {/* SIDEBAR */}
      <aside style={{
        width:240, flexShrink:0, background:'#0F172A',
        display:'flex', flexDirection:'column',
        boxShadow:'4px 0 20px rgba(0,0,0,0.15)',
      }}>
        {/* Brand */}
        <div style={{ padding:'16px 18px 14px', borderBottom:'1px solid rgba(255,255,255,0.07)' }}>
          {/* Logo + Title */}
          <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:10 }}>
            <div style={{ width:42, height:42, borderRadius:10, overflow:'hidden', flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center' }}>
              <img
                src="/kominfo_logo.png"
                alt="Logo Kominfo"
                style={{ width:42, height:42, objectFit:'cover',  }}
              />
            </div>
            <div>
              <p style={{ fontSize:14, fontWeight:800, color:'#fff', letterSpacing:'-0.2px' }}>SIMASTI</p>
              <p style={{ fontSize:10, color:'rgba(255,255,255,0.4)', fontWeight:500, marginTop:1 }}>v1.0.0 · Feb 2022</p>
            </div>
          </div>
          <div style={{ background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:8, padding:'8px 10px' }}>
            <p style={{ fontSize:10, fontWeight:700, color:'rgba(255,255,255,0.35)', letterSpacing:'0.06em', textTransform:'uppercase', marginBottom:2 }}>Instansi</p>
            <p style={{ fontSize:11, fontWeight:700, color:'rgba(255,255,255,0.75)', lineHeight:1.4 }}>Diskominfo Kota Palembang</p>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex:1, padding:'12px 10px', overflowY:'auto', display:'flex', flexDirection:'column', gap:2 }}>
          <p style={{ fontSize:9, fontWeight:700, color:'rgba(255,255,255,0.25)', letterSpacing:'0.1em', textTransform:'uppercase', padding:'8px 8px 4px' }}>Menu Utama</p>
          {nav.map(({ path, label, icon:Icon, sub }) => {
            const active = pathname === path
            return (
              <div key={path} onClick={() => navigate(path)} style={{
                display:'flex', alignItems:'center', gap:10, padding:'10px 10px',
                borderRadius:8, cursor:'pointer', transition:'all 0.15s',
                background: active ? 'rgba(59,130,246,0.15)' : 'transparent',
                borderLeft: active ? '3px solid #3B82F6' : '3px solid transparent',
              }}
                onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'rgba(255,255,255,0.05)' }}
                onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent' }}
              >
                <div style={{ width:30, height:30, borderRadius:7, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, background: active ? 'rgba(59,130,246,0.2)' : 'rgba(255,255,255,0.06)' }}>
                  <Icon size={15} color={active ? '#60A5FA' : 'rgba(255,255,255,0.4)'} />
                </div>
                <div style={{ flex:1 }}>
                  <p style={{ fontSize:13, fontWeight: active ? 700 : 500, color: active ? '#fff' : 'rgba(255,255,255,0.55)', lineHeight:1 }}>{label}</p>
                  <p style={{ fontSize:10, color:'rgba(255,255,255,0.25)', marginTop:2, fontWeight:400 }}>{sub}</p>
                </div>
                {active && <ChevronRight size={12} color="rgba(255,255,255,0.3)" />}
              </div>
            )
          })}
        </nav>

        {/* Footer */}
        <div style={{ padding:'12px 10px', borderTop:'1px solid rgba(255,255,255,0.07)' }}>
          <div style={{ display:'flex', alignItems:'center', gap:10, padding:'8px 10px', borderRadius:8, marginBottom:4 }}>
            <div style={{ width:32, height:32, borderRadius:'50%', background:'linear-gradient(135deg,#1E40AF,#0EA5E9)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:800, color:'#fff', flexShrink:0 }}>AF</div>
            <div style={{ flex:1 }}>
              <p style={{ fontSize:12, fontWeight:700, color:'rgba(255,255,255,0.85)' }}>Ahmad Fauzi</p>
              <p style={{ fontSize:10, color:'rgba(255,255,255,0.3)', marginTop:1 }}>Administrator</p>
            </div>
          </div>
          <div onClick={() => navigate('/login')} style={{
            display:'flex', alignItems:'center', gap:8, padding:'8px 10px', borderRadius:8, cursor:'pointer',
            color:'rgba(255,255,255,0.3)', fontSize:12, fontWeight:600, transition:'all 0.15s',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.1)'; e.currentTarget.style.color = '#f87171' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.3)' }}
          >
            <LogOut size={14} /> Keluar
          </div>
        </div>
      </aside>

      {/* TOPBAR + CONTENT */}
      <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>
        {/* Topbar */}
        <header style={{ background:'#fff', borderBottom:'1px solid #E2E8F0', padding:'0 24px', height:56, display:'flex', alignItems:'center', justifyContent:'space-between', flexShrink:0, boxShadow:'0 1px 3px rgba(0,0,0,0.04)' }}>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            {/* Mini logo di topbar */}
            <div style={{ width:30, height:30, borderRadius:6, overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
              <img src="/kominfo_logo.png" alt="Kominfo" style={{ width:30, height:30, objectFit:'cover',  }} />
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:6, fontSize:13, color:'#64748B' }}>
              <span style={{ fontWeight:500 }}>SIMASTI</span>
              <span>›</span>
              <span style={{ fontWeight:700, color:'#1E40AF' }}>
                {nav.find(n => n.path === pathname)?.label || 'Dashboard'}
              </span>
            </div>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <div style={{ fontSize:12, fontWeight:600, color:'#64748B', background:'#F1F5F9', padding:'5px 12px', borderRadius:99, border:'1px solid #E2E8F0' }}>
              Selasa, 05 April 2022
            </div>
            <div style={{ position:'relative' }}>
              <div style={{ width:34, height:34, borderRadius:8, background:'#F1F5F9', border:'1px solid #E2E8F0', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}>
                <Bell size={15} color="#64748B" />
              </div>
              <div style={{ position:'absolute', top:-2, right:-2, width:14, height:14, background:'#DC2626', borderRadius:'50%', border:'2px solid #fff', fontSize:8, fontWeight:800, color:'#fff', display:'flex', alignItems:'center', justifyContent:'center' }}>3</div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main style={{ flex:1, overflowY:'auto', padding:'24px' }}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
