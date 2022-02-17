import { useState, useEffect } from "react";
import { useCheckoutContext } from "@app/modules/checkout/store";

const View = () => {
  const [isAllowToPlaceOrder, setIsAllowToPlaceOrder] = useState(false);
  const [{ SELECTED }] = useCheckoutContext();



  useEffect(() => {
    const timer = setInterval(() => {
      if (window && typeof window.snap !== "undefined") {
        setIsAllowToPlaceOrder(true);
        clearInterval(timer)
      }
    }, 100)

    return () => setIsAllowToPlaceOrder(false);
  }, [])

  const onPlaceOrder = () => {
    console.log(SELECTED.payment.split('#####'))
  }

  return (
    <button
      type="submit"
      className="btn btn-primary btn-block"
      disabled={!isAllowToPlaceOrder}
      onClick={() => onPlaceOrder()}>
      Place Order
    </button>
  )
}

export default View;