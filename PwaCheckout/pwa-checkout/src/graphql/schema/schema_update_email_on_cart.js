import { gql } from "@apollo/client";

const SCHEMA_UPDATE_EMAIL_ON_CART = gql`mutation ($cart_id: String!, $email: String!) {
  setGuestEmailOnCart(input: {cart_id: $cart_id, email: $email}) {
    cart {
      id
      email
    }
  }
}`;

export { SCHEMA_UPDATE_EMAIL_ON_CART }
