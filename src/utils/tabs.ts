import { isChrome } from './extension';

export function queryCurrentTab(cb: (tab: chrome.tabs.Tab | browser.tabs.Tab) => void) {
  const handle = (tab: chrome.tabs.Tab | browser.tabs.Tab) => {
    cb(tab);
  };
  const ops = { active: true, currentWindow: true } as const;

  if (isChrome()) chrome.tabs.query(ops).then((tabs) => handle(tabs[0]));
  else browser.tabs.query(ops).then((tabs) => handle(tabs[0]));
}

export function queryCurrentDomain(cb: (domain: string | null) => void) {
  queryCurrentTab((tab) => cb(tab.url ?? null));
}

export function listenToTabChanges(cb: () => void) {
  if (isChrome()) {
    chrome.tabs.onActivated.addListener(cb);
    chrome.tabs.onUpdated.addListener(cb);
  } else if (browser) {
    browser.tabs.onActivated.addListener(cb);
    browser.tabs.onUpdated.addListener(cb);
  }
}

export function stopListenToTabChanges(cb: () => void) {
  if (isChrome()) {
    chrome.tabs.onActivated.removeListener(cb);
    chrome.tabs.onUpdated.removeListener(cb);
  } else if (browser) {
    browser.tabs.onActivated.removeListener(cb);
    browser.tabs.onUpdated.removeListener(cb);
  }
}
