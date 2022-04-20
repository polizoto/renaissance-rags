import React from "react";
import CostumeList from "../components/CostumeList";
import CategoryMenu from "../components/CategoryMenu";
import Cart from '../components/Cart';

const Home = () => {
  return (
    <div className="container">
      <CategoryMenu />
      <CostumeList />
      <Cart />
    </div>
      );
    };

export default Home;
