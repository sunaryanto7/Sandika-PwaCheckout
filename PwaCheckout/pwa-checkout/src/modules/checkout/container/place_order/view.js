import { useState, useEffect } from "react";

const View = () => {
  const [isAllowToPlaceOrder, setIsAllowToPlaceOrder] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.snap) {
      setIsAllowToPlaceOrder(true);
    }
    return () => setIsAllowToPlaceOrder(false);
  }, [window])

  return (
    <button type="submit" className="btn btn-primary btn-block" disabled={!isAllowToPlaceOrder}>
      Place Order
    </button>
  )
}

export default View;