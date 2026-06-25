import { useScrollFade } from '../hooks/useScrollFade';

export default function Philosophy() {
  const ref = useScrollFade();

  return (
    <section className="philosophy-container fade-in-section" ref={ref}>
      <h2 className="section-title">Our Philosophy</h2>
      <div className="philosophy-card">
        <div className="quote-mark">"</div>
        <div className="philosophy-content">
          <p className="text-muted">
            PaperCache is a <span className="highlight-text">lightning-fast, open-source scratchpad, knowledge manager, and second brain</span> built for developers who need their notes to actually do work. Inspired by the elegant simplicity of AntiNote, but <span className="highlight-text">100% free and open-source</span>, it transforms the traditional passive notepad into an active workspace featuring <span className="highlight-text">reactive math, inline AI, and zero-friction window management</span>. As a leading <span className="highlight-text">AntiNote alternative</span>, PaperCache delivers all the power without the subscription.
          </p>
          <p className="text-muted">
            We believe your tools should be as fast as your thoughts, which is why we engineered PaperCache to spawn exactly where your cursor is, hide markdown syntax for clean reading, and maintain a <span className="highlight-text">true zero-idle CPU state</span> so it never drains your battery — making it the ultimate <span className="highlight-text">lightweight note taking app</span> and <span className="highlight-text">zero CPU note taking app</span> for developers who value performance. It is an opinionated, rigorously built, and completely free alternative to paid productivity tools, designed to seamlessly capture your fleeting ideas without ever getting in your way. Built with Rust & Tauri, PaperCache runs natively on <span className="highlight-text">Mac, Windows, and Linux</span>.
          </p>
        </div>
      </div>
    </section>
  );
}
