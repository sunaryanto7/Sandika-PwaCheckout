import { useCheckoutContext } from "@app/modules/checkout/store";
import View from "@app/modules/checkout/container/shipping_methods/view";

const ContainerShippingMethods = () => {
  const [
    {
      IS_LOGIN,
      CUSTOMER_DATA,
      CART: {
        shipping_addresses
      },
      SELECTED,
      STORE_CONFIG: {
        shipments_configuration
      }
    }
  ] = useCheckoutContext();

  const AVAILABLE_SHIPPING_METHODS = (!IS_LOGIN || (Object.keys(CUSTOMER_DATA).length > 0 &&
    CUSTOMER_DATA?.addresses.length > 0)) &&
    shipping_addresses[0]?.available_shipping_methods.filter((data) => data.available) || [];

  const SHIPPING_GROUP = Object.keys(JSON.parse(shipments_configuration)).map((data) => ({
    title: data === "sg-freeshipping" ? "Free Shipping" : data.replace("sg-", "").charAt(0).toUpperCase() + data.replace("sg-", "").slice(1),
    code: data,
    group: JSON.parse(shipments_configuration)[data].split(",").map(configuration => {
      const result = AVAILABLE_SHIPPING_METHODS.map((shipping) => {
        const identifier = `${shipping.carrier_code}_${shipping.method_code}`;
        if (identifier.match(new RegExp(`^${configuration}`)) !== null) {
          return shipping
        }
      }).filter(data => typeof data !== "undefined").filter(data => data.method_code !== "pickup")

      if (result.length) {
        return result[0]
      }
    }).filter(data => typeof data !== "undefined"),
    get active() { return this.group.filter(data => `${data.carrier_code}_${data.method_code}_${data.carrier_title}` === SELECTED.shipping).length > 0 ? true : false }
  })).filter(data => data.group.length > 0);

  return <View shipping={SHIPPING_GROUP} />
}

export default ContainerShippingMethods;