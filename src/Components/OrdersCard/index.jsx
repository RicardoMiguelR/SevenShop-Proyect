import { ChevronRightIcon } from "@heroicons/react/24/solid";

const OrdersCard = (props) => {
  const { totalPrice, totalProducts } = props;

  return (
    <div className="flex justify-between items-center border border-black rounded-lg mb-5 w-80 p-4">
      <div className="flex justify-between w-full items-center">
        <p className="flex flex-col">
          <span className="font-light">20.09.24</span>
          <span className="font-light">
            <b>{totalProducts}</b> Articles
          </span>
        </p>
        <p className="flex gap-3">
          <span className="font-semibold text-lg">${totalPrice}</span>
          <span>
            <ChevronRightIcon className="size-7 cursor-pointer text-black" />
          </span>
        </p>
      </div>
    </div>
  );
};

export default OrdersCard;
