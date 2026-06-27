import { useState, useEffect } from 'react';
import { useOS } from './useOS';

const CACHE_KEY = 'papercache-latest-urls';
const FALLBACK_URL = 'https://github.com/VariableThe/PaperCache/releases/latest';

interface GithubAsset {
  name: string;
  browser_download_url: string;
  download_count: number;
}

interface GithubRelease {
  assets?: GithubAsset[];
}

function getCachedUrls(): { macUrl: string; windowsUrl: string; linuxUrl: string } | null {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (parsed.macUrl && parsed.windowsUrl && parsed.linuxUrl) {
        return parsed;
      }
    }
  } catch { /* ignore localStorage errors */ }
  return null;
}

function setCachedUrls(urls: { macUrl: string; windowsUrl: string; linuxUrl: string }) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(urls));
  } catch { /* ignore localStorage errors */ }
}

export function useLatestRelease() {
  const os = useOS();
  const cached = getCachedUrls();
  const [urls, setUrls] = useState(cached ?? {
    macUrl: FALLBACK_URL,
    windowsUrl: FALLBACK_URL,
    linuxUrl: FALLBACK_URL
  });
  const [totalDownloads, setTotalDownloads] = useState<number | null>(null);

  useEffect(() => {
    let isMounted = true;
    fetch('https://api.github.com/repos/VariableThe/PaperCache/releases/latest')
      .then(res => res.json())
      .then(data => {
        if (!isMounted) return;
        if (!data || !data.assets) return;
        
        const mAsset = data.assets.find((a: GithubAsset) => a.name.endsWith('.dmg')) || data.assets.find((a: GithubAsset) => a.name.endsWith('.app.tar.gz')) || data.assets.find((a: GithubAsset) => a.name.endsWith('mac.zip'));
        const wAsset = data.assets.find((a: GithubAsset) => a.name.endsWith('.exe')) || data.assets.find((a: GithubAsset) => a.name.endsWith('.msi'));
        const lAsset = data.assets.find((a: GithubAsset) => a.name.endsWith('.AppImage')) || data.assets.find((a: GithubAsset) => a.name.endsWith('.deb'));

        setUrls(prev => {
          const newUrls = { ...prev };
          if (mAsset) newUrls.macUrl = mAsset.browser_download_url;
          if (wAsset) newUrls.windowsUrl = wAsset.browser_download_url;
          if (lAsset) newUrls.linuxUrl = lAsset.browser_download_url;
          setCachedUrls(newUrls);
          return newUrls;
        });
      })
      .catch(err => console.error('Failed to fetch latest release', err));
    
    fetch('https://api.github.com/repos/VariableThe/PaperCache/releases?per_page=100')
      .then(res => res.json())
      .then(data => {
        if (!isMounted) return;
        if (!Array.isArray(data)) return;
        const total = data.reduce((sum: number, release: GithubRelease) => {
          if (!release.assets) return sum;
          return sum + release.assets.reduce((s: number, a: GithubAsset) => s + (a.download_count || 0), 0);
        }, 0);
        setTotalDownloads(total);
      })
      .catch(err => console.error('Failed to fetch total downloads', err));
      
    return () => { isMounted = false; };
  }, []);

  let currentUrl = FALLBACK_URL;
  if (os === 'mac') currentUrl = urls.macUrl;
  else if (os === 'windows') currentUrl = urls.windowsUrl;
  else if (os === 'linux') currentUrl = urls.linuxUrl;

  const isDirectDownload = currentUrl !== FALLBACK_URL;

  return { ...urls, currentUrl, totalDownloads, isDirectDownload };
}
