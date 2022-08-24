import React, { Fragment } from 'react'
import {CgMouse} from "react-icons/cg";
import "./Home.css"
import Product from "./Product.js";

const product={
  name:"White Shirt",
  image:[{url:"shorturl.at/AGKY8"}],
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