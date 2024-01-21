import './DisabledScreen.css';
import { Icon } from './Icon';

export function DisabledScreen() {
  return (
    <div className="disabled">
      <Icon name="warningCircle" />
      <p>
        The <strong>movie-web extension</strong> can not be used on this page
      </p>
    </div>
  );
}
