import { useState } from 'react';
import { useScrollFade } from '../hooks/useScrollFade';

export default function Install() {
  const ref = useScrollFade();
  const [copiedLines, setCopiedLines] = useState<{[key: number]: boolean}>({});

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedLines({ ...copiedLines, [0]: true });
    setTimeout(() => {
      setCopiedLines({ ...copiedLines, [0]: false });
    }, 2000);
  };

  return (
    <section className="install-container fade-in-section" ref={ref}>
      <div className="terminal-block font-mono">
        <div className="terminal-content">
          <div>brew tap variablethe/tap</div>
          <div>brew install --cask papercache</div>
        </div>
        <button className="copy-btn" onClick={() => handleCopy("brew tap variablethe/tap\nbrew install --cask papercache")}>
          {copiedLines[0] ? "Copied!" : "Copy"}
        </button>
      </div>
      <a href="https://github.com/VariableThe/PaperCache/releases/latest" className="link-text install-link">
        Or download directly from GitHub Releases →
      </a>
    </section>
  );
}
