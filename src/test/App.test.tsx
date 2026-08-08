import { act, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import { App } from "../app/App";
import { CopyEmail } from "../components/common/CopyEmail";
import { ResearchProjectCard } from "../features/research/ResearchProjectCard";
import type { ResearchProject } from "../features/research/researchTypes";

function renderAt(path = "/") {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  );
}

describe("site routes and navigation", () => {
  it.each([
    ["/", "Computational Materials Scientist"],
    ["/research", "Research"],
    ["/research/smco-workflow", "SmCo Process-Structure-Property Workflow"],
    ["/cv", "Profile & CV"],
  ])("renders %s", (path, heading) => {
    renderAt(path);
    expect(screen.getByRole("heading", { name: heading, level: 1 })).toBeInTheDocument();
  });

  it("renders all main pages after style module split", () => {
    for (const path of ["/", "/research", "/research/smco-workflow", "/cv"]) {
      const { unmount } = renderAt(path);
      expect(screen.getByRole("main")).toBeInTheDocument();
      unmount();
    }
  });

  it("navigates between primary pages", async () => {
    renderAt();
    const nav = screen.getByRole("navigation", { name: "Primary" });
    const header = screen.getByRole("banner");
    expect(within(nav).queryByRole("link", { name: "Contact" })).not.toBeInTheDocument();
    expect(within(nav).queryByRole("link", { name: "Console" })).not.toBeInTheDocument();
    expect(within(header).getAllByRole("link", { name: /CV/i })).toHaveLength(1);
    expect(screen.queryByRole("link", { name: "Console" })).not.toBeInTheDocument();
    await userEvent.click(within(nav).getByRole("link", { name: "Research" }));
    expect(screen.getByRole("heading", { name: "Research", level: 1 })).toBeInTheDocument();
  });

  it("keeps contact as footer utility rather than a navigation destination", async () => {
    renderAt();
    expect(screen.queryByRole("link", { name: "Contact" })).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Open navigation" }));
    const menu = screen.getByRole("dialog", { name: "Mobile navigation" });
    expect(within(menu).queryByRole("link", { name: "Contact" })).not.toBeInTheDocument();
    expect(within(screen.getByRole("contentinfo")).getByRole("button", { name: /copy email/i })).toBeInTheDocument();
  });

  it("uses stable public copy and labels the workflow result as a simulation", () => {
    const home = renderAt();
    expect(screen.getByText(/PHD STUDENT \/ TU DARMSTADT/i)).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toHaveTextContent("TU Darmstadt / Computational materials science");
    home.unmount();

    renderAt("/research/smco-workflow");
    expect(screen.getByText(/LPBF thermal history.*CUDA 3D grain evolution.*S2M mesh conversion.*MOOSE \/ NISOS magnetic response/i)).toBeInTheDocument();
    expect(screen.getByText("Simulation result")).toBeInTheDocument();
  });

  it("opens the mobile menu and follows a route", async () => {
    renderAt();
    const toggle = screen.getByRole("button", { name: "Open navigation" });
    await userEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    const menu = screen.getByRole("dialog", { name: "Mobile navigation" });
    expect(within(screen.getByRole("banner")).queryByRole("dialog")).not.toBeInTheDocument();
    expect(menu).toBeInTheDocument();
    expect(within(menu).getAllByRole("link", { name: /CV/i })).toHaveLength(1);
    expect(within(menu).queryByRole("link", { name: "Console" })).not.toBeInTheDocument();
    await userEvent.click(within(menu).getByRole("link", { name: "Research" }));
    expect(screen.getByRole("heading", { name: "Research", level: 1 })).toBeInTheDocument();
    expect(screen.getByRole("main")).toHaveFocus();
  });

  it("redirects the legacy Console route to the canonical SmCo workflow", async () => {
    renderAt("/console");
    await waitFor(() => expect(document.title).toBe("SmCo Workflow | Yifan Suo"));
    expect(screen.getByRole("heading", { name: "SmCo Process-Structure-Property Workflow", level: 1 })).toBeInTheDocument();
  });

  it.each([
    ["/research", "Process, structure, property"],
    ["/research/smco-workflow", "Research Workflow Console"],
    ["/cv", "CV & About"],
  ])("removes the old level-one heading on %s", (path, oldHeading) => {
    renderAt(path);
    expect(screen.queryByRole("heading", { name: oldHeading, level: 1 })).not.toBeInTheDocument();
  });

  it("closes an open mobile menu when the desktop breakpoint is entered", async () => {
    const originalMatchMedia = window.matchMedia;
    let desktop = false;
    let listener: ((event: MediaQueryListEvent) => void) | undefined;
    const mediaQuery = {
      get matches() { return desktop; },
      media: "(min-width: 821px)",
      onchange: null,
      addEventListener: vi.fn((_type: string, callback: (event: MediaQueryListEvent) => void) => { listener = callback; }),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    } as unknown as MediaQueryList;
    window.matchMedia = vi.fn(() => mediaQuery);

    try {
      renderAt();
      await userEvent.click(screen.getByRole("button", { name: "Open navigation" }));
      expect(document.body).toHaveStyle({ overflow: "hidden" });

      desktop = true;
      act(() => listener?.({ matches: true, media: mediaQuery.media } as MediaQueryListEvent));
      expect(screen.queryByRole("dialog", { name: "Mobile navigation" })).not.toBeInTheDocument();
      expect(document.body).not.toHaveStyle({ overflow: "hidden" });
    } finally {
      window.matchMedia = originalMatchMedia;
    }
  });

  it("focuses a valid hash target without using a selector", () => {
    renderAt("/#contact");
    expect(screen.getByRole("contentinfo")).toHaveFocus();
  });

  it.each(["/#missing", "/#%E0%A4%A"])("safely focuses main for unavailable hash %s", (path) => {
    expect(() => renderAt(path)).not.toThrow();
    expect(screen.getByRole("main")).toHaveFocus();
  });

  it("manages focus and closes the mobile menu with Escape", async () => {
    renderAt();
    const toggle = screen.getByRole("button", { name: "Open navigation" });
    await userEvent.click(toggle);

    const menu = screen.getByRole("dialog", { name: "Mobile navigation" });
    expect(menu).toHaveAttribute("aria-modal", "true");
    expect(within(menu).getByRole("link", { name: "Research" })).toHaveFocus();
    expect(document.body).toHaveStyle({ overflow: "hidden" });

    await userEvent.keyboard("{Escape}");
    expect(screen.queryByRole("dialog", { name: "Mobile navigation" })).not.toBeInTheDocument();
    expect(toggle).toHaveFocus();
    expect(document.body).not.toHaveStyle({ overflow: "hidden" });
  });
});

