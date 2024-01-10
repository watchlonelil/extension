import { useEffect, useState } from 'react';

import { makeUrlIntoDomain } from '~utils/domains';

function queryCurrentDomain(cb: (domain: string | null) => void) {
  chrome.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
    const url = tabs[0]?.url;
    if (!url) cb(null);
    else cb(url);
  });
}

export function useDomain(): null | string {
  const [domain, setDomain] = useState<string | null>(null);

  useEffect(() => {
    queryCurrentDomain(setDomain);
    function listen() {
      queryCurrentDomain(setDomain);
    }
    chrome.tabs.onActivated.addListener(listen);
    chrome.tabs.onUpdated.addListener(listen);
    return () => {
      chrome.tabs.onActivated.removeListener(listen);
      chrome.tabs.onUpdated.removeListener(listen);
    };
  }, []);

  return makeUrlIntoDomain(domain);
}
