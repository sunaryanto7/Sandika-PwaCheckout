import { gql } from "@apollo/client";

const SCHEMA_UPDATE_PAYMENT_METHODS_ON_CART = gql`mutation setPaymentMethod($cart_id: String!, $payment_method: PaymentMethodInput!) {
  setPaymentMethodOnCart(
    input: {cart_id: $cart_id, payment_method: $payment_method}
  ) {
    cart {
      id
      selected_payment_method {
        code
        purchase_order_number
        title
      }
      applied_cashback {
        data {
          amount
          promo_name
        }
        is_cashback
        total_cashback
      }
      applied_coupons {
        code
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
      promoBanner {
        cms_block_id
        name
        cms_block_identifier
        rule_id
      }
    }
  }
}`;


export { SCHEMA_UPDATE_PAYMENT_METHODS_ON_CART };