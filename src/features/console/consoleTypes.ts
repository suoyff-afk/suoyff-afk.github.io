import type { EvidenceState } from "../research/researchTypes";

export type WorkflowStage = {
  id: "thermal" | "grain" | "mesh" | "magnetic" | "figures";
  short: string;
  title: string;
  status: EvidenceState;
  source: string;
  evidence: string[];
  nextGate: string;
  limitation: string;
  readiness: string;
};
