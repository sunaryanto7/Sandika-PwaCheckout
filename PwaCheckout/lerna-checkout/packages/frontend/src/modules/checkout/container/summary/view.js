import { useState } from "react";
import { useAlert } from "react-alert";
import { useCheckoutContext } from "@app/modules/checkout/store";
import { useCurrency } from "@app/helper/useCurrency";
import { GQLClientRequest } from "@app/graphql/client";
import { REFRESH_CART_ITEMS_QTY } from "@app/modules/checkout/store/action";
import { SCHEMA_UPDATE_CART_ITEM_QTY } from "@app/graphql/schema";


const Item = ({ id, product, quantity, price }) => {
  const alert = useAlert();
  const currency = useCurrency();
  const [loading, setLoading] = useState(false);
  const [{ CART }, dispatch] = useCheckoutContext();

  const onIncraseQty = async () => {
    try {

      const body = {
        "cart_id": CART.id,
        "cart_item_id": parseInt(id),
        "quantity": quantity + 1
      }


      setLoading(true)

      const response = await GQLClientRequest(SCHEMA_UPDATE_CART_ITEM_QTY, body)
      if (response.status === "failed") { throw response };
      await dispatch(REFRESH_CART_ITEMS_QTY(response.data.updateCartItems.cart))

      setLoading(false)

    } catch (err) {
      alert.error(err.message);
    }
  }

  const onDecraseQty = async () => {
    try {

      if (quantity === 1) { return null }
      const body = {
        "cart_id": CART.id,
        "cart_item_id": parseInt(id),
        "quantity": quantity - 1
      }

      setLoading(true)

      const response = await GQLClientRequest(SCHEMA_UPDATE_CART_ITEM_QTY, body)
      if (response.status === "failed") { throw response; }
      await dispatch(REFRESH_CART_ITEMS_QTY(response.data.updateCartItems.cart))

      setLoading(false)

    } catch (err) {
      alert.error(err.message);
    }
  }

  return (
    <div className="item">
      <div className="item-images">
        <img src={product.small_image.url} alt={product.small_image.label} />
      </div>
      <div className="item-detail">
        <p className="product-name">{product.name}</p>
        <div className="product-qty">
          {loading && null}
          {!loading && <>
            <span className="qty-decrement" onClick={() => { onDecraseQty() }}>-</span>
            {quantity}
            <span className="qty-increment" onClick={() => { onIncraseQty() }}>+</span>
          </>}

        </div>
        <p className="product-price">{currency.format(price.value)}</p>
      </div>
    </div>
  )
}


const View = ({ id, items, dataSummary, dataTotal }) => {
  return (
    <>
      <div className="container-summary">
        <div className="block">
          <div className="block-title">
            <h4>Summary</h4>
          </div>
          <div className="block-content">
            <div className="summary">
              <div className="summary-cart">
                {items.map(({ id, product, quantity, prices: { row_total_including_tax } }, key) => (
                  <Item
                    id={id}
                    product={product}
                    quantity={quantity}
                    price={row_total_including_tax}
                    key={key}
                  />
                ))}
              </div>
              <div className="summary-prices">
                {dataSummary.map((data, key) => (
                  <div className="price" key={key}>
                    <span className="price-label">{data.item}</span>
                    <span className="price-value">{data.value}</span>
                  </div>
                ))}
              </div>
              <div className="summary-total">
                <div className="price">
                  <span className="price-label">Total</span>
                  <span className="price-value">{dataTotal}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default View;