describe("evidence-first content", () => {
  it("presents the research areas as a conceptual visual before the project gallery", () => {
    renderAt("/research");
    expect(screen.getByText("Computational approaches across processing, microstructure, mechanics, and material properties")).toBeInTheDocument();
    const areas = screen.getByRole("region", { name: "Research areas" });
    const overview = within(areas).getByRole("figure", { name: "Research areas overview" });
    expect(within(overview).getByRole("img", { name: /conceptual workflow from PBF process/i })).toHaveAttribute("src", "/assets/workflow-concept.png");
    expect(within(overview).getByText(/conceptual illustration only.*not simulation or experimental data/i)).toBeInTheDocument();
    expect(within(areas).getAllByRole("listitem")).toHaveLength(4);
    for (const area of ["Additive Manufacturing", "Microstructure Evolution", "Multiphysics & Fracture", "Data-driven Materials Modeling"]) {
      expect(within(areas).getByText(area)).toBeInTheDocument();
    }
    const gallery = screen.getByRole("region", { name: "Research project gallery" });
    expect(areas.compareDocumentPosition(gallery) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it("keeps SmCo as a featured result card with a focused workflow handoff", () => {
    renderAt("/research");
    const flagship = screen.getByRole("article", { name: "SmCo5 process-structure-property workflow research project" });
    expect(flagship).toHaveAttribute("data-variant", "featured");
    expect(within(flagship).getByRole("heading", { name: "SmCo5 process-structure-property workflow" })).toBeInTheDocument();
    const results = within(flagship).getByRole("list", { name: "SmCo5 process-structure-property workflow results" });
    expect(within(results).getAllByRole("listitem")).toHaveLength(2);
    expect(within(results).getByText(/nine CUDA P-v cases/i)).toBeInTheDocument();
    expect(within(results).getAllByRole("listitem")[0]).not.toHaveAttribute("aria-label");
    expect(within(flagship).getByRole("img", { name: /multilayer grain morphology comparison/i })).toBeInTheDocument();
    expect(within(flagship).getByText(/simulation result.*local differences do not imply a strong global coarsening change/i)).toBeInTheDocument();
    expect(flagship).not.toHaveTextContent(/501 x 421 x 271|MAE=|Hc spans/i);
    expect(within(flagship).getByRole("link", { name: "Explore research workflow" })).toHaveAttribute("href", "/research/smco-workflow");
  });

  it("omits an empty results list when a project has no results", () => {
    const project: ResearchProject = {
      id: "battery",
      title: "Empty result project",
      context: "Test context",
      period: "Test period",
      status: "Documented background",
      summary: "A project with no published results yet.",
      methods: ["Finite element"],
      results: [],
    };
    render(<MemoryRouter><ResearchProjectCard project={project} /></MemoryRouter>);
    expect(screen.queryByRole("list", { name: "Empty result project results" })).not.toBeInTheDocument();
  });

  it("presents academic work as scalable cards and never invents missing media", () => {
    renderAt("/research");
    const archive = screen.getByRole("region", { name: "Research project gallery" });
    expect(within(archive).getAllByRole("article")).toHaveLength(5);
    const dualLaser = within(archive).getByRole("heading", { name: "Thermal and elasto-plastic simulation of dual-laser powder bed fusion" }).closest("article");
    const battery = within(archive).getByRole("heading", { name: "Two-level FE-ANN modeling of solid-state lithium-ion batteries" }).closest("article");
    const fracture = within(archive).getByRole("heading", { name: "Phase-field simulation of thermal shock in brittle materials" }).closest("article");
    const sic = within(archive).getByRole("heading", { name: "Rare-earth oxide effects in SiC ceramic sintering" }).closest("article");

    expect(dualLaser).toHaveTextContent(/Under review.*Engineering with Computers/i);
    expect(dualLaser).toHaveTextContent(/temperature fields.*thermal histories.*elasto-plastic responses/i);
    expect(battery).toHaveTextContent(/3D RVE FE models.*chemo-mechanical response.*damage evolution/i);
    expect(battery).toHaveTextContent(/Python.*C\+\+.*FE-ANN/i);
    expect(fracture).toHaveTextContent(/MOOSE.*thermo-mechanically coupled fracture.*crack evolution/i);
    expect(sic).toHaveTextContent(/liquid-phase sintering.*XRD.*SEM/i);
    for (const project of [dualLaser, battery, fracture, sic]) {
      expect(within(project as HTMLElement).queryByRole("img")).not.toBeInTheDocument();
      expect(project).not.toHaveTextContent(/placeholder|image coming soon/i);
    }
  });

  it("separates industry R&D and exposes methods across projects", () => {
    renderAt("/research");
    const industry = screen.getByRole("region", { name: "Industry R&D" });
    expect(industry).toHaveTextContent("Shining 3D");
    expect(industry).toHaveTextContent(/Apr\. 2022.*Jul\. 2022/i);
    expect(industry).toHaveTextContent(/resin formulation.*printer parameter optimization.*process validation.*material testing/i);
    const methods = screen.getByRole("region", { name: "Methods across projects" });
    expect(within(methods).getAllByRole("listitem")).toHaveLength(11);
    expect(methods).toHaveTextContent(/Phase field.*finite element.*CUDA.*FE-ANN.*Python.*C\+\+.*XRD.*SEM/i);
  });

  it("presents the SmCo workflow as an external case study and changes selected evidence", async () => {
    renderAt("/research/smco-workflow");
    expect(screen.getByRole("heading", { name: "SmCo Process-Structure-Property Workflow", level: 1 })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Back to Research" })).toHaveAttribute("href", "/research");
    expect(screen.getByRole("link", { name: "View CV" })).toHaveAttribute("href", "/cv");
    const previews = screen.getByRole("region", { name: "Research previews" });
    expect(screen.getByRole("region", { name: "SmCo research workflow case study" })).toHaveTextContent(/Workflow map.*Multilayer morphology/i);
    expect(screen.getByRole("complementary", { name: "Research scope" })).toHaveTextContent(/SmCo permanent magnets.*Process-structure-property/i);
    expect(within(previews).getByRole("img", { name: /conceptual workflow from PBF process/i })).toHaveAttribute("src", "/assets/workflow-concept.png");
    expect(screen.getAllByRole("img", { name: /multilayer grain morphology comparison/i })).toHaveLength(2);
    expect(screen.getByRole("navigation", { name: "Workflow stages" })).toHaveTextContent(/Thermal.*Microstructure.*Mesh.*Magnetic response/i);
    expect(screen.queryByRole("list", { name: "Research status deck" })).not.toBeInTheDocument();
    expect(document.body).not.toHaveTextContent(/Research is in motion|Evidence-first workspace|HPC handoff|Live monitor|Extraction gate|HPC submission/i);
    expect(screen.getByRole("heading", { name: "Grain morphology", level: 2 })).toBeInTheDocument();
    let panel = screen.getByRole("article", { name: "Grain morphology evidence" });
    expect(panel).toHaveTextContent(/nine CUDA P-v cases.*nine closed magnetic loops/i);
    expect(panel).toHaveTextContent(/Current evidence.*Limitation.*Next validation/i);
    expect(panel).toHaveTextContent(/quantitative grain-size comparison/i);

    await userEvent.click(screen.getByRole("button", { name: /Mesh/i }));
    expect(screen.getByRole("heading", { name: "Tetrahedral mesh", level: 2 })).toBeInTheDocument();
    panel = screen.getByRole("article", { name: "Tetrahedral mesh evidence" });
    expect(panel).toHaveTextContent(/S2M conversion workflow/i);
    expect(panel).toHaveTextContent(/X.*preserved.*Y\/Z.*reversed.*layer-normal Z/i);

    await userEvent.click(screen.getByRole("button", { name: /Magnetic response/i }));
    panel = screen.getByRole("article", { name: "Magnetic response evidence" });
    expect(panel).toHaveTextContent(/nine loops.*closed.*Hc.*0\.9197-0\.9615/i);
    expect(panel).not.toHaveTextContent("No verified figure attached");
  });

  it("keeps the SmCo workflow focused and avoids dashboard placeholders", () => {
    const { container } = renderAt("/research/smco-workflow");
    expect(container.querySelector(".site-header")).not.toBeInTheDocument();
    expect(container.querySelector(".site-footer")).not.toBeInTheDocument();
    expect(screen.queryByRole("region", { name: "Future expansion" })).not.toBeInTheDocument();
    expect(screen.queryByRole("navigation", { name: "Console modes" })).not.toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: /Thermal|Microstructure|Mesh|Magnetic response/i })).toHaveLength(4);
  });

  it("uses an honest disabled CV state", () => {
    renderAt("/cv");
    expect(screen.getByRole("button", { name: "CV PDF coming soon" })).toBeDisabled();
    expect(screen.getByText("Portrait not available")).toBeInTheDocument();
  });

  it("shows the verified CV summary modules", () => {
    renderAt("/cv");
    expect(screen.getByText("Computational Materials Scientist")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Education" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Research & R&D Experience" })).toBeInTheDocument();
    const education = screen.getByRole("region", { name: "Education timeline" });
    expect(education).toHaveTextContent(/Feb\. 2024.*present.*TU Darmstadt.*PhD Student/i);
    expect(education).toHaveTextContent(/Oct\. 2021.*Jan\. 2024.*TU Darmstadt.*M\.Sc\. Materials Science/i);
    expect(education).toHaveTextContent(/Sep\. 2017.*Jun\. 2021.*Northwestern Polytechnical University.*B\.Eng\. Composite Materials Engineering.*Business Administration/i);

    const experience = screen.getByRole("region", { name: "Research and R&D timeline" });
    for (const item of [
      /SmCo5.*PhD research/i,
      /Dual-laser PBF.*under review.*Engineering with Computers/i,
      /Solid-state battery.*3D RVE FE-ANN.*master thesis/i,
      /MOOSE.*thermal-shock fracture/i,
      /SiC ceramics.*bachelor thesis/i,
      /Apr\. 2022.*Jul\. 2022.*Shining 3D/i,
    ]) expect(experience).toHaveTextContent(item);
    expect(experience.textContent?.indexOf("Shining 3D")).toBeLessThan(experience.textContent?.indexOf("SiC ceramics bachelor thesis") ?? 0);

    const skills = screen.getByRole("region", { name: "Skills" });
    for (const group of ["Simulation", "Programming", "Materials", "Tools & Languages"]) {
      expect(within(skills).getByRole("heading", { name: group })).toBeInTheDocument();
    }
    expect(screen.getByText("Darmstadt, Germany")).toBeInTheDocument();
    expect(document.querySelector('a[href^="tel:"]')).toBeNull();
  });

  it("copies the contact email", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText },
    });
    renderAt();
    await userEvent.click(screen.getAllByRole("button", { name: /copy email/i })[0]);
    expect(writeText).toHaveBeenCalledWith("suoyff@gmail.com");
    expect(screen.getByText("Email copied")).toBeInTheDocument();
  });

  it("shows copied status when clipboard rejects and textarea copy succeeds", async () => {
    const writeText = vi.fn().mockRejectedValue(new Error("Clipboard denied"));
    const execCommand = vi.fn().mockReturnValue(true);
    Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText } });
    Object.defineProperty(document, "execCommand", { configurable: true, value: execCommand });

    render(<CopyEmail />);
    await userEvent.click(screen.getByRole("button", { name: /copy email/i }));

    expect(writeText).toHaveBeenCalledWith("suoyff@gmail.com");
    expect(execCommand).toHaveBeenCalledWith("copy");
    expect(screen.getByText("Email copied")).toBeInTheDocument();
    expect(document.querySelector("textarea")).not.toBeInTheDocument();
  });

  it("replaces the copy reset timer and clears it on unmount", async () => {
    vi.useFakeTimers();
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText } });
    const { unmount } = render(<CopyEmail />);
    const button = screen.getByRole("button", { name: /copy email/i });

    try {
      await act(async () => { fireEvent.click(button); await Promise.resolve(); });
      expect(vi.getTimerCount()).toBe(1);
      await act(async () => { fireEvent.click(button); await Promise.resolve(); });
      expect(vi.getTimerCount()).toBe(1);
      unmount();
      expect(vi.getTimerCount()).toBe(0);
    } finally {
      vi.clearAllTimers();
      vi.useRealTimers();
    }
  });

  it.each(["/", "/research", "/research/smco-workflow", "/console", "/cv"])("excludes fabricated identities on %s", (path) => {
    const { container } = renderAt(path);
    expect(container).not.toHaveTextContent("A. V. Research");
    expect(container).not.toHaveTextContent("Senior Researcher");
  });
});
