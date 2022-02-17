import { gql } from "@apollo/client";

const SCHEMA_GET_REGIONS = gql`
  query getRegions($country_id: String!) {
    getRegions(country_id: $country_id) {
      item {
        code
        name
        region_id
        __typename
      }
      __typename
    }
  }
`;

export { SCHEMA_GET_REGIONS }