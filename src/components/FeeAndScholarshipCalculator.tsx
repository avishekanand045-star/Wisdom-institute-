import React, { useState } from 'react';
import { Calculator, Award, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';

interface FeeAndScholarshipCalculatorProps {
  onOpenDemoModal: (prefillClass?: string, prefillBoard?: string) => void;
}

export const FeeAndScholarshipCalculator: React.FC<FeeAndScholarshipCalculatorProps> = ({
  onOpenDemoModal,
}) => {
  const [selectedClass, setSelectedClass] = useState<number>(10);
  const [selectedBoard, setSelectedBoard] = useState<'ICSE' | 'CBSE'>('ICSE');
  const [coursePackage, setCoursePackage] = useState<'core' | 'complete' | 'intensive'>('complete');
  const [previousScore, setPreviousScore] = useState<number>(92);

  // Base pricing matrix (Class-based annual tuition in INR)
  const baseRates: Record<number, { core: number; complete: number; intensive: number }> = {
    6: { core: 24000, complete: 32000, intensive: 36000 },
    7: { core: 26000, complete: 35000, intensive: 40000 },
    8: { core: 30000, complete: 40000, intensive: 46000 },
    9: { core: 36000, complete: 48000, intensive: 56000 },
    10: { core: 42000, complete: 56000, intensive: 65000 },
  };

  const basePrice = baseRates[selectedClass][coursePackage];

  // Scholarship Tier Calculation
  let scholarshipPct = 0;
  let scholarshipTier = 'Standard Enrollment';

  if (previousScore >= 95) {
    scholarshipPct = 35;
    scholarshipTier = 'Chanakya Merit Honors (35% Off)';
  } else if (previousScore >= 90) {
    scholarshipPct = 25;
    scholarshipTier = 'Distinction Scholar (25% Off)';
  } else if (previousScore >= 80) {
    scholarshipPct = 15;
    scholarshipTier = 'Merit Achiever (15% Off)';
  } else if (previousScore >= 70) {
    scholarshipPct = 10;
    scholarshipTier = 'Early Bird Grant (10% Off)';
  }

  const discountAmount = Math.round((basePrice * scholarshipPct) / 100);
  const netAnnualFee = basePrice - discountAmount;
  const monthlyInstallment = Math.round(netAnnualFee / 10);

  return (
    <section id="fees" className="py-20 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-400">
            <span className="text-amber-400 uppercase tracking-wider font-mono">100% Transparent Fee Structure</span>
            <span aria-hidden="true">·</span>
            <span>No Hidden Admission Costs</span>
            <span aria-hidden="true">·</span>
            <span>WTSE Merit Scholarships</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-display [text-wrap:balance]">
            Fee Estimator & Merit Scholarship Calculator
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Select your student's grade, board, and academic score to calculate eligible tuition concessions
            under the Wisdom Talent Search Exam (WTSE).
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-7 bg-slate-900/70 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
            {/* Step 1: Grade Selection */}
            <div className="space-y-3">
              <label className="text-xs font-mono uppercase tracking-wider text-slate-400">
                1. Select Academic Grade:
              </label>
              <div className="grid grid-cols-5 gap-2">
                {[6, 7, 8, 9, 10].map((grade) => (
                  <button
                    key={grade}
                    onClick={() => setSelectedClass(grade)}
                    className={`py-2.5 rounded-xl border text-center transition-all ${
                      selectedClass === grade
                        ? 'bg-amber-400 text-slate-950 font-bold border-amber-400 shadow-md shadow-amber-500/10'
                        : 'bg-slate-950/80 border-slate-800 text-slate-300 hover:text-white'
                    }`}
                  >
                    Class {grade}th
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Board Selection */}
            <div className="space-y-3">
              <label className="text-xs font-mono uppercase tracking-wider text-slate-400">
                2. Select Board Stream:
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setSelectedBoard('ICSE')}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    selectedBoard === 'ICSE'
                      ? 'bg-amber-400/10 border-amber-400/80 text-white shadow-sm'
                      : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="font-bold text-sm text-amber-400 font-mono">ICSE (CISCE)</div>
                  <div className="text-xs text-slate-400 mt-0.5">Selina & Frank In-Depth Curricula</div>
                </button>
                <button
                  onClick={() => setSelectedBoard('CBSE')}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    selectedBoard === 'CBSE'
                      ? 'bg-cyan-400/10 border-cyan-400/80 text-white shadow-sm'
                      : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="font-bold text-sm text-cyan-400 font-mono">CBSE (NCERT)</div>
                  <div className="text-xs text-slate-400 mt-0.5">NCERT Exemplar & Foundation Rigor</div>
                </button>
              </div>
            </div>

            {/* Step 3: Package Selection */}
            <div className="space-y-3">
              <label className="text-xs font-mono uppercase tracking-wider text-slate-400">
                3. Choose Academic Package:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  onClick={() => setCoursePackage('core')}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    coursePackage === 'core'
                      ? 'bg-slate-800 border-amber-400 text-white'
                      : 'bg-slate-950/80 border-slate-800 text-slate-400'
                  }`}
                >
                  <div className="font-bold text-xs text-white">Core Science & Math</div>
                  <div className="text-[11px] text-slate-400 mt-1">Physics, Chem, Bio, Math + 3D Labs</div>
                </button>
                <button
                  onClick={() => setCoursePackage('complete')}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    coursePackage === 'complete'
                      ? 'bg-slate-800 border-amber-400 text-white'
                      : 'bg-slate-950/80 border-slate-800 text-slate-400'
                  }`}
                >
                  <div className="font-bold text-xs text-white">All Subjects Complete</div>
                  <div className="text-[11px] text-slate-400 mt-1">All Core + English + Social/Computers</div>
                </button>
                <button
                  onClick={() => setCoursePackage('intensive')}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    coursePackage === 'intensive'
                      ? 'bg-slate-800 border-amber-400 text-white'
                      : 'bg-slate-950/80 border-slate-800 text-slate-400'
                  }`}
                >
                  <div className="font-bold text-xs text-white">Centum Target Intensive</div>
                  <div className="text-[11px] text-slate-400 mt-1">All Subjects + 6 Full Mock Series + 1:1 Reviews</div>
                </button>
              </div>
            </div>

            {/* Step 4: Previous Score / WTSE Aptitude Slider */}
            <div className="space-y-3 pt-2 border-t border-slate-800">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  4. Previous Academic Aggregate Score:
                </label>
                <span className="text-sm font-bold font-mono text-amber-400 tabular-nums">
                  {previousScore}%
                </span>
              </div>
              <input
                type="range"
                min="60"
                max="99"
                value={previousScore}
                onChange={(e) => setPreviousScore(Number(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer"
              />
              <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
                <span>60% (Base Tier)</span>
                <span>80% (15% Scholarship)</span>
                <span>90% (25% Scholarship)</span>
                <span>95%+ (35% Scholarship)</span>
              </div>
            </div>
          </div>

          {/* Quotation & Net Fee Card */}
          <div className="lg:col-span-5 bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-lg font-bold text-white font-display">
                  Class {selectedClass}th ({selectedBoard})
                </h3>
                <div className="text-xs text-slate-400">Session 2026–2027 Academic Year</div>
              </div>
              <div className="p-2.5 rounded-xl bg-amber-400/10 text-amber-400 border border-amber-400/20">
                <Award className="w-5 h-5" />
              </div>
            </div>

            {/* Fee Calculations */}
            <div className="space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between text-slate-400">
                <span>Standard Annual Tuition:</span>
                <span className="text-slate-200 tabular-nums line-through">
                  ₹{basePrice.toLocaleString('en-IN')}
                </span>
              </div>

              {scholarshipPct > 0 && (
                <div className="flex items-center justify-between text-emerald-400 bg-emerald-950/20 p-2.5 rounded-xl border border-emerald-500/20">
                  <div className="space-y-0.5">
                    <span className="font-semibold">{scholarshipTier}</span>
                    <div className="text-[10px] text-emerald-300">Based on {previousScore}% aggregate</div>
                  </div>
                  <span className="font-bold tabular-nums">
                    -₹{discountAmount.toLocaleString('en-IN')}
                  </span>
                </div>
              )}

              <div className="pt-3 border-t border-slate-800 flex items-baseline justify-between">
                <div>
                  <div className="text-slate-400 text-xs font-sans">Net Annual Investment</div>
                  <div className="text-[11px] text-slate-500 font-sans">Zero registration surcharge</div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold font-mono text-white tracking-tight tabular-nums">
                    ₹{netAnnualFee.toLocaleString('en-IN')}
                  </div>
                  <div className="text-[11px] text-slate-400 font-sans mt-0.5">
                    or ₹{monthlyInstallment.toLocaleString('en-IN')}/month (10 installments)
                  </div>
                </div>
              </div>
            </div>

            {/* Inclusions checklist */}
            <div className="space-y-2 pt-2 border-t border-slate-800 text-xs text-slate-300">
              <div className="font-semibold text-white font-sans text-xs">Every Enrollment Includes:</div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Full printed question banks + 10-year board papers</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Access to 3D Virtual Science Lab simulations</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Weekly proctored Sunday test series with SMS reports</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Dedicated daily 1-on-1 doubt clearing clinic</span>
              </div>
            </div>

            {/* Action button */}
            <button
              onClick={() => onOpenDemoModal(`Class ${selectedClass}th`, selectedBoard)}
              className="w-full py-3.5 text-xs sm:text-sm font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-lg shadow-amber-500/10 flex items-center justify-center gap-2"
            >
              <span>Lock Scholarship & Book Free Demo</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
