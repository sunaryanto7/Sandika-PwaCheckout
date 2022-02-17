import { gql } from "@apollo/client";

const SCHEMA_UPDATE_SHIPPING_METHODS_ON_CART = gql`
mutation setShippingMethod($cart_id: String!, $carrier_code: String!, $method_code: String!) {
  setShippingMethodsOnCart(
    input: {cart_id: $cart_id, shipping_methods: {carrier_code: $carrier_code, method_code: $method_code}}
  ) {
    cart {
      id
      promoBanner {
        cms_block_id
        name
        cms_block_identifier
        rule_id
      }
      shipping_addresses {
        is_valid_city
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
        selected_shipping_method {
          method_code
          carrier_code
          carrier_title
          amount {
            value
            currency
          }
        }
      }
      applied_cashback {
        data {
          amount
          promo_name
        }
        is_cashback
        total_cashback
      }
      applied_extra_fee {
        extrafee_value {
          currency
          value
        }
        select_options {
          default
          label
          option_id
          price
        }
        show_on_cart
        title
      }
      addtional_fees {
        data {
          enabled
          fee_name
          frontend_type
          id_fee
          options {
            default
            label
            option_id
            price
          }
        }
        show_on_cart
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
      applied_coupons {
        code
      }
      applied_reward_points {
        is_use_reward_points
        reward_points_amount
      }
      applied_giftcard {
        giftcard_amount
        giftcard_detail {
          giftcard_amount_used
          giftcard_code
        }
      }
      applied_store_credit {
        store_credit_amount
        is_use_store_credit
      }
    }
  }
}
`

export { SCHEMA_UPDATE_SHIPPING_METHODS_ON_CART }