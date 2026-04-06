# 🎓 UNKLAB Academic Analytics Dashboard

**Mata Kuliah:** Data Visualisasi Sistem Informasi  
**Institusi:** Universitas Klabat (UNKLAB)  
**Judul Proyek:** Sistem Analitik Akademik & Pemantauan Mahasiswa Rawan DO

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Recharts](https://img.shields.io/badge/recharts-FF6384.svg?style=for-the-badge&logo=chart.js&logoColor=white)

---

## 1. Latar Belakang & Deskripsi Proyek

Dalam merespons tingginya kebutuhan analisis data pendidikan, proyek ini menghadirkan **Dashboard Analitik Akademik** yang berfungsi sebagai **Panel Pemantauan Mahasiswa Rawan DO (Academic Watchlist)**. Sistem ini mendeteksi dini performa akademik yang menurun, menganalisis tren kehadiran (absensi), serta memvisualisasikan demografi sebaran fakultas di Universitas Klabat.

Dashboard dibangun menggunakan gaya desain **Neo-Brutalism** — ditandai dengan *hard borders*, tipografi agresif, kontras warna tinggi, dan ikon tebal — agar data kritis terkait peringatan DO dan IPR segera menarik perhatian pengguna.

### Data yang Digunakan:
- **Data Real:** Total mahasiswa aktif (**4.038**) bersumber dari [PDDIKTI Kemendikti](https://pddikti.kemdikbud.go.id), Semester Ganjil 2025/2026.
- **Data Simulasi:** IPK, absensi, dan daftar mahasiswa rawan DO (sesuai ketentuan tugas poin 1.c), namun dirancang secara matematis agar sinkron 100% dengan aturan resmi **Buku Panduan Akademik UNKLAB**.

---

## 2. Fitur Visualisasi Wajib

| # | Tipe Visualisasi | Deskripsi |
|---|---|---|
| 📈 | **Line/Area Chart (Tren)** | Laju IPK rata-rata dari Semester 1 ke 8. Menampilkan penurunan IPK di titik transisi MK Major (Sem 4–5) dan pemulihan natural (Sem 6–8). Dilengkapi **ReferenceLine** batas IPR 2.30. |
| 📊 | **Bar Chart (Perbandingan)** | Distribusi tingkat absensi per hari kerja. Mengungkap fenomena "Long Weekend" di hari Jumat (342 sesi) dan Senin (287 sesi). |
| 🥧 | **Pie Chart (Distribusi)** | Proporsi mahasiswa per rumpun fakultas berdasarkan data PDDIKTI. Dapat di-**flip** untuk melihat angka rinci per fakultas. |
| 📋 | **Data Table** | Academic Watchlist berisi 5 mahasiswa prioritas tertinggi dengan profil lengkap: IPK, absen MK terburuk, status IPR, dan level risiko DO. |

---

## 3. Panel KPI (Key Performance Indicators)

| KPI | Nilai | Sumber |
|---|---|---|
| Total Mahasiswa Aktif | **4.038** | PDDIKTI Ganjil 2025 |
| Rata-Rata IPK Kampus | **2.98** | Rata-rata 8 semester (sinkron dengan Area Chart) |
| Mahasiswa Berstatus IPR | **12.8%** (517 orang) | IPK < 2.30 (Buku Panduan UNKLAB) |
| Lulus Tepat Waktu | **71.6%** | Batas maks S1: 14 semester |

---

## 4. Ekstraksi Insight & Rekomendasi

### Insight Utama:
IPK rata-rata mahasiswa mengalami penurunan signifikan sebesar **-0.37 poin** dari Semester 3 (3.02) ke Semester 5 (2.65). Penurunan ini terjadi saat transisi dari matakuliah umum ke matakuliah inti major. Saat ini **517 mahasiswa** (12.8%) berstatus IPR dengan IPK di bawah 2.30.

### Anomali Kehadiran:
Hari Jumat mencatat **342 sesi absen** (tertinggi), menunjukkan fenomena "Long Weekend". Total **87 mahasiswa** terancam nilai WF otomatis karena melebihi batas absen 20%.

### Rekomendasi:
Dari 517 mahasiswa IPR, **62 orang** telah berstatus IPR selama 3 semester berturut-turut. Dekan wajib melakukan pembinaan intensif sebelum semester ke-4 yang berujung Diskualifikasi Akademis (DO).

---

## 5. Tech Stack

| Teknologi | Versi | Fungsi |
|---|---|---|
| React | 19.x | UI Component Library |
| Vite | 6.x | Build Tool & Dev Server |
| TypeScript | 5.x | Type Safety |
| Tailwind CSS | 4.x | Utility-First CSS Framework |
| Recharts | 2.x | Chart Rendering (Area, Bar, Pie) |
| Lucide React | Latest | Icon Library |

---

## 6. Cara Menjalankan

```bash
# Clone repository
git clone https://github.com/koyoirmando/davismp.git

# Install dependencies
npm install

# Jalankan development server
npm run dev
```

Buka `http://localhost:5173` di browser.

---

## 7. Struktur File

```
src/
├── App.tsx                    # Komponen utama dashboard + logika interaktif
├── index.css                  # Sistem desain Neo-Brutalism + animasi
├── data/
│   └── universityData.ts      # Pusat data (KPI, IPK, absensi, mahasiswa)
└── pages/
    ├── Line.tsx               # Area Chart — Tren IPK per Semester
    ├── Bar.tsx                # Bar Chart — Absensi per Hari
    └── Pie.tsx                # Pie Chart — Distribusi Fakultas
```

---

## 8. Fitur Interaktif

Dashboard ini dilengkapi **9 fitur interaktif** yang meningkatkan pengalaman pengguna:

| # | Fitur | Teknologi | Deskripsi |
|---|---|---|---|
| 1 | **Animated Counter KPI** | `requestAnimationFrame` | Angka KPI berjalan dari 0 ke nilai target saat halaman dimuat |
| 2 | **3D Flip Card** | CSS `transform-style: preserve-3d` | Klik ikon buku pada Pie Chart → card berputar 180° menampilkan tabel angka |
| 3 | **Toggle Grafik Step/Smooth** | React State | Ubah gaya garis Area Chart antara mode siku-siku dan mulus |
| 4 | **ReferenceLine IPR 2.30** | Recharts `ReferenceLine` | Garis merah putus-putus pada Area Chart sebagai indikator batas bahaya |
| 5 | **Dark Mode Toggle** | CSS Custom Properties + Body Class | Seluruh dashboard bertransformasi ke mode gelap dengan satu klik |
| 6 | **Fullscreen Modal + Blur** | CSS `backdrop-filter: blur(8px)` | Klik judul chart → chart membesar ke tengah layar dengan backdrop blur |
| 7 | **Staggered Entrance Animation** | CSS `@keyframes` + `animation-delay` | Setiap komponen muncul berurutan saat halaman dimuat |
| 8 | **Auto-Replay on Focus** | Page Visibility API + Window Focus | Animasi replay otomatis saat pengguna kembali dari tab/window lain |
| 9 | **Keyboard Shortcuts** | `KeyboardEvent` Listener | Tekan `?` untuk melihat semua shortcut |

---

## 9. Keyboard Shortcuts

| Tombol | Aksi |
|:---:|---|
| `D` | Toggle Dark / Light Mode |
| `1` | Fullscreen — Tren IPK per Semester |
| `2` | Fullscreen — Distribusi Mahasiswa per Fakultas |
| `3` | Fullscreen — Rekapitulasi Absensi per Hari |
| `4` | Fullscreen — Panel Wawasan Sistem |
| `5` | Fullscreen — Tabel Pantauan Rawan DO |
| `F` | Flip Card Distribusi Fakultas |
| `?` | Tampilkan Panel Keyboard Shortcuts |
| `Esc` | Tutup Modal / Panel |

---

**© 2025 — Tugas Mata Kuliah Data Visualisasi, Universitas Klabat**
