import { mixerMachine } from "../machines/mixerMachine";
import { dBToPercent, scale } from "../utils/scale";
import { MixerMachineContext } from "../App";
import { useInterpret, useActor } from "@xstate/react";

function ChannelStrip({ track, trackIndex, channel }) {
  const actor = useInterpret(mixerMachine);
  const [state, send] = MixerMachineContext.useActor();

  return (
    <div className="fader">
      <input
        type="range"
        min={-1}
        max={1}
        defaultValue={0}
        step={0.01}
        onChange={(e) => {
          send("CHANGE_PAN");
          const id = parseInt(e.target.id.at(-1));
          const value = parseFloat(e.target.value);
          channel.pan.value = value;
        }}
        className="pan"
      />
      <div id={`trackPan${trackIndex}`} className="vertical-range-wrap">
        <input
          className="vertical-range"
          id={`trackVol${trackIndex}`}
          type="range"
          min={-100}
          max={12}
          step="0.1"
          onChange={(e) => {
            send("CHANGE_VOLUME");
            const id = parseInt(e.target.id.at(-1));
            const value = parseFloat(e.target.value);
            const scaled = dBToPercent(scale(value));
            channel.volume.value = scaled;
          }}
        />
      </div>
      <label htmlFor={`track${trackIndex}`}>{track.name}</label>
    </div>
  );
}

export default ChannelStrip;
