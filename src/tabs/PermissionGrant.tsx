import { Button } from '~components/Button';
import { useDomainWhitelist } from '~hooks/useDomainWhitelist';
import { usePermission } from '~hooks/usePermission';
import { makeUrlIntoDomain } from '~utils/domains';

import './PermissionGrant.css';

export default function PermissionGrant() {
  const { domainWhitelist } = useDomainWhitelist();
  const { hasPermission, grantPermission } = usePermission();

  const queryParams = new URLSearchParams(window.location.search);
  const redirectUrl = queryParams.get('redirectUrl') ?? 'https://movie-web.app';
  const domain = makeUrlIntoDomain(redirectUrl);

  const permissionsGranted = domainWhitelist.includes(domain) && hasPermission;

  const redirectBack = () => {
    chrome.tabs.getCurrent((tab) => {
      chrome.tabs.update(tab.id, { url: redirectUrl });
    });
  };

  const handleGrantPermission = () => {
    grantPermission(domain).then(() => {
      redirectBack();
    });
  };

  return (
    <div className="container">
      <div className="inner-container">
        <div className="permission-card">
          <h1 className="color-white">Permission</h1>
          <p className="text-color" style={{ textAlign: 'center' }}>
            The website <span className="color-white">{domain}</span> wants to <br /> use the extension on their page.
            Do you trust them?
          </p>
          <div className="buttons">
            <Button full onClick={handleGrantPermission}>
              Grant Permission
            </Button>
            <Button full onClick={redirectBack} type="secondary">
              Decline
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
