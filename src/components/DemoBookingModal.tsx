import React, { useState } from 'react';
import { X, CheckCircle2, Calendar, Clock, MapPin, Phone, User, BookOpen, Share2, Copy, Check } from 'lucide-react';

interface DemoBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialClass?: string;
  initialBoard?: string;
}

export const DemoBookingModal: React.FC<DemoBookingModalProps> = ({
  isOpen,
  onClose,
  initialClass = 'Class 10th',
  initialBoard = 'ICSE',
}) => {
  const [studentName, setStudentName] = useState('');
  const [parentPhone, setParentPhone] = useState('');
  const [selectedGrade, setSelectedGrade] = useState(initialClass);
  const [selectedBoard, setSelectedBoard] = useState(initialBoard);
  const [batchTiming, setBatchTiming] = useState('Evening (4:30 PM – 6:30 PM)');
  const [mode, setMode] = useState<'Offline Campus' | 'Hybrid Online'>('Offline Campus');
  const [submittedPass, setSubmittedPass] = useState<{
    passId: string;
    date: string;
    student: string;
    grade: string;
    board: string;
    time: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim() || !parentPhone.trim()) return;

    // Generate random pass id
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const passCode = `WISDOM-${selectedGrade.replace('Class ', '').replace('th', '')}-${selectedBoard}-${randomNum}`;

    setSubmittedPass({
      passId: passCode,
      date: 'Next Upcoming Saturday & Sunday',
      student: studentName,
      grade: selectedGrade,
      board: selectedBoard,
      time: batchTiming,
    });
  };

  const handleCopyPass = () => {
    if (!submittedPass) return;
    navigator.clipboard.writeText(
      `Wisdom Institute 3-Day Demo Pass: ${submittedPass.passId} | Student: ${submittedPass.student} | ${submittedPass.grade} (${submittedPass.board})`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {!submittedPass ? (
          <div>
            <div className="mb-6 space-y-1">
              <div className="text-xs font-mono text-amber-400 uppercase tracking-wider font-semibold">
                Free Trial Experience
              </div>
              <h3 className="text-2xl font-bold text-white font-display">
                Book 3-Day Free Demo Class
              </h3>
              <p className="text-xs text-slate-400">
                Experience our 3D concept laboratory and meet your subject mentors in person. Zero fee commitment.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Student Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span>Student Full Name *</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Aryan Sengupta"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>

              {/* Parent Phone */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>Parent / Guardian WhatsApp Number *</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={parentPhone}
                  onChange={(e) => setParentPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>

              {/* Grade and Board Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300">Grade / Class</label>
                  <select
                    value={selectedGrade}
                    onChange={(e) => setSelectedGrade(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-amber-400 transition-colors"
                  >
                    <option value="Class 6th">Class 6th</option>
                    <option value="Class 7th">Class 7th</option>
                    <option value="Class 8th">Class 8th</option>
                    <option value="Class 9th">Class 9th</option>
                    <option value="Class 10th">Class 10th (Board)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300">Board Stream</label>
                  <select
                    value={selectedBoard}
                    onChange={(e) => setSelectedBoard(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-amber-400 transition-colors"
                  >
                    <option value="ICSE">ICSE (CISCE)</option>
                    <option value="CBSE">CBSE (NCERT)</option>
                  </select>
                </div>
              </div>

              {/* Preferred Slot */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Preferred Demo Session Timing</span>
                </label>
                <select
                  value={batchTiming}
                  onChange={(e) => setBatchTiming(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-amber-400 transition-colors"
                >
                  <option value="Evening (4:30 PM – 6:30 PM)">Evening (4:30 PM – 6:30 PM)</option>
                  <option value="Morning (7:30 AM – 9:30 AM)">Morning (7:30 AM – 9:30 AM)</option>
                  <option value="Weekend Special (10:00 AM – 1:00 PM)">Weekend Special (10:00 AM – 1:00 PM)</option>
                </select>
              </div>

              {/* Mode Selection */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">Learning Mode</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setMode('Offline Campus')}
                    className={`py-2 px-3 text-xs font-medium rounded-xl border text-center transition-colors ${
                      mode === 'Offline Campus'
                        ? 'bg-slate-800 border-amber-400 text-white'
                        : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    Offline Campus Center
                  </button>
                  <button
                    type="button"
                    onClick={() => setMode('Hybrid Online')}
                    className={`py-2 px-3 text-xs font-medium rounded-xl border text-center transition-colors ${
                      mode === 'Hybrid Online'
                        ? 'bg-slate-800 border-amber-400 text-white'
                        : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    Hybrid Live Classroom
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 text-xs sm:text-sm font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-md shadow-amber-500/10 flex items-center justify-center gap-2"
                >
                  <span>Generate Free Demo Admission Pass</span>
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Confirmation Pass Ticket */
          <div className="space-y-6 text-center">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <div className="space-y-1">
              <h3 className="text-2xl font-bold text-white font-display">
                Demo Pass Confirmed!
              </h3>
              <p className="text-xs text-slate-400">
                Your 3-day complimentary pass for Wisdom Institute has been issued.
              </p>
            </div>

            {/* Pass Card */}
            <div className="p-6 rounded-2xl bg-slate-950 border border-amber-400/40 text-left space-y-4 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-xl pointer-events-none" />

              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="text-[11px] font-mono font-bold text-amber-400 uppercase">
                  Official Admission Pass
                </div>
                <div className="text-xs font-mono font-bold text-white tracking-wider">
                  {submittedPass.passId}
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Student Name:</span>
                  <span className="text-white font-semibold">{submittedPass.student}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Class & Board:</span>
                  <span className="text-amber-400 font-semibold">
                    {submittedPass.grade} ({submittedPass.board})
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Batch Timing:</span>
                  <span className="text-slate-200">{submittedPass.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Campus Desk:</span>
                  <span className="text-slate-200">Orientation Hall B, 2nd Floor</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400">
                Please bring your school geometry kit, class notebook, and previous report card copy.
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleCopyPass}
                className="flex-1 py-2.5 px-4 text-xs font-medium rounded-xl border border-slate-700 bg-slate-800 text-slate-200 hover:text-white flex items-center justify-center gap-1.5 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Pass Copied!' : 'Copy Pass ID'}</span>
              </button>

              <a
                href={`https://wa.me/?text=Hello%20Wisdom%20Institute,%20I%20have%20booked%20a%20free%20demo%20pass%20${submittedPass.passId}%20for%20${submittedPass.student}%20(${submittedPass.grade}%20${submittedPass.board}).`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 px-4 text-xs font-semibold rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center gap-1.5 transition-colors"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Confirm on WhatsApp</span>
              </a>
            </div>

            <button
              onClick={() => {
                setSubmittedPass(null);
                onClose();
              }}
              className="text-xs text-slate-500 hover:text-slate-300 underline"
            >
              Done & Return to Homepage
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
