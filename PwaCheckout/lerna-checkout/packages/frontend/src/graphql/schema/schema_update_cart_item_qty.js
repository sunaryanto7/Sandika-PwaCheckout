import { gql } from "@apollo/client";

const SCHEMA_UPDATE_CART_ITEM_QTY = gql`
  mutation updateCartItems($cart_id: String!, $cart_item_id: Int!, $quantity: Float!) {
    updateCartItems(
      input: {
        cart_id: $cart_id, 
        cart_items: {
          cart_item_id: $cart_item_id, 
          quantity: $quantity
        }
      }
    ) {
      cart {
        id
        total_quantity
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
          pickup_item_store_info {
            is_pickup
            loc_code
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
                __typename
              }
              label
            }
            price {
              value
              currency
            }
            price_including_tax {
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
    }
  }
`

export { SCHEMA_UPDATE_CART_ITEM_QTY }