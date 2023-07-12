export const getRelayMetricTypeDefs = () => {
  return [
    `
      type RelayMetric implements Node {
        type: String!
        name: String!
        description: String!
        features: [String!]
      }

      type RelaymetricDescription implements Node
        @childOf(types: ["RelayMetric"]) {}
      `,
  ];
};
