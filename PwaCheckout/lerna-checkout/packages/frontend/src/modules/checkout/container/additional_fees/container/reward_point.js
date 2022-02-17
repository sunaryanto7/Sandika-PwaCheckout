import { useState } from "react";
import { useAlert } from "react-alert";
import { useCurrency } from "@app/helper/useCurrency";
import { useCheckoutContext } from "@app/modules/checkout/store";
import { GQLClientRequest } from "@app/graphql/client";
import {
  SCHEMA_APPLY_REWARD_POINTS_ON_CART,
  SCHEMA_REMOVE_REWARD_POINTS_ON_CART
} from "@app/graphql/schema";
import {
  APPLY_REWARD_POINTS,
  REMOVE_REWARD_POINTS
} from "@app/modules/checkout/store/action";

const ViewRewardPoint = ({ rewardPoints, isApplied, cartId }) => {

  const [loading, setLoading] = useState(false);
  const alert = useAlert();
  const currency = useCurrency();
  const [{ CART, CUSTOMER_DATA }, dispatch] = useCheckoutContext();

  const REWARD_POINTS = CUSTOMER_DATA.rewardPoints;
  const IS_APPLIED = CART.applied_reward_points.is_use_reward_points;
  const CART_ID = CART.id;

  const onApplyRewardPoints = async () => {
    try {
      const response_ApplyRewardPoints = await GQLClientRequest(SCHEMA_APPLY_REWARD_POINTS_ON_CART, { cart_id: CART_ID });
      if (response_ApplyRewardPoints.status === "failed") { throw response_ApplyRewardPoints; }
      dispatch(APPLY_REWARD_POINTS({ cart: response_ApplyRewardPoints.data.applyRewardPointsToCart.cart }))
    }
    catch (err) {
      alert.error(err.message)
    }
    return setLoading(false);
  }

  const onRemoveRewardPoints = async () => {
    try {
      const response_RemoveRewardPoints = await GQLClientRequest(SCHEMA_REMOVE_REWARD_POINTS_ON_CART, { cart_id: CART_ID });
      if (response_RemoveRewardPoints.status === "failed") { throw response_RemoveRewardPoints; }
      dispatch(REMOVE_REWARD_POINTS({ cart: response_RemoveRewardPoints.data.removeRewardPointsFromCart.cart }))
    }
    catch (err) {
      alert.error(err.message)
    }
    return setLoading(false);
  }

  const onHandleApplyRewardPoints = () => {
    setLoading(true);
    switch (IS_APPLIED) {
      case true:
        return onRemoveRewardPoints();
      case false:
        return onApplyRewardPoints();
    }
  }

  return (
    <div className="reward-point">
      <div className="block">
        <div className="block-content">
          <div className="card">
            <div className="card-body">
              <div className="reward-point-box">
                <span>Reward Points</span><br />
                <h5>{IS_APPLIED ? currency.format(REWARD_POINTS.balanceCurrency + CART.applied_reward_points.reward_points_amount) : currency.format(REWARD_POINTS.balanceCurrency)}</h5>
              </div>
              <button
                className="btn btn-primary"
                disabled={loading}
                onClick={() => onHandleApplyRewardPoints()}>
                {IS_APPLIED ? "Dont Use My Points" : "Use My Points"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}


const ContainerRewardPoint = () => {
  const [{ IS_LOGIN }] = useCheckoutContext();

  switch (IS_LOGIN) {
    case true:
      return <ViewRewardPoint />;
    default:
      return null;
  }
}

export default ContainerRewardPoint;