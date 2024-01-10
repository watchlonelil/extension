import { BottomLabel } from '~components/BottomLabel';
import { DisabledScreen } from '~components/DisabledScreen';
import { Frame } from '~components/Frame';
import { ToggleButton } from '~components/ToggleButton';
import { useDomain } from '~hooks/useDomain';
import { useToggleWhitelistDomain } from '~hooks/useDomainWhitelist';
import './Popup.css';

function IndexPopup() {
  const domain = useDomain();
  const { isWhitelisted, toggle } = useToggleWhitelistDomain(domain);

  return (
    <Frame>
      <div className="popup">
        {!domain ? <DisabledScreen /> : <ToggleButton active={isWhitelisted} onClick={toggle} />}
        <BottomLabel />
      </div>
    </Frame>
  );
}

export default IndexPopup;
