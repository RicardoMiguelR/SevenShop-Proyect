import { XCircleIcon } from "@heroicons/react/24/solid";

const OrderCard = (props) => {
  const { title, price, imageUrl, id, handleDelete } = props
  let renderXCircleIcon
  if (handleDelete) {
    renderXCircleIcon = <XCircleIcon onClick={() => handleDelete(id)} className="size-6 cursor-pointer text-black" />
  }

  return (
    <div className="flex justify-between items-center mb-3">
      <div className="flex items-center gap-2">
        <figure className="w-20 h-20">
          <img
            className="w-full h-full rounded-lg object-cover"
            src={imageUrl}
            alt={title}
          />
        </figure>
        <p className="text-sm font-light">{title}</p>
      </div>
      <div className="flex items-center gap-2">
        <span className="flex-col">
          <p className="text-lg font-semibold">${price}</p>
          {renderXCircleIcon}
        </span>
      </div>
    </div>
  );
};

export default OrderCard;
