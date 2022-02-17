import { gql } from "@apollo/client";

const SCHEMA_UPDATE_PIKCUP_STORE_ON_CART = gql`
mutation setPickupStore($cart_id: String!, $code: String!, $extension_attributes: PickupStoreExtensionAttributes!, $store_address:PickupStoreAddress!) {
  setPickupStore(
    input: {cart_id: $cart_id, code: $code, extension_attributes: $extension_attributes, store_address: $store_address}
  ) {
    id
    email
    applied_coupons {
      code
    }
    applied_store_credit {
      store_credit_amount
      is_use_store_credit
    }
    prices {
      discounts {
        amount {
          currency
          value
        }
        label
      }
      subtotal_excluding_tax {
        currency
        value
      }
      subtotal_including_tax {
        currency
        value
      }
      applied_taxes {
        amount {
          value
          currency
        }
      }
      grand_total {
        currency
        value
      }
    }
    available_payment_methods {
      code
      title
    }
    pickup_store_person {
      email
      handphone
      name
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
}`;


export { SCHEMA_UPDATE_PIKCUP_STORE_ON_CART };