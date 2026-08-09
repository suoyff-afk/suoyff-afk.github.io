import type { EvidenceState } from "../research/researchTypes";

export type WorkflowStage = {
  id: "thermal" | "grain" | "mesh" | "magnetic";
  short: string;
  title: string;
  status: EvidenceState;
  source: string;
  evidence: string[];
  nextValidation: string;
  limitation: string;
};

export type WorkflowProfile = {
  roleLine: string;
  contribution: string;
  toolBoundary: string;
};

export type RelatedWorkflowProject = {
  title: string;
  context: string;
  to: string;
};
