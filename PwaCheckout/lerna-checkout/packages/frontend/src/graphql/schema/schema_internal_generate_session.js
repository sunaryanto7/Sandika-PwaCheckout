import { gql } from '@apollo/client';

const INTERNAL_GENERATE_SESSION = gql`
  mutation internalGenerateSession($state: String!) {
    internalGenerateSession(state: $state) {
      result
      isLogin
      cartId
      redirect_path
    }
  }
`;

export { INTERNAL_GENERATE_SESSION };