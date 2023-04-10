import { createMachine, assign } from "xstate";
import { Transport as t } from "tone";

export const mixerMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QBcBOBDAdrADge1WQDoAbPdCAS0ygGIAZAeQEEARAUVYG0AGAXUSh8sSskp5MgkAA9EAWgAsRAEzKAbAFY1yjQBoQAT0QBmHsqIaAvpf1osuAsTIVIRHCXQHqdAAr1mAJoAkgByAOK8AkggwqLiktGyCMoA7EQAjOkp6QAcKXqGiBqZFta2GNj4hKTkEK446ACusJC0PswAqgDKnJFSsWISUklyAJzmOTnKOek6+kYIxemlZSCYeHXw0XaVjv14IoMJoCO5OUST07MFC+ka5lY2IDsO1c5UNPuH8cOIPPOIZQKHirF5VJy1SBfOJDRLydLAi5TGZzQoIYzaFblezgmouCBuDxeT7RAY-OHo5YpFLGBTGfIAhAKBSjUEVV4Q-FuJotCDQo6-BB3DJZXIMtEabIraxAA */
    id: "transport",
    initial: "loading",
    context: {
      time: t.seconds,
      volume: -32,
      on: {
        FORWARDING: {
          actions: "fastForward",
        },
      },
    },
    states: {
      loading: {
        on: {
          LOADED: "loaded",
        },
      },
      loaded: {
        initial: "paused",
        states: {
          playing: {
            tags: ["loaded"],
            on: {
              PAUSE: "paused",
            },
          },
          paused: {
            on: {
              PLAY: {
                target: "playing",
                actions: "sayHello",
              },
            },
          },
          stopped: {
            on: {
              STOP: "stopped",
            },
          },
          rewinding: {
            on: {
              REWIND: { actions: "rewind" },
            },
          },
          forwarding: {
            on: {
              FORWARDING: { actions: "fastForward" },
            },
          },
          changingVolume: {
            on: {
              CHANGE_VOLUME: { actions: "changeVolume" },
            },
          },
        },
      },
    },
    predictableActionArguments: true,
  },
  {
    actions: {
      sayHello: () => {
        console.log("Hello!");
      },
      changeVolume: assign((context) => {
        return {
          volume: context.volume,
        };
      }),
      fastForward: assign((context) => {
        return {
          time: context.time + 10,
        };
      }),
      rewind: assign((context) => {
        return {
          time: context.time - 10,
        };
      }),
    },
  }
);
