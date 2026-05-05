import { BarChart2, Download, Printer, FileText, Package, RefreshCw, Wrench } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from 'recharts'
import { asetData, maintenanceData, pinjamanData, chartAsetKategori } from '../data/mockData'

const kondisiData = [
  { name:'Baik', val:12, color:'#059669' },
  { name:'Rusak Ringan', val:2, color:'#D97706' },
  { name:'Rusak', val:1, color:'#DC2626' },
]

const aktivitasData = [
  { bln:'Feb 22', pinjam:3, servis:2, kembali:0 },
  { bln:'Mar 22', pinjam:5, servis:4, kembali:4 },
  { bln:'Apr 22', pinjam:2, servis:2, kembali:3 },
]

const TT = ({ active, payload, label }) => active && payload?.length ? (
  <div style={{ background:'#fff', border:'1px solid #E2E8F0', borderRadius:8, padding:'8px 12px', boxShadow:'0 4px 12px rgba(0,0,0,0.1)', fontSize:12 }}>
    <p style={{ fontWeight:700, color:'#0F172A', marginBottom:4 }}>{label}</p>
    {payload.map(p=><p key={p.name} style={{ color:p.color, fontWeight:600 }}>{p.name}: {p.value}</p>)}
  </div>
) : null

export default function Laporan() {
  const nilaiTotal = asetData.reduce((a,b)=>a+b.harga,0)
  const biayaMaint = maintenanceData.reduce((a,m)=>a+m.biaya,0)

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
      {/* Header */}
      <div className="fade-up" style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between' }}>
        <div>
          <h1 className="section-title">Laporan & Analisis</h1>
          <p className="section-sub">Rekap inventaris IT Diskominfo Palembang · Feb – Apr 2022</p>
        </div>
        <div style={{ display:'flex', gap:8 }}>
          <button className="btn btn-outline btn-sm"><Printer size={13}/> Cetak</button>
          <button className="btn btn-primary btn-sm"><Download size={13}/> Export PDF</button>
        </div>
      </div>

      {/* Export options */}
      <div className="card fade-up delay-1" style={{ padding:'18px 20px' }}>
        <p style={{ fontSize:13, fontWeight:700, color:'#334155', marginBottom:14 }}>Pilih Laporan yang Diekspor</p>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:10 }}>
          {[
            { icon:Package,        label:'Laporan Aset IT',       sub:`${asetData.length} data aset`,       color:'#1E40AF', bg:'#EFF6FF' },
            { icon:RefreshCw, label:'Laporan Peminjaman',    sub:`${pinjamanData.length} transaksi`,    color:'#D97706', bg:'#FFFBEB' },
            { icon:Wrench,         label:'Laporan Maintenance',   sub:`${maintenanceData.length} servis`,    color:'#7C3AED', bg:'#F5F3FF' },
          ].map(({ icon:Icon, label, sub, color, bg })=>(
            <div key={label} style={{ border:'1.5px solid #E2E8F0', borderRadius:10, padding:'14px 16px', display:'flex', alignItems:'center', gap:12, cursor:'pointer', transition:'all 0.15s' }}
              onMouseEnter={e=>{ e.currentTarget.style.borderColor=color; e.currentTarget.style.background=bg }}
              onMouseLeave={e=>{ e.currentTarget.style.borderColor='#E2E8F0'; e.currentTarget.style.background='transparent' }}
            >
              <div style={{ width:36, height:36, borderRadius:9, background:bg, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                <Icon size={16} color={color} />
              </div>
              <div>
                <p style={{ fontSize:13, fontWeight:700, color:'#0F172A' }}>{label}</p>
                <p style={{ fontSize:11, color:'#94A3B8', marginTop:2 }}>{sub}</p>
              </div>
              <Download size={14} color={color} style={{ marginLeft:'auto', opacity:0.6 }} />
            </div>
          ))}
        </div>
      </div>

      {/* KPI summary */}
      <div className="fade-up delay-2" style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12 }}>
        {[
          { label:'Total Nilai Aset',    val:`Rp ${(nilaiTotal/1000000).toFixed(1)} jt`, sub:'15 unit aset',         color:'#1E40AF' },
          { label:'Aset Aktif',          val:'10 unit',  sub:'66,7% dari total',          color:'#059669' },
          { label:'Biaya Maintenance',   val:`Rp ${(biayaMaint/1000).toFixed(0)} rb`,  sub:'Feb–Apr 2022',           color:'#7C3AED' },
          { label:'Tk. Ketersediaan',    val:'86,7%',    sub:'Aset siap guna',            color:'#D97706' },
        ].map(s=>(
          <div key={s.label} className="card" style={{ padding:'16px 18px' }}>
            <p style={{ fontSize:22, fontWeight:800, color:s.color, letterSpacing:'-0.5px' }}>{s.val}</p>
            <p style={{ fontSize:12, fontWeight:700, color:'#334155', marginTop:6 }}>{s.label}</p>
            <p style={{ fontSize:11, color:'#94A3B8', marginTop:2 }}>{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="fade-up delay-3" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
        {/* Aktivitas bulanan */}
        <div className="card" style={{ padding:'20px' }}>
          <p style={{ fontSize:13, fontWeight:700, color:'#334155', marginBottom:4 }}>Aktivitas per Bulan</p>
          <p style={{ fontSize:11, color:'#94A3B8', marginBottom:16 }}>Peminjaman · Servis · Pengembalian</p>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={aktivitasData} barGap={3}>
              <XAxis dataKey="bln" tick={{ fill:'#94A3B8', fontSize:11, fontWeight:600 }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip content={<TT />} />
              <Bar dataKey="pinjam"  fill="#1E40AF" radius={[4,4,0,0]} name="Peminjaman" />
              <Bar dataKey="servis"  fill="#7C3AED" radius={[4,4,0,0]} name="Servis" />
              <Bar dataKey="kembali" fill="#059669" radius={[4,4,0,0]} name="Pengembalian" />
            </BarChart>
          </ResponsiveContainer>
          <div style={{ display:'flex', gap:14, marginTop:8 }}>
            {[['#1E40AF','Peminjaman'],['#7C3AED','Servis'],['#059669','Pengembalian']].map(([c,l])=>(
              <div key={l} style={{ display:'flex', alignItems:'center', gap:5 }}>
                <div style={{ width:8, height:8, borderRadius:2, background:c }} />
                <span style={{ fontSize:10, color:'#94A3B8' }}>{l}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Kondisi aset pie */}
        <div className="card" style={{ padding:'20px' }}>
          <p style={{ fontSize:13, fontWeight:700, color:'#334155', marginBottom:4 }}>Kondisi Aset</p>
          <p style={{ fontSize:11, color:'#94A3B8', marginBottom:8 }}>Distribusi kondisi per April 2022</p>
          <div style={{ display:'flex', alignItems:'center', gap:20 }}>
            <ResponsiveContainer width={140} height={140}>
              <PieChart>
                <Pie data={kondisiData} cx="50%" cy="50%" innerRadius={38} outerRadius={60} dataKey="val" paddingAngle={4}>
                  {kondisiData.map((e,i)=><Cell key={i} fill={e.color} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div style={{ flex:1, display:'flex', flexDirection:'column', gap:10 }}>
              {kondisiData.map(k=>(
                <div key={k.name}>
                  <div style={{ display:'flex', justifyContent:'space-between', marginBottom:4 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:6 }}>
                      <div style={{ width:8, height:8, borderRadius:'50%', background:k.color }} />
                      <span style={{ fontSize:12, fontWeight:600, color:'#334155' }}>{k.name}</span>
                    </div>
                    <span style={{ fontSize:12, fontWeight:800, color:k.color }}>{k.val}</span>
                  </div>
                  <div style={{ height:5, borderRadius:99, background:'#F1F5F9' }}>
                    <div style={{ height:'100%', borderRadius:99, background:k.color, width:`${(k.val/15)*100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Aset tabel ringkas */}
      <div className="card fade-up delay-4" style={{ overflow:'hidden' }}>
        <div style={{ padding:'16px 20px', borderBottom:'1px solid #E2E8F0', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <p style={{ fontSize:13, fontWeight:700, color:'#334155' }}>Rekap Nilai Aset per Kategori</p>
        </div>
        <table>
          <thead>
            <tr><th>Kategori</th><th>Jumlah Unit</th><th>Total Nilai</th><th>% Nilai</th><th>Kondisi Umum</th></tr>
          </thead>
          <tbody>
            {[
              { kat:'Laptop',    unit:5, nilai:56400000, pct:45.6, kondisi:'Baik' },
              { kat:'PC Desktop',unit:2, nilai:18700000, pct:15.1, kondisi:'Baik' },
              { kat:'Network',   unit:2, nilai:10700000, pct:8.7,  kondisi:'Baik' },
              { kat:'Proyektor', unit:1, nilai:7800000,  pct:6.3,  kondisi:'Baik' },
              { kat:'UPS',       unit:1, nilai:1800000,  pct:1.5,  kondisi:'Baik' },
              { kat:'Printer',   unit:2, nilai:5300000,  pct:4.3,  kondisi:'Baik' },
              { kat:'Lainnya',   unit:2, nilai:9300000,  pct:7.5,  kondisi:'Baik' },
            ].map(r=>(
              <tr key={r.kat}>
                <td style={{ fontWeight:700 }}>{r.kat}</td>
                <td>{r.unit} unit</td>
                <td style={{ fontWeight:700, color:'#1E40AF' }}>{'Rp '+r.nilai.toLocaleString('id-ID')}</td>
                <td>
                  <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                    <div style={{ flex:1, height:6, borderRadius:99, background:'#F1F5F9' }}>
                      <div style={{ height:'100%', borderRadius:99, background:'#1E40AF', width:`${r.pct}%` }} />
                    </div>
                    <span style={{ fontSize:11, fontWeight:700, color:'#64748B', minWidth:36 }}>{r.pct}%</span>
                  </div>
                </td>
                <td><span className="badge badge-active">{r.kondisi}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
