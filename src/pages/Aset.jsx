import { useState } from 'react'
import { Search, Plus, Filter, Download, Eye, Edit, Trash, X } from 'lucide-react'
import { asetData } from '../data/mockData'

const statusOpts = ['Semua','Aktif','Dipinjam','Servis','Rusak']
const kategoriOpts = ['Semua','Laptop','PC','Printer','Monitor','Network','UPS','Proyektor','Scanner']

const fmt = n => 'Rp ' + n.toLocaleString('id-ID')

export default function Aset() {
  const [search, setSearch]     = useState('')
  const [statusF, setStatusF]   = useState('Semua')
  const [katF, setKatF]         = useState('Semua')
  const [showModal, setShowModal] = useState(false)
  const [viewItem, setViewItem]   = useState(null)

  const filtered = asetData.filter(a => {
    const s = a.nama.toLowerCase().includes(search.toLowerCase()) || a.id.toLowerCase().includes(search.toLowerCase()) || a.sn.toLowerCase().includes(search.toLowerCase())
    const st = statusF === 'Semua' || a.status === statusF
    const kt = katF === 'Semua' || a.kategori === katF
    return s && st && kt
  })

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
      {/* Header */}
      <div className="fade-up" style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between' }}>
        <div>
          <h1 className="section-title">Data Aset IT</h1>
          <p className="section-sub">Kelola seluruh inventaris perangkat teknologi informasi</p>
        </div>
        <div style={{ display:'flex', gap:8 }}>
          <button className="btn btn-outline btn-sm"><Download size={13} /> Export</button>
          <button className="btn btn-primary btn-sm" onClick={()=>setShowModal(true)}><Plus size={13} /> Tambah Aset</button>
        </div>
      </div>

      {/* Filter bar */}
      <div className="card fade-up delay-1" style={{ padding:'14px 18px', display:'flex', alignItems:'center', gap:12, flexWrap:'wrap' }}>
        <div style={{ position:'relative', flex:1, minWidth:200 }}>
          <Search size={14} style={{ position:'absolute', left:11, top:'50%', transform:'translateY(-50%)', color:'#94A3B8' }} />
          <input className="input" style={{ paddingLeft:34 }} value={search} onChange={e=>setSearch(e.target.value)} placeholder="Cari nama, ID, atau SN aset..." />
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:6 }}>
          <Filter size={13} color="#64748B" />
          <span style={{ fontSize:12, fontWeight:600, color:'#64748B' }}>Status:</span>
          <select value={statusF} onChange={e=>setStatusF(e.target.value)} style={{ padding:'8px 12px', borderRadius:8, border:'1.5px solid #E2E8F0', fontSize:13, color:'#334155', background:'#fff', cursor:'pointer', outline:'none' }}>
            {statusOpts.map(o=><option key={o}>{o}</option>)}
          </select>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:6 }}>
          <span style={{ fontSize:12, fontWeight:600, color:'#64748B' }}>Kategori:</span>
          <select value={katF} onChange={e=>setKatF(e.target.value)} style={{ padding:'8px 12px', borderRadius:8, border:'1.5px solid #E2E8F0', fontSize:13, color:'#334155', background:'#fff', cursor:'pointer', outline:'none' }}>
            {kategoriOpts.map(o=><option key={o}>{o}</option>)}
          </select>
        </div>
        <span style={{ fontSize:12, fontWeight:600, color:'#94A3B8' }}>{filtered.length} dari {asetData.length} aset</span>
      </div>

      {/* Table */}
      <div className="card fade-up delay-2" style={{ overflow:'hidden' }}>
        <div style={{ overflowX:'auto' }}>
          <table>
            <thead>
              <tr>
                <th>ID</th><th>Nama Aset</th><th>Kategori</th><th>Merk</th><th>Serial Number</th>
                <th>Lokasi</th><th>PIC</th><th>Nilai</th><th>Kondisi</th><th>Status</th><th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(a=>(
                <tr key={a.id}>
                  <td><code style={{ fontSize:11, background:'#F1F5F9', padding:'2px 6px', borderRadius:4, color:'#475569', fontWeight:700 }}>{a.id}</code></td>
                  <td style={{ fontWeight:600, color:'#0F172A', minWidth:200 }}>{a.nama}</td>
                  <td>
                    <span style={{ fontSize:11, fontWeight:700, padding:'3px 8px', borderRadius:99, background:'#EFF6FF', color:'#1E40AF' }}>{a.kategori}</span>
                  </td>
                  <td style={{ color:'#475569' }}>{a.merk}</td>
                  <td><code style={{ fontSize:11, color:'#64748B' }}>{a.sn}</code></td>
                  <td style={{ color:'#64748B', fontSize:12 }}>{a.lokasi}</td>
                  <td style={{ fontSize:12, color:'#475569' }}>{a.pic}</td>
                  <td style={{ fontWeight:700, color:'#0F172A', fontSize:12 }}>{fmt(a.harga)}</td>
                  <td>
                    <span className={`badge ${a.kondisi==='Baik'?'badge-active':a.kondisi==='Rusak'?'badge-broken':'badge-loan'}`}>{a.kondisi}</span>
                  </td>
                  <td>
                    <span className={`badge ${a.status==='Aktif'?'badge-active':a.status==='Dipinjam'?'badge-loan':a.status==='Servis'?'badge-service':'badge-broken'}`}>{a.status}</span>
                  </td>
                  <td>
                    <div style={{ display:'flex', gap:4 }}>
                      <button className="btn btn-outline btn-sm" onClick={()=>setViewItem(a)} style={{ padding:'5px 8px' }}><Eye size={12}/></button>
                      <button className="btn btn-outline btn-sm" style={{ padding:'5px 8px' }}><Edit size={12}/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length===0 && <div style={{ textAlign:'center', padding:'40px', color:'#94A3B8', fontSize:14 }}>Tidak ada data ditemukan</div>}
        </div>
      </div>

      {/* View Modal */}
      {viewItem && (
        <div style={{ position:'fixed', inset:0, background:'rgba(15,23,42,0.5)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:100, backdropFilter:'blur(4px)' }} onClick={()=>setViewItem(null)}>
          <div className="card" style={{ width:480, padding:'24px', boxShadow:'0 20px 60px rgba(0,0,0,0.2)' }} onClick={e=>e.stopPropagation()}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:20 }}>
              <h3 style={{ fontSize:16, fontWeight:800, color:'#0F172A' }}>Detail Aset</h3>
              <button onClick={()=>setViewItem(null)} style={{ background:'none', border:'none', cursor:'pointer', color:'#94A3B8', display:'flex' }}><X size={18}/></button>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px 20px' }}>
              {[
                ['ID Aset', viewItem.id],['Kategori', viewItem.kategori],
                ['Nama Aset', viewItem.nama],['Merk', viewItem.merk],
                ['Serial Number', viewItem.sn],['Nilai Aset', fmt(viewItem.harga)],
                ['Lokasi', viewItem.lokasi],['PIC', viewItem.pic],
                ['Tgl Registrasi', viewItem.tgl],['Kondisi', viewItem.kondisi],
              ].map(([k,v])=>(
                <div key={k}>
                  <p style={{ fontSize:10, fontWeight:700, color:'#94A3B8', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:3 }}>{k}</p>
                  <p style={{ fontSize:13, fontWeight:600, color:'#0F172A' }}>{v}</p>
                </div>
              ))}
            </div>
            <div style={{ marginTop:16, paddingTop:16, borderTop:'1px solid #E2E8F0', display:'flex', gap:8, justifyContent:'flex-end' }}>
              <button className="btn btn-outline" onClick={()=>setViewItem(null)}>Tutup</button>
              <button className="btn btn-primary"><Edit size={13}/> Edit Aset</button>
            </div>
          </div>
        </div>
      )}

      {/* Add Modal */}
      {showModal && (
        <div style={{ position:'fixed', inset:0, background:'rgba(15,23,42,0.5)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:100, backdropFilter:'blur(4px)' }} onClick={()=>setShowModal(false)}>
          <div className="card" style={{ width:540, padding:'24px', maxHeight:'85vh', overflowY:'auto', boxShadow:'0 20px 60px rgba(0,0,0,0.2)' }} onClick={e=>e.stopPropagation()}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:20 }}>
              <h3 style={{ fontSize:16, fontWeight:800, color:'#0F172A' }}>Tambah Aset Baru</h3>
              <button onClick={()=>setShowModal(false)} style={{ background:'none', border:'none', cursor:'pointer', color:'#94A3B8', display:'flex' }}><X size={18}/></button>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
              {[
                ['Nama Aset','text','Contoh: Laptop Dell Latitude 5420','nama-aset'],
                ['Kategori','select','','kategori'],
                ['Merk','text','Contoh: Dell, HP, Lenovo...','merk'],
                ['Serial Number','text','Nomor seri perangkat','sn'],
                ['Lokasi','text','Ruangan / bidang','lokasi'],
                ['PIC (Penanggungjawab)','text','Nama penanggungjawab','pic'],
                ['Nilai Aset (Rp)','number','0','harga'],
                ['Kondisi','select','','kondisi'],
              ].map(([label, type, ph, key])=>(
                <div key={key} style={{ gridColumn: key==='nama-aset'?'1/-1':'auto' }}>
                  <label className="label">{label}</label>
                  {type==='select' ? (
                    <select className="input" style={{ cursor:'pointer' }}>
                      {key==='kategori' ? kategoriOpts.slice(1).map(o=><option key={o}>{o}</option>) : ['Baik','Rusak Ringan','Rusak'].map(o=><option key={o}>{o}</option>)}
                    </select>
                  ) : (
                    <input className="input" type={type} placeholder={ph} />
                  )}
                </div>
              ))}
            </div>
            <div style={{ marginTop:20, display:'flex', gap:8, justifyContent:'flex-end' }}>
              <button className="btn btn-outline" onClick={()=>setShowModal(false)}>Batal</button>
              <button className="btn btn-primary" onClick={()=>setShowModal(false)}><Plus size={13}/> Simpan Aset</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
