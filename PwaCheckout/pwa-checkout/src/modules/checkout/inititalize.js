import { useQuery } from "@app/helper/useQuery";
import { useEffect, useState } from "react";
import { GQLClientRequest } from "@app/graphql/client";
import {
  SCHEMA_STORE_CONFIG,
  SCHEMA_GET_CART,
  SCHEMA_GET_CART_ITEMS,
  SCHEMA_CUSTOMER,
  INTERNAL_GENERATE_SESSION,
  INTERNAL_DELETE_SESSION
} from "@app/graphql/schema";


const useInitialData = () => {

  const STATE = useQuery();
  const [state, setState] = useState({
    loading: true,
    data: {
      isLogin: false,
      storeConfig: {},
      customerData: {},
      cart: {},
      selected: {
        delivery: 0,
        address: null,
        shipping: null,
        payment: null
      },
    }
  })


  useEffect(() => {

    /**
     * --------------------------------------------------------
     * GRAPHQL internal delete session
     * GRAPHQL get storeConfig
     * --------------------------------------------------------
     */
    Promise.all([
      GQLClientRequest(INTERNAL_DELETE_SESSION),
      GQLClientRequest(SCHEMA_STORE_CONFIG),
    ]).then(([{ internalDeleteSession }, { storeConfig }]) => {

      /**
       * --------------------------------------------------------
       * APPEND SCRIPT
       * --------------------------------------------------------
       */
      const script = document.createElement('script');
      if (!document.getElementById("snap-midtrans")) {
        const snapSrcUrl = 'https://app.sandbox.midtrans.com/snap/snap.js';
        const myMidtransClientKey = storeConfig.snap_client_key;

        script.id = "midtrans-js";
        script.src = snapSrcUrl;
        script.setAttribute('data-client-key', myMidtransClientKey);
        script.async = true;

        document.body.appendChild(script);
      };


      /**
       * --------------------------------------------------------
       * IF (storeConfig.allow_guest_checkout === false)
       * then the page will be redirect to login page
       * --------------------------------------------------------
       */
      if (!storeConfig.allow_guest_checkout) {
        window.location.replace(storeConfig.base_url)
      }


      /**
       * --------------------------------------------------------
       * GRAPHQL internal generate session
       * --------------------------------------------------------
       */
      return Promise.all([
        GQLClientRequest(INTERNAL_GENERATE_SESSION, { state: STATE }),
      ]).then(([{ internalGenerateSession }]) => {


        /**
         * --------------------------------------------------------
         * IF (customer is not logedIn or as guest)
         * --------------------------------------------------------
         */
        if (internalGenerateSession.isLogin) {


          /**
           * --------------------------------------------------------
           * GRAPHQL get cart and
           * GRAPHQL get customer data
           * --------------------------------------------------------
           */
          return Promise.all([
            GQLClientRequest(SCHEMA_GET_CART, { cart_id: internalGenerateSession.cartId }),
            GQLClientRequest(SCHEMA_CUSTOMER)
          ]).then(([CART, { customer }]) => {
            return Promise.all([
              GQLClientRequest(SCHEMA_GET_CART_ITEMS, { cart_id: internalGenerateSession.cartId }),
            ]).then(([CART_ITEMS]) => {
              return setState({
                loading: false,
                data: {
                  ...state.data,
                  isLogin: true,
                  storeConfig: storeConfig,
                  cart: { ...CART.cart, ...CART_ITEMS.cart },
                  customerData: customer,
                  selected: {
                    ...state.data.selected,
                    delivery: CART.cart.pickup_store_person.email ? 1 : 0,
                    payment: CART.cart.selected_payment_method?.code ? `${CART.cart.selected_payment_method.code}_${CART.cart.selected_payment_method.title}` : null,
                    shipping: CART.cart.shipping_addresses[0]?.selected_shipping_method ? `${CART.cart.shipping_addresses[0].selected_shipping_method.carrier_code}_${CART.cart.shipping_addresses[0].selected_shipping_method.method_code}_${CART.cart.shipping_addresses[0].selected_shipping_method.carrier_title}` : null
                  }
                }
              })
            }).catch(err => {
              console.log(err)
            })
          }).catch(err => {
            console.log(err)
          })
        } else {


          /**
            * --------------------------------------------------------
            * GRAPHQL get cart only
            * --------------------------------------------------------
            */
          return Promise.all([
            GQLClientRequest(SCHEMA_GET_CART, { cart_id: internalGenerateSession.cartId }),
          ]).then(([CART]) => {
            return Promise.all([
              GQLClientRequest(SCHEMA_GET_CART_ITEMS, { cart_id: internalGenerateSession.cartId }),
            ]).then(([CART_ITEMS]) => {
              return setState({
                loading: false,
                data: {
                  ...state.data,
                  isLogin: false,
                  storeConfig: storeConfig,
                  cart: { ...CART.cart, ...CART_ITEMS.cart },
                  selected: {
                    ...state.data.selected,
                    delivery: CART.cart.pickup_store_person.email ? 1 : 0,
                    payment: CART.cart.selected_payment_method?.code ? `${CART.cart.selected_payment_method.code}_${CART.cart.selected_payment_method.title}` : null,
                    shipping: CART.cart.shipping_addresses[0]?.selected_shipping_method ? `${CART.cart.shipping_addresses[0].selected_shipping_method.carrier_code}_${CART.cart.shipping_addresses[0].selected_shipping_method.method_code}_${CART.cart.shipping_addresses[0].selected_shipping_method.carrier_title}` : null
                  }
                }
              })
            }).catch(err => {
              console.log(err)
            })
          }).catch(err => {
            console.log(err)
          })
        }
      }).catch(err => {
        console.log(err)
      })
    }).catch(err => {
      console.log(err)
    })


    return () => {
      if (document.getElementById("midtrans-js")) {
        const script = document.getElementById('midtrans-js');
        document.body.removeChild(script);
      }
    }

  }, [])

  return state
};

export { useInitialData };