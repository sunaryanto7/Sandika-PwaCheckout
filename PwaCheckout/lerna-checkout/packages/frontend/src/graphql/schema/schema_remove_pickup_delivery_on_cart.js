import { gql } from "@apollo/client";

const SCHEMA_REMOVE_PICKUP_DELIVERY = gql`
mutation removePickupStore($cart_id: String!) {
  removePickupStore(input: {cart_id: $cart_id}) {
    id
    email
    applied_coupons {
      code
    }
    applied_store_credit {
      store_credit_amount
      is_use_store_credit
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
    items {
      id
      quantity
      ... on ConfigurableCartItem {
        configurable_options {
          option_label
          value_label
        }
      }
      prices {
        row_total {
          currency
          value
        }
        row_total_including_tax {
          currency
          value
        }
        discounts {
          amount {
            currency
            value
          }
          label
        }
        price {
          value
          currency
        }
      }
      product {
        id
        name
        categories {
          name
        }
        url_key
        sku
        stock_status
        small_image {
          url
          label
        }
      }
    }
  }
}`;

export { SCHEMA_REMOVE_PICKUP_DELIVERY }