import { gql } from "@apollo/client";

const SCHEMA_GET_CUSTOMER = gql`
query {
  customer {
    store_credit{
        enabled
        current_balance{
          value
          currency
        }
    }
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

export { SCHEMA_GET_CUSTOMER }