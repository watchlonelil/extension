export function getVersion(ops?: { prefixed?: boolean }) {
  const prefix = ops?.prefixed ? 'v' : '';
  return `${prefix}${chrome.runtime.getManifest().version}`;
}

export function useVersion(ops?: { prefixed?: boolean }) {
  return getVersion(ops);
}
