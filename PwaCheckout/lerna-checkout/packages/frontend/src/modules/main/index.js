import { Provider, positions } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import { Navigate } from "react-router-dom";
import Checkout from "@app/modules/checkout";
import { useQuery } from "@app/helper/useQuery";




const AlertProvider = ({ children }) => {
  const options = {
    timeout: 5000,
    position: positions.BOTTOM_CENTER
  };

  return (
    <Provider template={AlertTemplate} {...options}>
      {children}
    </Provider>
  );
};


const App = (props) => {
  const STATE = useQuery();

  switch (STATE) {
    case null:
      return <Navigate to="/404" replace />
    default:
      return <AlertProvider>
        <Checkout />
      </AlertProvider>
  }
}

export default App;
