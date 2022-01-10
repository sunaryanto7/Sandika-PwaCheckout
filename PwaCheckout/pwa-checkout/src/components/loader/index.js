import Loader from "react-loader-spinner";
import "./styles.scss";

const CheckoutLoader = () => {
  return <div className="loader">
    <Loader
      type="TailSpin"
      color="#e1aa4c"
      height={100}
      width={100}
    />
  </div>
};

export default CheckoutLoader;