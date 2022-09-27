import { Fragment } from "react";
import { Route, Routes } from "react-router-dom";

import "./App.css";
import NavBar from "./components/NavBar";
import Search from "./pages/Search";
import Recipe from "./components/Recipes/Recipe";
import ShoppingList from "./pages/ShoppingList";
import Bookmarks from "./pages/Bookmarks";
import Footer from "./components/Footer";

// https://coolors.co/bfd9ff-9e2b25-51355a-2a0c4e-2978a0

function App() {
  return (
    <Fragment>
      <NavBar />
      <Routes>
        <Route path="/search" element={<Search />} />
        <Route path="/search/:id" element={<Recipe />} />
        <Route path="/shopping-list" element={<ShoppingList />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
      </Routes>
      <Footer />
    </Fragment>
  );
}

export default App;
