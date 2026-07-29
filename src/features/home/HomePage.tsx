import { Link } from "react-router-dom";
import { CopyEmail } from "../../components/common/CopyEmail";
import { assetUrl } from "../../app/routes";

export function HomePage() {
  return (
    <div className="home-page">
      <section className="home-hero page-frame">
        <div className="hero-copy reveal">
          <p className="eyebrow">PHD STUDENT {" / "} TU DARMSTADT<br />MECHANICS OF FUNCTIONAL MATERIALS</p>
          <h1 aria-label="Computational Materials Scientist">Computational<br />Materials Scientist</h1>
          <p className="lede">Process-structure-property modeling for materials R&amp;D, linking additive manufacturing simulations, microstructure evolution, and property prediction.</p>
          <div className="hero-actions">
            <Link className="button button--dark" to="/cv">View CV</Link>
            <Link className="button" to="/research">Research</Link>
            <Link className="button" to="/console">Console</Link>
          </div>
          <CopyEmail />
        </div>
        <figure className="workflow-figure reveal reveal--delay">
          <div className="figure-index">FIG. 01 / CONCEPTUAL WORKFLOW</div>
          <img src={assetUrl("assets/workflow-concept.png")} alt="Conceptual workflow from PBF process through thermal history and microstructure to a property model" />
          <figcaption>Conceptual illustration only. Not simulation or experimental data.</figcaption>
        </figure>
      </section>
      <section className="principle-strip page-frame" aria-label="Research approach">
        <span>01 {" / "} PROCESS</span><span>02 {" / "} STRUCTURE</span><span>03 {" / "} PROPERTY</span>
      </section>
    </div>
  );
}
