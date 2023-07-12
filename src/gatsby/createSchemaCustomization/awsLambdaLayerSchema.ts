export const getAwsLambdaLayerTypeDefs = () => {
  return [
    `
      type AwsRegion {
        region: String!
        version: String!
      }

      type AwsLambdaLayer implements Node {
        canonical: String!
        regions: [AwsRegion!]
        sdkVersion: String!
        layerName: String!
        accountNumber: String!
      }
      `,
  ];
};
