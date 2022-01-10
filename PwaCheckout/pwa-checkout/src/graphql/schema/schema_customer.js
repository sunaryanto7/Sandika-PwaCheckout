import { gql } from "@apollo/client";

const SCHEMA_CUSTOMER = gql`
query {
  customer {
    addresses {
      id
      city
      default_billing
      default_shipping
      extension_attributes {
        attribute_code
        value
      }
      firstname
      lastname
      postcode
      country_code
      country {
        code
        label   
      }
      region {
        region
        region_code
      }
      street
      telephone
      longitude
      latitude
    }
  }
}
`;

export { SCHEMA_CUSTOMER }