import { isChrome } from '~utils/extension';
import { injectScript } from '~utils/injection';
import { listenToTabChanges } from '~utils/tabs';

// Both brave and firefox for some reason need this extension reload,
// If this isn't done, they will never load properly and will fail updateDynamicRules()
if (isChrome()) {
  chrome.runtime.onStartup.addListener(() => {
    chrome.runtime.reload();
  });
} else {
  browser.runtime.onStartup.addListener(() => {
    browser.runtime.reload();
  });
}

// We need to do some programatic script injection,
// since we may not have permission everytime, so inject when we switch tab.
listenToTabChanges(() => injectScript());
injectScript();
