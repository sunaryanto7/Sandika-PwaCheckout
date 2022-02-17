import { gql } from "@apollo/client";

const SCHEMA_GET_CUSTOMER_REWARD_POINTS = gql`{
  customerRewardPoints {
    balance
    balanceCurrency
    formatedBalanceCurrency
    formatedSpendRate
    spendRate
    transaction_history {
      total_count
      page_info {
        current_page
        page_size
        total_pages
      }
      items {
        balance
        comment
        expirationDate
        points
        transactionDate
        transactionId
      }
    }
  }
}`

export { SCHEMA_GET_CUSTOMER_REWARD_POINTS };