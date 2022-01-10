import { gql } from "@apollo/client";

const SCHEMA_UPDATE_PIKCUP_STORE_ON_CART = gql`
query: mutation setPickupStore($cart_id: String!, $code: String!, $extension_attributes: PickupStoreExtensionAttributes!) {
  setPickupStore(
    input: {cart_id: $cart_id, code: $code, extension_attributes: $extension_attributes}
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
  }
}`;


export { SCHEMA_UPDATE_PAYMENT_METHODS_ON_CART };