import { Transport as t } from 'tone';
import { mixerMachine } from '../machines/mixerMachine';
import { MixerMachineContext } from '../App';
import { useInterpret, useActor } from '@xstate/react';

function Transport() {
  const actor = useInterpret(mixerMachine);

  const [state, send] = MixerMachineContext.useActor();

  console.log('state', state);
  return (
    <div className="transport-controls">
      <button
        onClick={() => {
          if (state?.hasTag('loaded')) {
            send('PAUSE');
            t.stop();
            t.seconds = 0;
          }
        }}
      >
        STOP
      </button>
      <button
        onClick={() => {
          send('REWIND');
          t.seconds = t.seconds - 10;
        }}
      >
        REW
      </button>
      <button
        onClick={() => {
          if (state?.value === 'paused' || state?.value === 'stopped') {
            send('PLAY');
            t.start();
          }
          if (state?.value === 'playing') {
            send('PAUSE');
            t.pause();
          }
        }}
      >
        {state.value === 'stopped' ? 'PLAY' : 'PAUSE'}
      </button>
      <button
        onClick={() => {
          send('FORWARD');
          t.seconds = t.seconds + 10;
        }}
      >
        FF
      </button>
    </div>
  );
}

export default Transport;
