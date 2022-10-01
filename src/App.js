import React, { Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import "./App.css";
import NavBar from "./components/NavBar";
import Search from "./pages/Search";
// import Recipe from "./components/Recipes/Recipe";
// import ShoppingList from "./pages/ShoppingList";
// import Bookmarks from "./pages/Bookmarks";
import Footer from "./components/Footer";
import { TailSpin } from "react-loader-spinner";

const Recipe = React.lazy(() => import("./components/Recipes/Recipe"));
const ShoppingList = React.lazy(() => import("./pages/ShoppingList"));
const Bookmarks = React.lazy(() => import("./pages/Bookmarks"));

function App() {
  return (
    <div>
      <NavBar />
      <Suspense
        fallback={
          <div className="centered">
            <TailSpin
              height="80"
              width="80"
              color="#522d80"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Navigate to="/search" />} />
          <Route path="/search" element={<Search />} />
          <Route path="/search/:id" element={<Recipe />} />
          <Route path="/shopping-list" element={<ShoppingList />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
        </Routes>
      </Suspense>
      <Footer />
    </div>
  );
}

export default App;
