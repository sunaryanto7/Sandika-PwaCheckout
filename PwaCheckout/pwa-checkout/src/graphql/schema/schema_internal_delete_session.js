import { gql } from '@apollo/client';

const INTERNAL_DELETE_SESSION = gql`
  mutation internalDeleteSession {
    internalDeleteSession {
      result
    }
  }
`;

export { INTERNAL_DELETE_SESSION };