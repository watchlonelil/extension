import { Storage } from '@plasmohq/storage';
import { useStorage } from '@plasmohq/storage/hook';

import { makeUrlIntoDomain } from '~utils/domains';

export const DEFAULT_DOMAIN_WHITELIST = ['https://movie-web.app', 'http://localhost:5173'];

export const storage = new Storage();

const domainIsInWhitelist = async (domain: string) => {
  const whitelist = await storage.get<string[]>('domainWhitelist');
  return whitelist?.some((d) => d.includes(domain)) ?? false;
};

export function useDomainStorage() {
  return useStorage<string[]>('domainWhitelist', (v) => v ?? DEFAULT_DOMAIN_WHITELIST);
}

export const assertDomainWhitelist = async (url: string) => {
  const domain = makeUrlIntoDomain(url);
  if (!domain) throw new Error('Domain is from a normal tab');
  const isWhiteListed = await domainIsInWhitelist(domain);
  if (!isWhiteListed) throw new Error('Domain is not whitelisted');
};
