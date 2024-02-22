import "./style.css";

import Search from "../header/Search";
import Navbar from "../header/Navbar";
import Footer from "../footer/Footer";

const CartError = () => {
  return (
    <>
      <Search />
      {/* <Navbar /> */}
      <Navbar />

      <section className="cart-items">
        <div className="container d_flex">
          <div className=" cartError">
            {/* {cartItems.length === 0 && (
              <h1 className="no-items product">No Items are add in Cart</h1>
            )} */}
            <h1>Please login to see your cart</h1>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default CartError;
