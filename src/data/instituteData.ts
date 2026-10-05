export interface GradeCurriculum {
  grade: number;
  label: string;
  roman: string;
  focus: string;
  weeklyHours: string;
  batchSize: string;
  keySubjects: {
    name: string;
    icseDetails: string;
    cbseDetails: string;
    weeklySessions: number;
  }[];
  pedagogyMilestones: string[];
  recommendedBooks: {
    icse: string[];
    cbse: string[];
  };
}

export const GRADES_DATA: GradeCurriculum[] = [
  {
    grade: 6,
    label: "Class 6th",
    roman: "VI",
    focus: "Bridging Primary to Middle School & Scientific Thinking",
    weeklyHours: "8 hrs/week",
    batchSize: "Max 15 students",
    keySubjects: [
      {
        name: "Mathematics",
        icseDetails: "Number Operations, Fractions & Decimals, Unitary Method, Basic Geometry, Data Handling",
        cbseDetails: "Knowing Our Numbers, Whole Numbers, Integers, Basic Geometrical Ideas, Mensuration",
        weeklySessions: 3,
      },
      {
        name: "Science (Physics / Chem / Bio)",
        icseDetails: "Matter, Elements & Compounds, Plant Life, Cell Structure, Force & Motion fundamentals",
        cbseDetails: "Components of Food, Sorting Materials, Separation of Substances, Motion & Distances, Light",
        weeklySessions: 3,
      },
      {
        name: "English & Grammar",
        icseDetails: "Comprehensive grammar, descriptive essay structuring, classical reader comprehension",
        cbseDetails: "Functional grammar, reading comprehension passages, formal and creative writing",
        weeklySessions: 2,
      },
    ],
    pedagogyMilestones: [
      "Transition from rote memorization to step-by-step conceptual reasoning",
      "Hands-on scientific experiment kits introduced every alternate week",
      "Daily 15-minute speed calculation drills for arithmetic precision",
    ],
    recommendedBooks: {
      icse: ["Concise Mathematics (Selina)", "Living Science (Ratna Sagar)", "Essential English Grammar"],
      cbse: ["NCERT Mathematics", "NCERT Science", "NCERT Exemplar Problems"],
    },
  },
  {
    grade: 7,
    label: "Class 7th",
    roman: "VII",
    focus: "Strengthening Algebraic Foundations & Experimental Science",
    weeklyHours: "9 hrs/week",
    batchSize: "Max 15 students",
    keySubjects: [
      {
        name: "Mathematics",
        icseDetails: "Rational Numbers, Linear Equations, Percentages & Profit/Loss, Congruence of Triangles",
        cbseDetails: "Integers, Fractions & Decimals, Simple Equations, Lines & Angles, Perimeter & Area",
        weeklySessions: 3,
      },
      {
        name: "Science",
        icseDetails: "Physical & Chemical Changes, Heat & Temperature, Acids & Bases, Respiration in Organisms",
        cbseDetails: "Nutrition in Plants & Animals, Heat, Acids, Bases & Salts, Motion & Time, Electric Current",
        weeklySessions: 3,
      },
      {
        name: "English & Social Studies",
        icseDetails: "Advanced sentence synthesis, historical timelines, mapping & geographical topography",
        cbseDetails: "Writing skills (notices, emails), Medieval India, Environment, Civics democratic systems",
        weeklySessions: 2,
      },
    ],
    pedagogyMilestones: [
      "Mastery of multi-step algebraic manipulation and word problems",
      "Laboratory safety and observation record keeping for ICSE students",
      "Bi-weekly modular assessment with individualized error analysis",
    ],
    recommendedBooks: {
      icse: ["Selina Concise Physics/Chemistry/Biology", "ML Aggarwal Mathematics", "Wren & Martin Grammar"],
      cbse: ["NCERT Mathematics & Science", "RS Aggarwal Mathematics", "NCERT Exemplar"],
    },
  },
  {
    grade: 8,
    label: "Class 8th",
    roman: "VIII",
    focus: "Pre-Secondary Foundation & Competitive Olympiad Readiness",
    weeklyHours: "10 hrs/week",
    batchSize: "Max 15 students",
    keySubjects: [
      {
        name: "Mathematics",
        icseDetails: "Rational Numbers, Factorization, Linear Inequations, Coordinate Geometry, Surface Areas",
        cbseDetails: "Linear Equations in One Variable, Understanding Quadrilaterals, Algebraic Expressions, Mensuration",
        weeklySessions: 3,
      },
      {
        name: "Physics & Chemistry",
        icseDetails: "Force & Pressure, Sound, Light, Language of Chemistry, Chemical Reactions, Atomic Structure",
        cbseDetails: "Coal & Petroleum, Combustion & Flame, Force & Pressure, Friction, Sound, Chemical Effects of Current",
        weeklySessions: 3,
      },
      {
        name: "Biology & Computer Apps",
        icseDetails: "Transport in Plants, Reproduction, Endocrine System, Introduction to Java OOP Basics",
        cbseDetails: "Crop Production, Microorganisms, Cell Structure, Python fundamentals & algorithmic logic",
        weeklySessions: 2,
      },
    ],
    pedagogyMilestones: [
      "Smooth bridging into secondary rigorous curriculum frameworks",
      "Introductory Olympiad (SOF, IMO, NSO) problem-solving techniques",
      "Board-style written exam simulation under timed testing conditions",
    ],
    recommendedBooks: {
      icse: ["Selina Concise Class 8 Series", "Frank ICSE Chemistry", "APC Understanding Mathematics"],
      cbse: ["NCERT Class 8", "RD Sharma Mathematics", "Lakhmir Singh & Manjit Kaur Science"],
    },
  },
  {
    grade: 9,
    label: "Class 9th",
    roman: "IX",
    focus: "Two-Year Board Blueprint & Deep Conceptual Mastery",
    weeklyHours: "12 hrs/week",
    batchSize: "Max 15 students",
    keySubjects: [
      {
        name: "Mathematics",
        icseDetails: "Compound Interest, Expansions, Factorisation, Simultaneous Equations, Trigonometry, Coordinate",
        cbseDetails: "Number Systems, Polynomials, Coordinate Geometry, Linear Equations in Two Variables, Triangles, Circles",
        weeklySessions: 4,
      },
      {
        name: "Physics & Chemistry",
        icseDetails: "Measurements & Experimentation, Motion in 1D, Laws of Motion, Heat & Energy, Gas Laws, Periodic Table",
        cbseDetails: "Motion, Force & Laws of Motion, Gravitation, Work & Energy, Sound, Matter in Our Surroundings, Atoms & Molecules",
        weeklySessions: 4,
      },
      {
        name: "Biology",
        icseDetails: "Cell: The Unit of Life, Tissues, Flower & Pollination, Respiration, Skin & Waste",
        cbseDetails: "Fundamental Unit of Life, Tissues, Improvement in Food Resources",
        weeklySessions: 2,
      },
      {
        name: "Language & Board Electives",
        icseDetails: "Merchant of Venice (Shakespeare), Treasure Chest poems, Java programming with blueJ",
        cbseDetails: "Beehive & Moments prose/poetry, Formal letter & editorial writing, AI / Computer science",
        weeklySessions: 2,
      },
    ],
    pedagogyMilestones: [
      "Rigorous adherence to official CISCE and CBSE marking guidelines",
      "Separate ICSE and CBSE batch streams to honor distinct syllabi",
      "Chapter-wise Question Bank solving 10 years of preceding board trends",
    ],
    recommendedBooks: {
      icse: ["Selina Concise Physics & Chemistry", "ML Aggarwal ICSE Math", "Evergreen Self-Study in ICSE"],
      cbse: ["NCERT Textbook & Exemplar", "RD Sharma Class 9", "All in One Science (Arihant)"],
    },
  },
  {
    grade: 10,
    label: "Class 10th",
    roman: "X",
    focus: "Board Exam Mastery & Centum (100/100) Target Program",
    weeklyHours: "14 hrs/week",
    batchSize: "Max 15 students",
    keySubjects: [
      {
        name: "Mathematics",
        icseDetails: "GST, Banking, Quadratic Equations, Remainder Theorem, Matrices, Arithmetic Progression, Similarity, Circles",
        cbseDetails: "Real Numbers, Polynomials, Pair of Linear Equations, Quadratic Equations, Arithmetic Progressions, Triangles, Trigo, Surface Areas",
        weeklySessions: 4,
      },
      {
        name: "Physics & Chemistry",
        icseDetails: "Force, Work/Energy/Power, Refraction of Light, Sound, Electricity, Radioactivity, Metallurgy, Organic Chemistry",
        cbseDetails: "Chemical Reactions, Acids/Bases, Metals/Non-Metals, Carbon Compounds, Light (Reflection/Refraction), Electricity, Magnetism",
        weeklySessions: 4,
      },
      {
        name: "Biology",
        icseDetails: "Cell Division, Genetics, Transpiration, Photosynthesis, Circulatory & Excretory Systems, Nervous System",
        cbseDetails: "Life Processes (Nutrition, Respiration, Transportation, Excretion), Control & Coordination, Reproduction, Heredity",
        weeklySessions: 2,
      },
      {
        name: "English & Elective Focus",
        icseDetails: "ICSE Literature Analysis, Precis Writing, Composition, Java String & Array Processing",
        cbseDetails: "First Flight, Footprints Without Feet, Analytical Paragraph, IT / Computer Applications",
        weeklySessions: 2,
      },
    ],
    pedagogyMilestones: [
      "Complete syllabus coverage by October with 4 complete revision cycles",
      "6 Full-length Proctored Pre-Board Mock Exams simulating exact exam halls",
      "Board Examiner masterclasses on stepwise answer presentation and key-word underlining",
    ],
    recommendedBooks: {
      icse: ["Selina Concise 10th All Subjects", "Frank Modern Certificate Chemistry", "Educart ICSE 10-Year Solved"],
      cbse: ["NCERT Math & Science", "RS Aggarwal & RD Sharma", "Oswaal CBSE 10 Sample Question Papers"],
    },
  },
];

