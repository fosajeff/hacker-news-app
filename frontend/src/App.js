import React, { useState, useEffect } from "react";
import Routes from "./routes";
import { getItems, search } from "./services/httpService";

const App = (props) => {
  const [items, setItems] = useState([]);
  const [sortKey, setSortKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");

  const handleSort = async (sortBy) => {
    setSearchText("");
    setSortKey(sortBy);
  };

  const handleSearch = (text) => {
    setSearchText(text);
  };

  useEffect(() => {
    async function fetchHackerItems() {
      setLoading(true);
      if (searchText) {
        const d = await search(searchText);
        setLoading(false);

        setItems(d);
        return;
      }
      const data = await getItems(sortKey);

      if (data) {
        setItems(data);
      }
      setLoading(false);
    }
    fetchHackerItems();
  }, [sortKey, searchText]);
  return (
    <>
      <Routes
        loading={loading}
        handleSort={handleSort}
        handleSearch={handleSearch}
        items={items}
      />
    </>
  );
};

export default App;
