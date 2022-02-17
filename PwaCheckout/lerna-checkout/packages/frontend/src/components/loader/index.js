import Loader from "react-loader-spinner";
import "./styles.scss";

const CheckoutLoader = () => {
  return <div className="loader">
    <Loader
      type="TailSpin"
      color="#e1aa4c"
      height={40}
      width={40}
    />
  </div>
};

export default CheckoutLoader;