export interface Topper {
  name: string;
  score: string;
  board: "ICSE" | "CBSE";
  grade: string;
  school: string;
  highlight: string;
  quote: string;
}

export const TOPPERS_DATA: Topper[] = [
  {
    name: "Ananya Sengupta",
    score: "98.6%",
    board: "ICSE",
    grade: "Class 10th Board",
    school: "St. Xavier's High School",
    highlight: "100/100 in Mathematics & Science",
    quote: "Wisdom Institute taught me how to write exact step markings for ICSE. The 3D concept visualizations in Physics made ray diagrams effortless.",
  },
  {
    name: "Priya Sharma",
    score: "99.0%",
    board: "CBSE",
    grade: "Class 10th Board",
    school: "Delhi Public School (DPS)",
    highlight: "City Rank 2 · Centum in Math & Science",
    quote: "The NCERT deep-dive and weekly mock tests at Wisdom Institute eliminated all exam anxiety. Their doubt-clearing sessions were truly personal.",
  },
  {
    name: "Rahul Deshmukh",
    score: "97.8%",
    board: "ICSE",
    grade: "Class 10th Board",
    school: "Bishop Cotton Boys' School",
    highlight: "99 in Commercial Applications & Chemistry",
    quote: "Separate batches for ICSE meant our teacher never rushed past Selina examples or Merchant of Venice discussions. Best coaching institute ever.",
  },
  {
    name: "Tanmay Verma",
    score: "98.2%",
    board: "CBSE",
    grade: "Class 10th Board",
    school: "Modern School",
    highlight: "100/100 in Science & 98 in Math",
    quote: "Started in Class 8th at Wisdom Institute. Their conceptual foundation built my confidence not just for boards, but for future JEE prep.",
  },
  {
    name: "Shreya Kapoor",
    score: "97.6%",
    board: "CBSE",
    grade: "Class 10th Board",
    school: "The Heritage School",
    highlight: "98 in Mathematics & Social Science",
    quote: "The small batch size of 15 meant every question I raised was addressed on the spot. Wisdom Institute is like a dedicated academic family.",
  },
  {
    name: "Aarav Mehta",
    score: "97.4%",
    board: "ICSE",
    grade: "Class 10th Board",
    school: "Cathedral & John Connon School",
    highlight: "100 in Computer Applications (Java)",
    quote: "The Java programming modules and physics numerical worksheets gave me the exact edge required for a 97%+ aggregate in ICSE.",
  },
];

