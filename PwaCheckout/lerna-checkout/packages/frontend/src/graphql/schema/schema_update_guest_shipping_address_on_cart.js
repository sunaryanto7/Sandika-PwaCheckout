import { gql } from "@apollo/client";

const SCHEMA_UPDATE_GUEST_SHIPPING_ADDRESS_ON_CART = gql`
mutation setBillingAddressByInput($cart_id: String!, $city: String!, $country_code: String!, $firstname: String!, $lastname: String!, $telephone: String!, $postcode: String!, $street: String!, $region: String!, $latitude: String, $longitude: String) {
  setBillingAddressOnCart(
    input: {cart_id: $cart_id, billing_address: {same_as_shipping: true, address: {city: $city, country_code: $country_code, firstname: $firstname, lastname: $lastname, telephone: $telephone, region: $region, street: [$street], postcode: $postcode, latitude: $latitude, longitude: $longitude, save_in_address_book: true}}}
  ) {
    cart {
      dest_location {
        dest_latitude
        dest_longitude
      }
      billing_address {
        city
        company
        country {
          code
          label
        }
        firstname
        lastname
        postcode
        region {
          code
          label
        }
        street
        telephone
      }
      shipping_addresses {
        is_valid_city
        firstname
        lastname
        street
        city
        postcode
        telephone
        region {
          code
          label
        }
        company
        country {
          code
          label
        }
        selected_shipping_method {
          method_code
          carrier_code
          carrier_title
          amount {
            value
            currency
          }
        }
        available_shipping_methods {
          available
          method_code
          carrier_code
          method_title
          carrier_title
          amount {
            value
            currency
          }
          shipping_promo_name
          error_message
          price_incl_tax {
            value
          }
        }
      }
    }
  }
}
`

export { SCHEMA_UPDATE_GUEST_SHIPPING_ADDRESS_ON_CART };