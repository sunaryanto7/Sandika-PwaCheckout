import { useCheckoutContext } from "@app/modules/checkout/store";
import { View_Customer, View_Guest } from "@app/modules/checkout/container/shipping_addresses/container";

const ContainerShippingAddress = () => {
  const [{ IS_LOGIN, CUSTOMER_DATA, CART }] = useCheckoutContext();

  if (IS_LOGIN) {
    const addressList = Object.keys(CUSTOMER_DATA).length === 0 ||
      CUSTOMER_DATA?.addresses.length === 0 ? [] : CUSTOMER_DATA.addresses;

    return <View_Customer addressList={addressList} />
  } else {
    const address = CART.shipping_addresses[0] ? `${CART.shipping_addresses[0].firstname} ${CART.shipping_addresses[0].lastname} ${CART.shipping_addresses[0].street.join(', ')} 
    ${CART.shipping_addresses[0].city} ${CART.shipping_addresses[0].region && CART.shipping_addresses[0].region.label} 
    ${CART.shipping_addresses[0].country.label} ${CART.shipping_addresses[0].postcode} ${CART.shipping_addresses[0].telephone}` : ""

    return <View_Guest address={address} />
  }
}

export default ContainerShippingAddress;