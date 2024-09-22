import { useContext } from "react";
import { ShoppingEcommerceContext } from "../../Context";
import { PlusIcon, CheckIcon } from "@heroicons/react/20/solid";

const Card = (data) => {
  const context = useContext(ShoppingEcommerceContext);

  const showProduct = (productDetail) => {
    context.openProductDetail();
    context.setProductToShow(productDetail);
    context.closeCheckoutSideMenu();
  };

  const addProductsToCart = (event, productData) => {
    event.stopPropagation();
    context.setCount(context.count + 1);
    context.setCartProducts([...context.cartProducts, productData]);
    context.openCheckoutSideMenu();
    context.closeProductDetail();
  };

  const renderIcons = (id) => {
    const isInCart =
      context.cartProducts.filter((product) => product.id === id).length > 0;

    if (isInCart) {
      return (
        <div className="absolute top-0 right-0 flex justify-center items-center bg-red-300 w-6 h-6 rounded-full m-1">
          <CheckIcon className="hover:translate-y-1 transition-transform duration-500 rounded-full" />
        </div>
      );
    } else {
      return (
        <div
          className="absolute top-0 right-0 flex justify-center items-center bg-white w-6 h-6 rounded-full m-1"
          onClick={(event) => addProductsToCart(event, data.data)}
        >
          <PlusIcon className="hover:bg-blue-300 transition-colors duration-450 rounded-full" />
        </div>
      );
    }
  };

  return (
    <div
      className="bg-white cursor-pointer w-60 h-65 rounded-lg"
      onClick={() => showProduct(data.data)}
    >
      <figure className="relative mb-2 w-full h-4/5">
        <span className="absolute bottom-0 left-0 bg-white/60 rounded-lg text-black text-xs m-1 px-2 py-0.5">
          {data.data.category}
        </span>
        <img
          className="w-full h-full object-cover rounded-lg"
          src={data.data.image}
          alt={data.data.title}
        />
        {renderIcons(data.data.id)}
      </figure>
      <p className="flex justify-between mt-1">
        <span className="text-sm font-light mt-1">{data.data.title}</span>
        <span className="text-lg font-medium">${data.data.price}</span>
      </p>
    </div>
  );
};

export default Card;
