// import {
//   FiHome,
//   FiTrendingUp,
//   FiCompass,
//   FiStar,
//   FiSettings,
//   FiMenu,
// } from "react-icons/fi";

// const LinkItems = [
//   { name: "Home", icon: FiHome },
//   { name: "Trending", icon: FiTrendingUp },
//   { name: "Explore", icon: FiCompass },
//   { name: "Favourites", icon: FiStar },
//   { name: "Settings", icon: FiSettings },
// ];

import React, { useState } from "react";
import ItemList from "../pages/ItemList";
import { paginate } from "../utils";
import Pagination from "./Pagination";

const Content = ({ items }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 15;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginatedData = paginate(items, currentPage, pageSize);

  return (
    <div>
      <ItemList items={paginatedData} />

      <Pagination
        itemsCount={items?.length}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Content;
