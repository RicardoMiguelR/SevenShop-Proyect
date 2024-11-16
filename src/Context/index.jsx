import { createContext, useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";

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

  const filterBy = useCallback(
    (searchType, items, searchByTitle, searchByCategory) => {
      const filteredItemsByTitle = (items, searchByTitle) =>
        items?.filter((item) =>
          item.title.toLowerCase().includes(searchByTitle.toLowerCase())
        );

      const filteredItemsByCategory = (items, searchByCategory) =>
        items?.filter((item) =>
          item.category.toLowerCase().includes(searchByCategory.toLowerCase())
        );

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

      return items;
    },
    []
  );

  useEffect(() => {
    if (searchByTitle && searchByCategory)
      setFilteredItems(
        filterBy(
          "BY_TITLE_AND_CATEGORY",
          items,
          searchByTitle,
          searchByCategory
        )
      );
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
  }, [items, searchByTitle, searchByCategory, filterBy]);

  console.log("searchByTitle", searchByTitle);

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

ShoppingEcommerceProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
