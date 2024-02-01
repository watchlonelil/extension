import { sendToBackground } from '@plasmohq/messaging';
import { useCallback, useEffect, useState } from 'react';

import { useDomainWhitelist } from './useDomainWhitelist';

function makeDomainIntoOriginMatchers(domain: string): string[] {
  return [`http://${domain}/*`, `https://${domain}/*`];
}

export async function hasPermission(domain: string) {
  return chrome.permissions.contains({
    origins: makeDomainIntoOriginMatchers(domain),
  });
}

export function usePermission(domain: string) {
  const { addDomain } = useDomainWhitelist();
  const [permission, setPermission] = useState(false);

  const grantPermission = useCallback(async () => {
    const granted = await chrome.permissions.request({
      origins: makeDomainIntoOriginMatchers(domain),
    });
    setPermission(granted);
    if (granted && domain) {
      await sendToBackground({
        name: 'inject',
      });
      addDomain(domain);
    }
    return granted;
  }, [domain]);

  useEffect(() => {
    hasPermission(domain).then((has) => setPermission(has));
  }, [domain]);

  return {
    hasPermission: permission,
    grantPermission,
  };
}
