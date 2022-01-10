import {
  AddressList,
  EmptyAddress,
  AddAddressForm
} from "@app/modules/checkout/container/shipping_addresses/components"

const View_Customer = ({ addressList }) => {
  const addressLength = addressList.length;
  return (
    <>
      <div className="container-shipping-address">
        <div className="block">
          <div className="block-title">
            <h4>Home Delivery Address</h4>
          </div>
          <div className="block-content">
            {!(addressLength > 0) && <EmptyAddress />}
            {(addressLength > 0) &&
              <div className="addresses-container" >
                {addressList.map((address, i) => (
                  <AddressList data={address} key={i} />
                ))}
              </div>}
            <AddAddressForm />
          </div>
        </div>
      </div>
    </>
  )
}

export default View_Customer;