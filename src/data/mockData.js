// ── ASET IT ──────────────────────────────────────────────
export const asetData = [
  { id:'AST-001', nama:'Laptop Dell Latitude 5420',   kategori:'Laptop',  merk:'Dell',    sn:'DELL-5420-001', kondisi:'Baik',    status:'Aktif',     lokasi:'Ruang Server',       pic:'Andi Saputra',    tgl:'10 Feb 2022', harga:12500000 },
  { id:'AST-002', nama:'PC Desktop HP EliteDesk 800', kategori:'PC',      merk:'HP',      sn:'HP-ED800-002',  kondisi:'Baik',    status:'Dipinjam',  lokasi:'Bidang e-Government',pic:'Budi Santoso',    tgl:'10 Feb 2022', harga:9800000 },
  { id:'AST-003', nama:'Printer Canon LBP6030',       kategori:'Printer', merk:'Canon',   sn:'CNX-6030-003',  kondisi:'Baik',    status:'Aktif',     lokasi:'Bidang Aptika',      pic:'Citra Dewi',      tgl:'11 Feb 2022', harga:2200000 },
  { id:'AST-004', nama:'Laptop Lenovo ThinkPad E14',  kategori:'Laptop',  merk:'Lenovo',  sn:'LNV-E14-004',   kondisi:'Rusak',   status:'Servis',    lokasi:'Bengkel Servis',     pic:'Doni Pratama',    tgl:'11 Feb 2022', harga:11000000 },
  { id:'AST-005', nama:'Monitor LG 24 inch',          kategori:'Monitor', merk:'LG',      sn:'LG-24MK-005',   kondisi:'Baik',    status:'Aktif',     lokasi:'Ruang Kadis',        pic:'Eka Permata',     tgl:'14 Feb 2022', harga:3500000 },
  { id:'AST-006', nama:'Switch Cisco SG110-16',       kategori:'Network', merk:'Cisco',   sn:'CSC-SG110-006', kondisi:'Baik',    status:'Aktif',     lokasi:'Ruang Server',       pic:'Fajar Nugraha',   tgl:'14 Feb 2022', harga:4200000 },
  { id:'AST-007', nama:'UPS APC Back-UPS 650VA',      kategori:'UPS',     merk:'APC',     sn:'APC-650-007',   kondisi:'Baik',    status:'Aktif',     lokasi:'Ruang Server',       pic:'Gita Lestari',    tgl:'15 Feb 2022', harga:1800000 },
  { id:'AST-008', nama:'Laptop Asus ExpertBook B1',   kategori:'Laptop',  merk:'Asus',    sn:'ASUS-B1-008',   kondisi:'Baik',    status:'Aktif',     lokasi:'Bidang Sandi',       pic:'Hendra Wijaya',   tgl:'15 Feb 2022', harga:10500000 },
  { id:'AST-009', nama:'Proyektor Epson EB-X41',      kategori:'Proyektor',merk:'Epson',  sn:'EPS-X41-009',   kondisi:'Baik',    status:'Dipinjam',  lokasi:'Aula Diskominfo',    pic:'Indah Sari',      tgl:'16 Feb 2022', harga:7800000 },
  { id:'AST-010', nama:'PC Desktop Acer Veriton M',   kategori:'PC',      merk:'Acer',    sn:'ACR-VM-010',    kondisi:'Baik',    status:'Aktif',     lokasi:'Bidang IKP',         pic:'Joko Susilo',     tgl:'17 Feb 2022', harga:8900000 },
  { id:'AST-011', nama:'Printer Epson L3150',         kategori:'Printer', merk:'Epson',   sn:'EPS-L3150-011', kondisi:'Baik',    status:'Aktif',     lokasi:'Sekretariat',        pic:'Kartika Sari',    tgl:'18 Feb 2022', harga:3100000 },
  { id:'AST-012', nama:'Laptop HP ProBook 450 G8',    kategori:'Laptop',  merk:'HP',      sn:'HP-PB450-012',  kondisi:'Baik',    status:'Aktif',     lokasi:'Bidang Aptika',      pic:'Lukman Hakim',    tgl:'21 Feb 2022', harga:13200000 },
  { id:'AST-013', nama:'Router MikroTik RB4011',      kategori:'Network', merk:'MikroTik',sn:'MT-RB4011-013', kondisi:'Baik',    status:'Aktif',     lokasi:'Ruang Server',       pic:'Maya Putri',      tgl:'21 Feb 2022', harga:6500000 },
  { id:'AST-014', nama:'Scanner Fujitsu SP-1120N',    kategori:'Scanner', merk:'Fujitsu', sn:'FJS-1120-014',  kondisi:'Baik',    status:'Aktif',     lokasi:'Sekretariat',        pic:'Nando Rizki',     tgl:'22 Feb 2022', harga:4800000 },
  { id:'AST-015', nama:'Laptop Dell Inspiron 15',     kategori:'Laptop',  merk:'Dell',    sn:'DELL-INS-015',  kondisi:'Rusak Ringan', status:'Servis', lokasi:'Bengkel Servis',  pic:'Okta Hermawan',   tgl:'23 Feb 2022', harga:9200000 },
]

