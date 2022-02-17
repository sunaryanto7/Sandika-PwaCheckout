import { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useCheckoutContext } from "@app/modules/checkout/store";
import { REFRESH_CART } from "@app/modules/checkout/store/action";
import { GQLClientRequest } from "@app/graphql/client";
import { SCHEMA_UPDATE_PIKCUP_STORE_ON_CART } from "@app/graphql/schema";
import {
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";

const Pickup_Information_Store = ({ extension_attributes }) => {
  const [toggle, setToggle] = useState(false);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [{ CART, STORE }, dispatch] = useCheckoutContext();

  const onToggleModal = () => {
    return setToggle(!toggle)
  }

  const onSetPickupStore = async (store) => {
    try {
      const body = {
        cart_id: CART.id,
        code: store.code,
        extension_attributes: {
          pickup_person_name: extension_attributes.name,
          pickup_person_email: extension_attributes.email,
          pickup_person_phone: extension_attributes.handphone
        },
        store_address: {
          city: store.city,
          country_code: store.country_id,
          name: store.name,
          postcode: store.postcode,
          region: store.region,
          street: store.street,
          telephone: store.telephone
        }
      }
      const response_setPickupStore = await GQLClientRequest(SCHEMA_UPDATE_PIKCUP_STORE_ON_CART, body)
      if (!response_setPickupStore.status === "failed") { throw new response_setPickupStore }
      dispatch(REFRESH_CART({ cart: response_setPickupStore.data.setPickupStore }))
      return setToggle(false)
    }
    catch (err) {
      console.log(err)
    }
  }

  const STORE_LIST = search !== "" ? STORE.filter((data) => {
    return data.name.toLowerCase().includes(search.toLowerCase())
  }) : STORE

  return (
    <>
      <button className="btn btn-primary" onClick={onToggleModal}>Select Store</button>
      <Modal centered isOpen={toggle} toggle={onToggleModal} className="store-pickup-modal">
        <ModalHeader tag="h6" toggle={onToggleModal}>
          Store List
        </ModalHeader>
        <ModalBody>
          <div className="store-search">
            <div className="form-group">
              <label htmlFor="email" className="sr-only">Email</label>
              <input
                type="text"
                className="form-control"
                id="search"
                placeholder={"Search Store"}
                autoComplete={"false"}
                onChange={(e) => setSearch(e.target.value)} />
            </div>
          </div>
          {STORE_LIST.map((data, key) => (
            <div className="store-list" key={key} onClick={() => onSetPickupStore(data)}>
              <p>
                <strong>{data.code} - {data.name}</strong><br />
                {data.street}<br />
                {data.city} {data.region}<br />
                {data.postcode} - {data.telephone}
              </p>
            </div>
          ))}
        </ModalBody>
      </Modal>
    </>
  )
}

const Pikcup_Information_Form = ({ setPickupInfo }) => {
  const PICKUP_FORM_SCHEMA = Yup.object().shape({
    email: Yup.string().email().required("Tidak boleh kosong"),
    person: Yup.string().required("Tidak boleh kosong"),
    phone_number: Yup.number().required("Tidak boleh kosong"),
  });

  const PICKUP_FORM = useFormik({
    enableReinitialize: true,
    validationSchema: PICKUP_FORM_SCHEMA,
    initialValues: {
      person: "",
      phone_number: "",
      email: ""
    },
    onSubmit: (value) => {
      setPickupInfo({
        email: value.email,
        handphone: value.phone_number,
        name: value.person
      })
    }
  });

  return (
    <form onSubmit={PICKUP_FORM.handleSubmit}>
      <div className="form-row">
        <div className="form-group col-md-6">
          <label htmlFor="person">Person Name</label>
          <input
            type="text"
            className="form-control"
            name="person"
            id="person"
            placeholder="Jhon Doe"
            onChange={PICKUP_FORM.handleChange} />
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            className="form-control"
            name="email"
            id="email"
            placeholder="example@gmail.com"
            onChange={PICKUP_FORM.handleChange} />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group col-md-6">
          <label htmlFor="phone_number">Phone Number</label>
          <input
            type="text"
            className="form-control"
            name="phone_number"
            id="phone_number"
            placeholder="081xxxxxxxxx"
            onChange={PICKUP_FORM.handleChange}
            autoComplete="off" />
        </div>
      </div>
      <button type="submit" className="btn btn-primary">Save Information</button>
    </form>
  );
};

const View = () => {
  const [{ CART }] = useCheckoutContext();
  const [pikcupInfo, setPickupInfo] = useState({
    email: '',
    handphone: '',
    name: ''
  })

  return (
    <>
      <div className="container-pickup-information">
        <div className="block">
          <div className="block-title">
            <h4>Pickup Information</h4>
          </div>
          <div className="block-content">
            <Pikcup_Information_Form setPickupInfo={setPickupInfo} />
          </div>
        </div>
      </div>
      <div className="container-pickup-information-location">
        <div className="block">
          <div className="block-title">
            <h4>Pickup Location</h4>

          </div>
          <div className="block-content">
            {(!pikcupInfo.email || !pikcupInfo.name || !pikcupInfo.handphone) && <p className="form-text text-muted">Please fill some pickup person information</p>}
            {(pikcupInfo.email && pikcupInfo.name && pikcupInfo.handphone) && (
              <div className="information-pickup">
                <div className="information-pickup-person">
                  <p>Name : {pikcupInfo.name}</p>
                  <p>Email : {pikcupInfo.email}</p>
                  <p>Phone Number : {pikcupInfo.handphone}</p>
                </div>
                <div className="information-pickup-store">
                  {CART.pickup_store_person.email && CART.shipping_addresses[0] ? `${CART.shipping_addresses[0].firstname} ${CART.shipping_addresses[0].lastname} ${CART.shipping_addresses[0].street.join(', ')} 
                  ${CART.shipping_addresses[0].city} ${CART.shipping_addresses[0].region && CART.shipping_addresses[0].region.label} 
                  ${CART.shipping_addresses[0].country.label} ${CART.shipping_addresses[0].postcode} ${CART.shipping_addresses[0].telephone}` : ""}

                  {!(CART.pickup_store_person.email && CART.shipping_addresses[0]) && <p>Select Store Location</p>}
                  <Pickup_Information_Store extension_attributes={pikcupInfo} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
};

export default View;