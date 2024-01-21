import { useCallback } from 'react';

import { usePermission } from '~hooks/usePermission';
import { useDomainStorage } from '~utils/storage';

export function useDomainWhitelist() {
  const [domainWhitelist, setDomainWhitelist] = useDomainStorage();

  const removeDomain = useCallback((domain: string | null) => {
    if (!domain) return;
    setDomainWhitelist((s) => [...s.filter((v) => v !== domain)]);
  }, []);

  const addDomain = useCallback((domain: string | null) => {
    if (!domain) return;
    setDomainWhitelist((s) => [...s.filter((v) => v !== domain), domain]);
  }, []);

  return {
    removeDomain,
    addDomain,
    domainWhitelist,
  };
}

export function useToggleWhitelistDomain(domain: string) {
  const { domainWhitelist, addDomain, removeDomain } = useDomainWhitelist();
  const isWhitelisted = domainWhitelist.includes(domain);
  const { grantPermission } = usePermission();

  const toggle = useCallback(() => {
    if (!isWhitelisted) {
      addDomain(domain);
      return;
    }

    removeDomain(domain);
  }, [isWhitelisted, domain, addDomain, removeDomain, grantPermission]);

  return {
    toggle,
    isWhitelisted,
  };
}
