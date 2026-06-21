import { useScrollFade } from '../hooks/useScrollFade';

export default function Philosophy() {
  const ref = useScrollFade();

  return (
    <section className="philosophy-container fade-in-section" ref={ref as any}>
      <h2 className="section-title">Our Philosophy</h2>
      <div className="philosophy-content">
        <p className="text-muted">
          Placeholder philosophy text. Let me know what your core values and ideas are for PaperCache, and I'll format them beautifully here!
        </p>
      </div>
    </section>
  );
}
