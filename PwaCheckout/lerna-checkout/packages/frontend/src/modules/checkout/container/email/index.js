import { useCheckoutContext } from "@app/modules/checkout/store";
import View from "@app/modules/checkout/container/email/view";

const ContainerEmail = () => {
  const [{ IS_LOGIN }] = useCheckoutContext();
  if (!IS_LOGIN) {
    return <View />
  }
  return null;
};

export default ContainerEmail;