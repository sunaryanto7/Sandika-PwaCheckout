import { gql } from "@apollo/client";

const SCHEMA_UPDATE_EXTRAFEE_ON_CART = gql`
mutation updateExtraFee($cart_id: String!, $select_options: [SelectOptionFees]) {
  updateExtraFeeOnCart(
    input: {cart_id: $cart_id, select_options: $select_options}
  ) {
    cart {
      id
      id
      email
      applied_cashback {
        data {
          amount
          promo_name
        }
        is_cashback
        total_cashback
      }
      applied_reward_points {
        is_use_reward_points
        reward_points_amount
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
      available_free_items {
        sku
        quantity
        promo_item_data {
          ruleId
          minimalPrice
          discountItem
          isDeleted
          qtyToProcess
          isAuto
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
}`


export { SCHEMA_UPDATE_EXTRAFEE_ON_CART }