import React from 'react';
import { ThreeCanvasHero } from './ThreeCanvasHero';
import { ArrowRight, Sparkles, CheckCircle2, ShieldCheck, Compass } from 'lucide-react';

interface HeroSectionProps {
  onOpenDemoModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenDemoModal }) => {
  return (
    <section className="relative pt-6 pb-20 lg:pt-12 lg:pb-28 overflow-hidden">
      {/* Background ambient lighting gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-20 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Editorial & Conversion Narrative */}
          <div className="lg:col-span-6 space-y-6">
            {/* Unboxed Metadata Header */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-400">
              <span className="text-amber-400 font-semibold">ICSE & CBSE Specialist</span>
              <span aria-hidden="true">·</span>
              <span>Classes VI to X</span>
              <span aria-hidden="true">·</span>
              <span>Max 15 Students / Batch</span>
              <span aria-hidden="true">·</span>
              <span className="text-emerald-400">Admissions Open 2026–27</span>
            </div>

            {/* Display Headline with text-wrap: balance */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white font-display leading-[1.1] [text-wrap:balance]">
              Where Academic Rigor Meets{' '}
              <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-200 bg-clip-text text-transparent">
                3D Conceptual
              </span>{' '}
              Mastery.
            </h1>

            {/* Subtitle / Value Proposition */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">
              Wisdom Institute equips students in Classes 6th through 10th with board-dedicated faculty,
              interactive 3D spatial simulations, and systematic chapter mastery. Separate tailored batches
              for ICSE and CBSE.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onOpenDemoModal}
                className="px-6 py-3.5 text-sm font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 active:scale-95 rounded-xl transition-all shadow-lg shadow-amber-500/20 flex items-center gap-2"
              >
                <span>Book Free 3-Day Demo</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#3d-lab"
                className="px-6 py-3.5 text-sm font-semibold text-slate-200 bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 rounded-xl transition-colors flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>Launch 3D Concept Lab</span>
              </a>
            </div>

            {/* Trust Markers */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-800/80">
              <div className="space-y-1">
                <div className="text-2xl font-bold font-mono tracking-tight text-white tabular-nums">
                  98.6%
                </div>
                <div className="text-xs text-slate-400">Peak Board Aggregate</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold font-mono tracking-tight text-amber-400 tabular-nums">
                  15:1
                </div>
                <div className="text-xs text-slate-400">Student-to-Mentor Ratio</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold font-mono tracking-tight text-cyan-400 tabular-nums">
                  100%
                </div>
                <div className="text-xs text-slate-400">Board Pass Record</div>
              </div>
            </div>

            {/* Key pedagogical bullets */}
            <div className="space-y-2 pt-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% Distinct syllabus streams for ICSE (Selina/Frank) & CBSE (NCERT/Exemplar)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Weekly proctored chapter tests with line-by-line step marking analytics</span>
              </div>
            </div>
          </div>

          {/* Right Column: Three.js Interactive 3D Spatial Canvas */}
          <div className="lg:col-span-6 relative">
            <ThreeCanvasHero />
          </div>
        </div>
      </div>
    </section>
  );
};
