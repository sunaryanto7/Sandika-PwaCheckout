import { constant } from '@app/modules/checkout/store/constant';

export const REFRESH_CUSTOMER_ADDRESSES = (payload) => {
  return {
    type: constant.REFRESH_CUSTOMER_ADDRESSES,
    payload: payload
  }
}

export const REFRESH_SHIPPING_METHODS = (payload) => {
  return {
    type: constant.REFRESH_SHIPPING_METHODS,
    payload: payload
  }
}

export const REFRESH_CART = (payload) => {
  return {
    type: constant.REFRESH_CART,
    payload: payload
  }
}

export const REFRESH_CART_ITEMS_QTY = (payload) => {
  return {
    type: constant.REFRESH_CART_ITEMS_QTY,
    payload: payload
  }
}

export const REFRESH_CART_ON_SHIPPING_METHODS_CHANGE = (payload) => {
  return {
    type: constant.REFRESH_CART_ON_SHIPPING_METHODS_CHANGE,
    payload: payload
  }
}

export const REFRESH_CART_ON_PAYMENT_METHODS_CHANGE = (payload) => {
  return {
    type: constant.REFRESH_CART_ON_PAYMENT_METHODS_CHANGE,
    payload: payload
  }
}

export const REFRESH_CART_ON_EXTRAFEE_CHANGE = (payload) => {
  return {
    type: constant.REFRESH_CART_ON_EXTRAFEE_CHANGE,
    payload: payload
  }
}

export const UPDATE_CUSTOMER_DEFAULT_ADDRESS = (payload) => {
  return {
    type: constant.UPDATE_CUSTOMER_DEFAULT_ADDRESS,
    payload: payload
  }
}

export const SET_DELIVERY_METHOD = (payload) => {
  return {
    type: constant.SET_DELIVERY_METHOD,
    payload: payload
  }
}

export const APPLY_REWARD_POINTS = (payload) => {
  return {
    type: constant.APPLY_REWARD_POINTS,
    payload: payload
  }
}

export const APPLY_STORE_CREDIT = (payload) => {
  return {
    type: constant.APPLY_STORE_CREDIT,
    payload: payload
  }
}

export const REMOVE_REWARD_POINTS = (payload) => {
  return {
    type: constant.REMOVE_REWARD_POINTS,
    payload: payload
  }
}

export const REMOVE_STORE_CREDIT = (payload) => {
  return {
    type: constant.REMOVE_STORE_CREDIT,
    payload: payload
  }
}