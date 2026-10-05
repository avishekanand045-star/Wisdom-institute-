/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { GradeExplorer } from './components/GradeExplorer';
import { CurriculumComparison } from './components/CurriculumComparison';
import { Interactive3DLab } from './components/Interactive3DLab';
import { FeeAndScholarshipCalculator } from './components/FeeAndScholarshipCalculator';
import { ResultsAndTestimonials } from './components/ResultsAndTestimonials';
import { FacultyAndFacilities } from './components/FacultyAndFacilities';
import { Footer } from './components/Footer';
import { DemoBookingModal } from './components/DemoBookingModal';

export default function App() {
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [modalPrefillClass, setModalPrefillClass] = useState<string>('Class 10th');
  const [modalPrefillBoard, setModalPrefillBoard] = useState<string>('ICSE');

  const handleOpenDemoModal = (prefillClass?: string, prefillBoard?: string) => {
    if (prefillClass) setModalPrefillClass(prefillClass);
    if (prefillBoard) setModalPrefillBoard(prefillBoard);
    setDemoModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-400 selection:text-slate-950">
      {/* Top Navigation Bar */}
      <Navbar onOpenDemoModal={() => handleOpenDemoModal()} />

      <main className="flex-1">
        {/* Hero Section with Interactive 3D WebGL Canvas */}
        <HeroSection onOpenDemoModal={() => handleOpenDemoModal()} />

        {/* Classes 6th to 10th Curriculum Blueprint */}
        <GradeExplorer onOpenDemoModal={() => handleOpenDemoModal()} />

        {/* ICSE vs CBSE Board Comparison Matrix */}
        <CurriculumComparison />

        {/* Interactive 3D Virtual Science Lab (Bohr Model & Optics Prism) */}
        <Interactive3DLab />

        {/* Fee Estimator & WTSE Scholarship Calculator */}
        <FeeAndScholarshipCalculator onOpenDemoModal={handleOpenDemoModal} />

        {/* Hall of Board Achievers & Results */}
        <ResultsAndTestimonials />

        {/* Master Faculty & Modern Laboratory Campus */}
        <FacultyAndFacilities />
      </main>

      {/* Footer */}
      <Footer onOpenDemoModal={() => handleOpenDemoModal()} />

      {/* Demo Class Booking Modal */}
      <DemoBookingModal
        isOpen={demoModalOpen}
        onClose={() => setDemoModalOpen(false)}
        initialClass={modalPrefillClass}
        initialBoard={modalPrefillBoard}
      />
    </div>
  );
}
