import { useCheckoutContext } from "@app/modules/checkout/store";
import { SET_DELIVERY_METHOD, REFRESH_CART_ON_SHIPPING_METHODS_CHANGE } from "@app/modules/checkout/store/action";
import { GQLClientRequest } from "@app/graphql/client";
import { SCHEMA_REMOVE_PICKUP_DELIVERY, SCHEMA_GET_PICKUP_STORE } from "@app/graphql/schema";

const View = () => {

  const [{ CART, SELECTED }, dispatch] = useCheckoutContext();

  const onClickDelivery = async (value) => {
    try {
      if (value !== SELECTED.delivery) {
        if (value === 0) {
          const response_RemovePickupDelivery = await GQLClientRequest(SCHEMA_REMOVE_PICKUP_DELIVERY, { cart_id: CART.id })
          if (!response_RemovePickupDelivery) { throw response_RemovePickupDelivery }

          return dispatch(SET_DELIVERY_METHOD({
            cart: response_RemovePickupDelivery.removePickupStore,
            delivery: value
          }))
        }
        else if (value === 1) {
          return setTimeout(async () => {
            return dispatch(SET_DELIVERY_METHOD({
              delivery: value
            }))
          }, 3000)
        }
      }
      return null;
    }
    catch (err) {
      console.log(err)
    }

  }

  return (
    <>
      <div className="container-delivery">
        <div className="block">
          <div className="block-title">
            <h4>Delivery</h4>
          </div>
          <div className="block-content">
            <p className="form-text text-muted">Warning : If you change delivery method, you need to add your address again</p>
            <div className="delivery-options">
              <div className={`delivery-option home-delivery ${SELECTED.delivery === 0 && 'active'}`} onClick={() => onClickDelivery(0)}>
                <h6>Home Delivery</h6>
                <p>We deliver your order to your home</p>
              </div>
              <div className={`delivery-option pickup-delivery ${SELECTED.delivery === 1 && 'active'}`} onClick={() => onClickDelivery(1)}>
                <h6>Pickup Delivery</h6>
                <p>Pickup your order at our store</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default View;