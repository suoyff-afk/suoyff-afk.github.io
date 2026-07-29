export type EvidenceState =
  | "Verified baseline"
  | "Verified multilayer"
  | "Width validated"
  | "Pending extraction"
  | "Under review"
  | "Documented background"
  | "Future work";

export type ResearchArea = {
  title: string;
  scope: string;
};

export type ResearchProject = {
  id: "smco" | "dual-laser" | "battery" | "thermal-shock" | "sic" | "shining-3d";
  title: string;
  context: string;
  period: string;
  status: EvidenceState;
  summary: string;
  methods: string[];
  results?: string[];
  media?: {
    src: string;
    alt: string;
    caption: string;
  };
  action?: {
    label: string;
    to: string;
  };
  featured?: boolean;
};
