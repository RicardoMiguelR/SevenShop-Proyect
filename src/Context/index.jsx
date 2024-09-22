import { createContext, useState, useEffect } from "react";

export const ShoppingEcommerceContext = createContext();

export const ShoppingEcommerceProvider = ({ children }) => {
  // Shopping cart - Increment-decrease quantity
  const [count, setCount] = useState(0);

  // Product detail - Open/Close
  const [showProductDetail, setShowProductDetail] = useState(false);
  const openProductDetail = () => setShowProductDetail(true);
  const closeProductDetail = () => setShowProductDetail(false);

  // Checkout Side Menu - Open/Close
  const [isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen] = useState(false);
  const openCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(true);
  const closeCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(false);

  // Product detail - Show product
  const [productToShow, setProductToShow] = useState({});

  // Shopping cart - Add products to cart
  const [cartProducts, setCartProducts] = useState([]);

  // Shopping cart - Order
  const [order, setOrder] = useState([]);

  // Get products
  const [items, setItems] = useState(null);

  // Get products filtered
  const [filteredItems, setFilteredItems] = useState(null);

  // Search products by title
  const [searchByTitle, setSearchByTitle] = useState(null);

  // Search products by category
  const [searchByCategory, setSearchByCategory] = useState(null);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => setItems(data));
  }, []);

  const filteredItemsByTitle = (items, searchByTitle) => {
    return items?.filter((item) =>
      item.title.toLowerCase().includes(searchByTitle.toLowerCase())
    );
  };

  const filteredItemsByCategory = (items, searchByCategory) => {
    console.log("items: ", items);
    return items?.filter((item) =>
      item.category.toLowerCase().includes(searchByCategory.toLowerCase())
    );
  };

  const filterBy = (searchType, items, searchByTitle, searchByCategory) => {
    if (searchType === "BY_TITLE") {
      return filteredItemsByTitle(items, searchByTitle);
    }

    if (searchType === "BY_CATEGORY") {
      return filteredItemsByCategory(items, searchByCategory);
    }

    if (searchType === "BY_TITLE_AND_CATEGORY") {
      return filteredItemsByCategory(items, searchByCategory).filter((item) =>
        item.title.toLowerCase().includes(searchByTitle.toLowerCase())
      );
    }

    if (!searchType) {
      return items;
    }
  };

  useEffect(() => {
    if (searchByTitle && searchByCategory)
      setFilteredItems(filterBy("BY_TITLE_AND CATEGORY", items, searchByTitle));
    if (searchByTitle && !searchByCategory)
      setFilteredItems(
        filterBy("BY_TITLE", items, searchByTitle, searchByCategory)
      );
    if (!searchByTitle && searchByCategory)
      setFilteredItems(
        filterBy("BY_CATEGORY", items, searchByTitle, searchByCategory)
      );
    if (!searchByTitle && !searchByCategory)
      setFilteredItems(filterBy(null, items, searchByTitle, searchByCategory));
  }, [items, searchByTitle, searchByCategory]);

  console.log("filtered items: ", filteredItems);

  return (
    <ShoppingEcommerceContext.Provider
      value={{
        count,
        setCount,
        showProductDetail,
        openProductDetail,
        closeProductDetail,
        productToShow,
        setProductToShow,
        cartProducts,
        setCartProducts,
        isCheckoutSideMenuOpen,
        openCheckoutSideMenu,
        closeCheckoutSideMenu,
        order,
        setOrder,
        items,
        setItems,
        searchByTitle,
        setSearchByTitle,
        filteredItems,
        setFilteredItems,
        searchByCategory,
        setSearchByCategory,
      }}
    >
      {children}
    </ShoppingEcommerceContext.Provider>
  );
};
