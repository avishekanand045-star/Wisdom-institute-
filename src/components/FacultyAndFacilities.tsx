import React from 'react';
import { FACULTY_DATA } from '../data/instituteData';
import { Users, Microscope, BookOpen, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const FacultyAndFacilities: React.FC = () => {
  return (
    <section id="faculty" className="py-20 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-400">
            <span className="text-cyan-400 uppercase tracking-wider font-mono">Academic Mentorship</span>
            <span aria-hidden="true">·</span>
            <span>Ex-Board Examiners</span>
            <span aria-hidden="true">·</span>
            <span>STEM Infrastructure</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-display [text-wrap:balance]">
            Master Faculty & Modern Facilities
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Every teacher at Wisdom Institute has a minimum of 10 years of specialized experience in ICSE
            or CBSE board exam pedagogy.
          </p>
        </div>

        {/* Facilities Visual Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* Facility 1: Campus */}
          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 overflow-hidden shadow-xl group">
            <div className="h-56 relative overflow-hidden bg-slate-800">
              <img
                src="/src/assets/images/hero_wisdom_campus_1791181796881.jpg"
                alt="Wisdom Institute Campus"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
              <div className="absolute top-3 left-3 text-[11px] font-mono font-semibold px-2.5 py-1 rounded-lg bg-slate-900/90 text-amber-400 border border-slate-700">
                Acoustic Campus
              </div>
            </div>
            <div className="p-6 space-y-2">
              <h3 className="text-lg font-bold text-white font-display">Modern Air-Conditioned Academy</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Ergonomic individual study desks, digital smart boards, sound-insulated lecture halls,
                and high-speed reference workstations.
              </p>
            </div>
          </div>

          {/* Facility 2: STEM & 3D Lab */}
          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 overflow-hidden shadow-xl group">
            <div className="h-56 relative overflow-hidden bg-slate-800">
              <img
                src="/src/assets/images/classroom_interactive_lab_1791181808757.jpg"
                alt="3D Science Laboratory"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
              <div className="absolute top-3 left-3 text-[11px] font-mono font-semibold px-2.5 py-1 rounded-lg bg-slate-900/90 text-cyan-400 border border-slate-700">
                STEM & Optics
              </div>
            </div>
            <div className="p-6 space-y-2">
              <h3 className="text-lg font-bold text-white font-display">Interactive 3D Science Laboratory</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Dedicated optics benches, chemical apparatus, compound microscopes, and 3D spatial
                molecular software for Classes 6th to 10th.
              </p>
            </div>
          </div>

          {/* Facility 3: Faculty Masterclass */}
          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 overflow-hidden shadow-xl group">
            <div className="h-56 relative overflow-hidden bg-slate-800">
              <img
                src="/src/assets/images/faculty_academic_mentors_1791181831874.jpg"
                alt="Interactive Masterclass Mentors"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
              <div className="absolute top-3 left-3 text-[11px] font-mono font-semibold px-2.5 py-1 rounded-lg bg-slate-900/90 text-emerald-400 border border-slate-700">
                1:1 Doubt Cell
              </div>
            </div>
            <div className="p-6 space-y-2">
              <h3 className="text-lg font-bold text-white font-display">Personalized Doubt Clearing</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Daily 2-hour open clinic where students review homework numericals, step-marking nuances,
                and school test papers with teachers directly.
              </p>
            </div>
          </div>
        </div>

        {/* Faculty Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FACULTY_DATA.map((faculty) => (
            <div
              key={faculty.name}
              className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40 hover:bg-slate-900/80 transition-all space-y-3"
            >
              <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center font-bold text-lg font-mono">
                {faculty.name.split(' ')[1]?.[0] || 'W'}
              </div>
              <div>
                <h4 className="text-base font-bold text-white font-display">{faculty.name}</h4>
                <div className="text-xs text-amber-400 font-medium">{faculty.role}</div>
                <div className="text-[11px] text-slate-400 mt-0.5">{faculty.qualification}</div>
              </div>
              <div className="pt-2 border-t border-slate-800 space-y-1">
                <div className="text-[11px] font-mono text-cyan-400">{faculty.experience}</div>
                <p className="text-xs text-slate-300 leading-relaxed">{faculty.expertise}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
