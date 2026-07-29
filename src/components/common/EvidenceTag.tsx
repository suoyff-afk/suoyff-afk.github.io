import type { EvidenceState } from "../../features/research/researchTypes";

export function EvidenceTag({ state }: { state: EvidenceState }) {
  return <span className={`evidence evidence--${state.toLowerCase().replaceAll(" ", "-")}`}>{state}</span>;
}
