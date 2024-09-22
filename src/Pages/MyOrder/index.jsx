import { useContext } from "react";
import { ShoppingEcommerceContext } from "../../Context";
import { Link } from "react-router-dom";
import Layout from "../../Components/Layout";
import OrderCard from "../../Components/OrderCard";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";

function MyOrder() {
  const context = useContext(ShoppingEcommerceContext);
  const currentPath = window.location.pathname
  let index = currentPath.substring(currentPath.lastIndexOf('/') + 1)
  if (index === 'last') index = context.order?.length - 1

  return (
    <>
      <Layout>
        <div className='flex items-center justify-center w-80 relative mb-6'>
          <Link to='/my-orders' className='absolute left-0'>
            <ChevronLeftIcon className='size-7 cursor-pointer text-black' />
          </Link>
          <h1>Hola MyOrder</h1>
        </div>
        <div className="flex flex-col w-150">
          {context.order?.[index]?.products.map((product) => (
            <OrderCard
              key={product.id}
              id={product.id}
              title={product.title}
              price={product.price}
              imageUrl={product.image}
            />
          ))}
        </div>
      </Layout>
    </>
  );
}

export default MyOrder;
