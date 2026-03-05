const Tools = {
  definitions: [
    {
      type: "function",
      function: {
        name: "read_temperature",
        parameters: {
          type: "object",
          properties: {
            location: {
              type: "string",
              description: "The room name",
            },
          },
          required: ["location"],
        },
        description: "Return the room temperature in degrees Celsius",
      },
    },
    {
      type: "function",
      function: {
        name: "turn_on_heat",
        parameters: {
          type: "object",
          properties: {
            location: {
              type: "string",
              description: "The room name",
            },
          },
          required: ["location"],
        },
        description: "Turn on the heat",
      },
    },
  ],

  implementations: {
    read_temperature: () => {
      {
        return String(25);
      }
    },
    turn_on_heat: () => {
      {
        return "The heat is now on";
      }
    },
  },
};

export { Tools };
