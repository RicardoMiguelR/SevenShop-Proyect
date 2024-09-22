import { useContext } from "react";
import { ShoppingEcommerceContext } from "../../Context";
import Layout from "../../Components/Layout";
import Card from "../../Components/Card";
import ProductDetail from "../../Components/ProductDetail";
import { FaceFrownIcon } from "@heroicons/react/24/outline";

function Home() {
  const context = useContext(ShoppingEcommerceContext);

  const renderView = () => {
    if (context.searchByTitle?.length > 0) {
      if (context.filteredItems?.length > 0) {
        return context.filteredItems?.map((item) => (
          <Card key={item.id} data={item} />
        ));
      } else {
        return (
          <div>
            <span>
              <img
                className="max-w-xs"
                src="https://media1.tenor.com/m/eneT3N35liIAAAAC/travolta-waiting.gif"
              />
            </span>
            <p className="flex gap-2 text-center items-center mt-5 font-semibold">
              There is no related product
              <FaceFrownIcon className="size-7 cursor-pointer" />
            </p>
          </div>
        );
      }
    } else {
      return context.items?.map((item) => <Card key={item.id} data={item} />);
    }
  };

  return (
    <Layout>
      <div className="mb-5">
        <h1 className="font-medium text-xl">Exclusive Products</h1>
      </div>
      <div>
        <input
          type="text"
          placeholder="Search A Product"
          className="rounded-lg border border-black w-80 p-4 mb-10 focus:outline-none"
          onChange={(event) => context.setSearchByTitle(event.target.value)}
        />
      </div>
      <div className="grid gap-4 grid-cols-4 w-full max-w-screen-lg">
        {renderView()}
      </div>
      <ProductDetail />
    </Layout>
  );
}

export default Home;
