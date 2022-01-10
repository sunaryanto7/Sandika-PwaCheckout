import { useCheckoutContext } from "@app/modules/checkout/store";
import { GQLClientRequest } from "@app/graphql/client";
import { UPDATE_CUSTOMER_DEFAULT_ADDRESS } from "@app/modules/checkout/store/action";
import {
  SCHEMA_CUSTOMER,
  SCHEMA_UPDATE_CUSTOMER_DEFAULT_ADDRESSES,
  SCHEMA_UPDATE_SHIPPING_ADDRESS_ON_CART
} from "@app/graphql/schema";

const AddressList = ({ data }) => {
  const [{ CART }, dispatch] = useCheckoutContext();

  const onUpdateCustomerDefaultAddress = async () => {
    const body = {
      address_id: data.id,
      street: data.street[0]
    };

    try {
      const response_UpdateCustomerDefaultAddress = await GQLClientRequest(SCHEMA_UPDATE_CUSTOMER_DEFAULT_ADDRESSES, body);
      if (!response_UpdateCustomerDefaultAddress) { throw response_UpdateCustomerDefaultAddress }

      const response_UpdateAddressOnCart = await GQLClientRequest(SCHEMA_UPDATE_SHIPPING_ADDRESS_ON_CART, {
        cart_id: CART.id,
        address_id: response_UpdateCustomerDefaultAddress.updateCustomerAddress.id
      })

      const result_FetchCustomerAddress = await GQLClientRequest(SCHEMA_CUSTOMER);
      if (!result_FetchCustomerAddress) { throw result_FetchCustomerAddress }

      await dispatch(UPDATE_CUSTOMER_DEFAULT_ADDRESS({
        cart: response_UpdateAddressOnCart.setBillingAddressOnCart.cart,
        customerData: result_FetchCustomerAddress.customer
      }))
    }
    catch (err) {
      console.log(err)
    }
  }

  return (
    <div className={`address-item ${data.default_billing && 'address-item-selected'}`}>
      <p>
        {`${data.firstname} ${data.lastname}`}<br />
        {`${data.street[0]}`}<br />
        {`${data.city} `}<br />
        {`${data.region.region}, ${data.postcode} ${data.country.label}`}
      </p>

      <div className="address-action">
        {!data.default_billing && <button
          className="btn btn-primary"
          onClick={() => {
            return onUpdateCustomerDefaultAddress()
          }}>
          Use this address
        </button>}
      </div>
    </div>
  )
};

export default AddressList;