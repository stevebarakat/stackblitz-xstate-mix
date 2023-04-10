import { Mixer } from "./components/Mixer";
import { roxanne } from "./songs/roxanne";
import { createActorContext } from "@xstate/react";
import { mixerMachine } from "./machines/mixerMachine";
import "./styles/main.css";

const song = roxanne;
export const MixerMachineContext = createActorContext(mixerMachine);

function App() {
  return (
    <MixerMachineContext.Provider>
      <Mixer song={song} />
    </MixerMachineContext.Provider>
  );
}

export default App;
