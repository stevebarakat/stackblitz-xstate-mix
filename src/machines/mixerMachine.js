import { createMachine, assign } from "xstate";
import { Transport as t } from "tone";

export const mixerMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QBcBOBDAdrADge1WQDoAbPdCAS0ygGIAZAeQEEARAUVYG0AGAXUSh8sSskp5MgkAA9EAWgAsRAEzKAbAFY1yjQBoQAT0QBmHsqIaAvpf1osuAsRwl0B6nQAKzAKoBldrwCSCDCouKSwbIImkQAjLEA7LEAHAl6hiaa1rYY2PiERM6u7rS+ACqMHoFSoWISUlEx8Ump6UYICsoJFtkgdnmOhS5uNLQASuwA6gCSAHLc-DV4InURoI0acYkpafrtCgCcPL39DgVFI3QAYoxjk8xjrHMA4tXBteENiE3brXuIGgOySIPASyViOhOuTOTmGJQAwgAJZizZ7sAD6ADVGPRvABZAKLd7LML1SLfTbNHZtRAJHhqOJaSE2PrQ-Kw4qjJEotHoryzN5CEmrL7RSm-XYZBDgpTKYwKYxpKH2dmFdAAV1gkFoHnozAAmoKQsLPuSxURksoeMYITSEAdVEQbcycirBjgNVqIKUKlUiUKVqb1hSLVbnXagUpwS7WW6CrBkHgcDhtbqDUaPmTgwgEuZVJptHbYjwFN1w9YWZg8BA4FJTuyloGszJ5ClgclLdGixpzFYWfXBmQKO5G6S1i2EDx-ghlApjv22e64TRRyKzXJYnOLZ3bdOFcplQNzp7IKugxON1uO8ou9OtAy+66j8QE0mUxAz82opeeNub7upTpWIK0sIA */
    id: "transport",

    states: {
      loading: {
        on: {
          LOADED: "stopped",
        },
      },
      playing: {
        tags: ["loaded"],
        on: {
          PAUSE: "paused",
          STOP: "stopped",
          REWIND: { actions: "rewind" },
          FORWARDING: { actions: "fastForward" },
          CHANGE_VOLUME: { actions: "changeVolume" },
          CHANGE_PAN: { actions: "changePan" },
        },
      },
      paused: {
        on: {
          PLAY: {
            target: "playing",
          },
          STOP: "stopped",
        },
      },
      stopped: {
        on: {
          PLAY: "playing",
        },
      },
    },

    predictableActionArguments: true,
    initial: "loading",
  },
  {
    actions: {
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
