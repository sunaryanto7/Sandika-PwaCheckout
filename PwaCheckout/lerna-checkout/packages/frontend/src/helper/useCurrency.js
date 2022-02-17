const useCurrency = () => new Intl.NumberFormat(process.env.REACT_APP_LOCALE, {
  style: 'currency',
  currency: process.env.REACT_APP_LOCALE_CURRENCY
});

export { useCurrency }