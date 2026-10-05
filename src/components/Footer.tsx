import React from 'react';
import { MapPin, Phone, Mail, Clock, ArrowUp } from 'lucide-react';

interface FooterProps {
  onOpenDemoModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenDemoModal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 pt-16 pb-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-amber-400 text-slate-950 font-black text-base flex items-center justify-center font-display">
                W
              </span>
              <span className="text-xl font-bold text-white font-display">Wisdom Institute</span>
            </div>
            <p className="text-slate-400 text-xs max-w-sm leading-relaxed">
              Premier academic coaching institute specializing exclusively in Classes 6th through 10th for
              both ICSE (CISCE) and CBSE boards. Dedicated 15-student batches with 3D conceptual science labs.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={onOpenDemoModal}
                className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-semibold text-xs transition-colors"
              >
                Book 3-Day Free Demo
              </button>
            </div>
          </div>

          {/* Col 2: Grades */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              Classes Offered
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#classes" className="hover:text-amber-400 transition-colors">Class 6th Foundation</a></li>
              <li><a href="#classes" className="hover:text-amber-400 transition-colors">Class 7th Pre-Algebra</a></li>
              <li><a href="#classes" className="hover:text-amber-400 transition-colors">Class 8th Olympiad Prep</a></li>
              <li><a href="#classes" className="hover:text-amber-400 transition-colors">Class 9th Board Blueprint</a></li>
              <li><a href="#classes" className="hover:text-amber-400 transition-colors">Class 10th Centum Target</a></li>
            </ul>
          </div>

          {/* Col 3: Boards & Pedagogy */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              Curricula & Labs
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#curriculum" className="hover:text-amber-400 transition-colors">ICSE (CISCE) Stream</a></li>
              <li><a href="#curriculum" className="hover:text-amber-400 transition-colors">CBSE (NCERT) Stream</a></li>
              <li><a href="#3d-lab" className="hover:text-amber-400 transition-colors">3D Atomic Physics Lab</a></li>
              <li><a href="#3d-lab" className="hover:text-amber-400 transition-colors">3D Optics & Prism Lab</a></li>
              <li><a href="#fees" className="hover:text-amber-400 transition-colors">WTSE Scholarship Test</a></li>
            </ul>
          </div>

          {/* Col 4: Campus Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              Campus & Timings
            </h4>
            <div className="space-y-2 text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Plot 42, Institutional Area, Knowledge Park II</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>+91 (0) 80 4910 2200</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>admissions@wisdominstitute.edu</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-slate-500">
                <Clock className="w-3.5 h-3.5 shrink-0" />
                <span>Mon–Sat: 7:30 AM – 7:30 PM · Sun Tests</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} Wisdom Institute. All rights reserved. Registered under Educational Trust Act.
          </div>
          <div className="flex items-center gap-6">
            <span>ICSE / CBSE Affiliated Prep Centre</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
