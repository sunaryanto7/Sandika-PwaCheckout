import { useState } from "react";
import { useAlert } from "react-alert";
import { useCurrency } from "@app/helper/useCurrency";
import { useCheckoutContext } from "@app/modules/checkout/store";
import { GQLClientRequest } from "@app/graphql/client";
import {
  SCHEMA_APPLY_STORE_CREDITS_ON_CART,
  SCHEMA_REMOVE_STORE_CREDITS_ON_CART
} from "@app/graphql/schema";
import {
  APPLY_STORE_CREDIT,
  REMOVE_STORE_CREDIT
} from "@app/modules/checkout/store/action";

const ViewStoreCredit = () => {

  const [loading, setLoading] = useState(false);
  const alert = useAlert();
  const currency = useCurrency();
  const [{ CART, CUSTOMER_DATA }, dispatch] = useCheckoutContext();

  const STORE_CREDITS = CUSTOMER_DATA.storeCredits;
  const IS_APPLIED = CART.applied_store_credit.is_use_store_credit;
  const CART_ID = CART.id;

  const onApplyStoreCredits = async () => {
    try {
      const response_ApplyStoreCredits = await GQLClientRequest(SCHEMA_APPLY_STORE_CREDITS_ON_CART, { cart_id: CART_ID });
      if (response_ApplyStoreCredits.status === "failed") { throw response_ApplyStoreCredits; }
      dispatch(APPLY_STORE_CREDIT({ cart: response_ApplyStoreCredits.data.applyStoreCreditToCart.cart }))
    }
    catch (err) {
      alert.error(err.message);
    }
    return setLoading(false);
  }

  const onRemoveStoreCredits = async () => {
    try {
      const response_RemoveStoreCredits = await GQLClientRequest(SCHEMA_REMOVE_STORE_CREDITS_ON_CART, { cart_id: CART_ID });
      if (response_RemoveStoreCredits.status === "failed") { throw response_RemoveStoreCredits; }
      console.log(response_RemoveStoreCredits)
      dispatch(REMOVE_STORE_CREDIT({ cart: response_RemoveStoreCredits.data.removeStoreCreditFromCart.cart }));
    }
    catch (err) {
      alert.error(err.message);
    }
    return setLoading(false);
  }

  const onHandleApplystoreCredits = () => {
    setLoading(true);
    switch (IS_APPLIED) {
      case true:
        return onRemoveStoreCredits();
      case false:
        return onApplyStoreCredits();
    }
  }

  return (
    <div className="store-credit">
      <div className="block">
        <div className="block-content">
          <div className="card">
            <div className="card-body">
              <div className="store-credit-box">
                <span>Store Credit</span><br />
                <h5>{IS_APPLIED ? currency.format(STORE_CREDITS.current_balance.value + CART.applied_store_credit.store_credit_amount) : currency.format(STORE_CREDITS.current_balance.value)}</h5>
              </div>
              <button
                className="btn btn-primary"
                disabled={loading}
                onClick={() => onHandleApplystoreCredits()}>
                {IS_APPLIED ? "Dont Use Store Credit" : "Use Store Credit"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}


const ContainerStoreCredit = () => {
  const [{ IS_LOGIN }] = useCheckoutContext();

  switch (IS_LOGIN) {
    case true:
      return <ViewStoreCredit />;
    default:
      return null;
  }
}

export default ContainerStoreCredit;