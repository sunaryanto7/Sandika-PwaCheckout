import { useInitialData } from "@app/modules/checkout/inititalize";
import CheckoutLoader from "@app/components/loader";
import { CheckoutContextProvider } from "@app/modules/checkout/store";
import View from "@app/modules/checkout/view";
import './styles/extend.scss';

const App = (props) => {
  const { loading, data } = useInitialData();

  if (loading) {
    return <CheckoutLoader />
  }

  return (
    <CheckoutContextProvider value={{
      IS_LOGIN: data.isLogin,
      CART: data.cart,
      STORE_CONFIG: data.storeConfig,
      STORE: data.store,
      CUSTOMER_DATA: data.customerData,
      SELECTED: data.selected
    }}>
      <View />
    </CheckoutContextProvider>
  )
}

export default App;
