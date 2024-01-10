import { Frame } from '~components/Frame';
import { ToggleButton } from '~components/ToggleButton';
import { useDomain } from '~hooks/useDomain';
import { useToggleWhitelistDomain } from '~hooks/useDomainWhitelist';
import { useVersion } from '~hooks/useVersion';

function IndexPopup() {
  const domain = useDomain();
  const { isWhitelisted, toggle } = useToggleWhitelistDomain(domain);
  const version = useVersion({ prefixed: true });

  return (
    <Frame>
      <ToggleButton active={isWhitelisted} onClick={toggle} />
      {!domain ? <p>Cant use extension on this page</p> : null}
      <h3>{version} - movie-web</h3>
    </Frame>
  );
}

export default IndexPopup;
