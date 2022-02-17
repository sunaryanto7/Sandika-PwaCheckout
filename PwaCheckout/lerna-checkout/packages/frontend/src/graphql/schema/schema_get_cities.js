import { gql } from "@apollo/client";

const SCHEMA_GET_CITIES = gql`
  query getCities($region_id: Int!) {
    getCityByRegionId(region_id: $region_id) {
      item {
        id
        city
        postcode
      }
    }
  }
`;

export { SCHEMA_GET_CITIES }