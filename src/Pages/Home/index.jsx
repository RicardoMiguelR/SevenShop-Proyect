import { useContext } from "react";
import { ShoppingEcommerceContext } from "../../Context";
import Layout from "../../Components/Layout";
import Card from "../../Components/Card";
import ProductDetail from "../../Components/ProductDetail";

function Home() {
  const context = useContext(ShoppingEcommerceContext);

  const renderView = () => {
    if (context.filteredItems?.length > 0) {
      return context.filteredItems?.map((item) => (
        <Card key={item.id} data={item} />
      ));
    } else {
      return (
        <div className="nothing-products">
          <span>
            <img
              className="max-w-xs"
              src="https://media1.tenor.com/m/eneT3N35liIAAAAC/travolta-waiting.gif"
            />
          </span>
        </div>
      );
    }
  };

  return (
    <Layout>
      <div className="mb-5">
        <h1 className="font-medium text-xl">All Products</h1>
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
