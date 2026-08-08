import { describe, expect, it } from "vitest";
import { workflowStages } from "../features/console/consoleContent";
import { education, experience } from "../features/cv/cvContent";
import { industryResearch, researchAreas, researchMethods, researchProjects } from "../features/research/researchContent";

describe("feature content contracts", () => {
  it("keeps research project IDs stable and SmCo featured", () => {
    expect(researchProjects.map((project) => project.id)).toEqual([
      "smco",
      "dual-laser",
      "battery",
      "thermal-shock",
      "sic",
    ]);
    expect(researchProjects[0]).toMatchObject({
      id: "smco",
      featured: true,
      action: { label: "Explore research workflow", to: "/research/smco-workflow" },
    });
    expect(industryResearch.id).toBe("shining-3d");
    expect(researchAreas).toHaveLength(4);
    expect(researchMethods).toContain("CUDA / GPU simulation");
  });

  it("keeps the four scientific workflow stages stable", () => {
    expect(workflowStages.map((stage) => stage.id)).toEqual([
      "thermal",
      "grain",
      "mesh",
      "magnetic",
    ]);
    expect(workflowStages.every((stage) => stage.evidence.length > 0)).toBe(true);
  });

  it("keeps CV timeline modules populated", () => {
    expect(education).toHaveLength(3);
    expect(experience.length).toBeGreaterThanOrEqual(6);
    expect(experience.map((entry) => entry.title).join(" ")).toContain("Shining 3D");
  });
});
