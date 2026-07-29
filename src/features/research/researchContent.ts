import type { ResearchArea, ResearchProject } from "./researchTypes";

export const researchAreas: ResearchArea[] = [
  {
    title: "Additive Manufacturing",
    scope: "Thermal histories, scan strategies, and process-response relationships in PBF.",
  },
  {
    title: "Microstructure Evolution",
    scope: "Phase-field grain growth, polycrystalline texture, and GPU-enabled 3D simulation.",
  },
  {
    title: "Multiphysics & Fracture",
    scope: "Thermo-mechanical coupling, damage evolution, and phase-field fracture.",
  },
  {
    title: "Data-driven Materials Modeling",
    scope: "3D RVE finite-element models and FE-ANN workflow acceleration.",
  },
];

export const researchProjects: ResearchProject[] = [
  {
    id: "smco",
    title: "SmCo5 process-structure-property workflow",
    context: "PhD research, TU Darmstadt",
    period: "Feb. 2024 - present",
    status: "Verified multilayer",
    summary: "A computational workflow connecting PBF thermal histories, CUDA-accelerated 3D grain evolution, mesh conversion, and evidence-bounded magnetic hysteresis interpretation.",
    methods: ["CUDA", "Phase field", "S2M", "MOOSE / NISOS"],
    results: [
      "Nine CUDA P-v cases and nine closed magnetic loops establish the verified single-layer baseline.",
      "Completed multilayer simulations indicate local morphology and orientation sensitivity without a strong global coarsening change.",
    ],
    media: {
      src: "assets/research/smco-multilayer-comparison.png",
      alt: "Side-by-side multilayer grain morphology comparison for the SmCo5 workflow",
      caption: "Baseline (left) and grain-boundary anisotropy test at eps=0.20 (right), y=250 slice, final step 650000 / 6500 us. Simulation result; local differences do not imply a strong global coarsening change.",
    },
    action: { label: "Open workflow console", to: "/console" },
    featured: true,
  },
  {
    id: "dual-laser",
    title: "Thermal and elasto-plastic simulation of dual-laser powder bed fusion",
    context: "Engineering with Computers",
    period: "Under review",
    status: "Under review",
    summary: "Compared how dual-laser scan strategies change temperature fields, thermal histories, and elasto-plastic responses in powder bed fusion.",
    methods: ["Thermal simulation", "Elasto-plastic response", "Scan strategies"],
  },
  {
    id: "battery",
    title: "Two-level FE-ANN modeling of solid-state lithium-ion batteries",
    context: "Master thesis, lead contributor",
    period: "Jun. 2023 - Jan. 2024",
    status: "Documented background",
    summary: "Built particle-scale 3D RVE FE models for chemo-mechanical response and damage evolution, trained Python prediction models, and contributed to C++ FE-ANN development.",
    methods: ["3D RVE", "Finite element", "Python", "C++", "FE-ANN"],
  },
  {
    id: "thermal-shock",
    title: "Phase-field simulation of thermal shock in brittle materials",
    context: "Advanced research lab project, lead contributor",
    period: "Jan. 2023 - May 2023",
    status: "Documented background",
    summary: "Set up a MOOSE thermo-mechanically coupled fracture model and analyzed crack evolution under thermal-shock loading.",
    methods: ["MOOSE", "Phase-field fracture", "Thermo-mechanical coupling"],
  },
  {
    id: "sic",
    title: "Rare-earth oxide effects in SiC ceramic sintering",
    context: "Bachelor thesis, lead contributor",
    period: "Nov. 2020 - Jun. 2021",
    status: "Documented background",
    summary: "Studied rare-earth oxide effects on liquid-phase sintering of SiC ceramics and connected processing conditions with microstructures observed by XRD and SEM.",
    methods: ["Ceramic processing", "Liquid-phase sintering", "XRD", "SEM"],
  },
];

export const industryResearch: ResearchProject = {
  id: "shining-3d",
  title: "Shining 3D",
  context: "Junior Materials Engineer Intern, 3D Printing R&D",
  period: "Apr. 2022 - Jul. 2022",
  status: "Documented background",
  summary: "Supported resin formulation, printer parameter optimization, process validation, and material testing for ductility, bending, impact resistance, and thermal strain.",
  methods: ["Resin formulation", "Process validation", "Material testing"],
};

export const researchMethods = [
  "Phase field",
  "Finite element",
  "Thermo-mechanical coupling",
  "CUDA / GPU simulation",
  "FE-ANN",
  "Python",
  "C++",
  "MOOSE",
  "ParaView",
  "XRD",
  "SEM",
];
