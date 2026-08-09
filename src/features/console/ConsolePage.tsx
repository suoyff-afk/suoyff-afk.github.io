import { useState } from "react";
import { Link } from "react-router-dom";
import { assetUrl } from "../../app/routes";
import { EvidenceTag } from "../../components/common/EvidenceTag";
import { relatedWorkflowProjects, workflowProfile, workflowStages } from "./consoleContent";

export function ConsolePage() {
  const [selectedId, setSelectedId] = useState("grain");
  const selected = workflowStages.find((stage) => stage.id === selectedId) ?? workflowStages[1];
  const hasMicrostructureFigure = selected.id === "grain";

  return (
    <div className="console-page page-frame interior-page">
      <section className="research-desk" aria-label="SmCo research workflow">
        <header className="desk-hero reveal">
          <div className="desk-hero__copy">
            <nav className="desk-breadcrumb" aria-label="Breadcrumb">
              <Link to="/research">Research</Link><span aria-hidden="true">/</span><span aria-current="page">SmCo Workflow</span>
            </nav>
            <h1 aria-label="SmCo Process-Structure-Property Workflow">
              <span className="desk-title--desktop">SmCo Process-Structure-Property Workflow</span>
              <span className="desk-title--mobile" aria-hidden="true">SmCo Multiphysics Workflow</span>
            </h1>
            <p className="desk-role-line">{workflowProfile.roleLine}</p>
            <p className="desk-hero__lede">LPBF thermal history {" -> "} CUDA 3D grain evolution {" -> "} S2M mesh conversion {" -> "} MOOSE / NISOS magnetic response</p>
          </div>
          <div className="desk-hero__aside">
            <div className="desk-hero__status"><span aria-hidden="true" />Research evidence</div>
          </div>
        </header>

        <section className="desk-archive" aria-label="SmCo research workflow case study">
          <div className="desk-layout">
            <nav className="desk-navigation" aria-label="Workflow stages">
              <p className="eyebrow">COMPUTATIONAL PIPELINE</p>
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
              <aside className="workspace-scope" aria-label="Research scope">
                <p className="eyebrow">RESEARCH SCOPE</p>
                <strong>SmCo permanent magnets</strong>
                <span>Process-structure-property</span>
              </aside>
            </nav>

            <section className="desk-previews" aria-label="Research previews">
              <figure className="preview-card">
                <img src={assetUrl("assets/workflow-concept.png")} alt="Conceptual workflow from PBF process to property response" />
                <figcaption><span>Workflow map</span><small>Conceptual illustration</small></figcaption>
              </figure>
              <figure className="preview-card preview-card--result">
                <img src={assetUrl("assets/research/smco-multilayer-comparison.png")} alt="Multilayer grain morphology comparison from phase-field simulation" />
                <figcaption><span>Multilayer morphology</span><small>Simulation result</small></figcaption>
              </figure>
            </section>

            <article className="desk-main" aria-label={`${selected.title} evidence`} aria-live="polite">
              <div className="desk-main__header">
                <div><p className="eyebrow">STAGE RESULT</p><h2>{selected.title}</h2></div>
                <EvidenceTag state={selected.status} />
              </div>

              {hasMicrostructureFigure ? (
                <figure className="desk-result">
                  <img src={assetUrl("assets/research/smco-multilayer-comparison.png")} alt="Multilayer grain morphology comparison from phase-field simulation" />
                  <figcaption>Verified phase-field result. This comparison is a simulation record, not experimental imagery.</figcaption>
                </figure>
              ) : (
                <div className="desk-validation-note">
                  <p className="eyebrow">Ongoing validation</p>
                  <p>A publication-ready result figure is not attached. The current quantitative or structural evidence is summarized below.</p>
                </div>
              )}

              <div className="desk-main__evidence">
                <p>{selected.evidence[0]}</p>
                <dl>
                  <div><dt>Method / source</dt><dd>{selected.source}</dd></div>
                  <div><dt>Limitation</dt><dd>{selected.limitation}</dd></div>
                  <div><dt>Next validation</dt><dd>{selected.nextValidation}</dd></div>
                </dl>
              </div>
            </article>
          </div>
        </section>

        <section className="workflow-context" aria-label="Workflow context">
          <section className="workflow-contribution" aria-label="My contribution">
            <p className="eyebrow">MY CONTRIBUTION</p>
            <h2>Workflow integration and evaluation</h2>
            <p>{workflowProfile.contribution}</p>
            <p className="workflow-boundary">{workflowProfile.toolBoundary}</p>
          </section>

          <section className="workflow-related" aria-label="Related work">
            <p className="eyebrow">RELATED WORK</p>
            <h2>Transferable experience</h2>
            <div className="workflow-related__list">
              {relatedWorkflowProjects.map((project) => (
                <Link key={project.to} to={project.to}>
                  <strong>{project.title}</strong><span>{project.context}</span>
                </Link>
              ))}
            </div>
          </section>
        </section>
      </section>
    </div>
  );
}
