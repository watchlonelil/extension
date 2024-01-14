import { usePermission } from '~hooks/usePermission';

import './PermissionGrant.css';

export default function PermissionGrant() {
  const { hasPermission, grantPermission } = usePermission();

  const queryParams = new URLSearchParams(window.location.search);
  const redirectUrl = queryParams.get('redirectUrl') ?? 'https://movie-web.app';
  const domain = new URL(redirectUrl).hostname;

  const handleGrantPermission = () => {
    grantPermission().then(() => {
      chrome.tabs.getCurrent((tab) => {
        chrome.tabs.update(tab.id, { url: queryParams.get('redirectUrl') ?? 'https://movie-web.app' });
      });
    });
  };

  return (
    <div className="container">
      <div className="inner-container">
        <h1 className="color-white">Permission</h1>
        <p className="text-color" style={{ fontSize: 13 }}>
          Websites need to ask for permission <br /> before they can use this extension
        </p>
        <div className="permission-card">
          <p className="text-color" style={{ textAlign: 'center' }}>
            The website <span className="color-white">{domain}</span> wants to <br /> use the extension on their page.
          </p>
        </div>
        <div className="footer">
          <button type="button" className="go-back-btn">
            Go back
          </button>
          <div style={{ flex: 1 }} />
          <button
            type="button"
            className="grant-permission-btn"
            onClick={handleGrantPermission}
            disabled={hasPermission}
          >
            Grant Permission
          </button>
        </div>
      </div>
    </div>
  );
}
