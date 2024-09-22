import { useContext } from "react";
import { Link } from "react-router-dom";
import { ShoppingEcommerceContext } from "../../Context";
import Layout from "../../Components/Layout";
import OrdersCard from "../../Components/OrdersCard";

function MyOrders() {
  const context = useContext(ShoppingEcommerceContext);
  console.log(context.order);

  return (
    <>
      <Layout>
        <div className='mb-5'>
          <h1 className='font-semibold text-lg'>Hola MyOrders</h1>
        </div>
        {context.order.map((order, index) => (
          <Link key={index} to={`/my-orders/${index}`}>
            <OrdersCard
              totalPrice={order.totalPrice}
              totalProducts={order.totalProducts}
            />
          </Link>
        ))}
      </Layout>
    </>
  );
}

export default MyOrders;
