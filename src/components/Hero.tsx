import { useState, useEffect } from 'react';
import TypingDemo from './TypingDemo';
import DownloadCounter from './DownloadCounter';
import { useOS } from '../hooks/useOS';
import { useLatestRelease } from '../hooks/useLatestRelease';

// SVGs
const AppleSVG = () => <svg width="20" height="20" viewBox="0 0 384 512" fill="currentColor"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/></svg>;
const WinSVG = () => <svg width="20" height="20" viewBox="0 0 448 512" fill="currentColor"><path d="M0 93.7l210.5-29.7v167.4H0V93.7zm210.5 187.5V448L0 418.3V281.2h210.5zm26.3-189.6L448 31.9v199.3H236.8V91.6zm0 189.6H448v199.3l-211.2-30V281.2z"/></svg>;
const LinuxSVG = () => <svg width="20" height="20" viewBox="0 0 448 512" fill="currentColor"><path d="M220.8 123.3c1.1 0 2.2 0 3.3 .1c6.5 .5 12.3-2.9 15.6-8.5c10.3-17.6 28.3-24.1 48-18.3c16.2 4.7 30.1 16.7 40.5 30.4c1.6 2.1 3.2 4.3 4.9 6.6c29.1 39.5 59.8 81.2 59.8 142.4c0 14.4-1 29.5-3.1 44.9c-.8 6.1 2.2 12 7.4 15.5c22.1 14.8 35 37.1 36.3 62.8c1.3 25.3-9.5 49.2-29.3 64.9c-23.7 18.9-53 25-83 17.3c-1.8-.5-3.6-.9-5.4-1.3c-39.7-9.5-73.4-10-109.9-10c-36.5 0-70.2 .5-109.9 10c-1.8 .4-3.6 .9-5.4 1.3c-29.9 7.7-59.2 1.6-83-17.3c-19.8-15.7-30.6-39.6-29.3-64.9c1.3-25.7 14.2-48 36.3-62.8c5.2-3.5 8.2-9.4 7.4-15.5c-2-15.4-3-30.5-3-44.9c0-61.2 30.7-102.9 59.8-142.4c1.7-2.3 3.3-4.5 4.9-6.6c10.4-13.7 24.3-25.7 40.5-30.4c19.7-5.8 37.7 .7 48 18.3c3.3 5.6 9.1 9 15.6 8.5c1.1-.1 2.2-.1 3.3-.1zM116.8 335.6c-.7 1.4-1.2 2.9-1.5 4.4c-.6 2.9 .8 5.7 3.2 6.8c11 4.9 22.8 7.3 34.6 7.3c15.2 0 30.3-3.6 44.4-10.7c2.5-1.3 5.5-.3 6.8 2.2s.3 5.5-2.2 6.8c-15.6 7.9-32.3 11.9-49 11.9c-13 0-26.1-2.6-38.3-8c-5.4-2.4-8.6-8.6-7.3-14.7c.4-1.9 1.1-3.8 2-5.5c2.4-4.6 8-6.3 12.5-3.9s6.2 8.1 3.8 12.6zm138.8-11.8c14.1 7.1 29.2 10.7 44.4 10.7c11.8 0 23.6-2.4 34.6-7.3c2.4-1.1 3.8-3.9 3.2-6.8c-.3-1.5-.8-3-1.5-4.4c-2.4-4.6-1.5-10.3 3.1-12.6s10.3-1.5 12.7 3.1c.9 1.8 1.6 3.7 2 5.5c1.3 6.1-1.9 12.3-7.3 14.7c-12.2 5.4-25.3 8-38.3 8c-16.7 0-33.4-4-49-11.9c-2.5-1.3-3.5-4.3-2.2-6.8s4.3-3.5 6.8-2.2zM216.5 15.5c-3.7-2.6-8.9-1.6-11.5 2.1c-16.1 23.2-31.9 48.6-47.5 76.5c-11.3 20.3-23.7 43.4-35.3 68.2c-5.8-5-12.5-9.3-19.8-13c-23-11.5-49.3-13.6-73.4-6c-27 8.5-49.9 28.1-64.8 55.4C-23 234.3 12 308.2 51.5 352.4c11.9-14.5 27.5-26 45.4-33.2c5-2 10.2-3.8 15.6-5.2c6.2-1.6 12.5-2.6 18.9-3.2c6.6-16 14.8-33.5 24-52.6c5.8-11.9 12-24.1 18.3-36.4c5.7-11.2 12.7-21.7 20.6-31.1c11.3-13.5 23.8-23.9 37.4-29.3c5.3-2.1 10.8-3.3 16.5-3.6c5.7 .3 11.2 1.5 16.5 3.6c13.6 5.4 26.1 15.8 37.4 29.3c7.9 9.4 14.9 19.9 20.6 31.1c6.3 12.3 12.5 24.5 18.3 36.4c9.2 19.1 17.4 36.6 24 52.6c6.4 .6 12.7 1.6 18.9 3.2c5.4 1.4 10.6 3.2 15.6 5.2c17.9 7.2 33.5 18.7 45.4 33.2C436 308.2 471 234.3 483.9 198.8c-14.9-27.3-37.8-46.9-64.8-55.4c-24.1-7.6-50.4-5.5-73.4 6c-7.3 3.7-14 8-19.8 13c-11.6-24.8-24-47.9-35.3-68.2c-15.6-27.9-31.4-53.3-47.5-76.5c-2.6-3.7-7.8-4.7-11.5-2.1c-3.7 2.6-4.7 7.8-2.1 11.5c15.7 22.5 31 47 45.9 73.5c4.6 8.3 9.3 16.8 13.9 25.5c-22.3-6.6-45.7-7.8-67.9-2c-22.2-5.8-45.6-4.6-67.9 2c4.6-8.7 9.3-17.2 13.9-25.5c14.9-26.5 30.2-51 45.9-73.5c2.6-3.7 1.6-8.9-2.1-11.5z"/></svg>;

