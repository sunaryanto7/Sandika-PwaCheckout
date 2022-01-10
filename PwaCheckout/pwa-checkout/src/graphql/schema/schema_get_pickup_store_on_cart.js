import { gql } from "@apollo/client";

const SCHEMA_GET_PICKUP_STORE = gql`
query getPickupStore($cart_id: String!) {
  getPickupStore(cart_id: $cart_id) {
    store {
      code
      street
      city
      name
      region
      zone
      telephone
      postcode
      lat
      long
      country_id
      items {
        qty
        quote_id
        sku
      }
    }
  }
}`;

export { SCHEMA_GET_PICKUP_STORE }