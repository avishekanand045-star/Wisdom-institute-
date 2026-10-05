import React, { useState } from 'react';
import { GRADES_DATA, GradeCurriculum } from '../data/instituteData';
import { BookOpen, Clock, Users, CheckCircle, Layers, ArrowUpRight, Sparkles } from 'lucide-react';

interface GradeExplorerProps {
  onOpenDemoModal: () => void;
}

export const GradeExplorer: React.FC<GradeExplorerProps> = ({ onOpenDemoModal }) => {
  const [selectedGrade, setSelectedGrade] = useState<number>(10);
  const [selectedBoard, setSelectedBoard] = useState<'ICSE' | 'CBSE'>('ICSE');
  const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null);

  const currentGradeData: GradeCurriculum =
    GRADES_DATA.find((g) => g.grade === selectedGrade) || GRADES_DATA[4];

  return (
    <section id="classes" className="py-20 bg-slate-900/50 border-t border-b border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
              <span className="text-amber-400 uppercase tracking-wider font-mono">Academic Framework</span>
              <span aria-hidden="true">·</span>
              <span>Classes VI to X</span>
              <span aria-hidden="true">·</span>
              <span>Both ICSE & CBSE Streams</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-display [text-wrap:balance]">
              Comprehensive Class-Wise Blueprint
            </h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
              Explore syllabus depth, weekly session allocations, and textbook alignments tailored specifically
              to your student's board and grade.
            </p>
          </div>

          {/* Board Selector Segmented Control */}
          <div className="flex items-center gap-2 p-1.5 bg-slate-950/90 rounded-2xl border border-slate-800 self-start md:self-end">
            <button
              onClick={() => setSelectedBoard('ICSE')}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all ${
                selectedBoard === 'ICSE'
                  ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              ICSE Board (CISCE)
            </button>
            <button
              onClick={() => setSelectedBoard('CBSE')}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all ${
                selectedBoard === 'CBSE'
                  ? 'bg-cyan-400 text-slate-950 shadow-md shadow-cyan-400/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              CBSE Board (NCERT)
            </button>
          </div>
        </div>

        {/* Grade Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {GRADES_DATA.map((item) => {
            const isSelected = item.grade === selectedGrade;
            return (
              <button
                key={item.grade}
                onClick={() => setSelectedGrade(item.grade)}
                className={`flex-1 min-w-[130px] p-3.5 rounded-2xl border text-left transition-all relative overflow-hidden group ${
                  isSelected
                    ? selectedBoard === 'ICSE'
                      ? 'bg-slate-800/90 border-amber-400/80 shadow-lg shadow-amber-500/10'
                      : 'bg-slate-800/90 border-cyan-400/80 shadow-lg shadow-cyan-500/10'
                    : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700 text-slate-400'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span
                    className={`text-xs font-mono font-bold ${
                      isSelected
                        ? selectedBoard === 'ICSE'
                          ? 'text-amber-400'
                          : 'text-cyan-400'
                        : 'text-slate-500'
                    }`}
                  >
                    Grade {item.roman}
                  </span>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  )}
                </div>
                <div
                  className={`text-sm font-bold tracking-tight font-display ${
                    isSelected ? 'text-white' : 'text-slate-300 group-hover:text-white'
                  }`}
                >
                  {item.label}
                </div>
                <div className="text-[11px] text-slate-500 truncate mt-0.5">
                  {item.grade === 10 ? 'Board Exam Year' : item.grade === 9 ? 'Board Pre-Year' : 'Middle Foundation'}
                </div>
              </button>
            );
          })}
        </div>

        {/* Grade Detail Card with 3D Spatial Framing */}
        <div className="bg-slate-950/90 border border-slate-800 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden">
          {/* Subtle grid pattern background */}
          <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

          {/* Header Row */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-8 border-b border-slate-800/80 gap-6 relative z-10">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-2xl sm:text-3xl font-bold text-white font-display">
                  {currentGradeData.label} — {selectedBoard} Stream
                </h3>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    selectedBoard === 'ICSE'
                      ? 'bg-amber-400/10 text-amber-400 border border-amber-400/20'
                      : 'bg-cyan-400/10 text-cyan-400 border border-cyan-400/20'
                  }`}
                >
                  {selectedBoard === 'ICSE' ? 'CISCE Guideline' : 'CBSE NEP Aligned'}
                </span>
              </div>
              <p className="text-slate-300 text-sm sm:text-base">{currentGradeData.focus}</p>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-300">
              <div className="flex items-center gap-2 bg-slate-900 px-3.5 py-2 rounded-xl border border-slate-800">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>{currentGradeData.weeklyHours}</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-900 px-3.5 py-2 rounded-xl border border-slate-800">
                <Users className="w-4 h-4 text-cyan-400" />
                <span>{currentGradeData.batchSize}</span>
              </div>
              <button
                onClick={onOpenDemoModal}
                className="px-4 py-2 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all flex items-center gap-1.5 shadow-sm"
              >
                <span>Enroll in {currentGradeData.label}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Subjects Detailed Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-8 relative z-10">
            {currentGradeData.keySubjects.map((sub, idx) => (
              <div
                key={sub.name}
                onMouseEnter={() => setHoveredCardIndex(idx)}
                onMouseLeave={() => setHoveredCardIndex(null)}
                className={`p-6 rounded-2xl border transition-all duration-300 relative group ${
                  hoveredCardIndex === idx
                    ? 'bg-slate-900 border-slate-700 -translate-y-1 shadow-xl'
                    : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono text-slate-400">
                    {sub.weeklySessions} Sessions / Wk
                  </span>
                  <BookOpen className="w-4 h-4 text-amber-400/80" />
                </div>
                <h4 className="text-lg font-bold text-white mb-2 font-display">{sub.name}</h4>
                <p className="text-xs text-slate-300 leading-relaxed mb-4 min-h-[50px]">
                  {selectedBoard === 'ICSE' ? sub.icseDetails : sub.cbseDetails}
                </p>
                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Pedagogy Mode</span>
                  <span className="text-slate-300 font-medium">
                    {sub.name.includes('Science') ? 'Theory + 3D Lab' : 'Step Marks + DPP'}
                  </span>
                </div>
              </div>
            ))}

            {/* Recommended Textbooks Box */}
            <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                <Layers className="w-4 h-4" />
                <span>Prescribed Standard References</span>
              </div>
              <h4 className="text-lg font-bold text-white font-display">
                {selectedBoard} Official Core Books
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {(selectedBoard === 'ICSE'
                  ? currentGradeData.recommendedBooks.icse
                  : currentGradeData.recommendedBooks.cbse
                ).map((bk) => (
                  <li key={bk} className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>{bk}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-2 text-[11px] text-slate-500">
                + Wisdom Institute Printed Chapter Question Banks (Solved 10-Yr)
              </div>
            </div>

            {/* Pedagogy Milestones Box */}
            <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40 space-y-3 md:col-span-2">
              <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
                <Sparkles className="w-4 h-4" />
                <span>Targeted Learning Outcomes for {currentGradeData.label}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {currentGradeData.pedagogyMilestones.map((ms, i) => (
                  <div key={i} className="space-y-1">
                    <div className="text-xs font-bold text-slate-200">
                      Phase 0{i + 1}
                    </div>
                    <div className="text-xs text-slate-400 leading-normal">{ms}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
