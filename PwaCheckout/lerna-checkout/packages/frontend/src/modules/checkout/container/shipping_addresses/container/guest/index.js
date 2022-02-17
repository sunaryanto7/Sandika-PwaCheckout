import {
  AddressList,
  EmptyAddress,
  AddAddressForm
} from "@app/modules/checkout/container/shipping_addresses/components"

const View_Guest = ({ address }) => {
  return (
    <>
      <div className="container-shipping-address">
        <div className="block">
          <div className="block-title">
            <h4>Home Delivery Address</h4>
          </div>
          <div className="block-content">
            {!(address) && <EmptyAddress />}
            {(address) &&
              <div className="addresses-container" >
                <p>{address}</p>
              </div>}
            <AddAddressForm />
          </div>
        </div>
      </div>
    </>
  )
}

export default View_Guest;