import { useContext } from "react";
import { ShoppingEcommerceContext } from "../../Context";
import { Link } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/solid";
import OrderCard from "../../Components/OrderCard";
import { totalPrice } from "../../Utils";
import "./styles.css";

const CheckoutSideMenu = () => {
  const context = useContext(ShoppingEcommerceContext);

  const handleDelete = (id) => {
    const filteredProducts = context.cartProducts.filter(
      (product) => product.id != id
    );
    context.setCartProducts(filteredProducts);
    context.setCount(context.count - 1);
  };

  const handleCheckout = () => {
    const orderToAdd = {
      date: "14.09.24",
      products: context.cartProducts,
      totalProducts: context.cartProducts.length,
      totalPrice: totalPrice(context.cartProducts),
    };

    if (context.cartProducts.length === 0) {
      console.log("0 Products");
    } else {
      context.setOrder([...context.order, orderToAdd]);
      context.setCartProducts([]);
      context.setCount(context.count - context.cartProducts.length);
      context.closeCheckoutSideMenu();
      console.log(orderToAdd);
    }
  };

  return (
    <aside
      className={`${
        context.isCheckoutSideMenuOpen ? "flex" : "hidden"
      } checkout-side-menu flex-col fixed right-0 border border-black rounded-lg bg-white`}
    >
      <div className="flex justify-between bg-slate-600 mb-5 text-white items-center p-3">
        <h2 className="font-medium text-xl">My Order</h2>
        <div>
          <XMarkIcon
            className="size-7 cursor-pointer text-white"
            onClick={() => context.closeCheckoutSideMenu()}
          />
        </div>
      </div>
      <div className="px-5 overflow-y-scroll flex-1">
        {context.cartProducts.map(product => (
          <OrderCard
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            imageUrl={product.image}
            handleDelete={handleDelete}
          />
        ))}
      </div>
      <div className="px-5 mt-10 mb-8">
        <p className="flex justify-end items-center">
          <span className="mx-3">TOTAL: </span>
          <span className="font-semibold text-lg">
            ${totalPrice(context.cartProducts)}
          </span>
        </p>
        <div className="mt-5">
          <Link to="/my-orders/last">
            <button
              className="bg-black w-full text-white p-2 rounded-lg"
              onClick={() => handleCheckout()}
            >
              Checkout
            </button>
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default CheckoutSideMenu;
