import { useState } from "react";
import { EvidenceTag } from "../../components/common/EvidenceTag";
import { workflowStages } from "./consoleContent";

export function ConsolePage() {
  const [selectedId, setSelectedId] = useState("grain");
  const selected = workflowStages.find((stage) => stage.id === selectedId) ?? workflowStages[1];
  const hasMicrostructureFigure = selected.id === "grain";

  return (
    <div className="console-canvas">
      <section className="research-desk" aria-label="Research workflow console">
        <header className="desk-hero reveal">
          <div>
            <p className="eyebrow">RESEARCH WORKFLOW CONSOLE</p>
            <h1>Research is in motion, Yifan</h1>
            <p>Additive manufacturing {" / "} Computational materials science</p>
          </div>
          <div className="desk-hero__status"><span aria-hidden="true" />Evidence-first workspace</div>
        </header>

        <section className="desk-archive" aria-label="Research archive">
        <div className="desk-layout">
          <nav className="desk-navigation" aria-label="Workflow stages">
            <p className="eyebrow">WORKFLOW</p>
          {workflowStages.map((stage, index) => (
              <button
                key={stage.id}
                type="button"
                className={selectedId === stage.id ? "desk-stage is-selected" : "desk-stage"}
                aria-pressed={selectedId === stage.id}
                onClick={() => setSelectedId(stage.id)}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>{stage.short}
            </button>
          ))}
          <aside className="workspace-scope" aria-label="Workspace scope">
            <p className="eyebrow">WORKSPACE SCOPE</p>
            <strong>SmCo permanent magnets</strong>
            <span>Evidence workspace</span>
          </aside>
        </nav>

          <section className="desk-previews" aria-label="Research previews">
            <figure className="preview-card">
              <img src="/assets/workflow-concept.png" alt="Conceptual workflow from PBF process to property response" />
              <figcaption><span>Workflow map</span><small>Conceptual illustration</small></figcaption>
            </figure>
            <figure className="preview-card preview-card--result">
              <img src="/assets/research/smco-multilayer-comparison.png" alt="Multilayer grain morphology comparison from phase-field simulation" />
              <figcaption><span>Multilayer morphology</span><small>Simulation result</small></figcaption>
            </figure>
            <section className="archive-card" aria-label="HPC handoff">
              <p className="eyebrow">HPC HANDOFF</p>
              <strong>Extraction gate</strong>
              <p>Grain-size table pending extraction.</p>
              <small>Live monitor not connected</small>
            </section>
          </section>

          <article className="desk-main" aria-label={`${selected.title} evidence`} aria-live="polite">
            <div className="desk-main__header">
              <div><p className="eyebrow">SELECTED EVIDENCE</p><h2>{selected.title}</h2></div>
              <EvidenceTag state={selected.status} />
            </div>

            {hasMicrostructureFigure ? (
              <figure className="desk-result">
                <img src="/assets/research/smco-multilayer-comparison.png" alt="Multilayer grain morphology comparison from phase-field simulation" />
                <figcaption>Verified phase-field result. This comparison is a simulation record, not experimental imagery.</figcaption>
              </figure>
            ) : (
              <div className="desk-empty-result">
                <p className="eyebrow">NO FIGURE ATTACHED</p>
                <p>This stage has traceable evidence but no approved result image is attached to the console.</p>
              </div>
            )}

            <div className="desk-main__evidence">
              <p>{selected.evidence[0]}</p>
              <dl>
                <div><dt>Source</dt><dd>{selected.source}</dd></div>
                <div><dt>Next gate</dt><dd>{selected.nextGate}</dd></div>
              </dl>
            </div>
          </article>
        </div>

        <ul className="status-deck" aria-label="Research status deck">
          <li>
            <p className="eyebrow">THERMAL EVIDENCE</p>
            <strong>Width validated</strong>
            <span>Depth gate pending</span>
          </li>
          <li>
            <p className="eyebrow">MICROSTRUCTURE</p>
            <strong>Verified multilayer</strong>
            <span>Nine CUDA cases</span>
          </li>
          <li>
            <p className="eyebrow">MESH CONVERSION</p>
            <strong>Verified baseline</strong>
            <span>Y/Z reversal documented</span>
          </li>
          <li>
            <p className="eyebrow">HPC SUBMISSION</p>
            <strong>Monitor not connected</strong>
            <span>{selected.nextGate}</span>
          </li>
        </ul>
        </section>
      </section>
    </div>
  );
}
