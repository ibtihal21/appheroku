import React, { Fragment } from 'react'
import {CgMouse} from "react-icons/cg";
import "./Home.css";
import Product from "./Product.js";

//product details export to product.js
const product={
  name:"White Shirt",
  images:[{url:"https://i.ibb.co/DRST11n/1.webp"}],
  price:"$20",
  _id:"nothing",
};
const Home = () => {
  return (
    <Fragment>
        <div className='banner'>
            <p>WELCOME TO ECOMMERCE</p>
            <h1>Find Amazing Products</h1>

            <a href='#container'>
                <button>
                    Scroll <CgMouse/>
                </button>
            </a>
        </div>

        <h2 className='homeHeading'>Featured Products</h2>

        <div className='container ' id="container">
          <Product product={product}/>
        </div>
    </Fragment>
  );
};

export default Home;