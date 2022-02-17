import { gql } from "@apollo/client";

const SCHEMA_GET_CART = gql`
  query cart($cart_id: String!){
    cart(cart_id: $cart_id) {
      id
      email
      dest_location {
        dest_latitude
        dest_longitude
      }
      pickup_store_person {
        email
        handphone
        name
      }
      available_payment_methods {
        code
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
      selected_payment_method {
        code
        purchase_order_number
        title
      }
    }
  }`


export { SCHEMA_GET_CART }