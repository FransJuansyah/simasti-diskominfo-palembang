import { useState } from 'react'
import { Users as UsersIcon, Plus, Search, X, Shield, Edit } from 'lucide-react'
import { usersData } from '../data/mockData'

const roleColor = { Admin:'#1E40AF', Manager:'#7C3AED', Teknisi:'#059669', Staff:'#D97706' }
const roleBg    = { Admin:'#EFF6FF', Manager:'#F5F3FF', Teknisi:'#ECFDF5', Staff:'#FFFBEB' }

export default function Users() {
  const [search, setSearch]   = useState('')
  const [roleF, setRoleF]     = useState('Semua')
  const [showModal, setShowModal] = useState(false)

  const filtered = usersData.filter(u => {
    const s = u.nama.toLowerCase().includes(search.toLowerCase()) || u.jabatan.toLowerCase().includes(search.toLowerCase())
    const r = roleF==='Semua' || u.role===roleF
    return s && r
  })

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
      <div className="fade-up" style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between' }}>
        <div>
          <h1 className="section-title">Manajemen User</h1>
          <p className="section-sub">Kelola akun dan hak akses pengguna sistem</p>
        </div>
        <button className="btn btn-primary btn-sm" onClick={()=>setShowModal(true)}><Plus size={13}/> Tambah User</button>
      </div>

      {/* Role summary */}
      <div className="fade-up delay-1" style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12 }}>
        {['Admin','Manager','Teknisi','Staff'].map(role=>{
          const count = usersData.filter(u=>u.role===role).length
          return (
            <div key={role} className="card" style={{ padding:'14px 18px', display:'flex', alignItems:'center', gap:12 }}>
              <div style={{ width:38, height:38, borderRadius:9, background:roleBg[role], display:'flex', alignItems:'center', justifyContent:'center' }}>
                <Shield size={16} color={roleColor[role]} />
              </div>
              <div>
                <p style={{ fontSize:22, fontWeight:800, color:roleColor[role] }}>{count}</p>
                <p style={{ fontSize:12, fontWeight:600, color:'#64748B' }}>{role}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Filter */}
      <div className="card fade-up delay-2" style={{ padding:'12px 16px', display:'flex', gap:12, alignItems:'center' }}>
        <div style={{ position:'relative', flex:1 }}>
          <Search size={14} style={{ position:'absolute', left:11, top:'50%', transform:'translateY(-50%)', color:'#94A3B8' }} />
          <input className="input" style={{ paddingLeft:34 }} value={search} onChange={e=>setSearch(e.target.value)} placeholder="Cari nama atau jabatan..." />
        </div>
        <select value={roleF} onChange={e=>setRoleF(e.target.value)} style={{ padding:'9px 12px', borderRadius:8, border:'1.5px solid #E2E8F0', fontSize:13, color:'#334155', background:'#fff', outline:'none', cursor:'pointer' }}>
          {['Semua','Admin','Manager','Teknisi','Staff'].map(o=><option key={o}>{o}</option>)}
        </select>
      </div>

      {/* User cards grid */}
      <div className="fade-up delay-3" style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:12 }}>
        {filtered.map(u=>(
          <div key={u.id} className="card" style={{ padding:'16px 18px', display:'flex', alignItems:'center', gap:14, transition:'all 0.15s' }}
            onMouseEnter={e=>e.currentTarget.style.borderColor='#BFDBFE'}
            onMouseLeave={e=>e.currentTarget.style.borderColor='#E2E8F0'}
          >
            <div style={{ width:44, height:44, borderRadius:'50%', background:`linear-gradient(135deg,${roleColor[u.role]},${roleColor[u.role]}88)`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:14, fontWeight:800, color:'#fff', flexShrink:0 }}>{u.avatar}</div>
            <div style={{ flex:1 }}>
              <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:3 }}>
                <p style={{ fontSize:14, fontWeight:700, color:'#0F172A' }}>{u.nama}</p>
                <span style={{ fontSize:10, fontWeight:700, padding:'2px 7px', borderRadius:99, background:roleBg[u.role], color:roleColor[u.role] }}>{u.role}</span>
              </div>
              <p style={{ fontSize:12, color:'#64748B' }}>{u.jabatan} · {u.bidang}</p>
              <p style={{ fontSize:11, color:'#94A3B8', marginTop:2 }}>Terdaftar: {u.tgl}</p>
            </div>
            <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-end', gap:6 }}>
              <span className={`badge ${u.status==='Aktif'?'badge-active':'badge-inactive'}`}>{u.status}</span>
              <button className="btn btn-outline btn-sm" style={{ padding:'4px 10px' }}><Edit size={11}/></button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      {showModal && (
        <div style={{ position:'fixed', inset:0, background:'rgba(15,23,42,0.5)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:100, backdropFilter:'blur(4px)' }} onClick={()=>setShowModal(false)}>
          <div className="card" style={{ width:500, padding:'24px' }} onClick={e=>e.stopPropagation()}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:20 }}>
              <h3 style={{ fontSize:16, fontWeight:800, color:'#0F172A' }}>Tambah User Baru</h3>
              <button onClick={()=>setShowModal(false)} style={{ background:'none', border:'none', cursor:'pointer', color:'#94A3B8' }}><X size={18}/></button>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
              {[['Nama Lengkap','text','Nama + gelar'],['NIP','text','Nomor Induk Pegawai'],['Jabatan','text','Jabatan struktural'],['Bidang / Unit','text','Nama bidang'],['Username','text','Untuk login'],['Password','password','Min. 8 karakter'],['Role','select',''],['Status','select2','']].map(([l,t,p],i)=>(
                <div key={i}>
                  <label className="label">{l}</label>
                  {t==='select' ? (
                    <select className="input" style={{ cursor:'pointer' }}>{['Admin','Manager','Teknisi','Staff'].map(o=><option key={o}>{o}</option>)}</select>
                  ) : t==='select2' ? (
                    <select className="input" style={{ cursor:'pointer' }}>{['Aktif','Nonaktif'].map(o=><option key={o}>{o}</option>)}</select>
                  ) : <input className="input" type={t} placeholder={p} />}
                </div>
              ))}
            </div>
            <div style={{ display:'flex', gap:8, justifyContent:'flex-end', marginTop:16 }}>
              <button className="btn btn-outline" onClick={()=>setShowModal(false)}>Batal</button>
              <button className="btn btn-primary" onClick={()=>setShowModal(false)}><Plus size={13}/> Tambah User</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
