import { gql } from "@apollo/client";

const SCHEMA_UPDATE_SHIPPING_ADDRESS_ON_CART = gql`
mutation setShippingAddressById($address_id: Int!, $cart_id: String!) {
  setShippingAddressesOnCart(
    input: {cart_id: $cart_id, shipping_addresses: {customer_address_id: $address_id}}
  ) {
    cart {
      id
    }
  }
  setBillingAddressOnCart(
    input: {cart_id: $cart_id, billing_address: {same_as_shipping: true, customer_address_id: $address_id}}
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

export { SCHEMA_UPDATE_SHIPPING_ADDRESS_ON_CART };