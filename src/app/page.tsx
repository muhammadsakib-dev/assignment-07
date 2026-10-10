import React from 'react';
import Hero from './components/home/Hero';
import Increase from './components/home/products/Increase';
import Decrease from './components/home/products/Decrease';
import Products from './components/home/products/Products';



const Home = () => {
  return (
    <div>
      <Hero />
      <Increase />
      <Decrease />
      <Products />
     
    </div>
  );
};

export default Home;