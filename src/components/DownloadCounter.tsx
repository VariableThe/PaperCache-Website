import { useLatestRelease } from '../hooks/useLatestRelease';

export default function DownloadCounter() {
  const { totalDownloads } = useLatestRelease();

  return (
    <a
      href="https://github.com/VariableThe/PaperCache/releases"
      target="_blank"
      rel="noopener noreferrer"
      className="download-counter-btn"
      title="Total downloads on GitHub"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M8 1a.75.75 0 0 1 .75.75v5.69l1.72-1.72a.75.75 0 1 1 1.06 1.06l-3 3a.75.75 0 0 1-1.06 0l-3-3a.75.75 0 1 1 1.06-1.06l1.72 1.72V1.75A.75.75 0 0 1 8 1ZM3.5 11.5a.75.75 0 0 1 .75.75v1a.25.25 0 0 0 .25.25h7a.25.25 0 0 0 .25-.25v-1a.75.75 0 0 1 1.5 0v1A1.75 1.75 0 0 1 11.5 14.5h-7A1.75 1.75 0 0 1 2.75 12.75v-1a.75.75 0 0 1 .75-.75Z"/>
      </svg>
      <span>Downloads</span>
      {totalDownloads !== null && (
        <>
          <span className="dl-divider"></span>
          <span className="dl-count">{totalDownloads.toLocaleString()}</span>
        </>
      )}
    </a>
  );
}
