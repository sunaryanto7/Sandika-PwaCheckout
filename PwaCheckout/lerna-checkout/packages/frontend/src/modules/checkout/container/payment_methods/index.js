import { useCheckoutContext } from "@app/modules/checkout/store";
import View from "@app/modules/checkout/container/payment_methods/view";

const ContainerPaymentMethods = () => {
  const [{
    CUSTOMER_DATA,
    CART: {
      available_payment_methods
    },
    STORE_CONFIG: {
      payments_configuration
    },
    SELECTED
  }] = useCheckoutContext();

  const AVAILABLE_PAYMENT_METHODS = available_payment_methods || [];
  const PAYMENT_GROUP = Object.keys(JSON.parse(payments_configuration)).map((data) => ({
    title: data.replace("pg-", "").charAt(0).toUpperCase() + data.replace("pg-", "").slice(1),
    code: data,
    group: JSON.parse(payments_configuration)[data].split(",").map(configuration => {
      const result = AVAILABLE_PAYMENT_METHODS.map((payment) => {
        const identifier = `${payment.code}`;
        if (identifier.match(new RegExp(`^${configuration}`)) !== null) {
          return payment
        }
      }).filter(data => typeof data !== "undefined")

      if (result.length) {
        return result[0]
      }
    }).filter(data => typeof data !== "undefined"),
    get active() { return this.group.filter(data => `${data.code}_${data.title}` === SELECTED.payment).length > 0 ? true : false }
  })).filter(data => data.group.length > 0).map(data => {
    return {
      ...data, group: data.group
        .sort((a, b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0))
        .reduce((acc, current) => {
          const x = acc.find(item => item.code === current.code);
          if (!x) {
            return acc.concat([current]);
          } else {
            return acc;
          }
        }, [])
    }
  });

  return <View payments={PAYMENT_GROUP} />
}

export default ContainerPaymentMethods;