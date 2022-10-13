import React from "react";
import {
  Route,
  Switch,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";

import NotFound from "./components/NotFound";

import Items from "./pages/Items";
import ItemSingle from "./pages/ItemSingle";
import AddItem from "./pages/AddItem";
import Navbar from "./components/Navbar";

const Routes = ({ loading, items, handleSort, handleSearch }) => {
  return (
    <Router>
      <Navbar handleSearch={handleSearch} />
      <Switch>
        <Route
          exact
          path="/"
          render={(props) => (
            <Items
              {...props}
              loading={loading}
              items={items}
              handleSort={handleSort}
            />
          )}
        />
        <Route exact path="/items/:id" component={ItemSingle} />
        <Route exact path="/add" component={AddItem} />
        <Route exact path="/not-found" component={NotFound} />
        <Redirect to="/not-found" />
      </Switch>
    </Router>
  );
};

export default Routes;
