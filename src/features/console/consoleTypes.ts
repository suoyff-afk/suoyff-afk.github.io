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
