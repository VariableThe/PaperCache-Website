import { useScrollFade } from '../hooks/useScrollFade';

export default function Philosophy() {
  const ref = useScrollFade();

  return (
    <section className="philosophy-container fade-in-section" ref={ref as any}>
      <h2 className="section-title">Our Philosophy</h2>
      <div className="philosophy-card">
        <div className="quote-mark">"</div>
        <div className="philosophy-content">
          <p className="text-muted">
            PaperCache is a <span className="highlight-text">lightning-fast, computational scratchpad</span> built for developers who need their notes to actually do work. Inspired by the elegant simplicity of AntiNote, but <span className="highlight-text">100% free and open-source</span>, it transforms the traditional passive notepad into an active workspace featuring <span className="highlight-text">reactive math, inline AI, and zero-friction window management</span>.
          </p>
          <p className="text-muted">
            We believe your tools should be as fast as your thoughts, which is why we engineered PaperCache to spawn exactly where your cursor is, hide markdown syntax for clean reading, and maintain a <span className="highlight-text">true zero-idle CPU state</span> so it never drains your battery. It is an opinionated, rigorously built, and completely free alternative to paid productivity tools, designed to seamlessly capture your fleeting ideas without ever getting in your way.
          </p>
        </div>
      </div>
    </section>
  );
}
