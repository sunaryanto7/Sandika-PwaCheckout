import { useState } from "react";
import { Collapse } from 'reactstrap';
import { HiChevronDown, HiChevronRight } from "react-icons/hi";
import { useCurrency } from "@app/helper/useCurrency";
import { useCheckoutContext } from "@app/modules/checkout/store";
import { GQLClientRequest } from "@app/graphql/client";
import { REFRESH_CART_ON_SHIPPING_METHODS_CHANGE } from "@app/modules/checkout/store/action";
import { SCHEMA_UPDATE_SHIPPING_METHODS_ON_CART } from "@app/graphql/schema";

const ShippingAccordion = ({ shipping, toggle, onToggle }) => {
  const currency = useCurrency();
  const [{ CART, SELECTED }, dispatch] = useCheckoutContext();
  const [loading, setLoading] = useState(false)

  const onShippingChange = async (carrier_code, method_code, carrier_title) => {
    setLoading(true)

    const body = {
      cart_id: CART.id,
      carrier_code: carrier_code,
      method_code: method_code
    }

    try {
      const response_UpdateShippingMethodsOnCart = await GQLClientRequest(SCHEMA_UPDATE_SHIPPING_METHODS_ON_CART, body)
      if (!response_UpdateShippingMethodsOnCart) { throw response_UpdateShippingMethodsOnCart }
      dispatch(REFRESH_CART_ON_SHIPPING_METHODS_CHANGE({
        cart: response_UpdateShippingMethodsOnCart.setShippingMethodsOnCart.cart,
        shipping: `${carrier_code}_${method_code}_${carrier_title}`
      }))
    }
    catch (err) {
      console.log(err)
    }

    setLoading(false)
  }

  return (
    <div className="shipping-accordion-list">
      <div className="shipping-accordion-header" onClick={onToggle}>
        <span>{shipping.title}</span>
        <span>{toggle ? <HiChevronDown size={"16px"} /> : <HiChevronRight size={"16px"} />}</span>
      </div>
      <div className="shipping-accordion-body">
        <Collapse isOpen={toggle}>
          <div className="shipping-accordion-content">
            {shipping.group.map((data, key) => (
              <div className="form-check" key={key}>
                <input
                  id={`${data.carrier_code}_${data.method_code}_shipping${key}`}
                  className="form-check-input"
                  type="radio"
                  name="shipping"
                  value={`${data.carrier_code}_${data.method_code}_${data.carrier_title}`}
                  checked={`${data.carrier_code}_${data.method_code}_${data.carrier_title}` === SELECTED.shipping}
                  onChange={() => { return onShippingChange(data.carrier_code, data.method_code, data.carrier_title) }}
                  disabled={loading} />
                <label className="form-check-label" htmlFor={`${data.carrier_code}_${data.method_code}_shipping${key}`}>
                  {`${data.carrier_title} ${data.method_title}`} - <strong>{`${currency.format(data.price_incl_tax.value)}`}</strong>
                </label>
              </div>
            ))}
          </div>
        </Collapse>
      </div>
    </div>
  )
}

const View = ({ shipping }) => {

  const [toggle, setToggle] = useState(shipping.findIndex(data => data.active) > -1 ? shipping.findIndex(data => data.active) : 0);
  const onToggle = (key) => {
    return setToggle(key);
  }

  return (
    <div className="container-shipping-method">
      <div className="block">
        <div className="block-title">
          <h4>Shipping Method</h4>
        </div>
        <div className="block-content">
          <div className="shipping-accordion">
            {shipping.length === 0 && <p className="form-text text-muted">No Shipping Method or No Address Is Inputed</p>}
            {shipping.length > 0 && shipping.map((data, key) => (
              <ShippingAccordion
                shipping={data}
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

export default View;