import { useScrollFade } from '../hooks/useScrollFade';

export default function Kofi() {
  const ref = useScrollFade();

  return (
    <section className="kofi-mini-container fade-in-section" ref={ref}>
      <p className="kofi-mini-text text-muted">
        Finding PaperCache useful? 
        <a href="https://ko-fi.com/thevariable" target="_blank" rel="noreferrer" className="kofi-mini-link">
          Buy me a coffee ☕
        </a>
      </p>
    </section>
  );
}
