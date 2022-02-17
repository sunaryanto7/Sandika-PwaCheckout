import { gql } from "@apollo/client";

const SCHEMA_GET_CART_ITEMS = gql`
  query cart($cart_id: String!){
    cart(cart_id: $cart_id) {
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
            ... on AwGiftCardProduct {
                aw_gc_type
            }
        }
        ... on AwGiftCardCartItem {
            aw_giftcard_option {
              label
              value
            }
        }
      }
    }
  }`


export { SCHEMA_GET_CART_ITEMS }