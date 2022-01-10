import { useCheckoutContext } from "@app/modules/checkout/store";
import { useCurrency } from "@app/helper/useCurrency";
import View from "@app/modules/checkout/container/summary/view";

const ContainerSummary = () => {
  const [{ CART }] = useCheckoutContext();
  const {
    prices,
    items,
    applied_store_credit,
    applied_reward_points,
    applied_gift_cards,
    shipping_addresses,
    applied_extra_fee
  } = CART;
  const currency = useCurrency()

  const dataSummary = [];
  let subtotal = null;
  let total = currency.format(prices.grand_total.value);

  /**
   * --------------------------
   * CALCULATE SUBTOTAL
   * --------------------------
   */
  if (prices && prices.applied_taxes && prices.applied_taxes.length) {
    subtotal = currency.format(prices.subtotal_excluding_tax.value);
  } else {
    subtotal = currency.format(prices.subtotal_including_tax.value);
  }
  dataSummary.push({ item: 'Sub Total', value: subtotal });


  /**
   * --------------------------
   * CALCULATE APPLIED TAXES
   * --------------------------
   */
  if (prices.applied_taxes.length) {
    const taxes = prices.applied_taxes.reduce(
      (prev, curr) => ({
        value: prev.value + curr.amount.value,
        currency: curr.amount.currency,
      }),
      { value: 0 },
    );
    const price = currency.format(taxes.value);
    dataSummary.push({ item: 'Applied Taxes', value: price });
  }


  /**
   * --------------------------
   * CALCULATE EXTRA FEE
   * --------------------------
   */
  if (applied_extra_fee.extrafee_value) {
    dataSummary.push({
      item: applied_extra_fee.title || '',
      value: currency.format(applied_extra_fee.extrafee_value.value),
    });
  }


  /**
   * --------------------------
   * CALCULATE SHIPPING
   * --------------------------
   */
  if (shipping_addresses[0]?.selected_shipping_method) {
    const shippingMethod = shipping_addresses[0].selected_shipping_method;
    const price = currency.format(shippingMethod.amount.value);
    dataSummary.push({ item: 'Shipping', value: price });
  }


  /**
   * --------------------------
   * CALCULATE DISCOUNT
   * --------------------------
   */
  if (prices.discounts && prices.discounts.length) {
    const discounts = prices.discounts.map((disc) => {
      const price = currency.format(disc.amount.value);
      return { item: `${disc.label}`, value: `-${price}` };
    });

    for (var i = 0; i < discounts.length; i++) {
      dataSummary.push(discounts[i]);
    }
  }

  /**
   * --------------------------
   * CALCULATE STORE CREDIT
   * --------------------------
   */
  if (applied_store_credit.applied_balance) {
    let price = '';
    if (applied_store_credit.applied_balance && applied_store_credit.applied_balance.value > 0) {
      price = currency.format(Math.abs(applied_store_credit.applied_balance.value));
    } else if (applied_store_credit.is_use_store_credit) {
      price = currency.format(Math.abs(applied_store_credit.store_credit_amount));
    }
    if (price !== '') dataSummary.push({ item: ' ', value: `-${price}` });
  }


  /**
   * --------------------------
   * CALCULATE REWARD POINTS
   * --------------------------
   */
  if (applied_reward_points.is_use_reward_points) {
    const price = currency.format(Math.abs(applied_reward_points.reward_points_amount));
    dataSummary.push({ item: 'Reward Points', value: `-${price}` });
  }


  /**
   * --------------------------
   * CALCULATE GIFTCARD
   * --------------------------
   */
  if (applied_gift_cards) {
    let giftCards = [];
    if (applied_gift_cards && applied_gift_cards.length > 0) {
      giftCards = applied_gift_cards.map((item) => {
        const price = currency.format(Math.abs(item.applied_balance.value));
        return { item: `Giftcard (${item.code}) - ${price}`, value: `-${price}` };
      });
    } else {
      giftCards = applied_gift_cards.giftcard_detail.map((item) => {
        const price = currency.format(Math.abs(item.giftcard_amount_used));
        return { item: `Giftcard (${item.giftcard_code}) - ${price}`, value: `-${price}` };
      });
      dataSummary = dataSummary.concat(giftCards);
    }
  }

  return <View
    items={items}
    dataSummary={dataSummary}
    dataTotal={total}
  />
}

export default ContainerSummary;