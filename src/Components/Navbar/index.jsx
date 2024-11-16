import { useContext } from "react";
import { ShoppingEcommerceContext } from "../../Context";
import { NavLink } from "react-router-dom";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import logo from "../../Assets/Images/logo.png";

const Navbar = () => {
  const context = useContext(ShoppingEcommerceContext);
  const activeStyle = "underline underline-offset-4";

  return (
    <>
      <nav
        className="flex justify-between bg-black
             items-center top-0 fixed z-10 w-full py-5 px-8 font-medium text-white/70"
      >
        <ul className="flex items-center gap-3">
          <li className="font-bold text-white text-xl pb-1">
            <NavLink to="/">
              <img src={logo} alt="logo" className="max-w-10" />
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/"
              onClick={() => context.setSearchByCategory()}
              className={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              All
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/mens-clothing"
              onClick={() => context.setSearchByCategory('Mens Clothing')}
              className={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              Mens Clothing
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/womens-clothing"
              onClick={() => context.setSearchByCategory('Womens Clothing')}
              className={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              Womens Clothing
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/jewelery"
              onClick={() => context.setSearchByCategory('Jewelery')}
              className={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              Jewelery
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/electronics"
              onClick={() => context.setSearchByCategory('Electronics')}
              className={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              Electronics
            </NavLink>
          </li>
        </ul>
        <ul className="flex items-center gap-3">
          <li className="text-white/85 font-serif"><i>Ricardo Miguel Raya</i></li>
          <li>
            <NavLink
              to="/my-orders"
              className={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              My Orders
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/my-account"
              className={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              My Account
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/sign-in"
              className={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              Sign In
            </NavLink>
          </li>
          <li className="flex">
            <span>
                <ShoppingCartIcon onClick={() => context.openCheckoutSideMenu()} className="size-6 text-white cursor-pointer" />
            </span>
            <span className="text-white">
              {context.count}
            </span>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
