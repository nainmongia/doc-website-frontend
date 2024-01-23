import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import axios from "axios";
import { baseUrl } from "../../../config";
import LayoutFour from "../../components/Layout/LayoutFour";
import LayoutOne from "../../components/Layout/LayoutOne";
import { Breadcrumb, BreadcrumbItem } from "../../components/Other/Breadcrumb";
import InstagramTwo from "../../components/Sections/Instagram/InstagramTwo";
import {
  formatCurrency,
  formatDate,
  formatSingleNumber,
} from "../../common/utils";
import {
  calculateTotalPriceAfterCoupon,
  calculateDiscountPrice,
  calculateSubTotalPrice,
  calculateDiscountPriceAfterCoupon,
  calculateTotalPrice,
} from "../../common/shopUtils";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import Loading from "../../components/Other/Loading";
import { removeAllFromCart } from "../../redux/actions/cartActions";
import styled from "styled-components";
import { addOrderData } from "../../redux/reducers/orderReducer";

export default function () {
  const cartState = useSelector((state) => state.cartReducer);
  const [couponAmount, setCouponAmount] = useState(0);
  const [couponType, setCouponType] = useState("");
  const [loading, setLoading] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [show, setShow] = useState(false);
  const [type, setType] = useState("ONLINE");
  const [charges, setCharges] = useState({});
  const isAuthenticated = useSelector(
    (state) => state.userReducer.isAuthenticated
  );

  const currentUser = useSelector((state) => state.userReducer.user);
  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();
  const tid = "T" + currentUser?.user.username + Date.now();
  const {
    register: couponRegister,
    handleSubmit: couponHandleSubmit,
    errors: couponErrors,
  } = useForm();

  async function getcharges() {
    const res = await axios.get(`${baseUrl}/api/delivery/get`);
    setCharges(res.data?.discount);
  }

  useEffect(() => {
    getcharges();
  }, []);

  const onSubmit = async (data) => {
    setLoading(true);
    if (type === "COD") {
      try {
        const response = await axios.post(
          `${baseUrl}/api/create/new/order`,
          {
            customer_id: currentUser?.user._id,
            customer_name: data.firstName + " " + data.lastName,
            tid: type === "COD" ? "COD" : tid,
            customer_email: data.contact,
            order_status: "pending",
            products: cartState,
            total_amount:
              totalPrice < charges?.cap
                ? totalPrice + charges?.amount
                : totalPrice,
            shipping_address: data.streetAddress + data.apartment,
            state: data.state,
            pincode: data.zip,
            town: data.town,
            totalqty:data
          },
          {
            withCredentials: true,
          }
        );
        setLoading(false);
        dispatch(removeAllFromCart());
        return toast.success("Your order has been placed");
      } catch (error) {
        setLoading(false);
        if (error.response.message) {
          return toast.error(error.response.message);
        }
        return toast.error("An error occured");
      }
    }

    if (type !== "COD") {
      dispatch(
        addOrderData({
          customer_id: currentUser?.user._id,
          customer_name: data.firstName + " " + data.lastName,
          tid: type === "COD" ? "COD" : tid,
          customer_email: data.contact,
          order_status: "pending",
          total_amount:
            totalPrice < charges?.cap
              ? totalPrice + charges?.amount
              : totalPrice,
          shipping_address: data.streetAddress + data.apartment,
          state: data.state,
          pincode: data.zip,
          town: data.town,
        })
      );
      try {
        const payres = await axios.post(
          `${baseUrl}/api/pay`,
          {
            name: data.firstName + " " + data.lastName,
            amount:
              totalPrice < charges?.cap
                ? totalPrice + charges?.amount
                : totalPrice,
            number: currentUser?.user.phone_number,
            tuid: currentUser?.user._id,
            tid: tid,
          },
          {
            withCredentials: true,
          }
        );

        setLoading(false);
        // dispatch(removeAllFromCart());
        window.location.replace(payres.data.link);
        return;
      } catch (error) {
        console.log(error);
        setLoading(false);
        if (error.response?.message) {
          return toast.error(error.response.message);
        }
        return toast.error("An error occured");
      }
    }
  };

  const handlePaymentChange = (event) => {
    setType(event.target.value);
  };

  // const onSubmit = async (data) => {
  //   try {
  //     setLoading(true);
  //     const res = await axios.post(`${baseUrl}/api/pay`, {
  //       name: "manan",
  //       amount: 1,
  //       number: "9810585686",
  //       tuid: "MUID" + Date.now(),
  //       tid: "T" + Date.now(),
  //     });
  //     console.log(res);
  //     setLoading(false);
  //   } catch (error) {
  //     setLoading(false);
  //     console.log(error);
  //     return toast.error("An error occured");
  //   }
  // };

  const onCouponSubmit = async (data) => {
    try {
      const c = data.coupon.toUpperCase();
      setLoading(true);
      const total = calculateTotalPrice(cartState, false);
      const response = await axios.get(
        `${baseUrl}/api/coupon/title/${c}/${total}`
      );
      setLoading(false);
      if (response?.data?.message) {
        return toast.error(`coupon has expired`);
      }
      setCouponAmount(response?.data?.discountValue);
      setCoupon(response?.data?.title);
      setCouponType(response?.data?.discountType);
      return toast.success("Coupon applied successfully!");
    } catch (error) {
      setLoading(false);
      console.log(error);
      return toast.error(error?.response?.data?.message);
    }
  };

  const totalPrice = calculateTotalPriceAfterCoupon(
    cartState,
    false,
    couponAmount,
    couponType
  );

  return (
    <LayoutOne title="Checkout">
      <Breadcrumb title="Checkout">
        <BreadcrumbItem name="Home" />
        <BreadcrumbItem name="Shop" />
        <BreadcrumbItem name="Checkout" current />
      </Breadcrumb>
      {loading ? (
        <Loading />
      ) : (
        <div className="checkout">
          <div className="container">
            <div className="row">
              <div className="col-12  col-lg-8">
                <form>
                  <div className="checkout__form">
                    <div className="checkout__form__contact">
                      <div className="checkout__form__contact__title">
                        <h5 className="checkout-title">Contact information</h5>
                        {!isAuthenticated && (
                          <Link href="/login">
                            <p
                              style={{
                                color: "red",
                                fontWeight: "bold",
                                cursor: "pointer",
                              }}
                            >
                              Please login to place your order!
                              <a
                                style={{
                                  color: "red",
                                  fontWeight: "bold",
                                }}
                              >
                                Login
                              </a>
                            </p>
                          </Link>
                        )}
                      </div>
                      <div className="input-validator">
                        <input
                          type="text"
                          name="contact"
                          ref={register({ required: true })}
                          placeholder="Email"
                        />
                        {errors.contact && (
                          <span className="input-error">
                            Please provide a name or email
                          </span>
                        )}
                      </div>
                      {/* <label className="checkbox-label" htmlFor="subcribe-news">
                      <input
                        type="checkbox"
                        id="subcribe-news"
                        name="subcribeNews"
                        ref={register}
                      />
                      Keep me up to dateon news and exclusive offers
                    </label> */}
                    </div>
                    <div className="checkout__form__shipping">
                      <h5 className="checkout-title">Shipping address</h5>
                      <div className="row">
                        <div className="col-12 col-md-6">
                          <div className="input-validator">
                            <label>
                              First name <span>*</span>
                              <input
                                type="text"
                                name="firstName"
                                ref={register({ required: true })}
                              />
                            </label>
                            {errors.firstName && (
                              <span className="input-error">
                                Please provide your first name
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="col-12 col-md-6">
                          <div className="input-validator">
                            <label>
                              Last name <span>*</span>
                              <input
                                type="text"
                                name="lastName"
                                ref={register({ required: true })}
                              />
                            </label>
                            {errors.lastName && (
                              <span className="input-error">
                                Please provide your last name
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="input-validator">
                            <label>
                              Country <span>*</span>
                              <input
                                type="text"
                                name="country"
                                ref={register({ required: true })}
                              />
                            </label>
                            {errors.country && (
                              <span className="input-error">
                                Please provide your country
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="input-validator">
                            <label>
                              Address <span>*</span>
                              <input
                                type="text"
                                name="streetAddress"
                                ref={register({ required: true })}
                                placeholder="Steet address"
                              />
                              <input
                                type="text"
                                name="apartment"
                                ref={register({ required: true })}
                                placeholder="Apartment, suite, unite ect ( optinal )"
                              />
                            </label>
                            {errors.streetAddress || errors.apartment ? (
                              <span className="input-error">
                                Please provide your address
                              </span>
                            ) : null}
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="input-validator">
                            <label>
                              Town/City <span>*</span>
                              <input
                                type="text"
                                name="town"
                                ref={register({ required: true })}
                              />
                            </label>
                            {errors.town && (
                              <span className="input-error">
                                Please provide your town/city
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="input-validator">
                            <label>
                              Country/State <span>*</span>
                              <input
                                type="text"
                                name="state"
                                ref={register({ required: true })}
                              />
                            </label>
                            {errors.state && (
                              <span className="input-error">
                                Please provide your country/State
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="input-validator">
                            <label>
                              Postcode/ZIP <span>*</span>
                              <input
                                type="text"
                                name="zip"
                                ref={register({ required: true })}
                              />
                            </label>
                            {errors.zip && (
                              <span className="input-error">
                                Please provide your postcode/ZIP
                              </span>
                            )}
                          </div>
                        </div>
                        {/* <div className="col-12">
                          <div className="input-validator">
                            <label>
                              Order note
                              <input
                                type="text"
                                name="note"
                                placeholder="Note about your order, e.g, special noe for delivery"
                                ref={register()}
                              />
                            </label>
                          </div>
                        </div> */}
                        <div className="col-12">
                          <img
                            style={{
                              width: "100%",
                              height: "100%",
                              marginRight: "5px",
                            }}
                            src={
                              process.env.PUBLIC_URL + "/assets/images/ch.jpeg"
                            }
                          />
                        </div>
                      </div>
                      {/* <label className="checkbox-label" htmlFor="save">
                      <input
                        type="checkbox"
                        id="save"
                        name="saveInfo"
                        ref={register()}
                      />
                      Save this infomation for next time
                    </label> */}
                    </div>
                  </div>
                </form>
              </div>
              <div className="col-12 col-lg-4">
                <div className="row">
                  <div className="col-12 col-md-6 col-lg-12 ml-auto">
                    <div className="checkout__total">
                      <h5 className="checkout-title">Your order</h5>
                      <form
                        className="checkout__total__coupon"
                        onSubmit={couponHandleSubmit(onCouponSubmit)}
                      >
                        <h5>Coupon Code</h5>
                        <div className="input-validator">
                          <input
                            type="text"
                            placeholder="Your code here"
                            name="coupon"
                            ref={couponRegister({ required: true })}
                            style={{
                              textTransform: "uppercase",
                            }}
                          />
                          {couponErrors.coupon && (
                            <span className="input-error">
                              Please provide a coupon code
                            </span>
                          )}
                        </div>
                        <button type="submit" className="btn -dark">
                          Apply
                        </button>
                      </form>
                      <button
                        onClick={() => {
                          setShow(!show);
                        }}
                        className="btn -dark"
                      >
                        Coupons available
                      </button>
                      <div
                        style={{
                          marginBottom: "10px",
                        }}
                      ></div>
                      <div className="checkout__total__price">
                        <h5>Product</h5>
                        <table>
                          <colgroup>
                            <col style={{ width: "70%" }} />
                            <col style={{ width: "30%" }} />
                          </colgroup>
                          <tbody>
                            {cartState.map((item) => (
                              <tr key={item.cartId}>
                                <td>
                                  <span>
                                    {formatSingleNumber(item.cartQuantity)}
                                  </span>{" "}
                                  x {item.name}
                                </td>
                                <td>
                                  <h3 className="product-price--main">
                                    <h3
                                      style={{
                                        marginBottom: 10,
                                      }}
                                      className="product-price--discount"
                                    >
                                      {formatCurrency(item.regular_price)}
                                    </h3>
                                    {formatCurrency(item.price)}
                                  </h3>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <div className="checkout__total__price__total-count">
                          <table>
                            <tbody>
                              {coupon !== "" && couponAmount > 0 && (
                                <tr>
                                  <td>Coupon Applied : </td>
                                  <td
                                    style={{
                                      textTransform: "uppercase",
                                    }}
                                  >
                                    {" "}
                                    {coupon}{" "}
                                  </td>
                                </tr>
                              )}
                              <tr>
                                <td>Subtotal</td>
                                <td>
                                  {calculateSubTotalPrice(cartState, true)}
                                </td>
                              </tr>
                              <tr>
                                <td
                                  style={{
                                    color: "red",
                                  }}
                                >
                                  Discount
                                </td>
                                <td
                                  style={{
                                    color: "red",
                                  }}
                                >
                                  {" "}
                                  - {calculateDiscountPrice(
                                    cartState,
                                    true
                                  )}{" "}
                                </td>
                              </tr>
                              {couponAmount > 0 && (
                                <tr>
                                  <td
                                    style={{
                                      color: "red",
                                    }}
                                  >
                                    Coupon Discount
                                  </td>
                                  <td
                                    style={{
                                      color: "red",
                                    }}
                                  >
                                    {" "}
                                    -{" "}
                                    {calculateDiscountPriceAfterCoupon(
                                      cartState,
                                      true,
                                      couponAmount,
                                      couponType
                                    )}{" "}
                                  </td>
                                </tr>
                              )}
                              <tr>
                                <td>Delivery Charges</td>
                                <td>
                                  {totalPrice < charges?.cap
                                    ? `+ ₹${charges?.amount}`
                                    : "FREE"}
                                </td>
                              </tr>
                              <tr>
                                <td>Total</td>
                                <td>
                                  {totalPrice < charges?.cap
                                    ? `₹${totalPrice + charges?.amount}`
                                    : `₹${totalPrice}`}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          {totalPrice < charges?.cap ? (
                            <p
                              style={{
                                marginTop: "10px",
                                lineHeight: "1.5rem",
                                color: "red",
                                fontWeight: "bold",
                              }}
                            >
                              Add items worth{" "}
                              {parseInt(charges?.cap - totalPrice)} more to get
                              free deivery
                            </p>
                          ) : (
                            <></>
                          )}
                        </div>
                        <div className="checkout__total__price__payment">
                          <label className="checkbox-label" htmlFor="payment">
                            Select Payment Method :
                          </label>
                          <div
                            style={{
                              marginTop: "10px",
                              color: type !== "ONLINE" && "#04888D",
                              fontWeight: type !== "ONLINE" && "bold",
                            }}
                          >
                            <input
                              type="radio"
                              id="cashOnDelivery"
                              name="paymentMethod"
                              value="COD"
                              checked={type === "COD"}
                              onChange={handlePaymentChange}
                            />
                            <label htmlFor="cashOnDelivery">
                              {" "}
                              Cash on Delivery
                            </label>
                          </div>
                          <div
                            style={{
                              height: "10px",
                            }}
                          ></div>
                          <div
                            style={{
                              marginTop: "8px",
                              color: type === "ONLINE" && "#04888D",
                              fontWeight: type === "ONLINE" && "bold",
                            }}
                          >
                            <input
                              style={{
                                color: type === "ONLINE" ? "#04888D" : "",
                              }}
                              type="radio"
                              id="onlinePayment"
                              name="paymentMethod"
                              value="ONLINE"
                              checked={type === "ONLINE"}
                              onChange={handlePaymentChange}
                            />
                            <label htmlFor="onlinePayment">
                              {" "}
                              Online Payment
                            </label>
                          </div>
                        </div>
                      </div>
                      {!isAuthenticated ? (
                        <>
                          <Link href="/login">
                            <button className="btn -red">Login</button>
                          </Link>
                        </>
                      ) : (
                        <button
                          className="btn -red"
                          onClick={handleSubmit(onSubmit)}
                        >
                          Place order
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <AllCoupons show={show} setShow={setShow} />
        </div>
      )}
      {/* <InstagramTwo /> */}
    </LayoutOne>
  );
}

const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 50vh;
  width: 30vw;
  padding: 20px;
  background-color: white;
  //box-shadow: -2px 3px 22px 8px rgba(201, 201, 201, 1);
  color: black;
  z-index: 10;
  display: flex;
  flex-direction: column;
  //align-items: center;
  // justify-content: center;

  @media (max-width: 576px) {
    width: 80%;
  }
`;

function AllCoupons({ show, setShow }) {
  const [data, setData] = useState([]);

  async function getCoupons() {
    try {
      const res = await axios.get(`${baseUrl}/api/coupon/to`);
      // console.log(res);
      setData(res?.data?.coupons);
    } catch (error) {
      //  console.log(error);
    }
  }

  const copyToClipboard = (title) => {
    const el = document.createElement("textarea");
    el.value = title;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    return toast.success("Coupon Code copied");
  };

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      // Click outside the component, close it
      setShow(!show);
    }
  };

  useEffect(() => {
    getCoupons();
  }, []);

  // console.log(data);

  if (show) {
    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
          zIndex: 10,
        }}
        onClick={handleBackdropClick} // Call setShow(false) on click outside the component
      >
        <Modal>
          {data.map((item) => (
            <div
              key={item.id} // Add a unique key for each item
              style={{
                marginBottom: "10px",
                boxShadow: "-2px 3px 22px 8px rgba(201, 201, 201, 1)",
                width: "100%",
                padding: 10,
                cursor: "pointer",
              }}
              onClick={() => copyToClipboard(item.title)}
            >
              <div
                style={{
                  color: "black",
                  fontWeight: "bold",
                  marginBottom: "10px",
                }}
              >
                {item?.title}
              </div>
              <div style={{}}>{item?.description.toLowerCase()}</div>
            </div>
          ))}
        </Modal>
      </div>
    );
  } else {
    return <></>;
  }
}
