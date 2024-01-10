import { useCallback } from 'react';

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

  const toggle = useCallback(() => {
    if (isWhitelisted) removeDomain(domain);
    else addDomain(domain);
  }, [isWhitelisted, domain, addDomain, removeDomain]);

  return {
    toggle,
    isWhitelisted,
  };
}
