import { createContext, useContext, useReducer } from 'react';
import { reducer } from '@app/modules/checkout/store/reducer';

const CheckoutContext = createContext();

const CheckoutContextProvider = ({ value, children }) => {
  const [store, dispatch] = useReducer(reducer, value)

  return (
    <CheckoutContext.Provider value={[store, dispatch]}>
      {children}
    </CheckoutContext.Provider>
  );
};

const useCheckoutContext = () => useContext(CheckoutContext);

export { CheckoutContext, CheckoutContextProvider, useCheckoutContext };