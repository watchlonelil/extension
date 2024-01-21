import { BottomLabel } from '~components/BottomLabel';
import { DisabledScreen } from '~components/DisabledScreen';
import { Frame } from '~components/Frame';
import { PermissionMissingScreen } from '~components/PermissionMissingScreen';
import { ToggleButton } from '~components/ToggleButton';
import { useDomain } from '~hooks/useDomain';
import { useToggleWhitelistDomain } from '~hooks/useDomainWhitelist';
import './Popup.css';
import { usePermission } from '~hooks/usePermission';

function IndexPopup() {
  const domain = useDomain();
  const { isWhitelisted, toggle } = useToggleWhitelistDomain(domain);
  const { grantPermission, hasPermission } = usePermission();

  let page = 'toggle';
  if (!hasPermission) page = 'perm';
  else if (!domain) page = 'disabled';

  return (
    <Frame>
      <div className="popup">
        {page === 'toggle' ? <ToggleButton active={isWhitelisted} onClick={toggle} domain={domain} /> : null}
        {page === 'disabled' ? <DisabledScreen /> : null}
        {page === 'perm' ? <PermissionMissingScreen onGrant={grantPermission} /> : null}
        <BottomLabel />
      </div>
    </Frame>
  );
}

export default IndexPopup;
