// raw urls don't work with eslint, so its a false positive
// eslint-disable-next-line import/no-unresolved
import contentScriptUrl from 'url:~contents/movie-web';

import { queryCurrentTab } from '~utils/tabs';

export function injectScript() {
  queryCurrentTab((tab) => {
    if (!tab.id) return;
    chrome.scripting
      .executeScript({
        target: {
          tabId: tab.id,
        },
        world: 'MAIN',
        files: [contentScriptUrl],
      })
      .catch(() => {});
  });
}
