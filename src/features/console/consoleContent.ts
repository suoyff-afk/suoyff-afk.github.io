import type { RelatedWorkflowProject, WorkflowProfile, WorkflowStage } from "./consoleTypes";

export const workflowProfile: WorkflowProfile = {
  roleLine: "PhD researcher at TU Darmstadt | Computational materials science, additive manufacturing, and multiphysics simulation",
  contribution: "Integrated and evaluated a multiphysics workflow connecting LPBF thermal histories, CUDA-based grain evolution, S2M mesh conversion, and MOOSE / NISOS magnetic-response simulations. My work covers simulation setup, parameter studies, post-processing, validation, and interpretation.",
  toolBoundary: "CUDA, S2M, MOOSE, and NISOS were used and integrated as workflow tools; this page does not claim independent development of the underlying solvers.",
};

export const relatedWorkflowProjects: RelatedWorkflowProject[] = [
  { title: "Dual-laser LPBF", context: "Thermal and elasto-plastic process simulation", to: "/research#dual-laser" },
  { title: "Solid-state battery FE-ANN", context: "3D RVE and data-driven modeling", to: "/research#battery" },
  { title: "Shining 3D", context: "Additive-manufacturing materials R&D", to: "/research#shining-3d" },
];

export const workflowStages: WorkflowStage[] = [
  {
    id: "thermal",
    short: "Thermal",
    title: "Thermal history",
    status: "Width validated",
    source: "Retained nine-case thermal width dataset at v=500 mm/s.",
    evidence: [
      "Thermal width validation gives MAE=7.604 um and MAPE=5.810%.",
    ],
    nextValidation: "Validate melt-pool depth before extending the thermal comparison beyond the current width dataset.",
    limitation: "Width error bars describe within-image line-measurement sample variation, not independent-build repeatability.",
  },
  {
    id: "grain",
    short: "Microstructure",
    title: "Grain morphology",
    status: "Verified multilayer",
    source: "CUDA single-layer P-v sweep and completed multilayer simulations.",
    evidence: [
      "Nine CUDA P-v cases and nine closed magnetic loops form the verified single-layer baseline.",
      "The current dataset indicates stronger coarsening at higher power and lower scan speed.",
      "P160_V400 finishes with 8012 grains; P80_V1000 finishes with 9866.",
      "P160_V400 is the low-remanence outlier with Mr/Ms=0.7111.",
      "Verified multilayer state: 501 x 421 x 271, 16000 initial grains, completed to 6500 us.",
      "Layer activation occurs at 0, 2500, and 5000 us.",
      "The anisotropy baseline is 14619 versus 14618 globally.",
      "Layer differences are 0.89%, 7.87%, and 11.65%; this indicates local sensitivity, not strong global coarsening change.",
    ],
    nextValidation: "Complete and review the nine-case quantitative grain-size comparison.",
    limitation: "Observed coarsening trends describe the current dataset and do not establish a general material law.",
  },
  {
    id: "mesh",
    short: "Mesh",
    title: "Tetrahedral mesh",
    status: "Verified baseline",
    source: "S2M conversion workflow and asymmetric marker verification.",
    evidence: [
      "S2M: X is preserved, Y/Z are reversed, and the layer-normal Z is retained.",
    ],
    nextValidation: "Add a publication-ready coordinate annotation that makes the reversed Y/Z directions explicit.",
    limitation: "Layer order and spatial interpretation must account for the Y and Z reversal.",
  },
  {
    id: "magnetic",
    short: "Magnetic response",
    title: "Magnetic response",
    status: "Verified baseline",
    source: "Nine MOOSE / NISOS hysteresis outputs paired with the CUDA cases.",
    evidence: [
      "All nine loops are closed; Hc spans approximately 0.9197-0.9615.",
      "Hc varies weakly across the current nine cases.",
    ],
    nextValidation: "Relate verified grain-size descriptors to a defensible switching-parameter law.",
    limitation: "The model supports no quantitative SmCo5 coercivity prediction.",
  },
];