export default function Hero() {
  const os = useOS();
  const [showPicker, setShowPicker] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("xattr -cr /Applications/PaperCache.app");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  let downloadText = 'Download';

  if (os === 'mac') {
    downloadText = 'Download for macOS';
  } else if (os === 'windows') {
    downloadText = 'Download for Windows';
  } else if (os === 'linux') {
    downloadText = 'Download for Linux';
  }

  let OsIcon = null;
  if (os === 'mac') OsIcon = AppleSVG;
  else if (os === 'windows') OsIcon = WinSVG;
  else if (os === 'linux') OsIcon = LinuxSVG;

  const { currentUrl, macUrl, windowsUrl, linuxUrl, isDirectDownload } = useLatestRelease();

  const words = ["scratchpad", "knowledge manager", "second brain"];
  const [displayText, setDisplayText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    let timeout: number;

    if (!isDeleting) {
      if (displayText !== currentWord) {
        timeout = setTimeout(() => {
          setDisplayText(currentWord.slice(0, displayText.length + 1));
        }, 70);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 2500);
      }
    } else {
      if (displayText !== "") {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 40);
      } else {
        timeout = setTimeout(() => {
          setWordIndex((prev) => (prev + 1) % words.length);
          setIsDeleting(false);
        }, 500);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, wordIndex]);

  return (
    <section className="hero-container">
      <div className="hero-left">
        <h1 className="hero-headline">
          PaperCache: A Reactive
          <br />
          <span className="descriptor-badge">
            <span className="badge-text">{displayText}<span className="typing-cursor">|</span></span>
          </span>
          <br />
          That Thinks.
        </h1>
        <p className="hero-subline text-muted">
          Summon it with a hotkey. Jot. Dismiss.<br/>
          Reactive math, inline AI, knowledge graphs, tasks — all in plain markdown.
        </p>
        <div className="hero-download-section">
          <a href={currentUrl} className="btn-primary" download={isDirectDownload || undefined}>
            {OsIcon && <OsIcon />}
            {downloadText}
          </a>
          <button className="link-text platform-picker-btn" onClick={() => setShowPicker(!showPicker)}>
            or pick your platform →
          </button>
          {showPicker && (
            <div className="platform-picker">
              <a href={macUrl} download={macUrl !== 'https://github.com/VariableThe/PaperCache/releases/latest' || undefined}><AppleSVG /> macOS</a>
              <a href={windowsUrl} download={windowsUrl !== 'https://github.com/VariableThe/PaperCache/releases/latest' || undefined}><WinSVG /> Windows</a>
              <a href={linuxUrl} download={linuxUrl !== 'https://github.com/VariableThe/PaperCache/releases/latest' || undefined}><LinuxSVG /> Linux</a>
            </div>
          )}
          <DownloadCounter />
        </div>
        {os === 'mac' && (
          <details className="mac-gatekeeper-warning">
            <summary>⚠️ Note on macOS Gatekeeper ("App is damaged" error)</summary>
            <div className="gatekeeper-content">
              <p>
                Because PaperCache is an open-source utility and is not code-signed with a paid Apple Developer ID, macOS will apply a quarantine flag to the application upon manual download, throwing a false "damaged app" warning.
              </p>
              <p>
                To fix this, simply open your Terminal and run the following command to strip the quarantine flag:
              </p>
              <div className="terminal-block font-mono small-terminal">
                <div className="terminal-content">
                  <div>xattr -cr /Applications/PaperCache.app</div>
                </div>
                <button className="copy-btn" onClick={handleCopy}>
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>
          </details>
        )}
      </div>
      <div className="hero-right">
        <div className="editor-mock-wrapper">
          <div className="editor-mock">
            <TypingDemo />
          </div>
        </div>
      </div>
    </section>
  );
}
