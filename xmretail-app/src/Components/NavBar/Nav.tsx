import Logo from "./assets/Group 1.png";
import { useState } from "react";

function Nav() {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-3">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <img
            src={Logo}
            className="h-8 w-20 md:w-auto transition-all duration-300 flex-shrink-0"
            alt="XM RETAIL"
          />
          <span className="text-lg font-semibold dark:text-white  md:block">XM RETAIL</span>
        </a>

        {/* Search Bar - Visible on Desktop Only */}
        <div className="hidden md:flex flex-grow justify-center">
          <div className="relative w-full max-w-md">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search..."
            />
          </div>
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center gap-2">
          {/* Mobile Search Button */}
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-lg"
          >
            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </button>

          {/* Login/Sign Up Button */}
          <button
            type="button"
            className="text-white bg-[#ff6726] hover:bg-[#FFB74D] focus:ring-2 focus:outline-none focus:ring-[#ff8080] rounded-md text-sm px-4 py-3 dark:bg-[#FF9800] dark:hover:bg-[#FB8C00] dark:focus:ring-[#F57C00] font-semibold"
          >
            Login/Sign up
          </button>
        </div>
      </div>

      {/* Mobile Search Bar - Appears Below When Clicked */}
      {showSearch && (
        <div className="md:hidden p-3">
          <input
            type="text"
            className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search..."
          />
        </div>
      )}
    </nav>
  );
}

export default Nav;
