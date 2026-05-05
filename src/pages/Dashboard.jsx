import { Package, AlertCircle, RefreshCw, Wrench, TrendingUp, CheckCircle } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { summaryStats, chartAsetKategori, chartBulanan, asetData, maintenanceData, pinjamanData } from '../data/mockData'

const StatCard = ({ icon:Icon, label, value, sub, color, bg }) => (
  <div className="card fade-up" style={{ padding:'18px 20px', display:'flex', alignItems:'center', gap:16 }}>
    <div style={{ width:48, height:48, borderRadius:12, background:bg, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
      <Icon size={22} color={color} />
    </div>
    <div>
      <p style={{ fontSize:26, fontWeight:800, color:'#0F172A', letterSpacing:'-0.5px', lineHeight:1 }}>{value}</p>
      <p style={{ fontSize:13, fontWeight:600, color:'#64748B', marginTop:3 }}>{label}</p>
      {sub && <p style={{ fontSize:11, color:'#94A3B8', marginTop:2 }}>{sub}</p>}
    </div>
  </div>
)

const TT = ({ active, payload }) => active && payload?.length ? (
  <div style={{ background:'#fff', border:'1px solid #E2E8F0', borderRadius:8, padding:'8px 12px', boxShadow:'0 4px 12px rgba(0,0,0,0.1)' }}>
    <p style={{ fontSize:12, fontWeight:700, color:'#1E40AF' }}>{payload[0].value} unit</p>
  </div>
) : null

export default function Dashboard() {
  const recentAset = asetData.slice(0,5)
  const activeMaint = maintenanceData.filter(m => m.status !== 'Selesai')
  const activePinjam = pinjamanData.filter(p => p.status === 'Dipinjam' || p.status === 'Terlambat')

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:22 }}>
      {/* Header */}
      <div className="fade-up">
        <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between' }}>
          <div>
            <h1 className="section-title">Dashboard Inventaris IT</h1>
            <p className="section-sub">Ringkasan data aset teknologi informasi per 05 April 2022</p>
          </div>
          <div style={{ background:'#EFF6FF', border:'1px solid #BFDBFE', borderRadius:8, padding:'8px 14px', display:'flex', alignItems:'center', gap:6 }}>
            <CheckCircle size={13} color="#1E40AF" />
            <span style={{ fontSize:12, fontWeight:700, color:'#1E40AF' }}>Sistem Aktif</span>
          </div>
        </div>
      </div>

      {/* Stat cards */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:14 }}>
        <StatCard icon={Package}        label="Total Aset IT"     value={summaryStats.totalAset} sub={`Nilai: Rp ${(summaryStats.nilaiTotal/1000000).toFixed(1)} jt`} color="#1E40AF" bg="#EFF6FF" />
        <StatCard icon={CheckCircle}    label="Aset Aktif"        value={summaryStats.aktif}     sub="Siap digunakan"    color="#059669" bg="#ECFDF5" />
        <StatCard icon={RefreshCw} label="Sedang Dipinjam"   value={summaryStats.dipinjam}  sub="Aktif saat ini"   color="#D97706" bg="#FFFBEB" />
        <StatCard icon={Wrench}         label="Dalam Servis"      value={summaryStats.servis}    sub="Proses perbaikan" color="#7C3AED" bg="#F5F3FF" />
      </div>

      {/* Charts row */}
      <div className="delay-2 fade-up" style={{ display:'grid', gridTemplateColumns:'1fr 300px', gap:14 }}>
        {/* Bar chart */}
        <div className="card" style={{ padding:'20px' }}>
          <p style={{ fontSize:13, fontWeight:700, color:'#334155', marginBottom:4 }}>Mutasi Aset per Bulan</p>
          <p style={{ fontSize:11, color:'#94A3B8', marginBottom:16 }}>Okt 2021 – Apr 2022</p>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={chartBulanan} barGap={4}>
              <XAxis dataKey="bulan" tick={{ fill:'#94A3B8', fontSize:10, fontWeight:600 }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip content={<TT />} />
              <Bar dataKey="masuk"  fill="#1E40AF" radius={[4,4,0,0]} name="Masuk" />
              <Bar dataKey="keluar" fill="#CBD5E1" radius={[4,4,0,0]} name="Keluar" />
            </BarChart>
          </ResponsiveContainer>
          <div style={{ display:'flex', gap:16, marginTop:8 }}>
            {[['#1E40AF','Aset Masuk'],['#CBD5E1','Aset Keluar']].map(([c,l])=>(
              <div key={l} style={{ display:'flex', alignItems:'center', gap:6 }}>
                <div style={{ width:10, height:10, borderRadius:3, background:c }} />
                <span style={{ fontSize:11, color:'#94A3B8', fontWeight:500 }}>{l}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pie chart */}
        <div className="card" style={{ padding:'20px' }}>
          <p style={{ fontSize:13, fontWeight:700, color:'#334155', marginBottom:4 }}>Kategori Aset</p>
          <p style={{ fontSize:11, color:'#94A3B8', marginBottom:8 }}>Distribusi per jenis</p>
          <ResponsiveContainer width="100%" height={130}>
            <PieChart>
              <Pie data={chartAsetKategori} cx="50%" cy="50%" innerRadius={35} outerRadius={58} dataKey="total" paddingAngle={3}>
                {chartAsetKategori.map((e,i)=><Cell key={i} fill={e.color} />)}
              </Pie>
              <Tooltip formatter={v=>[`${v} unit`,'Jumlah']} contentStyle={{ fontSize:12, borderRadius:8 }} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display:'flex', flexDirection:'column', gap:5, marginTop:8 }}>
            {chartAsetKategori.map(k=>(
              <div key={k.name} style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                <div style={{ display:'flex', alignItems:'center', gap:6 }}>
                  <div style={{ width:8, height:8, borderRadius:'50%', background:k.color }} />
                  <span style={{ fontSize:11, color:'#64748B', fontWeight:500 }}>{k.name}</span>
                </div>
                <span style={{ fontSize:11, fontWeight:700, color:'#334155' }}>{k.total}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom two panels */}
      <div className="delay-3 fade-up" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
        {/* Peminjaman aktif */}
        <div className="card" style={{ padding:'18px 20px' }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:14 }}>
            <p style={{ fontSize:13, fontWeight:700, color:'#334155' }}>Peminjaman Aktif</p>
            <span className="badge badge-loan">{activePinjam.length} aktif</span>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
            {activePinjam.map(p=>(
              <div key={p.id} style={{ display:'flex', alignItems:'center', gap:10, padding:'10px 12px', background:'#FFFBEB', border:'1px solid #FDE68A', borderRadius:8 }}>
                <RefreshCw size={14} color="#D97706" style={{ flexShrink:0 }} />
                <div style={{ flex:1 }}>
                  <p style={{ fontSize:12, fontWeight:700, color:'#92400E' }}>{p.aset}</p>
                  <p style={{ fontSize:11, color:'#B45309', marginTop:1 }}>{p.peminjam} · Kembali: {p.tglKembali}</p>
                </div>
                <span className={`badge ${p.status==='Terlambat'?'badge-broken':'badge-loan'}`}>{p.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Maintenance aktif */}
        <div className="card" style={{ padding:'18px 20px' }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:14 }}>
            <p style={{ fontSize:13, fontWeight:700, color:'#334155' }}>Maintenance Berjalan</p>
            <span className="badge badge-service">{activeMaint.length} item</span>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
            {activeMaint.map(m=>(
              <div key={m.id} style={{ display:'flex', alignItems:'center', gap:10, padding:'10px 12px', background:'#F5F3FF', border:'1px solid #DDD6FE', borderRadius:8 }}>
                <AlertCircle size={14} color="#7C3AED" style={{ flexShrink:0 }} />
                <div style={{ flex:1 }}>
                  <p style={{ fontSize:12, fontWeight:700, color:'#4C1D95' }}>{m.aset}</p>
                  <p style={{ fontSize:11, color:'#6D28D9', marginTop:1 }}>{m.jenis} · {m.teknisi}</p>
                </div>
                <span className={`badge ${m.status==='Proses'?'badge-progress':'badge-pending'}`}>{m.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent aset */}
      <div className="card delay-4 fade-up">
        <div style={{ padding:'16px 20px', borderBottom:'1px solid #E2E8F0', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <p style={{ fontSize:13, fontWeight:700, color:'#334155' }}>Aset Terbaru Ditambahkan</p>
          <span style={{ fontSize:11, fontWeight:600, color:'#3B82F6', cursor:'pointer' }}>Lihat semua →</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>ID Aset</th><th>Nama Aset</th><th>Kategori</th><th>Lokasi</th><th>Tgl Input</th><th>Status</th>
            </tr>
          </thead>
          <tbody>
            {recentAset.map(a=>(
              <tr key={a.id}>
                <td><code style={{ fontSize:11, background:'#F1F5F9', padding:'2px 6px', borderRadius:4, color:'#475569' }}>{a.id}</code></td>
                <td style={{ fontWeight:600, color:'#0F172A' }}>{a.nama}</td>
                <td>{a.kategori}</td>
                <td style={{ color:'#64748B' }}>{a.lokasi}</td>
                <td style={{ color:'#64748B', fontFamily:'monospace', fontSize:12 }}>{a.tgl}</td>
                <td><span className={`badge ${a.status==='Aktif'?'badge-active':a.status==='Dipinjam'?'badge-loan':a.status==='Servis'?'badge-service':'badge-broken'}`}>{a.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
