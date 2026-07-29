import type { SkillGroup, TimelineEntry } from "./cvTypes";

export const education: TimelineEntry[] = [
  {
    title: "TU Darmstadt",
    subtitle: "PhD Student, Mechanics of Functional Materials",
    period: "Feb. 2024 - present",
    detail: "Phase-field modeling, microstructure evolution, and property prediction of 3D-printed magnetic materials.",
  },
  {
    title: "TU Darmstadt",
    subtitle: "M.Sc. Materials Science",
    period: "Oct. 2021 - Jan. 2024",
    detail: "Mechanics of Functional Materials.",
  },
  {
    title: "Northwestern Polytechnical University",
    subtitle: "B.Eng. Composite Materials Engineering; Business Administration",
    period: "Sep. 2017 - Jun. 2021",
    detail: "Academic focus included SiC composites.",
  },
];

export const experience: TimelineEntry[] = [
  {
    title: "SmCo5 multiphysics phase-field modeling",
    subtitle: "PhD research, TU Darmstadt",
    period: "Feb. 2024 - present",
    detail: "Process-structure-property workflows linking grain growth, texture evolution, and magnetic hysteresis.",
  },
  {
    title: "Dual-laser PBF thermo-elasto-plastic simulation",
    subtitle: "Under review, Engineering with Computers",
    period: "Under review",
    detail: "Temperature fields, thermal histories, and elasto-plastic response under different scan strategies.",
  },
  {
    title: "Solid-state battery 3D RVE FE-ANN",
    subtitle: "Master thesis",
    period: "Jun. 2023 - Jan. 2024",
    detail: "Particle-scale chemo-mechanical response, damage evolution, and data-driven prediction.",
  },
  {
    title: "MOOSE phase-field thermal-shock fracture",
    subtitle: "Advanced research lab project",
    period: "Jan. 2023 - May 2023",
    detail: "Thermo-mechanically coupled fracture setup, postprocessing, and crack-evolution analysis.",
  },
  {
    title: "Shining 3D",
    subtitle: "3D-printing R&D internship",
    period: "Apr. 2022 - Jul. 2022",
    detail: "Resin formulation, printer parameter optimization, process validation, and material testing.",
  },
  {
    title: "SiC ceramics bachelor thesis",
    subtitle: "Rare-earth oxide effects on liquid-phase sintering",
    period: "Nov. 2020 - Jun. 2021",
    detail: "Ceramic preparation and microstructure characterization using XRD and SEM.",
  },
];

export const skillGroups: SkillGroup[] = [
  { title: "Simulation", detail: "MOOSE, phase-field method, finite-element simulation, thermo-mechanical coupling, multiphysics modeling, FE-ANN" },
  { title: "Programming", detail: "Python, C++, CUDA / GPU acceleration, machine learning, data postprocessing" },
  { title: "Materials", detail: "XRD, SEM, density and porosity measurement, ceramics and composite preparation" },
  { title: "Tools & Languages", detail: "Origin, ParaView, CAD; Mandarin Chinese (native), English (IELTS 6.5)" },
];
