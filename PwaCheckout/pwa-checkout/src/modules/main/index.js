import { Navigate } from "react-router-dom";
import Checkout from "@app/modules/checkout";
import { useQuery } from "@app/helper/useQuery";

const App = (props) => {
  const STATE = useQuery();

  switch (STATE) {
    case null:
      return <Navigate to="/404" replace />
    default:
      return <Checkout />
  }
}

export default App;
