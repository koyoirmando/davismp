// ============================================================
// DATA ANALITIK AKADEMIK UNIVERSITAS KLABAT (UNKLAB)
// Semester Ganjil 2025/2026
// ============================================================
//
// SUMBER DATA:
// - Total mahasiswa: PDDIKTI Kemendikti (Ganjil 2025) = 4.038
// - Distribusi fakultas: Dihitung dari data PDDIKTI per Prodi
// - IPK, absensi, status IPR: Data simulasi (dummy) sesuai 
//   Ketentuan Tugas poin 1.c
//
// ATURAN KUNCI BUKU PANDUAN UNKLAB:
// ┌──────────────────────────────────────────────────────┐
// │ IPR = IPK Kumulatif < 2.30                           │
// │ 4 semester IPR berturut = Diskualifikasi (DO)        │
// │ Absen > 20% pertemuan = WF (Withdraw Failure)        │
// │   → MK 3 SKS = maks 7 absen                         │
// │   → MK 2 SKS = maks 4 absen                         │
// │ 3x terlambat = 1 absen                              │
// │ Lulus: IPK min 2.30, Major/Minor min 2.55            │
// │ Masa studi maks S1 = 14 semester                     │
// └──────────────────────────────────────────────────────┘
// ============================================================

export interface AtRiskStudent {
  id: string;
  nim: string;
  name: string;
  faculty: 'Ilmu Komputer' | 'Ekonomi & Bisnis' | 'Keperawatan' | 'Filsafat';
  semester: number;
  absences: number;       // Absen pada MK terburuk semester ini (MK 3 SKS, batas maks = 7)
  currentGPA: number;     // IPK Kumulatif saat ini
  iprCount: number;       // Jumlah semester berturut-turut berstatus IPR
  riskLevel: 'Kritis' | 'Tinggi' | 'Sedang';
  status: string;         // Ringkasan status berdasarkan Buku Panduan
}

// ============================================================
// KPI RINGKASAN — Semester Ganjil 2025/2026
// ============================================================
// Perhitungan:
//   IPR = 12.8% × 4.038 = 517 mahasiswa
//   Lulus tepat waktu = 71.6% (dari angkatan yang harusnya lulus tahun ini)
// ============================================================
export const kpiData = {
  totalActiveStudents: 4038,        // PDDIKTI Ganjil 2025 (18 Prodi aktif)
  averageUniversityGPA: 2.98,       // Simulasi: rerata IPK seluruh mahasiswa
  dropoutRiskRate: 12.8,            // 517 dari 4.038 mahasiswa berstatus IPR
  onTimeGraduationRate: 71.6,       // Persentase lulus dalam ≤ 14 semester
};

// ============================================================
// AREA CHART — Tren Rata-rata IPK per Tingkat Semester
// ============================================================
// Pola: IPK menurun signifikan di Semester 3→5 saat mahasiswa
// berpindah dari matakuliah umum ke matakuliah inti major.
//
// Rata-rata keseluruhan 8 semester:
// (3.28+3.15+3.02+2.78+2.65+2.82+3.05+3.12) / 8 = 2.98
// → Konsisten dengan kpiData.averageUniversityGPA = 2.98 ✓
// ============================================================
export const gpaTrendData = [
  { semester: 'Sem 1', gpa: 3.28 },  // MK umum (Agama, Bahasa Inggris) → relatif mudah
  { semester: 'Sem 2', gpa: 3.15 },  // Mulai ada MK prasyarat
  { semester: 'Sem 3', gpa: 3.02 },  // Transisi awal ke MK major
  { semester: 'Sem 4', gpa: 2.78 },  // Beban MK major meningkat tajam
  { semester: 'Sem 5', gpa: 2.65 },  // TITIK TERENDAH — beban SKS major penuh
  { semester: 'Sem 6', gpa: 2.82 },  // Pemulihan — mahasiswa lemah sudah DO/pindah prodi
  { semester: 'Sem 7', gpa: 3.05 },  // Yang bertahan makin kompeten
  { semester: 'Sem 8', gpa: 3.12 },  // Semester akhir — fokus skripsi, beban MK berkurang
];

// ============================================================
// BAR CHART — Rekapitulasi Absensi per Hari (Seluruh Fakultas)
// ============================================================
// Total absen per hari = jumlah kali mahasiswa tidak hadir di 
// seluruh sesi perkuliahan hari tersebut.
//
// Pola: Senin & Jumat tertinggi.
// - Senin: efek akhir pekan + 3x terlambat dihitung 1 absen
// - Jumat: fenomena "Long Weekend" — mahasiswa pulang lebih awal
//
// Total mingguan: 287+134+118+156+342 = 1.037 sesi absen
// Dari ~4.038 mhs × ~3 MK/hari = ~12.114 sesi → tingkat absen ~8.6%
// ============================================================
export const dailyAbsenceData = [
  { day: 'Sen', absences: 287 },  // Tinggi — efek akhir pekan, keterlambatan
  { day: 'Sel', absences: 134 },  // Normal
  { day: 'Rab', absences: 118 },  // Terendah — jadwal paling penuh
  { day: 'Kam', absences: 156 },  // Naik menjelang akhir pekan
  { day: 'Jum', absences: 342 },  // TERTINGGI — fenomena Long Weekend
];

