import { gql } from "@apollo/client";

const SCHEMA_UPDATE_CUSTOMER_DEFAULT_ADDRESSES = gql`mutation updatedDefaultAddress($address_id: Int!, $street: String!) {
  updateCustomerAddress(
    id: $address_id
    input: {default_billing: true, default_shipping: true, street: [$street]}
  ) {
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
}`

export { SCHEMA_UPDATE_CUSTOMER_DEFAULT_ADDRESSES }
