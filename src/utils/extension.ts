export const isChrome = () => {
  return chrome.runtime.getURL('').startsWith('chrome-extension://');
};
