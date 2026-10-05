import React, { useState } from 'react';
import { BOARD_COMPARISON } from '../data/instituteData';
import { Check, ShieldAlert, Award, FileText, CheckCircle2 } from 'lucide-react';

export const CurriculumComparison: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'matrix' | 'policy'>('matrix');

  return (
    <section id="curriculum" className="py-20 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-400">
            <span className="text-cyan-400 uppercase tracking-wider font-mono">Curriculum Specialization</span>
            <span aria-hidden="true">·</span>
            <span>No Mixed Classrooms</span>
            <span aria-hidden="true">·</span>
            <span>Board-Tailored Modules</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-display [text-wrap:balance]">
            ICSE vs CBSE: Tailored Excellence for Both National Boards
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Most local coaching centers merge ICSE and CBSE students into a single generic lecture.
            At Wisdom Institute, we maintain <strong className="text-amber-300">100% independent batches</strong>, dedicated lesson
            plans, and board-certified teachers for each syllabus.
          </p>

          {/* Sub-nav toggle */}
          <div className="inline-flex items-center gap-1 p-1 bg-slate-900 rounded-xl border border-slate-800 mt-2">
            <button
              onClick={() => setActiveTab('matrix')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
                activeTab === 'matrix' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Direct Comparison Matrix
            </button>
            <button
              onClick={() => setActiveTab('policy')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
                activeTab === 'policy' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Our Zero-Mixing Policy
            </button>
          </div>
        </div>

        {activeTab === 'matrix' ? (
          <div className="overflow-x-auto rounded-3xl border border-slate-800 bg-slate-900/60 shadow-2xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900">
                  <th className="py-4 px-6 text-xs font-mono font-bold uppercase tracking-wider text-slate-400 w-1/4">
                    Pedagogical Dimension
                  </th>
                  <th className="py-4 px-6 text-xs font-mono font-bold uppercase tracking-wider text-amber-400 w-1/3">
                    ICSE (CISCE Framework)
                  </th>
                  <th className="py-4 px-6 text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 w-1/3">
                    CBSE (NCERT Framework)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 text-xs sm:text-sm">
                {BOARD_COMPARISON.map((row) => (
                  <tr key={row.dimension} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-5 px-6 font-semibold text-white align-top">
                      <div>{row.dimension}</div>
                      <div className="text-[11px] font-normal text-emerald-400 mt-2 flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" />
                        <span>Wisdom Advantage:</span>
                      </div>
                      <div className="text-[11px] text-slate-400 leading-relaxed font-normal mt-0.5">
                        {row.wisdomAdvantage}
                      </div>
                    </td>
                    <td className="py-5 px-6 text-slate-300 leading-relaxed align-top bg-amber-950/10 border-l border-r border-slate-800/60">
                      {row.icse}
                    </td>
                    <td className="py-5 px-6 text-slate-300 leading-relaxed align-top bg-cyan-950/10">
                      {row.cbse}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-3xl border border-amber-500/30 bg-amber-950/10 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-400 flex items-center justify-center font-bold font-mono">
                  ICSE
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white font-display">Dedicated ICSE Stream</h3>
                  <div className="text-xs text-amber-400">CISCE Syllabus Specialists</div>
                </div>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                ICSE demands extensive descriptive answers, distinct laboratory documentation, and an intensive
                command of English literature. Merging ICSE students with CBSE curricula dilutes Selina
                problem sets and overlooks Shakespearean drama comprehension.
              </p>
              <ul className="space-y-2 text-xs text-slate-300 pt-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Exclusive coverage of Concise Physics & Chemistry (Selina Publishers)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Line-by-line internal assessment project guidance (20 Marks secured)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Java OOP programming practical laboratory with BlueJ compilation</span>
                </li>
              </ul>
            </div>

            <div className="p-8 rounded-3xl border border-cyan-500/30 bg-cyan-950/10 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-400/20 text-cyan-400 flex items-center justify-center font-bold font-mono">
                  CBSE
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white font-display">Dedicated CBSE Stream</h3>
                  <div className="text-xs text-cyan-400">NCERT Exemplar & NEP 2020 Specialists</div>
                </div>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                CBSE emphasizes conceptual clarity and application-oriented questions. We dive deep into
                every NCERT line, Exemplar exercise, and case-study inquiry, building the foundational bedrock
                for competitive exams like JEE, NEET, and NTSE.
              </p>
              <ul className="space-y-2 text-xs text-slate-300 pt-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Complete line-by-line NCERT line decoding & Exemplar numerical mastery</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Competency-based questions (CBQs) and assertion-reasoning mastery</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Direct foundation alignment for future Olympiads & National Entrance tests</span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
