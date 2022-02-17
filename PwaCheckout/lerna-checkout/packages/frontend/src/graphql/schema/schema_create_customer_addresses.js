import { gql } from "@apollo/client";

const SCHEMA_CREATE_CUSTOMER_ADDRESS = gql`
mutation createCustomerAddress(
    $city: String!, 
    $country_code: CountryCodeEnum!, 
    $default_billing: Boolean!, 
    $default_shipping: Boolean!, 
    $firstname: String!, 
    $lastname: String!, 
    $telephone: String!, 
    $postcode: String!, 
    $street: String!, 
    $region: String!, 
    $region_code: String, 
    $region_id: Int, 
    $longitude: String, 
    $latitude: String
  ){
  createCustomerAddress(
    input: {
      city: $city, 
      country_code: $country_code, 
      country_id: $country_code, 
      default_billing: $default_billing, 
      default_shipping: $default_shipping, 
      firstname: $firstname, 
      lastname: $lastname, 
      postcode: $postcode, 
      street: [$street], 
      telephone: 
      $telephone, 
      region: {
        region: $region, 
        region_code: $region_code, 
        region_id: $region_id
      }, 
      longitude: $longitude, 
      latitude: $latitude
    }
  ){
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
`;

export { SCHEMA_CREATE_CUSTOMER_ADDRESS }