export interface BoardComparisonItem {
  dimension: string;
  icse: string;
  cbse: string;
  wisdomAdvantage: string;
}

export const BOARD_COMPARISON: BoardComparisonItem[] = [
  {
    dimension: "Curriculum Breadth & Depth",
    icse: "Comprehensive, in-depth descriptive syllabus across Physics, Chemistry, Biology, and Literature with rigorous internal project assessments.",
    cbse: "Structured, application-focused syllabus based strictly on NCERT frameworks, emphasizing core scientific laws and direct mathematical formulas.",
    wisdomAdvantage: "Distinct dedicated batches for each board with customized lesson plans matching their specific textbooks.",
  },
  {
    dimension: "Science & Lab Work",
    icse: "Heavy focus on experimental methodology, lab observations, practical record books, and multi-step descriptive answers.",
    cbse: "Integrated Science curriculum blending concepts with practical skills questions and assertion-reasoning analytical drills.",
    wisdomAdvantage: "Weekly 3D virtual & hands-on lab experiments for both boards to ensure crystal-clear physical intuition.",
  },
  {
    dimension: "Language & Literature",
    icse: "Intensive classical English literature (e.g. Shakespeare plays, analytical poetry) requiring refined descriptive prose.",
    cbse: "Communicative and functional English emphasizing reading comprehension, formal writing formats, and communicative fluency.",
    wisdomAdvantage: "Specialized language faculty ensuring students score 95+ in English, protecting their overall aggregate percentage.",
  },
  {
    dimension: "Assessment & Exam Format",
    icse: "Extensive subjective questions, structured sub-questions, and internal project evaluations (20% internal weightage).",
    cbse: "Objective MCQs (20%), Case-based questions (20%), and Structured short/long answers aligned with NEP 2020 competencies.",
    wisdomAdvantage: "Board-specific mock exam series replicating exact question papers, answer booklets, and official marking schemes.",
  },
  {
    dimension: "Competitive Foundation (Olympiads / JEE / NEET)",
    icse: "Deep foundation in advanced numerical problem-solving and organic chemical reactions early from Class 8th.",
    cbse: "Direct alignment with all national competitive exams since NCERT is the benchmark syllabus for NEET & JEE Main.",
    wisdomAdvantage: "Integrated Foundation modules seamlessly woven into routine lessons without overburdening the student.",
  },
];

