import { useEffect, useState } from 'react';

export async function hasPermission() {
  return chrome.permissions.contains({
    origins: ['<all_urls>'],
  });
}

export function usePermission() {
  const [permission, setPermission] = useState(false);

  const grantPermission = async () => {
    const granted = await chrome.permissions.request({
      origins: ['<all_urls>'],
    });
    setPermission(granted);
    return granted;
  };

  useEffect(() => {
    hasPermission().then((has) => setPermission(has));
  }, []);

  return {
    hasPermission: permission,
    grantPermission,
  };
}
