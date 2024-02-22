import React, { useEffect, useState } from "react";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import Search from "../header/Search";
import Navbar from "../header/Navbar";
import Footer from "../footer/Footer";
import axios from "axios";
import { useSelector } from "react-redux";
import { publicRequest } from "../../requestMethods";

import StripeCheckout from "react-stripe-checkout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const KEY = process.env.REACT_APP_STRIPE;

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [stripeToken, setStripeToken] = useState(null);
  const navigate = useNavigate;

  const customer = useSelector((state) => state.customer.currentCustomer);
  const cuId = customer._id;

  //Alerts
  const paymentComplete = () =>
    toast.success("💳 Payment Completed", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  const orderCreated = () =>
    toast.success("💳 Order Created", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  const paymentError = () =>
    toast.error("🚨 Payment doesn't complete", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  const itemRemoved = () =>
    toast.info("Product Removed from cart", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  const clearCartAlert = () =>
    toast.info("Cart Cleared", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  const oneItemAlert = () =>
    toast.warn(
      "Quantity should not be minus, If you doesn't need item you can Remove",
      {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      }
    );

  //CALCULATE TOTAL QUANTITY
  const totalPrice = cartItems.reduce(
    (price, item) => price + item.quantity * item.price,
    0
  );

  const onToken = (token) => {
    setStripeToken(token);
    // console.log(stripeToken.card.address_line1);
  };
  // console.log(stripeToken);

  useEffect(() => {
    const makeRequest = async () => {
      try {
        //make checkout request
        const resp = await publicRequest.post("/checkout/payment", {
          tokenId: stripeToken.id,
          amount: totalPrice * 100,
        });
        console.log(resp.data);
        //create order
        const createOrder = async () => {
          try {
            const res = await publicRequest.post("/order/", {
              customer: cuId,
              products: cartItems.map((item) => ({
                product: item.productId,
                quantity: item.quantity,
              })),
              total: totalPrice,
              address: stripeToken.card.address_line1,
            });
            console.log(res);
            orderCreated();
            clearCart(cuId);
          } catch (err) {
            console.log(err);
          }
        };
        //successes toast message
        if (resp.data.message === "Payment successful") {
          paymentComplete();
          createOrder();
        }
      } catch (err) {
        console.log(err);
        paymentError();
      }
    };
    stripeToken && totalPrice !== 0 && totalPrice < 1000000 && makeRequest();
  }, [stripeToken, totalPrice]);

  //fetch cart items
  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/cart/" + cuId);
        // console.log(res.data.cartItems);
        setCartItems(res.data.cartItems);
      } catch (err) {
        console.log(err);
      }
    };
    getProduct();
  }, [cuId]);

  //remove cart item

  const handelRemove = async (cartId) => {
    const id = cartId;
    try {
      await axios.delete("http://localhost:8070/api/cart/delete/" + id);
      const response = await publicRequest.get("/cart/" + cuId);
      // alert("removed item");
      itemRemoved();
      // console.log(response.data.cartItems);
      setCartItems(response.data.cartItems);
    } catch (err) {
      console.error(err);
    }
  };

  //increase quantity

  const increaseQty = async (cusId, proId) => {
    try {
      await axios.post("http://localhost:8070/api/cart/increaseQty", {
        customerId: cusId,
        productId: proId,
      });
      const response = await publicRequest.get("/cart/" + cuId);
      // alert("removed item");
      // console.log(response.data.cartItems);
      setCartItems(response.data.cartItems);

      // alert("Product quantity increased successfully!");
    } catch (err) {
      console.error(err);
      alert("Error increasing product quantity. Please try again.");
    }
  };

  //decrease quantity
  const decreaseQty = async (cusId, proId, qty) => {
    if (qty === 1) {
      // const id = proId;
      // alert(
      //   "Item Should not be minus, If you doesn't need item you can Remove"
      // );
      oneItemAlert();
    } else {
      try {
        await axios.post("http://localhost:8070/api/cart/decreaseQty", {
          customerId: cusId,
          productId: proId,
        });
        const response = await publicRequest.get("/cart/" + cuId);
        setCartItems(response.data.cartItems);

        // alert("Product quantity decreased successfully!");
      } catch (err) {
        console.error(err);
        alert("Error decreasing product quantity. Please try again.");
      }
    }
  };

  //clear all cart items
  const clearCart = async (cuId) => {
    try {
      await axios.delete("http://localhost:8070/api/cart/clear/" + cuId);
      const response = await publicRequest.get("/cart/" + cuId);
      setCartItems(response.data.cartItems);
      clearCartAlert();
    } catch (err) {
      console.error(err);
      alert("Error in clearing cart");
    }
  };

  return (
    <>
      <Search />
      <Navbar />

      <section className="cart-items">
        <div className="heading d_flex cartHeader">
          <div className="heading-left row  f_flex">
            <h2>My Cart</h2>
          </div>
          <div className="heading-right row " onClick={() => clearCart(cuId)}>
            <span>Clear All</span>
            <i className="fa-light fa-broom-wide"></i>
          </div>
        </div>
        <div className="container d_flex">
          <div className="cart-details">
            {cartItems.length === 0 && (
              <h1 className="no-items product">No Items are add in Cart</h1>
            )}

            {cartItems.map((item) => {
              const productQty = item.price * item.quantity;

              return (
                <div className="cart-list product d_flex" key={item.productId}>
                  <div className="img">
                    <img src={item.productCover} alt="" />
                  </div>
                  <div className="cart-details">
                    <h3>{item.productName}</h3>
                    <h4>
                      ${item.price}.00 * {item.quantity}
                      <span>Rs: {productQty}.00</span>
                    </h4>
                  </div>
                  <div className="cart-items-function">
                    <div className="removeCart">
                      <button
                        className="removeCart"
                        // onClick={() => removeCart(item)}
                        onClick={() => handelRemove(item._id, cuId)}
                      >
                        <i className="fa-solid fa-xmark"></i>
                      </button>
                    </div>
                    {/* stpe: 5 
                    product ko qty lai inc ra des garne
                    */}
                    <div className="cartControl d_flex">
                      <button
                        className="incCart"
                        onClick={() => increaseQty(cuId, item.productId)}
                      >
                        <i className="fa-solid fa-plus"></i>
                      </button>
                      <button
                        className="desCart"
                        // onClick={() => decreaseQty(cuId, item.productId)}
                        onClick={() =>
                          decreaseQty(cuId, item.productId, item.quantity)
                        }
                      >
                        <i className="fa-solid fa-minus"></i>
                      </button>
                    </div>
                  </div>

                  <div className="cart-item-price"></div>
                </div>
              );
            })}
          </div>

          <div className="cart-total product">
            <h2>Cart Summary</h2>
            <div className=" d_flex">
              <h4>Total Price :</h4>
              <h3>Rs: {totalPrice}.00</h3>
            </div>
            {/* <div className=" d_flex">
              <h4>Discount :</h4>

              <h3>Rs: {totalPrice}.00</h3>
            </div> */}
            <StripeCheckout
              name="Guident Computers"
              image="https://res.cloudinary.com/daee4aeur/image/upload/v1681706995/favicon_jtvktk.png"
              billingAddress
              shippingAddress
              description={`Your total is LKR: ${totalPrice}`}
              amount={totalPrice * 100}
              currency="lkr"
              token={onToken}
              stripeKey={KEY}
            >
              {totalPrice >= 1000000 ? (
                <h4 className="payError">
                  Sorry Payment gateway doesn't accept more than 10k{" "}
                </h4>
              ) : (
                <div className="pay btn">Processed payment</div>
              )}
            </StripeCheckout>
          </div>
        </div>
      </section>
      <Footer />
      <ToastContainer />
    </>
  );
};

export default Cart;
