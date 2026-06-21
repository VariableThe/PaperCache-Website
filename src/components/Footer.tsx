

export default function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-logo font-mono">
          <span className="text-accent-glow">//</span> PaperCache
        </div>
        <div className="footer-links">
          <span className="footer-by">by <a href="https://github.com/VariableThe" target="_blank" rel="noreferrer" style={{color: 'inherit', textDecoration: 'none'}}>VariableThe</a></span>
          <a href="https://github.com/VariableThe/PaperCache" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://github.com/VariableThe/PaperCache/releases/latest" target="_blank" rel="noreferrer">Releases</a>
        </div>
      </div>
    </footer>
  );
}
