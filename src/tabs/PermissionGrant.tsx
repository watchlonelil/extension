import { useDomainWhitelist } from '~hooks/useDomainWhitelist';
import { usePermission } from '~hooks/usePermission';
import { makeUrlIntoDomain } from '~utils/domains';

import './PermissionGrant.css';

export default function PermissionGrant() {
  const { domainWhitelist } = useDomainWhitelist();

  const queryParams = new URLSearchParams(window.location.search);
  const redirectUrl = queryParams.get('redirectUrl') ?? 'https://movie-web.app';
  const domain = makeUrlIntoDomain(redirectUrl);

  const { hasPermission, grantPermission } = usePermission(domain);
  const permissionsGranted = domainWhitelist.includes(domain) && hasPermission;

  const redirectBack = () => {
    chrome.tabs.getCurrent((tab) => {
      chrome.tabs.update(tab.id, { url: redirectUrl });
    });
  };

  const handleGrantPermission = () => {
    grantPermission().then(() => {
      redirectBack();
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
          <button type="button" className="go-back-btn" onClick={redirectBack}>
            Go back
          </button>
          <div style={{ flex: 1 }} />
          <button
            type="button"
            className="grant-permission-btn"
            onClick={handleGrantPermission}
            disabled={permissionsGranted}
          >
            Grant Permission
          </button>
        </div>
      </div>
    </div>
  );
}
