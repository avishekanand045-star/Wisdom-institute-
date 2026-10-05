import React, { useState } from 'react';
import { TOPPERS_DATA } from '../data/instituteData';
import { Award, Quote, Star, Sparkles, CheckCircle2 } from 'lucide-react';

export const ResultsAndTestimonials: React.FC = () => {
  const [boardFilter, setBoardFilter] = useState<'ALL' | 'ICSE' | 'CBSE'>('ALL');

  const filteredToppers =
    boardFilter === 'ALL'
      ? TOPPERS_DATA
      : TOPPERS_DATA.filter((t) => t.board === boardFilter);

  return (
    <section id="results" className="py-20 bg-slate-900/60 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
              <span className="text-amber-400 uppercase tracking-wider font-mono">Verified Board Results</span>
              <span aria-hidden="true">·</span>
              <span>ICSE & CBSE 2025–26</span>
              <span aria-hidden="true">·</span>
              <span>100% Transparent Scores</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-display [text-wrap:balance]">
              Hall of Board Achievers
            </h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-xl leading-relaxed">
              Every score is verifiable with student roll numbers and leading affiliated schools.
              Consistent 95%+ aggregates year after year.
            </p>
          </div>

          {/* Board Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-2xl border border-slate-800 self-start md:self-end">
            <button
              onClick={() => setBoardFilter('ALL')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all ${
                boardFilter === 'ALL'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All Achievers
            </button>
            <button
              onClick={() => setBoardFilter('ICSE')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all ${
                boardFilter === 'ICSE'
                  ? 'bg-amber-400 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              ICSE Board
            </button>
            <button
              onClick={() => setBoardFilter('CBSE')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all ${
                boardFilter === 'CBSE'
                  ? 'bg-cyan-400 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              CBSE Board
            </button>
          </div>
        </div>

        {/* Featured Banner with Generated High-Fidelity Asset */}
        <div className="mb-14 rounded-3xl overflow-hidden border border-slate-800 bg-slate-950 grid grid-cols-1 lg:grid-cols-12 shadow-2xl">
          <div className="lg:col-span-7 p-8 sm:p-10 lg:p-12 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
                <Sparkles className="w-4 h-4" />
                <span>Excellence Record 2025–2026</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white font-display [text-wrap:balance]">
                Over 48 Students Scored 95%+ in ICSE & CBSE Board Examinations
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                By instilling structured writing discipline, daily practice problems, and 3D visual conceptualization,
                our students consistently rank in the top percentile across both national school boards.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800">
              <div className="space-y-1">
                <div className="text-2xl font-bold font-mono text-amber-400 tabular-nums">98.6%</div>
                <div className="text-xs text-slate-400">ICSE Peak Aggregate</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold font-mono text-cyan-400 tabular-nums">99.0%</div>
                <div className="text-xs text-slate-400">CBSE Peak Aggregate</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold font-mono text-emerald-400 tabular-nums">34</div>
                <div className="text-xs text-slate-400">Centums (100/100)</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-full bg-slate-900 overflow-hidden">
            <img
              src="/src/assets/images/student_achievement_icse_cbse_1791181821580.jpg"
              alt="Wisdom Institute students holding board merit honors"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            {/* Fallback scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur-md p-3 rounded-2xl border border-slate-800 text-xs text-slate-300">
              <span className="font-semibold text-white">Ananya & Priya</span> · ICSE & CBSE Board Achievers with Wisdom Faculty
            </div>
          </div>
        </div>

        {/* Toppers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredToppers.map((topper) => (
            <div
              key={topper.name}
              className="p-6 rounded-2xl border border-slate-800 bg-slate-950/90 hover:border-slate-700 transition-all space-y-4 shadow-lg flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold ${
                      topper.board === 'ICSE'
                        ? 'bg-amber-400/10 text-amber-400 border border-amber-400/20'
                        : 'bg-cyan-400/10 text-cyan-400 border border-cyan-400/20'
                    }`}
                  >
                    {topper.board} {topper.grade}
                  </span>
                  <div className="text-xl font-bold font-mono text-white tabular-nums">
                    {topper.score}
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-white font-display">{topper.name}</h4>
                  <div className="text-xs text-slate-400">{topper.school}</div>
                </div>

                <div className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>{topper.highlight}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 relative">
                <Quote className="w-4 h-4 text-slate-600 mb-1" />
                <p className="text-xs text-slate-300 leading-relaxed italic">
                  "{topper.quote}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
