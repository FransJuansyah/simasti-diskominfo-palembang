import { useState } from 'react'
import { Wrench, Plus, Search, X } from 'lucide-react'
import { maintenanceData } from '../data/mockData'

const fmt = n => n > 0 ? 'Rp ' + n.toLocaleString('id-ID') : 'Gratis'

export default function Maintenance() {
  const [search, setSearch]   = useState('')
  const [statusF, setStatusF] = useState('Semua')
  const [showModal, setShowModal] = useState(false)
  const [viewItem, setViewItem]   = useState(null)

  const filtered = maintenanceData.filter(m => {
    const s = m.aset.toLowerCase().includes(search.toLowerCase()) || m.teknisi.toLowerCase().includes(search.toLowerCase())
    const st = statusF==='Semua' || m.status===statusF
    return s && st
  })

  const stats = [
    { label:'Total Servis',     val:maintenanceData.length,                              color:'#1E40AF', bg:'#EFF6FF' },
    { label:'Selesai',          val:maintenanceData.filter(m=>m.status==='Selesai').length, color:'#059669', bg:'#ECFDF5' },
    { label:'Dalam Proses',     val:maintenanceData.filter(m=>m.status==='Proses').length,  color:'#7C3AED', bg:'#F5F3FF' },
    { label:'Menunggu',         val:maintenanceData.filter(m=>m.status==='Menunggu').length,color:'#D97706', bg:'#FFFBEB' },
  ]

  const totalBiaya = maintenanceData.reduce((a,m)=>a+m.biaya,0)

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
      <div className="fade-up" style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between' }}>
        <div>
          <h1 className="section-title">Maintenance & Servis</h1>
          <p className="section-sub">Riwayat perbaikan dan perawatan aset IT</p>
        </div>
        <button className="btn btn-primary btn-sm" onClick={()=>setShowModal(true)}><Plus size={13}/> Tambah Servis</button>
      </div>

      {/* Summary cards */}
      <div className="fade-up delay-1" style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12 }}>
        {stats.map(s=>(
          <div key={s.label} className="card" style={{ padding:'14px 18px' }}>
            <div style={{ width:36, height:36, borderRadius:9, background:s.bg, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:10 }}>
              <Wrench size={16} color={s.color} />
            </div>
            <p style={{ fontSize:22, fontWeight:800, color:s.color }}>{s.val}</p>
            <p style={{ fontSize:12, fontWeight:600, color:'#64748B', marginTop:2 }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Biaya total */}
      <div className="card fade-up delay-2" style={{ padding:'14px 20px', background:'#FFFBEB', border:'1px solid #FDE68A', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <div>
          <p style={{ fontSize:12, fontWeight:700, color:'#92400E', letterSpacing:'0.04em', textTransform:'uppercase' }}>Total Biaya Maintenance (Feb–Apr 2022)</p>
          <p style={{ fontSize:22, fontWeight:800, color:'#D97706', marginTop:4 }}>{'Rp ' + totalBiaya.toLocaleString('id-ID')}</p>
        </div>
        <Wrench size={28} color="#D97706" style={{ opacity:0.4 }} />
      </div>

      {/* Filter */}
      <div className="card fade-up delay-2" style={{ padding:'12px 16px', display:'flex', gap:12, alignItems:'center' }}>
        <div style={{ position:'relative', flex:1 }}>
          <Search size={14} style={{ position:'absolute', left:11, top:'50%', transform:'translateY(-50%)', color:'#94A3B8' }} />
          <input className="input" style={{ paddingLeft:34 }} value={search} onChange={e=>setSearch(e.target.value)} placeholder="Cari aset atau teknisi..." />
        </div>
        <select value={statusF} onChange={e=>setStatusF(e.target.value)} style={{ padding:'9px 12px', borderRadius:8, border:'1.5px solid #E2E8F0', fontSize:13, color:'#334155', background:'#fff', outline:'none', cursor:'pointer' }}>
          {['Semua','Selesai','Proses','Menunggu'].map(o=><option key={o}>{o}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="card fade-up delay-3" style={{ overflow:'hidden' }}>
        <table>
          <thead>
            <tr><th>ID</th><th>Aset</th><th>Jenis Servis</th><th>Teknisi</th><th>Tgl Masuk</th><th>Tgl Selesai</th><th>Biaya</th><th>Status</th><th>Aksi</th></tr>
          </thead>
          <tbody>
            {filtered.map(m=>(
              <tr key={m.id}>
                <td><code style={{ fontSize:11, background:'#F1F5F9', padding:'2px 6px', borderRadius:4, color:'#475569', fontWeight:700 }}>{m.id}</code></td>
                <td style={{ fontWeight:600, color:'#0F172A', minWidth:180 }}>{m.aset}</td>
                <td style={{ fontSize:12 }}>
                  <span style={{ padding:'3px 8px', borderRadius:99, background:'#F5F3FF', color:'#7C3AED', fontSize:11, fontWeight:700 }}>{m.jenis}</span>
                </td>
                <td style={{ fontSize:12, fontWeight:600 }}>{m.teknisi}</td>
                <td style={{ fontSize:12, fontFamily:'monospace' }}>{m.tglMasuk}</td>
                <td style={{ fontSize:12, fontFamily:'monospace', color:m.tglSelesai?'#059669':'#94A3B8' }}>{m.tglSelesai||'—'}</td>
                <td style={{ fontWeight:700, color:m.biaya>0?'#D97706':'#94A3B8', fontSize:12 }}>{fmt(m.biaya)}</td>
                <td><span className={`badge ${m.status==='Selesai'?'badge-done':m.status==='Proses'?'badge-progress':'badge-pending'}`}>{m.status}</span></td>
                <td>
                  <button className="btn btn-outline btn-sm" style={{ padding:'5px 10px' }} onClick={()=>setViewItem(m)}>Detail</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Detail Modal */}
      {viewItem && (
        <div style={{ position:'fixed', inset:0, background:'rgba(15,23,42,0.5)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:100, backdropFilter:'blur(4px)' }} onClick={()=>setViewItem(null)}>
          <div className="card" style={{ width:500, padding:'24px', boxShadow:'0 20px 60px rgba(0,0,0,0.2)' }} onClick={e=>e.stopPropagation()}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:20 }}>
              <h3 style={{ fontSize:16, fontWeight:800, color:'#0F172A' }}>Detail Maintenance</h3>
              <button onClick={()=>setViewItem(null)} style={{ background:'none', border:'none', cursor:'pointer', color:'#94A3B8' }}><X size={18}/></button>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
              {[
                ['ID Servis', viewItem.id],['Aset', viewItem.aset],['Jenis', viewItem.jenis],
                ['Teknisi', viewItem.teknisi],['Tgl Masuk', viewItem.tglMasuk],['Tgl Selesai', viewItem.tglSelesai||'Belum selesai'],
                ['Biaya', fmt(viewItem.biaya)],['Keterangan', viewItem.keterangan],['Hasil', viewItem.hasil||'—'],
              ].map(([k,v])=>(
                <div key={k} style={{ display:'flex', gap:12, padding:'8px 0', borderBottom:'1px solid #F1F5F9' }}>
                  <span style={{ fontSize:12, fontWeight:700, color:'#94A3B8', minWidth:110 }}>{k}</span>
                  <span style={{ fontSize:13, fontWeight:600, color:'#0F172A', flex:1 }}>{v}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop:16, display:'flex', justifyContent:'flex-end' }}>
              <button className="btn btn-outline" onClick={()=>setViewItem(null)}>Tutup</button>
            </div>
          </div>
        </div>
      )}

      {/* Add modal */}
      {showModal && (
        <div style={{ position:'fixed', inset:0, background:'rgba(15,23,42,0.5)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:100, backdropFilter:'blur(4px)' }} onClick={()=>setShowModal(false)}>
          <div className="card" style={{ width:520, padding:'24px' }} onClick={e=>e.stopPropagation()}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:20 }}>
              <h3 style={{ fontSize:16, fontWeight:800, color:'#0F172A' }}>Form Servis / Maintenance</h3>
              <button onClick={()=>setShowModal(false)} style={{ background:'none', border:'none', cursor:'pointer', color:'#94A3B8' }}><X size={18}/></button>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
              {[['ID Aset','text','Masukkan ID aset...'],['Jenis Servis','text','Perbaikan / Cleaning / dll'],['Teknisi','text','Nama teknisi'],['Tgl Masuk','date',''],['Estimasi Biaya (Rp)','number','0'],['Status','select','']].map(([l,t,p],i)=>(
                <div key={i}>
                  <label className="label">{l}</label>
                  {t==='select' ? (
                    <select className="input" style={{ cursor:'pointer' }}>
                      {['Menunggu','Proses','Selesai'].map(o=><option key={o}>{o}</option>)}
                    </select>
                  ) : <input className="input" type={t} placeholder={p} />}
                </div>
              ))}
              <div style={{ gridColumn:'1/-1' }}>
                <label className="label">Keterangan Kerusakan</label>
                <textarea className="input" rows={2} placeholder="Deskripsikan kerusakan atau pekerjaan yang dilakukan..." style={{ resize:'vertical' }} />
              </div>
            </div>
            <div style={{ display:'flex', gap:8, justifyContent:'flex-end', marginTop:16 }}>
              <button className="btn btn-outline" onClick={()=>setShowModal(false)}>Batal</button>
              <button className="btn btn-primary" onClick={()=>setShowModal(false)}><Plus size={13}/> Simpan</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
