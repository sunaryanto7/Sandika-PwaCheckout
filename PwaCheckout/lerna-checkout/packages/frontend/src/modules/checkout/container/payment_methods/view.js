import { useState } from "react";
import { Collapse } from "reactstrap";
import { HiChevronDown, HiChevronRight } from "react-icons/hi";
import { useAlert } from "react-alert";
import { useCurrency } from "@app/helper/useCurrency";
import { useCheckoutContext } from "@app/modules/checkout/store";
import { GQLClientRequest } from "@app/graphql/client";
import { REFRESH_CART_ON_PAYMENT_METHODS_CHANGE } from "@app/modules/checkout/store/action";
import { SCHEMA_UPDATE_PAYMENT_METHODS_ON_CART } from "@app/graphql/schema";

const PaymentAccordion = ({ payment, toggle, onToggle }) => {
  const alert = useAlert();
  const currency = useCurrency();
  const [{ CART, SELECTED }, dispatch] = useCheckoutContext();
  const [loading, setLoading] = useState(false)

  const onPaymentChange = async (code, title) => {
    setLoading(true)

    const body = {
      cart_id: CART.id,
      payment_method: {
        code: code
      }
    }

    try {
      const response_UpdatePaymentMethodsOnCart = await GQLClientRequest(SCHEMA_UPDATE_PAYMENT_METHODS_ON_CART, body)
      if (response_UpdatePaymentMethodsOnCart.status === "failed") {
        throw response_UpdatePaymentMethodsOnCart
      }

      dispatch(REFRESH_CART_ON_PAYMENT_METHODS_CHANGE({
        cart: response_UpdatePaymentMethodsOnCart.data.setPaymentMethodOnCart.cart,
        payment: `${code}#####${title}`
      }))
    } catch (err) {
      alert.error(err.message);
    }

    setLoading(false)
  }

  return (
    <div className="payment-accordion-list">
      <div className="payment-accordion-header" onClick={onToggle}>
        <span>{payment.title}</span>
        <span><span>{toggle ? <HiChevronDown size={"16px"} /> : <HiChevronRight size={"16px"} />}</span></span>
      </div>
      <div className="payment-accordion-body">
        <Collapse isOpen={toggle}>
          <div className="payment-accordion-content">
            {payment.group.map((data, key) => (
              <div className="form-check" key={key}>
                <input
                  id={`${data.code}_payment_${key}`}
                  className="form-check-input"
                  type="radio"
                  name="payment"
                  value={`${data.code}#####${data.title}`}
                  checked={`${data.code}#####${data.title}` === SELECTED.payment}
                  onChange={() => { return onPaymentChange(data.code, data.title) }}
                  disabled={loading} />
                <label className="form-check-label" htmlFor={`${data.code}_payment_${key}`}>
                  {`${data.title}`}
                </label>
              </div>
            ))}
          </div>
        </Collapse>
      </div>
    </div>
  )
}

const View = ({ payments }) => {

  const [toggle, setToggle] = useState(payments.findIndex(data => data.active) > -1 ? payments.findIndex(data => data.active) : 0);
  const onToggle = (key) => {
    return setToggle(key);
  }

  return (
    <div className="container-payment-method">
      <div className="block">
        <div className="block-title">
          <h4>Payment Method</h4>
        </div>
        <div className="block-content">
          <div className="payment-accordion">
            {payments.map((data, key) => (
              <PaymentAccordion
                payment={data}
                toggle={toggle === key}
                onToggle={() => { onToggle(key) }}
                key={key}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default View