// ============================================================
// PIE CHART — Distribusi Mahasiswa Aktif per Rumpun Fakultas
// ============================================================
// Sumber: PDDIKTI Ganjil 2025 — dihitung dari jumlah per Prodi
//
// FEB: Akuntansi(537) + Manajemen S1(671) + S2(102) + Sekretari(15) = 1.325
// FIK: Informatika(567) + Sistem Informasi(434) + Tek.Informasi(88) = 1.089
// FK:  Ilmu Keperawatan(778) + Profesi Ners(189)                   = 967
// FF+: Filsafat(290) + Teologi(38) + Pend.Agama(60) + Pend.B.Ing(163)
//      + Pend.Ekonomi(45) + PLS(3) + Agroteknologi(19) + Arsitektur(39) = 657
//                                                             TOTAL: 4.038 ✓
// ============================================================
export const facultyDistribution = [
  { faculty: 'Ekonomi & Bisnis', value: 33 },     // 1.325 mahasiswa (terbesar)
  { faculty: 'Ilmu Komputer', value: 27 },         // 1.089 mahasiswa
  { faculty: 'Keperawatan', value: 24 },           // 967 mahasiswa
  { faculty: 'Filsafat & Lainnya', value: 16 },   // 657 mahasiswa
];

// ============================================================
// TABEL — Daftar Pantauan Mahasiswa Rawan DO (Top 5 Prioritas)
// ============================================================
// Dari 517 mahasiswa IPR, dipilih 5 kasus paling kritis.
//
// Klasifikasi risiko:
// ┌─────────┬──────────────────────────────────────────────────┐
// │ KRITIS  │ IPK < 2.00 DAN/ATAU IPR ≥ 3 semester            │
// │ TINGGI  │ IPK 2.00–2.29 (zona IPR) + faktor pemberat      │
// │ SEDANG  │ IPK 2.30–2.54 (di bawah batas major 2.55)       │
// └─────────┴──────────────────────────────────────────────────┘
//
// Kolom "absences" = jumlah absen pada MK terburuk (3 SKS, maks 7)
// Jika > 7 → otomatis WF pada MK tersebut
// ============================================================
export const atRiskStudents: AtRiskStudent[] = [
  { 
    id: 'S001', nim: '21552019', name: 'Reymond T.', 
    faculty: 'Ilmu Komputer', semester: 7, absences: 8,
    currentGPA: 1.82, iprCount: 3,
    riskLevel: 'Kritis', 
    status: 'IPR 3 Semester · 1 Lagi = DO'
  },
  { 
    id: 'S002', nim: '22622073', name: 'Priscilla M.', 
    faculty: 'Ekonomi & Bisnis', semester: 5, absences: 9,
    currentGPA: 1.95, iprCount: 2,
    riskLevel: 'Kritis', 
    status: 'IPR 2 Semester · WF 2 Matakuliah'
  },
  { 
    id: 'S003', nim: '22142056', name: 'Feby L.', 
    faculty: 'Keperawatan', semester: 6, absences: 7,
    currentGPA: 2.15, iprCount: 2,
    riskLevel: 'Tinggi', 
    status: 'IPR 2 Semester · Absen Tepat di Batas'
  },
  { 
    id: 'S004', nim: '20552104', name: 'Daniel K.', 
    faculty: 'Ilmu Komputer', semester: 9, absences: 5, 
    currentGPA: 2.25, iprCount: 1,
    riskLevel: 'Tinggi', 
    status: 'IPR 1 Semester · Sem 9 dari Maks 14'
  },
  { 
    id: 'S005', nim: '23752088', name: 'Grace S.', 
    faculty: 'Filsafat', semester: 4, absences: 6, 
    currentGPA: 2.42, iprCount: 0,
    riskLevel: 'Sedang', 
    status: 'IPK Major < 2.55 · Peringatan Dini'
  },
];

// ============================================================
// INSIGHTS — Wawasan & Rekomendasi (Panel Wawasan Sistem)
// ============================================================
// Setiap teks merujuk langsung ke data di atas:
//   insight     → terkait gpaTrendData + kpiData
//   trend       → terkait dailyAbsenceData
//   recommendation → terkait atRiskStudents + aturan Buku Panduan
// ============================================================
export const dashboardInsights = {
  // [POLA AKADEMIK] — terhubung ke Area Chart + KPI
  insight: "IPK rata-rata turun drastis dari 3.02 (Sem 3) ke 2.65 (Sem 5) saat transisi ke matakuliah inti major. Saat ini 517 dari 4.038 mahasiswa (12.8%) berstatus IPR dengan IPK di bawah 2.30.",
  
  // [ANOMALI KEHADIRAN] — terhubung ke Bar Chart
  trend: "Hari Jumat mencatat 342 sesi absen (tertinggi) dan Senin 287 sesi. Batas maks 7 absen per MK 3 SKS banyak terlampaui. Total 87 mahasiswa terancam nilai WF otomatis semester ini.",
  
  // [REKOMENDASI REKTORAT] — terhubung ke Tabel At-Risk
  recommendation: "Dari 517 mahasiswa IPR, sebanyak 62 orang telah berstatus IPR selama 3 semester berturut-turut. Dekan wajib memanggil mereka untuk pembinaan intensif sebelum semester ke-4 yang berujung Diskualifikasi Akademis (DO)."
};
