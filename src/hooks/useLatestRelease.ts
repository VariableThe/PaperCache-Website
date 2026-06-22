import { useState, useEffect } from 'react';
import { useOS } from './useOS';

interface GithubAsset {
  name: string;
  browser_download_url: string;
}

export function useLatestRelease() {
  const os = useOS();
  const [urls, setUrls] = useState({
    macUrl: 'https://github.com/VariableThe/PaperCache/releases/download/v0.2.9/PaperCache-0.2.9-arm64.dmg',
    windowsUrl: 'https://github.com/VariableThe/PaperCache/releases/download/v0.2.9/PaperCache.Setup.0.2.9.exe',
    linuxUrl: 'https://github.com/VariableThe/PaperCache/releases/download/v0.2.9/PaperCache-0.2.9.AppImage'
  });

  useEffect(() => {
    let isMounted = true;
    fetch('https://api.github.com/repos/VariableThe/PaperCache/releases/latest')
      .then(res => res.json())
      .then(data => {
        if (!isMounted) return;
        if (!data || !data.assets) return;
        
        const mAsset = data.assets.find((a: GithubAsset) => a.name.endsWith('.dmg')) || data.assets.find((a: GithubAsset) => a.name.endsWith('mac.zip'));
        const wAsset = data.assets.find((a: GithubAsset) => a.name.endsWith('.exe'));
        const lAsset = data.assets.find((a: GithubAsset) => a.name.endsWith('.AppImage')) || data.assets.find((a: GithubAsset) => a.name.endsWith('.deb'));

        setUrls(prev => {
          const newUrls = { ...prev };
          if (mAsset) newUrls.macUrl = mAsset.browser_download_url;
          if (wAsset) newUrls.windowsUrl = wAsset.browser_download_url;
          if (lAsset) newUrls.linuxUrl = lAsset.browser_download_url;
          return newUrls;
        });
      })
      .catch(err => console.error('Failed to fetch latest release', err));
      
    return () => { isMounted = false; };
  }, []);

  let currentUrl = 'https://github.com/VariableThe/PaperCache/releases/latest';
  if (os === 'mac') currentUrl = urls.macUrl;
  else if (os === 'windows') currentUrl = urls.windowsUrl;
  else if (os === 'linux') currentUrl = urls.linuxUrl;

  return { ...urls, currentUrl };
}