// ── PEMINJAMAN ────────────────────────────────────────────
export const pinjamanData = [
  { id:'PJM-001', asetId:'AST-002', aset:'PC Desktop HP EliteDesk 800', peminjam:'Ricky Fauzi',    jabatan:'Staff Bidang e-Gov',    tglPinjam:'01 Mar 2022', tglKembali:'15 Mar 2022', status:'Dikembalikan', kondisiKembali:'Baik',    keterangan:'Keperluan presentasi proyek' },
  { id:'PJM-002', asetId:'AST-009', aset:'Proyektor Epson EB-X41',      peminjam:'Sari Anggraeni', jabatan:'Kabid IKP',             tglPinjam:'07 Mar 2022', tglKembali:'09 Mar 2022', status:'Dikembalikan', kondisiKembali:'Baik',    keterangan:'Sosialisasi smart city' },
  { id:'PJM-003', asetId:'AST-005', aset:'Monitor LG 24 inch',          peminjam:'Teguh Prasetyo', jabatan:'Staff Aptika',          tglPinjam:'10 Mar 2022', tglKembali:'25 Mar 2022', status:'Terlambat',    kondisiKembali:'-',       keterangan:'Pengganti monitor rusak' },
  { id:'PJM-004', asetId:'AST-008', aset:'Laptop Asus ExpertBook B1',   peminjam:'Umi Kalsum',     jabatan:'Sekretaris Diskominfo', tglPinjam:'14 Mar 2022', tglKembali:'21 Mar 2022', status:'Dikembalikan', kondisiKembali:'Baik',    keterangan:'Rapat koordinasi provinsi' },
  { id:'PJM-005', asetId:'AST-001', aset:'Laptop Dell Latitude 5420',   peminjam:'Vino Ardian',    jabatan:'Staff IT',              tglPinjam:'21 Mar 2022', tglKembali:'04 Apr 2022', status:'Dipinjam',     kondisiKembali:'-',       keterangan:'Maintenance jaringan luar kantor' },
  { id:'PJM-006', asetId:'AST-003', aset:'Printer Canon LBP6030',       peminjam:'Wati Rahayu',    jabatan:'Staff Sekretariat',     tglPinjam:'28 Mar 2022', tglKembali:'01 Apr 2022', status:'Dikembalikan', kondisiKembali:'Baik',    keterangan:'Cetak laporan bulanan' },
  { id:'PJM-007', asetId:'AST-012', aset:'Laptop HP ProBook 450 G8',    peminjam:'Xander Putra',   jabatan:'Analis Kebijakan',      tglPinjam:'04 Apr 2022', tglKembali:'11 Apr 2022', status:'Dipinjam',     kondisiKembali:'-',       keterangan:'Survey lapangan digitalisasi' },
]

// ── MAINTENANCE ───────────────────────────────────────────
export const maintenanceData = [
  { id:'MNT-001', asetId:'AST-004', aset:'Laptop Lenovo ThinkPad E14',  jenis:'Perbaikan Hardware', teknisi:'Adi Kurniawan',  tglMasuk:'15 Feb 2022', tglSelesai:'22 Feb 2022', biaya:450000,  status:'Selesai',   keterangan:'Penggantian baterai & thermal paste', hasil:'Laptop berfungsi normal kembali' },
  { id:'MNT-002', asetId:'AST-011', aset:'Printer Epson L3150',         jenis:'Cleaning Head',      teknisi:'Beni Saputra',  tglMasuk:'17 Feb 2022', tglSelesai:'18 Feb 2022', biaya:150000,  status:'Selesai',   keterangan:'Cetakan bergaris, head tersumbat',    hasil:'Kualitas cetak normal' },
  { id:'MNT-003', asetId:'AST-007', aset:'UPS APC Back-UPS 650VA',      jenis:'Ganti Baterai',      teknisi:'Cahyo Wibowo',  tglMasuk:'01 Mar 2022', tglSelesai:'03 Mar 2022', biaya:320000,  status:'Selesai',   keterangan:'Baterai tidak dapat menyimpan daya',  hasil:'UPS berfungsi normal' },
  { id:'MNT-004', asetId:'AST-015', aset:'Laptop Dell Inspiron 15',     jenis:'Perbaikan Software', teknisi:'Dedi Santoso',  tglMasuk:'08 Mar 2022', tglSelesai:'10 Mar 2022', biaya:200000,  status:'Selesai',   keterangan:'OS korup, install ulang Windows 10',   hasil:'Sistem berjalan normal' },
  { id:'MNT-005', asetId:'AST-006', aset:'Switch Cisco SG110-16',       jenis:'Konfigurasi Ulang',  teknisi:'Eko Susanto',   tglMasuk:'15 Mar 2022', tglSelesai:'15 Mar 2022', biaya:0,       status:'Selesai',   keterangan:'Konfigurasi VLAN untuk jaringan baru', hasil:'Jaringan terkonfigurasi' },
  { id:'MNT-006', asetId:'AST-013', aset:'Router MikroTik RB4011',      jenis:'Upgrade Firmware',   teknisi:'Farid Hidayat', tglMasuk:'22 Mar 2022', tglSelesai:'22 Mar 2022', biaya:0,       status:'Selesai',   keterangan:'Firmware versi lama, perlu update',    hasil:'Firmware terbaru terpasang' },
  { id:'MNT-007', asetId:'AST-004', aset:'Laptop Lenovo ThinkPad E14',  jenis:'Perbaikan Hardware', teknisi:'Adi Kurniawan',  tglMasuk:'28 Mar 2022', tglSelesai:null,          biaya:0,       status:'Proses',    keterangan:'Keyboard tidak responsif sebagian',    hasil:'-' },
  { id:'MNT-008', asetId:'AST-015', aset:'Laptop Dell Inspiron 15',     jenis:'Perbaikan Hardware', teknisi:'Ganda Pratama', tglMasuk:'05 Apr 2022', tglSelesai:null,          biaya:0,       status:'Menunggu',  keterangan:'Layar retak, perlu ganti panel LCD',   hasil:'-' },
]

