import { BottomLabel } from '~components/BottomLabel';
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
        <ToggleButton active={isWhitelisted} onClick={toggle} />
        {!domain ? <p>The movie-web extension can not be used on this page</p> : null}
        <BottomLabel />
      </div>
    </Frame>
  );
}

export default IndexPopup;
