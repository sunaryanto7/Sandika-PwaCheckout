import { constant } from '@app/modules/checkout/store/constant';

const reducer = (state, action) => {
  switch (action.type) {
    case (constant.REFRESH_CUSTOMER_ADDRESSES):
      return {
        ...state,
        CUSTOMER_DATA: action.payload
      }

    case (constant.REFRESH_CART):
      return {
        ...state,
        CART: {
          ...state.CART,
          ...action.payload.cart
        }
      }

    case (constant.REFRESH_CART_ITEMS_QTY):
      return {
        ...state,
        CART: {
          ...state.CART,
          ...action.payload
        }
      }

    case (constant.REFRESH_SHIPPING_METHODS):
      return {
        ...state,
        CART: {
          ...state.CART,
          ...action.payload
        }
      }

    case (constant.REFRESH_CART_ON_SHIPPING_METHODS_CHANGE):
      return {
        ...state,
        CART: {
          ...state.CART,
          ...action.payload.cart
        },
        SELECTED: {
          ...state.SELECTED,
          shipping: action.payload.shipping
        }
      }

    case (constant.REFRESH_CART_ON_PAYMENT_METHODS_CHANGE):
      return {
        ...state,
        CART: {
          ...state.CART,
          ...action.payload.cart
        },
        SELECTED: {
          ...state.SELECTED,
          payment: action.payload.payment
        }
      }

    case (constant.REFRESH_CART_ON_EXTRAFEE_CHANGE):
      return {
        ...state,
        CART: {
          ...state.CART,
          ...action.payload.cart
        },
      }

    case (constant.UPDATE_CUSTOMER_DEFAULT_ADDRESS):
      return {
        ...state,
        CUSTOMER_DATA: {
          ...state.CUSTOMER_DATA,
          ...action.payload.customerData
        },
        CART: {
          ...state.CART,
          ...action.payload.cart
        },
        SELECTED: {
          ...state.SELECTED,
          shipping: null
        }
      }

    case (constant.SET_DELIVERY_METHOD):
      return {
        ...state,
        CART: {
          ...state.CART,
          ...action.payload.cart
        },
        SELECTED: {
          ...state.SELECTED,
          delivery: action.payload.delivery,
          shipping: null
        }
      }

    case (constant.APPLY_REWARD_POINTS):
      return {
        ...state,
        CART: {
          ...state.CART,
          ...action.payload.cart
        },
      }

    case (constant.REMOVE_REWARD_POINTS):
      return {
        ...state,
        CART: {
          ...state.CART,
          ...action.payload.cart
        },
      }

    case (constant.APPLY_STORE_CREDIT):
      return {
        ...state,
        CART: {
          ...state.CART,
          ...action.payload.cart
        },
      }

    case (constant.REMOVE_STORE_CREDIT):
      return {
        ...state,
        CART: {
          ...state.CART,
          ...action.payload.cart
        },
      }


    default:
      return {
        ...state
      }
  }
}

export { reducer }