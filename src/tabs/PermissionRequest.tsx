/* eslint-disable react/no-unescaped-entities */
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
              Talk late over pleasantries that never meant much to me But it was meaning everything to you A cold pause
              right before you go She adores you, run towards you, calls on the landline That coat wasn't always real
              you loved just How the fabric feels but I was somebody else A boy in a belt who knew tearjerker you are
              you've been shaking me out I said one day passes by but I will stay the same When you look me in the eyes
              dear What will you do? When you notice there is nothing For you to hold on to Last night I broke down when
              you said I thought you were better than that Kept my head above the wash now I'm hoping that we never go
              back I'm hoping that we never go back Stood tall on a shallow reef right there beside The public beach
              hoping I was something sharks would eat You said, "Sugar how you holding up? I said, "Hey, my body's gone
              but I'm feelin' you still" Always on the move Ground controller Oh, beam me up I've have enough I'm ready
              to lose How's it going? Oh, hi hello I'd like to know if there's ever be One day that passes by when I
              don't stay the same When you look me in the eyes dear What will you do? When you notice there is nothing
              For you to hold on to Last night I broke down when you said I thought you were better than that Kept my
              head above the wash now I'm hoping that we never go back Tearjerker you made me fell I'm hopping that we
              never go back
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