export interface FacultyMember {
  name: string;
  role: string;
  qualification: string;
  experience: string;
  expertise: string;
}

export const FACULTY_DATA: FacultyMember[] = [
  {
    name: "Prof. Rajeshwar K. Sharma",
    role: "Head of Mathematics & Academic Director",
    qualification: "M.Sc. Mathematics (Gold Medalist), B.Ed.",
    experience: "16+ Years Experience",
    expertise: "Former ICSE & CBSE Senior Board Examiner, Author of Foundation Geometry manuals",
  },
  {
    name: "Dr. Sunita Mukherjee",
    role: "Lead Faculty — Physics & STEM Innovations",
    qualification: "Ph.D. in Applied Physics, Ex-Research Fellow",
    experience: "14+ Years Experience",
    expertise: "Specialist in 3D optics simulation, mechanics, and Olympiad mentoring",
  },
  {
    name: "Amitabh Banerjee",
    role: "Senior Faculty — Chemistry & Environmental Science",
    qualification: "M.Sc. Organic Chemistry, NET Qualified",
    experience: "12+ Years Experience",
    expertise: "Master of chemical reaction mechanisms, periodic trends, and practical labs",
  },
  {
    name: "Dr. Neha Swaminathan",
    role: "Faculty — Biology & Pre-Medical Foundation",
    qualification: "M.Sc. Biotechnology, B.Ed.",
    experience: "11+ Years Experience",
    expertise: "Specializes in anatomical diagrams, genetics, and interactive life-science animations",
  },
];
