// ═══════════════════════════════════════════════════════
// PEMINJAMAN PAGE
// ═══════════════════════════════════════════════════════
import { useState } from 'react'
import { RefreshCw, Plus, Search, X, CheckCircle } from 'lucide-react'
import { pinjamanData } from '../data/mockData'

export function Peminjaman() {
  const [search, setSearch] = useState('')
  const [statusF, setStatusF] = useState('Semua')
  const [showModal, setShowModal] = useState(false)
  const [konfirm, setKonfirm] = useState(null)

  const filtered = pinjamanData.filter(p => {
    const s = p.aset.toLowerCase().includes(search.toLowerCase()) || p.peminjam.toLowerCase().includes(search.toLowerCase())
    const st = statusF==='Semua' || p.status===statusF
    return s && st
  })

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
      <div className="fade-up" style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between' }}>
        <div>
          <h1 className="section-title">Peminjaman Aset</h1>
          <p className="section-sub">Kelola peminjaman dan pengembalian aset IT</p>
        </div>
        <button className="btn btn-primary btn-sm" onClick={()=>setShowModal(true)}><Plus size={13}/> Buat Peminjaman</button>
      </div>

      {/* Summary */}
      <div className="fade-up delay-1" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12 }}>
        {[
          { label:'Total Peminjaman', val:pinjamanData.length, color:'#1E40AF', bg:'#EFF6FF' },
          { label:'Sedang Dipinjam',  val:pinjamanData.filter(p=>p.status==='Dipinjam').length,   color:'#D97706', bg:'#FFFBEB' },
          { label:'Terlambat Kembali',val:pinjamanData.filter(p=>p.status==='Terlambat').length,  color:'#DC2626', bg:'#FEF2F2' },
        ].map(s=>(
          <div key={s.label} className="card" style={{ padding:'16px 20px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
            <div>
              <p style={{ fontSize:24, fontWeight:800, color:s.color }}>{s.val}</p>
              <p style={{ fontSize:12, fontWeight:600, color:'#64748B', marginTop:2 }}>{s.label}</p>
            </div>
            <div style={{ width:42, height:42, borderRadius:10, background:s.bg, display:'flex', alignItems:'center', justifyContent:'center' }}>
              <RefreshCw size={18} color={s.color} />
            </div>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div className="card fade-up delay-2" style={{ padding:'12px 16px', display:'flex', gap:12, alignItems:'center' }}>
        <div style={{ position:'relative', flex:1 }}>
          <Search size={14} style={{ position:'absolute', left:11, top:'50%', transform:'translateY(-50%)', color:'#94A3B8' }} />
          <input className="input" style={{ paddingLeft:34 }} value={search} onChange={e=>setSearch(e.target.value)} placeholder="Cari aset atau nama peminjam..." />
        </div>
        <select value={statusF} onChange={e=>setStatusF(e.target.value)} style={{ padding:'9px 12px', borderRadius:8, border:'1.5px solid #E2E8F0', fontSize:13, color:'#334155', background:'#fff', outline:'none', cursor:'pointer' }}>
          {['Semua','Dipinjam','Dikembalikan','Terlambat'].map(o=><option key={o}>{o}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="card fade-up delay-3" style={{ overflow:'hidden' }}>
        <table>
          <thead>
            <tr><th>ID</th><th>Aset</th><th>Peminjam</th><th>Jabatan</th><th>Tgl Pinjam</th><th>Tgl Kembali</th><th>Keterangan</th><th>Status</th><th>Aksi</th></tr>
          </thead>
          <tbody>
            {filtered.map(p=>(
              <tr key={p.id}>
                <td><code style={{ fontSize:11, background:'#F1F5F9', padding:'2px 6px', borderRadius:4, color:'#475569', fontWeight:700 }}>{p.id}</code></td>
                <td style={{ fontWeight:600, color:'#0F172A', minWidth:180 }}>{p.aset}</td>
                <td style={{ fontWeight:600 }}>{p.peminjam}</td>
                <td style={{ fontSize:12, color:'#64748B' }}>{p.jabatan}</td>
                <td style={{ fontSize:12, fontFamily:'monospace' }}>{p.tglPinjam}</td>
                <td style={{ fontSize:12, fontFamily:'monospace', color:p.status==='Terlambat'?'#DC2626':'#334155' }}>{p.tglKembali}</td>
                <td style={{ fontSize:12, color:'#64748B', maxWidth:160 }}>{p.keterangan}</td>
                <td><span className={`badge ${p.status==='Dikembalikan'?'badge-done':p.status==='Dipinjam'?'badge-loan':'badge-broken'}`}>{p.status}</span></td>
                <td>
                  {p.status==='Dipinjam'&&(
                    <button className="btn btn-sm" style={{ background:'#ECFDF5', color:'#059669', border:'1px solid #A7F3D0', padding:'5px 10px' }} onClick={()=>setKonfirm(p)}>
                      <CheckCircle size={12}/> Kembalikan
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Konfirmasi kembali modal */}
      {konfirm && (
        <div style={{ position:'fixed', inset:0, background:'rgba(15,23,42,0.5)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:100, backdropFilter:'blur(4px)' }} onClick={()=>setKonfirm(null)}>
          <div className="card" style={{ width:440, padding:'24px' }} onClick={e=>e.stopPropagation()}>
            <h3 style={{ fontSize:16, fontWeight:800, color:'#0F172A', marginBottom:6 }}>Konfirmasi Pengembalian</h3>
            <p style={{ fontSize:13, color:'#64748B', marginBottom:16 }}>Aset <strong>{konfirm.aset}</strong> oleh <strong>{konfirm.peminjam}</strong></p>
            <div>
              <label className="label">Kondisi saat dikembalikan</label>
              <select className="input" style={{ cursor:'pointer' }}>
                {['Baik','Rusak Ringan','Rusak'].map(o=><option key={o}>{o}</option>)}
              </select>
            </div>
            <div style={{ marginTop:12 }}>
              <label className="label">Catatan (opsional)</label>
              <textarea className="input" rows={2} style={{ resize:'vertical' }} placeholder="Catatan kondisi aset..." />
            </div>
            <div style={{ display:'flex', gap:8, justifyContent:'flex-end', marginTop:16 }}>
              <button className="btn btn-outline" onClick={()=>setKonfirm(null)}>Batal</button>
              <button className="btn btn-primary" onClick={()=>setKonfirm(null)}><CheckCircle size={13}/> Konfirmasi Kembali</button>
            </div>
          </div>
        </div>
      )}

      {/* Add modal */}
      {showModal && (
        <div style={{ position:'fixed', inset:0, background:'rgba(15,23,42,0.5)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:100, backdropFilter:'blur(4px)' }} onClick={()=>setShowModal(false)}>
          <div className="card" style={{ width:520, padding:'24px' }} onClick={e=>e.stopPropagation()}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:20 }}>
              <h3 style={{ fontSize:16, fontWeight:800, color:'#0F172A' }}>Form Peminjaman Aset</h3>
              <button onClick={()=>setShowModal(false)} style={{ background:'none', border:'none', cursor:'pointer', color:'#94A3B8' }}><X size={18}/></button>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
              {[['ID Aset','text','Pilih ID aset...'],['Nama Peminjam','text','Nama lengkap'],['Jabatan','text','Jabatan / posisi'],['No. HP','tel','08xx-xxxx-xxxx'],['Tgl Pinjam','date',''],['Tgl Kembali','date','']].map(([l,t,p],i)=>(
                <div key={i}>
                  <label className="label">{l}</label>
                  <input className="input" type={t} placeholder={p} />
                </div>
              ))}
              <div style={{ gridColumn:'1/-1' }}>
                <label className="label">Keperluan Peminjaman</label>
                <textarea className="input" rows={2} placeholder="Jelaskan keperluan peminjaman..." style={{ resize:'vertical' }}/>
              </div>
            </div>
            <div style={{ display:'flex', gap:8, justifyContent:'flex-end', marginTop:16 }}>
              <button className="btn btn-outline" onClick={()=>setShowModal(false)}>Batal</button>
              <button className="btn btn-primary" onClick={()=>setShowModal(false)}><Plus size={13}/> Simpan Peminjaman</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