// ── USERS ─────────────────────────────────────────────────
export const usersData = [
  { id:'USR-001', nama:'Ahmad Fauzi, S.Kom',    jabatan:'Kepala Dinas',          bidang:'Pimpinan',        role:'Admin',     status:'Aktif', tgl:'01 Feb 2022', avatar:'AF' },
  { id:'USR-002', nama:'Budi Raharja, M.T.',    jabatan:'Sekretaris',            bidang:'Sekretariat',     role:'Admin',     status:'Aktif', tgl:'01 Feb 2022', avatar:'BR' },
  { id:'USR-003', nama:'Candra Wijaya, S.T.',   jabatan:'Kepala Bidang Aptika',  bidang:'Aptika',          role:'Manager',   status:'Aktif', tgl:'01 Feb 2022', avatar:'CW' },
  { id:'USR-004', nama:'Diana Permata, S.Kom',  jabatan:'Kepala Bidang IKP',     bidang:'IKP',             role:'Manager',   status:'Aktif', tgl:'01 Feb 2022', avatar:'DP' },
  { id:'USR-005', nama:'Eko Prasetyo, S.T.',    jabatan:'Staff IT Senior',       bidang:'Aptika',          role:'Staff',     status:'Aktif', tgl:'07 Feb 2022', avatar:'EP' },
  { id:'USR-006', nama:'Fitri Handayani',       jabatan:'Staff Administrasi',    bidang:'Sekretariat',     role:'Staff',     status:'Aktif', tgl:'07 Feb 2022', avatar:'FH' },
  { id:'USR-007', nama:'Gunawan Saputra, S.T.', jabatan:'Teknisi Jaringan',      bidang:'Aptika',          role:'Teknisi',   status:'Aktif', tgl:'07 Feb 2022', avatar:'GS' },
  { id:'USR-008', nama:'Heni Marlina',          jabatan:'Staff e-Government',    bidang:'e-Government',    role:'Staff',     status:'Aktif', tgl:'10 Feb 2022', avatar:'HM' },
  { id:'USR-009', nama:'Irwan Budiman, S.Kom',  jabatan:'Analis Sistem',         bidang:'Aptika',          role:'Teknisi',   status:'Aktif', tgl:'10 Feb 2022', avatar:'IB' },
  { id:'USR-010', nama:'Julia Sari',            jabatan:'Staff Sandi & Kripto',  bidang:'Persandian',      role:'Staff',     status:'Nonaktif', tgl:'14 Feb 2022', avatar:'JS' },
]

// ── SUMMARY STATS ─────────────────────────────────────────
export const summaryStats = {
  totalAset: 15,
  aktif: 10,
  dipinjam: 2,
  servis: 2,
  rusak: 1,
  nilaiTotal: 123700000,
  pinjamanAktif: 2,
  maintenanceBerjalan: 2,
}

export const chartAsetKategori = [
  { name:'Laptop',    total:5, color:'#1E40AF' },
  { name:'PC',        total:2, color:'#0EA5E9' },
  { name:'Printer',   total:2, color:'#059669' },
  { name:'Network',   total:2, color:'#7C3AED' },
  { name:'Monitor',   total:1, color:'#D97706' },
  { name:'Lainnya',   total:3, color:'#64748B' },
]

export const chartBulanan = [
  { bulan:'Okt 21', masuk:2, keluar:0 },
  { bulan:'Nov 21', masuk:3, keluar:1 },
  { bulan:'Des 21', masuk:1, keluar:0 },
  { bulan:'Jan 22', masuk:4, keluar:1 },
  { bulan:'Feb 22', masuk:8, keluar:0 },
  { bulan:'Mar 22', masuk:2, keluar:2 },
  { bulan:'Apr 22', masuk:1, keluar:0 },
]
