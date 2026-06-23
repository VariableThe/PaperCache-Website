import { useOS } from '../hooks/useOS';
import { useLatestRelease } from '../hooks/useLatestRelease';
import GithubStars from './GithubStars';

export default function Nav() {
  const os = useOS();
  const { currentUrl: downloadUrl } = useLatestRelease();

  return (
    <nav className="nav-container">
      <div className="nav-content">
        <div className="nav-logo">
          <span className="text-accent-glow font-mono font-bold">// </span>
          <span className="font-bold">PaperCache</span>
        </div>
        <div className="nav-links">
          <GithubStars />
          <a href={downloadUrl} className="nav-download-btn" style={{ textDecoration: 'none' }} download>
            Download {os === 'mac' ? 'for macOS' : os === 'windows' ? 'for Windows' : os === 'linux' ? 'for Linux' : ''}
          </a>
        </div>
      </div>
    </nav>
  );
}
