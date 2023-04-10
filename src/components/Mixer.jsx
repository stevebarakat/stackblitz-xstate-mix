import { useEffect, useState, useRef } from "react";
import { loaded, Transport as t } from "tone";
import useChannelStrip from "../hooks/useChannelStrip";
import Transport from "./Transport";
import ChannelStrip from "./ChannelStrip";
import { mixerMachine } from "../machines/mixerMachine";
import { MixerMachineContext } from "../App";
import { useInterpret, useActor } from "@xstate/react";

export const Mixer = ({ song }) => {
  const tracks = song.tracks;

  const actor = useInterpret(mixerMachine);
  const [state, send] = MixerMachineContext.useActor();

  useEffect(() => {
    loaded().then(() => send("LOADED"));
  }, []);

  const [channels] = useChannelStrip({
    tracks,
  });

  return state.value === "loading" ? (
    "loading..."
  ) : (
    <div>
      <div className="channels">
        {tracks.map((track, i) => {
          return (
            <ChannelStrip
              key={track.path}
              track={track}
              trackIndex={i}
              channel={channels.current[i]}
            />
          );
        })}
      </div>
      <Transport />
    </div>
  );
};
