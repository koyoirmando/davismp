import React, { useState, useEffect } from 'react';
import { GraduationCap, AlertTriangle, Clock, TrendingDown, BookOpen, Info, Moon, Sun, X, Maximize2, Keyboard } from 'lucide-react';
import { kpiData, atRiskStudents, dashboardInsights, facultyDistribution } from './data/universityData';

// Modular charts
import LineChartComponent from './pages/Line';
import PieChartComponent from './pages/Pie';
import BarChartComponent from './pages/Bar';

// ============================================================
// Type for fullscreen modal content
// ============================================================
type ModalContent = 'line' | 'pie' | 'bar' | 'insight' | 'table' | null;

function App() {
  const [isStepChart, setIsStepChart] = useState(true);
  const [isPieFlipped, setIsPieFlipped] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [modalOpen, setModalOpen] = useState<ModalContent>(null);
  const [animKey, setAnimKey] = useState(0);
  const [showHelp, setShowHelp] = useState(false);

  // Dark mode: toggle body class
  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDark);
  }, [isDark]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      // Abaikan jika sedang mengetik di input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      
      switch (e.key) {
        case 'Escape':
          setModalOpen(null);
          setShowHelp(false);
          break;
        case 'd': case 'D':
          setIsDark(prev => !prev);
          break;
        case '1':
          setModalOpen(prev => prev === 'line' ? null : 'line');
          break;
        case '2':
          setModalOpen(prev => prev === 'pie' ? null : 'pie');
          break;
        case '3':
          setModalOpen(prev => prev === 'bar' ? null : 'bar');
          break;
        case '4':
          setModalOpen(prev => prev === 'insight' ? null : 'insight');
          break;
        case '5':
          setModalOpen(prev => prev === 'table' ? null : 'table');
          break;
        case 'f': case 'F':
          setIsPieFlipped(prev => !prev);
          break;
        case '?':
          setShowHelp(prev => !prev);
          break;
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  // Replay entrance animation when returning to window
  const wasBlurred = React.useRef(false);
  useEffect(() => {
    const onBlur = () => { wasBlurred.current = true; };
    const onFocus = () => {
      if (wasBlurred.current) {
        wasBlurred.current = false;
        setAnimKey(k => k + 1);
      }
    };
    const onVisChange = () => {
      if (document.visibilityState === 'hidden') wasBlurred.current = true;
      if (document.visibilityState === 'visible' && wasBlurred.current) {
        wasBlurred.current = false;
        setAnimKey(k => k + 1);
      }
    };

    window.addEventListener('blur', onBlur);
    window.addEventListener('focus', onFocus);
    document.addEventListener('visibilitychange', onVisChange);
    return () => {
      window.removeEventListener('blur', onBlur);
      window.removeEventListener('focus', onFocus);
      document.removeEventListener('visibilitychange', onVisChange);
    };
  }, []);

  return (
    <div className="p-6 md:p-8" key={animKey}>
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <div className="animate-enter flex flex-col md:flex-row justify-between items-start md:items-end gap-6 neo-brutal p-6" style={{ backgroundColor: isDark ? '#1a1a1a' : '#fff500', '--delay': '0.1s' } as React.CSSProperties}>
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 border-2 border-black shadow-[2px_2px_0px_#000]" style={{ backgroundColor: '#db2017' }}>
                <GraduationCap className="text-white" size={28} strokeWidth={2.5} />
              </div>
              <h1 className={`text-2xl md:text-3xl font-black tracking-tighter uppercase ${isDark ? 'text-[#fff500]' : 'text-black'}`}>Analitik Akademik</h1>
            </div>
            <p className={`text-sm font-bold uppercase tracking-wider ${isDark ? 'text-zinc-400' : 'text-black'}`}>Dashboard Visualisasi Data & Performa Akademik // UNKLAB</p>
          </div>
          {/* Header Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowHelp(!showHelp)}
              className="p-2.5 border-3 border-black shadow-[3px_3px_0px_#000] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_#000] active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
              style={{ backgroundColor: isDark ? '#5f3775' : '#ffffff' }}
              title="Keyboard Shortcuts (?)"
            >
              <Keyboard size={22} className={isDark ? 'text-white' : 'text-black'} strokeWidth={3} />
            </button>
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2.5 border-3 border-black shadow-[3px_3px_0px_#000] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_#000] active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
              style={{ backgroundColor: isDark ? '#fff500' : '#3e1b54' }}
              title={isDark ? 'Mode Terang (D)' : 'Mode Gelap (D)'}
            >
              {isDark ? <Sun size={22} className="text-black" strokeWidth={3} /> : <Moon size={22} className="text-white" strokeWidth={3} />}
            </button>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="animate-enter" style={{ '--delay': '0.3s' } as React.CSSProperties}>
            <KPICard
              title="Total Mahasiswa Aktif"
              value={kpiData.totalActiveStudents.toLocaleString()}
              icon={<GraduationCap size={20} className={isDark ? 'text-white' : 'text-black'} strokeWidth={3} />}
              trend="PDDIKTI · GANJIL 2025/2026"
              isDark={isDark}
            />
          </div>
          <div className="animate-enter" style={{ '--delay': '0.5s' } as React.CSSProperties}>
            <KPICard
              title="Rata-Rata IPK Kampus"
              value={kpiData.averageUniversityGPA.toFixed(2)}
              icon={<BookOpen size={20} className={isDark ? 'text-white' : 'text-black'} strokeWidth={3} />}
              trend="DI BAWAH TARGET 3.00"
              isDark={isDark}
            />
          </div>
          <div className="animate-enter" style={{ '--delay': '0.7s' } as React.CSSProperties}>
            <KPICard
              title="Mahasiswa Berstatus IPR"
              value={`${kpiData.dropoutRiskRate}%`}
              icon={<AlertTriangle size={20} className="text-white" strokeWidth={3} />}
              trend="517 DARI 4.038 · IPK ≤ 2.30"
              bgColor="#db2017"
              textColor="text-white"
              isDark={isDark}
            />
          </div>
          <div className="animate-enter" style={{ '--delay': '0.9s' } as React.CSSProperties}>
            <KPICard
              title="Lulus Tepat Waktu"
              value={`${kpiData.onTimeGraduationRate}%`}
              icon={<Clock size={20} className="text-black" strokeWidth={3} />}
              trend="BATAS MAKS S1: 14 SEMESTER"
              bgColor="#fff500"
              isDark={isDark}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Area Chart */}
          <div className="animate-enter neo-brutal p-5 lg:col-span-2" style={{ '--delay': '1.2s' } as React.CSSProperties}>
            <div className="flex items-center justify-between mb-6 border-b-4 border-black dark-border-invert pb-4">
              <h2 className="text-sm uppercase tracking-widest font-black dark-text-invert cursor-pointer hover:text-[#db2017] transition-colors" onClick={() => setModalOpen('line')}>
                Tren IPK per Tingkat Semester
                <Maximize2 size={12} className="inline ml-2 opacity-40" />
              </h2>
              <button
                onClick={() => setIsStepChart(!isStepChart)}
                className="p-1.5 border-2 border-transparent hover:border-black hover:bg-zinc-100 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer flex items-center justify-center rounded-sm"
                title="Ganti Mode Garis (Step/Mulus)"
              >
                <TrendingDown className="dark-text-invert" size={20} strokeWidth={3} />
              </button>
            </div>
            <div className="h-72 mt-4">
              <LineChartComponent isStep={isStepChart} isDark={isDark} />
            </div>
          </div>

          {/* Pie Chart (Flip Card) */}
          <div className="animate-enter neo-brutal flex flex-col flip-card" style={{ minHeight: '320px', '--delay': '1.4s' } as React.CSSProperties}>
            <div className={`flip-card-inner ${isPieFlipped ? 'flipped' : ''}`}>

              {/* FRONT */}
              <div className="flip-card-front p-5 flex flex-col">
                <div className="flex items-center justify-between mb-4 border-b-4 border-black dark-border-invert pb-4">
                  <h2 className="text-sm uppercase tracking-widest font-black dark-text-invert cursor-pointer hover:text-[#db2017] transition-colors" onClick={() => setModalOpen('pie')}>
                    Distribusi Mahasiswa per Fakultas
                    <Maximize2 size={12} className="inline ml-2 opacity-40" />
                  </h2>
                  <button
                    onClick={() => setIsPieFlipped(true)}
                    className="p-1.5 border-2 border-transparent hover:border-black hover:bg-zinc-100 active:translate-y-0.5 transition-all cursor-pointer rounded-sm"
                    title="Lihat Angka Detail"
                  >
                    <BookOpen className="dark-text-invert" size={20} strokeWidth={3} />
                  </button>
                </div>
                <div className="h-56 flex-grow mt-2">
                  <PieChartComponent isDark={isDark} />
                </div>
              </div>

              {/* BACK */}
              <div className={`flip-card-back p-5 flex flex-col ${isDark ? 'bg-[#1a1a1a]' : 'bg-white'}`}>
                <div className="flex items-center justify-between mb-4 border-b-4 border-black dark-border-invert pb-4">
                  <h2 className="text-sm uppercase tracking-widest font-black dark-text-invert">Rincian Jumlah Mahasiswa</h2>
                  <button
                    onClick={() => setIsPieFlipped(false)}
                    className="p-1.5 border-2 border-transparent hover:border-black hover:bg-zinc-100 active:translate-y-0.5 transition-all cursor-pointer rounded-sm"
                    title="Kembali ke Diagram"
                  >
                    <BookOpen className="dark-text-invert" size={20} strokeWidth={3} />
                  </button>
                </div>
                <div className="flex-grow flex flex-col justify-center">
                  <table className="w-full border-2 border-black dark-border-invert">
                    <thead>
                      <tr className="bg-black text-[#fff500]">
                        <th className="py-2 px-3 text-left text-[11px] font-black uppercase tracking-widest border-r-2 border-zinc-700">Fakultas</th>
                        <th className="py-2 px-3 text-center text-[11px] font-black uppercase tracking-widest border-r-2 border-zinc-700">Jumlah</th>
                        <th className="py-2 px-3 text-center text-[11px] font-black uppercase tracking-widest">Persen</th>
                      </tr>
                    </thead>
                    <tbody>
                      {facultyDistribution.map((f) => {
                        const count = Math.round((f.value / 100) * kpiData.totalActiveStudents);
                        return (
                          <tr key={f.faculty} className="border-b-2 border-black dark-border-invert hover:bg-[#fff500] hover:text-black transition-none">
                            <td className="py-3 px-3 font-black text-xs uppercase border-r-2 border-black dark-border-invert dark-text-invert">{f.faculty}</td>
                            <td className="py-3 px-3 text-center font-black text-lg border-r-2 border-black dark-border-invert dark-text-invert">{count.toLocaleString()}</td>
                            <td className="py-3 px-3 text-center">
                              <span className="neo-badge px-2 py-0.5 text-xs font-black" style={{ backgroundColor: '#fff500', color: '#000' }}>{f.value}%</span>
                            </td>
                          </tr>
                        );
                      })}
                      <tr className="bg-zinc-900 text-white">
                        <td className="py-3 px-3 font-black text-xs uppercase border-r-2 border-zinc-700">Total</td>
                        <td className="py-3 px-3 text-center font-black text-lg border-r-2 border-zinc-700">{kpiData.totalActiveStudents.toLocaleString()}</td>
                        <td className="py-3 px-3 text-center font-black text-xs">100%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4">
          {/* Insights Panel */}
          <div className="animate-enter neo-brutal p-6 lg:col-span-1 text-white" style={{ backgroundColor: isDark ? '#1e1035' : '#3e1b54', '--delay': '1.6s' } as React.CSSProperties}>
            <div className="flex items-center gap-3 mb-8 border-b-4 border-white pb-4">
              <div className="p-1.5 border-2 border-black" style={{ backgroundColor: '#fff500' }}>
                <Info size={20} className="text-black" strokeWidth={3} />
              </div>
              <h2 className="text-sm uppercase tracking-widest font-black text-[#fff500] cursor-pointer hover:text-white transition-colors" onClick={() => setModalOpen('insight')}>
                Wawasan Sistem
                <Maximize2 size={12} className="inline ml-2 opacity-40" />
              </h2>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-xs text-[#fff500] uppercase font-black tracking-widest mb-2 border-l-4 border-white pl-2">Pola Akademik</h3>
                <p className="text-white text-sm leading-relaxed font-bold">{dashboardInsights.insight}</p>
              </div>
              <div>
                <h3 className="text-xs text-[#fff500] uppercase font-black tracking-widest mb-2 border-l-4 border-white pl-2">Anomali Kehadiran</h3>
                <p className="text-white text-sm leading-relaxed font-bold">{dashboardInsights.trend}</p>
              </div>
              <div className="p-4 border-2 border-black shadow-[4px_4px_0px_#000] text-black" style={{ backgroundColor: '#fff500' }}>
                <h3 className="text-xs uppercase font-black tracking-widest mb-2 flex items-center gap-2">
                  <AlertTriangle size={16} strokeWidth={3} /> REKOMENDASI REKTORAT
                </h3>
                <p className="text-sm leading-relaxed font-black">{dashboardInsights.recommendation}</p>
              </div>
            </div>
          </div>

          {/* Right Section: Bar & Table */}
          <div className="lg:col-span-2 space-y-8 flex flex-col">

            {/* Bar Chart */}
            <div className={`animate-enter neo-brutal p-5 ${isDark ? '' : 'bg-white'}`} style={{ '--delay': '1.8s' } as React.CSSProperties}>
              <div className="flex items-center justify-between mb-6 border-b-4 border-black dark-border-invert pb-4">
                <h2 className="text-sm uppercase tracking-widest font-black dark-text-invert cursor-pointer hover:text-[#db2017] transition-colors" onClick={() => setModalOpen('bar')}>
                  Rekapitulasi Absensi per Hari
                  <Maximize2 size={12} className="inline ml-2 opacity-40" />
                </h2>
                <Clock className="dark-text-invert" size={20} strokeWidth={3} />
              </div>
              <div className="h-48">
                <BarChartComponent isDark={isDark} />
              </div>
            </div>

            {/* Data Table */}
            <div className={`animate-enter neo-brutal overflow-hidden flex-grow ${isDark ? '' : 'bg-white'}`} style={{ '--delay': '2.0s' } as React.CSSProperties}>
              <div className="p-5 border-b-4 border-black text-white flex justify-between items-center" style={{ backgroundColor: isDark ? '#2d1a45' : '#5f3775' }}>
                <h2 className="text-sm uppercase tracking-widest font-black cursor-pointer hover:text-[#fff500] transition-colors" onClick={() => setModalOpen('table')}>
                  Daftar Pantauan Rawan DO
                  <Maximize2 size={12} className="inline ml-2 opacity-40" />
                </h2>
                <span className="neo-badge text-white px-3 py-1 font-black uppercase tracking-wider text-xs" style={{ backgroundColor: '#db2017' }}>Target Prioritas</span>
              </div>
              <div className="overflow-x-auto p-2">
                <DataTable students={atRiskStudents} isDark={isDark} />
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* ============================================ */}
      {/* FULLSCREEN MODAL                              */}
      {/* ============================================ */}
      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(null)}>
          <div className="modal-content neo-brutal p-6" onClick={(e) => e.stopPropagation()} style={{ backgroundColor: isDark ? '#1a1a1a' : '#ffffff' }}>
            {/* Close button */}
            <div className="flex justify-between items-center mb-6 border-b-4 border-black dark-border-invert pb-4">
              <h2 className="text-sm uppercase tracking-widest font-black dark-text-invert">
                {modalOpen === 'line' && 'Tren IPK per Tingkat Semester'}
                {modalOpen === 'pie' && 'Distribusi Mahasiswa per Fakultas'}
                {modalOpen === 'bar' && 'Rekapitulasi Absensi per Hari'}
                {modalOpen === 'insight' && 'Wawasan Sistem'}
                {modalOpen === 'table' && 'Daftar Pantauan Rawan DO'}
              </h2>
              <button
                onClick={() => setModalOpen(null)}
                className="p-2 border-2 border-black shadow-[3px_3px_0px_#000] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_#000] active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
                style={{ backgroundColor: '#db2017' }}
              >
                <X size={18} className="text-white" strokeWidth={3} />
              </button>
            </div>

            {/* Modal Body */}
            {modalOpen === 'line' && (
              <div>
                <div className="flex justify-end mb-3">
                  <button
                    onClick={() => setIsStepChart(!isStepChart)}
                    className="px-3 py-1.5 border-2 border-black shadow-[3px_3px_0px_#000] hover:translate-y-[-1px] active:translate-y-0.5 active:shadow-none transition-all cursor-pointer font-black text-xs uppercase tracking-wider"
                    style={{ backgroundColor: '#fff500', color: '#000' }}
                  >
                    <TrendingDown size={14} className="inline mr-2" strokeWidth={3} />
                    {isStepChart ? 'Smooth' : 'Step'}
                  </button>
                </div>
                <div className="h-[500px]">
                  <LineChartComponent isStep={isStepChart} isDark={isDark} />
                </div>
              </div>
            )}
            {modalOpen === 'pie' && (
              <div>
                <div className="flex justify-end mb-3">
                  <button
                    onClick={() => setIsPieFlipped(!isPieFlipped)}
                    className="px-3 py-1.5 border-2 border-black shadow-[3px_3px_0px_#000] hover:translate-y-[-1px] active:translate-y-0.5 active:shadow-none transition-all cursor-pointer font-black text-xs uppercase tracking-wider"
                    style={{ backgroundColor: '#fff500', color: '#000' }}
                  >
                    <BookOpen size={14} className="inline mr-2" strokeWidth={3} />
                    {isPieFlipped ? 'Lihat Diagram' : 'Lihat Angka'}
                  </button>
                </div>
                {!isPieFlipped ? (
                  <div className="h-[500px]">
                    <PieChartComponent isDark={isDark} large={true} />
                  </div>
                ) : (
                  <table className="w-full border-2 border-black dark-border-invert">
                    <thead>
                      <tr className="bg-black text-[#fff500]">
                        <th className="py-3 px-4 text-left text-[11px] font-black uppercase tracking-widest border-r-2 border-zinc-700">Fakultas</th>
                        <th className="py-3 px-4 text-center text-[11px] font-black uppercase tracking-widest border-r-2 border-zinc-700">Jumlah</th>
                        <th className="py-3 px-4 text-center text-[11px] font-black uppercase tracking-widest">Persen</th>
                      </tr>
                    </thead>
                    <tbody>
                      {facultyDistribution.map((f) => {
                        const count = Math.round((f.value / 100) * kpiData.totalActiveStudents);
                        return (
                          <tr key={f.faculty} className="border-b-2 border-black dark-border-invert hover:bg-[#fff500] hover:text-black transition-none">
                            <td className="py-4 px-4 font-black text-sm uppercase border-r-2 border-black dark-border-invert dark-text-invert">{f.faculty}</td>
                            <td className="py-4 px-4 text-center font-black text-2xl border-r-2 border-black dark-border-invert dark-text-invert">{count.toLocaleString()}</td>
                            <td className="py-4 px-4 text-center">
                              <span className="neo-badge px-3 py-1 text-sm font-black" style={{ backgroundColor: '#fff500', color: '#000' }}>{f.value}%</span>
                            </td>
                          </tr>
                        );
                      })}
                      <tr className="bg-zinc-900 text-white">
                        <td className="py-4 px-4 font-black text-sm uppercase border-r-2 border-zinc-700">Total</td>
                        <td className="py-4 px-4 text-center font-black text-2xl border-r-2 border-zinc-700">{kpiData.totalActiveStudents.toLocaleString()}</td>
                        <td className="py-4 px-4 text-center font-black text-sm">100%</td>
                      </tr>
                    </tbody>
                  </table>
                )}
              </div>
            )}
            {modalOpen === 'bar' && (
              <div className="h-[500px]">
                <BarChartComponent isDark={isDark} />
              </div>
            )}
            {modalOpen === 'insight' && (
              <div className="space-y-6 text-white p-4 border-2 border-black" style={{ backgroundColor: '#3e1b54' }}>
                <div>
                  <h3 className="text-sm text-[#fff500] uppercase font-black tracking-widest mb-3 border-l-4 border-white pl-3">Pola Akademik</h3>
                  <p className="text-white text-base leading-relaxed font-bold">{dashboardInsights.insight}</p>
                </div>
                <hr className="border-white/20" />
                <div>
                  <h3 className="text-sm text-[#fff500] uppercase font-black tracking-widest mb-3 border-l-4 border-white pl-3">Anomali Kehadiran</h3>
                  <p className="text-white text-base leading-relaxed font-bold">{dashboardInsights.trend}</p>
                </div>
                <hr className="border-white/20" />
                <div className="p-5 border-2 border-black shadow-[4px_4px_0px_#000] text-black" style={{ backgroundColor: '#fff500' }}>
                  <h3 className="text-sm uppercase font-black tracking-widest mb-3 flex items-center gap-2">
                    <AlertTriangle size={18} strokeWidth={3} /> REKOMENDASI REKTORAT
                  </h3>
                  <p className="text-base leading-relaxed font-black">{dashboardInsights.recommendation}</p>
                </div>
              </div>
            )}
            {modalOpen === 'table' && (
              <div className="overflow-x-auto">
                <DataTable students={atRiskStudents} isDark={isDark} />
              </div>
            )}
          </div>
        </div>
      )}

      {/* ============================================ */}
      {/* KEYBOARD SHORTCUTS HELP PANEL                */}
      {/* ============================================ */}
      {showHelp && (
        <div className="modal-overlay" onClick={() => setShowHelp(false)}>
          <div className="modal-content neo-brutal p-8" onClick={(e) => e.stopPropagation()} style={{ backgroundColor: isDark ? '#1a1a1a' : '#ffffff', maxWidth: '550px' }}>
            <div className="flex justify-between items-center mb-6 border-b-4 border-black dark-border-invert pb-4">
              <div className="flex items-center gap-3">
                <Keyboard size={22} className="dark-text-invert" strokeWidth={3} />
                <h2 className="text-sm uppercase tracking-widest font-black dark-text-invert">Keyboard Shortcuts</h2>
              </div>
              <button 
                onClick={() => setShowHelp(false)}
                className="p-2 border-2 border-black shadow-[3px_3px_0px_#000] hover:translate-y-[-1px] active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
                style={{ backgroundColor: '#db2017' }}
              >
                <X size={16} className="text-white" strokeWidth={3} />
              </button>
            </div>
            
            <div className="space-y-3">
              {[
                { key: 'D', desc: 'Toggle Dark / Light Mode' },
                { key: '1', desc: 'Fullscreen — Tren IPK' },
                { key: '2', desc: 'Fullscreen — Distribusi Fakultas' },
                { key: '3', desc: 'Fullscreen — Absensi per Hari' },
                { key: '4', desc: 'Fullscreen — Wawasan Sistem' },
                { key: '5', desc: 'Fullscreen — Tabel Rawan DO' },
                { key: 'F', desc: 'Flip Card Distribusi Fakultas' },
                { key: '?', desc: 'Tampilkan / Tutup Panel Ini' },
                { key: 'Esc', desc: 'Tutup Modal / Panel' },
              ].map((s) => (
                <div key={s.key} className="flex items-center gap-4 py-2 px-3 border-2 border-black dark-border-invert hover:bg-[#fff500] hover:text-black transition-none group" style={{ boxShadow: '2px 2px 0px ' + (isDark ? '#333' : '#000') }}>
                  <kbd className="px-3 py-1.5 font-black text-sm uppercase tracking-wider border-2 border-black min-w-[50px] text-center" style={{ backgroundColor: '#fff500', color: '#000' }}>{s.key}</kbd>
                  <span className="text-sm font-bold dark-text-invert group-hover:text-black">{s.desc}</span>
                </div>
              ))}
            </div>

            <p className={`text-xs font-bold uppercase tracking-wider mt-6 pt-4 border-t-2 ${isDark ? 'border-zinc-700 text-zinc-500' : 'border-black/10 text-zinc-400'}`}>Tekan tombol mana saja untuk langsung beraksi</p>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================
// DATA TABLE COMPONENT (reusable in normal & modal view)
// ============================================================
function DataTable({ students, isDark: _isDark }: { students: typeof atRiskStudents, isDark: boolean }) {
  return (
    <table className="w-full text-left border-collapse border-2 border-black dark-border-invert">
      <thead>
        <tr className="bg-black text-[#fff500]">
          <th className="py-3 px-4 font-black uppercase tracking-widest text-[11px] border-r-2 border-zinc-700">Biodata</th>
          <th className="py-3 px-4 font-black uppercase tracking-widest text-[11px] border-r-2 border-zinc-700">Status Akademik</th>
          <th className="py-3 px-4 font-black uppercase tracking-widest text-[11px] text-center border-r-2 border-zinc-700">Absen MK Terburuk</th>
          <th className="py-3 px-4 font-black uppercase tracking-widest text-[11px] text-right">IPK Kumulatif</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student) => (
          <tr key={student.id} className="border-b-2 border-black dark-border-invert hover:bg-[#fff500] hover:text-black transition-none cursor-pointer group">
            <td className="py-4 px-4 border-r-2 border-black dark-border-invert group-hover:border-black">
              <div className="font-black text-sm uppercase dark-text-invert group-hover:text-black">{student.name}</div>
              <div className="text-[11px] text-zinc-600 font-bold group-hover:text-black">{student.nim} · Sem {student.semester}</div>
            </td>
            <td className="py-4 px-4 border-r-2 border-black dark-border-invert group-hover:border-black">
              <div className="font-bold uppercase text-xs dark-text-invert group-hover:text-black">{student.faculty}</div>
              <div className="text-[10px] text-zinc-500 font-bold mt-1 group-hover:text-black">{student.status}</div>
            </td>
            <td className="py-4 px-4 text-center border-r-2 border-black dark-border-invert group-hover:border-black">
              <span className={`font-black text-lg ${student.absences >= 7 ? 'text-[#db2017]' : ''} dark-text-invert group-hover:text-black`}>{student.absences}</span>
            </td>
            <td className="py-4 px-4 text-right group-hover:bg-transparent border-t-0">
              <span className={`neo-badge px-3 py-1 text-xs font-black uppercase inline-block
                ${student.riskLevel === 'Kritis' ? 'text-white' : 'text-black'}
              `} style={{ backgroundColor: student.riskLevel === 'Kritis' ? '#db2017' : student.riskLevel === 'Tinggi' ? '#fff500' : '#ffffff' }}>
                {student.currentGPA.toFixed(2)}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// ============================================================
// KPI CARD WITH COUNTER ANIMATION
// ============================================================
function KPICard({ title, value, icon, trend, bgColor, textColor = 'text-black', isDark }: { title: string, value: string, icon: React.ReactNode, trend: string, bgColor?: string, textColor?: string, isDark: boolean }) {
  const [displayValue, setDisplayValue] = useState('0');

  React.useEffect(() => {
    const numericString = value.replace(/[,%]/g, '');
    const target = parseFloat(numericString);
    const isPercentage = value.includes('%');
    const hasComma = value.includes(',');
    const decimalPlaces = numericString.includes('.') ? numericString.split('.')[1].length : 0;

    const duration = 2000;
    const startTime = performance.now();

    function animate(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;

      let formatted: string;
      if (decimalPlaces > 0) {
        formatted = current.toFixed(decimalPlaces);
      } else {
        formatted = Math.floor(current).toString();
      }

      if (hasComma) {
        formatted = Number(formatted).toLocaleString();
      }
      if (isPercentage) {
        formatted += '%';
      }

      setDisplayValue(formatted);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
  }, [value]);

  // Determine colors
  const hasForcedBg = !!bgColor;
  const cardBg = hasForcedBg ? bgColor : (isDark ? '#1a1a1a' : '#ffffff');
  const isLight = textColor === 'text-black';

  return (
    <div className={`neo-brutal p-6 flex flex-col justify-between ${textColor}`} style={{ backgroundColor: cardBg, color: hasForcedBg && isLight ? '#000000' : undefined }}>
      <div className="flex justify-between items-start mb-6">
        <h3 className={`text-xs uppercase tracking-widest font-black`} style={{ color: hasForcedBg && isLight ? '#333' : !isLight ? '#e4e4e7' : isDark ? '#a1a1aa' : '#64748b' }}>{title}</h3>
        <div className={`p-1.5 neo-badge ${!isLight ? 'bg-black' : isDark && !hasForcedBg ? 'bg-zinc-800' : 'bg-white'}`}>
          {icon}
        </div>
      </div>
      <div>
        <h2 className="text-5xl font-black tracking-tighter mb-3" style={{ color: hasForcedBg && isLight ? '#000000' : isDark && !hasForcedBg ? '#ffffff' : undefined }}>{displayValue}</h2>
        <p className={`text-[12px] font-black tracking-widest border-t-4 pt-3`} style={{
          color: hasForcedBg && isLight ? '#1a1a1a' : !isLight ? '#ffffff' : isDark ? '#a1a1aa' : '#1e293b',
          borderColor: !isLight ? 'rgba(255,255,255,0.3)' : hasForcedBg ? 'rgba(0,0,0,0.1)' : isDark ? '#3f3f46' : 'rgba(0,0,0,0.1)'
        }}>{trend}</p>
      </div>
    </div>
  );
}

export default App;
