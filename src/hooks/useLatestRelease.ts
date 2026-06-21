import { useState, useEffect } from 'react';
import { useOS } from './useOS';

export function useLatestRelease() {
  const os = useOS();
  const [urls, setUrls] = useState({
    currentUrl: 'https://github.com/VariableThe/PaperCache/releases/latest',
    macUrl: 'https://github.com/VariableThe/PaperCache/releases/download/v0.2.9/PaperCache-0.2.9-arm64.dmg',
    windowsUrl: 'https://github.com/VariableThe/PaperCache/releases/download/v0.2.9/PaperCache.Setup.0.2.9.exe',
    linuxUrl: 'https://github.com/VariableThe/PaperCache/releases/download/v0.2.9/PaperCache-0.2.9.AppImage'
  });

  useEffect(() => {
    // Set immediate default for current OS
    setUrls(prev => {
      let current = prev.currentUrl;
      if (os === 'mac') current = prev.macUrl;
      else if (os === 'windows') current = prev.windowsUrl;
      else if (os === 'linux') current = prev.linuxUrl;
      return { ...prev, currentUrl: current };
    });

    fetch('https://api.github.com/repos/VariableThe/PaperCache/releases/latest')
      .then(res => res.json())
      .then(data => {
        if (!data || !data.assets) return;
        
        const mAsset = data.assets.find((a: any) => a.name.endsWith('.dmg')) || data.assets.find((a: any) => a.name.endsWith('mac.zip'));
        const wAsset = data.assets.find((a: any) => a.name.endsWith('.exe'));
        const lAsset = data.assets.find((a: any) => a.name.endsWith('.AppImage')) || data.assets.find((a: any) => a.name.endsWith('.deb'));

        setUrls(prev => {
          const newUrls = { ...prev };
          if (mAsset) newUrls.macUrl = mAsset.browser_download_url;
          if (wAsset) newUrls.windowsUrl = wAsset.browser_download_url;
          if (lAsset) newUrls.linuxUrl = lAsset.browser_download_url;
          
          if (os === 'mac' && mAsset) newUrls.currentUrl = mAsset.browser_download_url;
          else if (os === 'windows' && wAsset) newUrls.currentUrl = wAsset.browser_download_url;
          else if (os === 'linux' && lAsset) newUrls.currentUrl = lAsset.browser_download_url;
          
          return newUrls;
        });
      })
      .catch(err => console.error('Failed to fetch latest release', err));
  }, [os]);

  return urls;
}
