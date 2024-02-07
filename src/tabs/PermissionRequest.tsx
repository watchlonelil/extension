import { useCallback } from 'react';

import { Button } from '~components/Button';
import { Icon } from '~components/Icon';
import { usePermission } from '~hooks/usePermission';

import './PermissionRequest.css';

function Card(props: { purple?: boolean; children: React.ReactNode; icon?: React.ReactNode; right?: React.ReactNode }) {
  return (
    <div className={['card', props.purple ? 'purple' : ''].join(' ')}>
      <div>
        <div className="icon-circle">{props.icon}</div>
      </div>
      <div>{props.children}</div>
      {props.right ? <div className="center-y">{props.right}</div> : null}
    </div>
  );
}

export default function PermissionRequest() {
  const { grantPermission } = usePermission();

  const grant = useCallback(() => {
    grantPermission().then(() => window.close());
  }, [grantPermission]);

  return (
    <div className="container">
      <div className="inner-container">
        <h1 className="color-white">
          We need some <br /> browser permissions
        </h1>
        <p className="text-color paragraph">
          We don&apos;t like it either, but the movie-web extension needs quite a few permissions to function. Listed
          below is an explanation for all permissions we need.
        </p>

        <div className="card-list" style={{ marginTop: '2.5rem' }}>
          <Card
            purple
            icon={<Icon name="github" />}
            right={
              <a href="https://github.com/movie-web/extension" target="_blank" rel="noreferrer">
                <button type="button">Read source code</button>
              </a>
            }
          >
            <h3>Read the source code on GitHub</h3>
            <p className="text-color paragraph">
              Don&apos;t trust us? Read the code and choose for yourself if its safe!
            </p>
          </Card>
        </div>

        <h2>Permission list</h2>
        <div className="card-list">
          <Card icon={<Icon name="windows" />}>
            <h3>Read & change data from all sites</h3>
            <p className="text-color paragraph">
              To be able to gather content from the sources. We need to be able to reach those sources. Unfortunately
              that requires us to request the permissions from all sites.
            </p>
          </Card>
          <Card icon={<Icon name="cookie" />}>
            <h3>Read and write cookies</h3>
            <p className="text-color paragraph">
              Some sources use cookies for authentication. We need to be able to read and set those cookies. This
              won&apos;t be prompted to you, it&apos;s included in “Read & change data from all sites”.
            </p>
          </Card>
          <Card icon={<Icon name="shield" />}>
            <h3>Active tab</h3>
            <p className="text-color paragraph">
              To determine which site has access to the extension or not, we need to know what tab you&apos;re currently
              using. This permission is given to all extensions by default, so your browser won&apos;t prompt you for
              it.
            </p>
          </Card>
        </div>

        <div className="footer">
          <div style={{ width: '250px' }}>
            <Button full onClick={grant}>
              Grant Permission
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
