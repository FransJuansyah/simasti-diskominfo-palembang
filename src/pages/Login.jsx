import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Lock, User } from 'lucide-react'

export default function Login() {
  const [show, setShow] = useState(false)
  const [form, setForm] = useState({ username:'', password:'' })
  const navigate = useNavigate()

  const handleLogin = e => {
    e.preventDefault()
    navigate('/dashboard')
  }

  return (
    <div style={{ minHeight:'100vh', display:'flex', background:'#F1F5F9' }}>

      {/* Left panel */}
      <div style={{ width:'45%', background:'linear-gradient(160deg,#0F172A 0%,#1E3A8A 60%,#1D4ED8 100%)', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'40px', position:'relative', overflow:'hidden' }}>
        {/* Decorative circles */}
        <div style={{ position:'absolute', width:300, height:300, borderRadius:'50%', border:'1px solid rgba(255,255,255,0.07)', top:-80, right:-80 }} />
        <div style={{ position:'absolute', width:200, height:200, borderRadius:'50%', border:'1px solid rgba(255,255,255,0.05)', bottom:40, left:-60 }} />
        <div style={{ position:'absolute', width:150, height:150, borderRadius:'50%', background:'rgba(59,130,246,0.1)', top:'40%', left:'10%' }} />

        <div style={{ position:'relative', zIndex:1, textAlign:'center', maxWidth:320 }}>
          {/* Logo Kominfo */}
          <div style={{ width:90, height:90, borderRadius:20, overflow:'hidden', margin:'0 auto 20px', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <img src="/kominfo_logo.png" alt="Logo Kominfo" style={{ width:'100%', height:'100%', objectFit:'cover',  }} />
          </div>
          <h1 style={{ fontSize:22, fontWeight:800, color:'#fff', marginBottom:8, letterSpacing:'-0.3px' }}>SIMASTI</h1>
          <p style={{ fontSize:13, color:'rgba(255,255,255,0.55)', fontWeight:500, lineHeight:1.6, marginBottom:32 }}>
            Sistem Manajemen Aset<br />Teknologi Informasi
          </p>
          <div style={{ background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.12)', borderRadius:12, padding:'16px 20px', textAlign:'left' }}>
            <p style={{ fontSize:11, fontWeight:700, color:'rgba(255,255,255,0.4)', letterSpacing:'0.06em', textTransform:'uppercase', marginBottom:6 }}>Dikembangkan untuk</p>
            <p style={{ fontSize:14, fontWeight:700, color:'rgba(255,255,255,0.85)' }}>Dinas Komunikasi dan<br />Informatika Kota Palembang</p>
            <p style={{ fontSize:11, color:'rgba(255,255,255,0.35)', marginTop:6 }}>Versi 1.0.0 · Februari 2022</p>
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', padding:'40px' }}>
        <div style={{ width:'100%', maxWidth:380 }}>
          <div style={{ marginBottom:32 }}>
            <h2 style={{ fontSize:24, fontWeight:800, color:'#0F172A', marginBottom:6, letterSpacing:'-0.4px' }}>Masuk ke Sistem</h2>
            <p style={{ fontSize:14, color:'#64748B', fontWeight:500 }}>Gunakan akun yang telah didaftarkan admin</p>
          </div>

          <form onSubmit={handleLogin} style={{ display:'flex', flexDirection:'column', gap:18 }}>
            <div>
              <label className="label">Username / NIP</label>
              <div style={{ position:'relative' }}>
                <User size={15} style={{ position:'absolute', left:13, top:'50%', transform:'translateY(-50%)', color:'#94A3B8' }} />
                <input className="input" style={{ paddingLeft:38 }} value={form.username} onChange={e=>setForm(p=>({...p,username:e.target.value}))} placeholder="Masukkan username..." />
              </div>
            </div>
            <div>
              <label className="label">Password</label>
              <div style={{ position:'relative' }}>
                <Lock size={15} style={{ position:'absolute', left:13, top:'50%', transform:'translateY(-50%)', color:'#94A3B8' }} />
                <input className="input" style={{ paddingLeft:38, paddingRight:38 }} type={show?'text':'password'} value={form.password} onChange={e=>setForm(p=>({...p,password:e.target.value}))} placeholder="Masukkan password..." />
                <button type="button" onClick={()=>setShow(p=>!p)} style={{ position:'absolute', right:12, top:'50%', transform:'translateY(-50%)', background:'none', border:'none', cursor:'pointer', color:'#94A3B8', display:'flex' }}>
                  {show ? <EyeOff size={15}/> : <Eye size={15}/>}
                </button>
              </div>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width:'100%', justifyContent:'center', padding:'12px', fontSize:14, marginTop:4 }}>
              <Lock size={15} /> Masuk ke Sistem
            </button>
          </form>

          {/* Demo hint */}
          <div style={{ marginTop:24, background:'#EFF6FF', border:'1px solid #BFDBFE', borderRadius:10, padding:'12px 14px' }}>
            <p style={{ fontSize:11, fontWeight:700, color:'#1E40AF', marginBottom:4 }}>Demo Login</p>
            <p style={{ fontSize:12, color:'#3B82F6' }}>Username: <strong>admin</strong> · Password: <strong>diskominfo2022</strong></p>
          </div>

          <p style={{ textAlign:'center', marginTop:28, fontSize:11, color:'#94A3B8', lineHeight:1.6 }}>
            © 2022 Diskominfo Kota Palembang<br />Hak Cipta Dilindungi Undang-Undang
          </p>
        </div>
      </div>
    </div>
  )
}
