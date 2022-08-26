import React from 'react';
import { Link } from 'react-router-dom';
import ReactStars from "react-rating-stars-component";



//import ker liya idhar home.js wale product ko
const Product = ({product}) => {

  //niche ka options idhar bna diya
const options={
  edit:false, //direct edit nahi ho skta hai page pe
  color:"rgba(20,20,20,0.1)",
  activeColor:"tomato", //ye rating ke lea
  size:window.innerWidth < 600?20:25, //window ke size se adjust ker lega
  value:product.ratings,
  isHalf:true, //if this is false then only 2 star is field with color 
};

  return (
    <Link className='productCard' to={product._id}>
        <img src={product.images[0].url} alt={product.name}/>
        <p>{product.name}</p>
        <div>
            <ReactStars{...options}/> <span>({product.numOfReviews}Reviews)</span>
        </div>
        <span>{`₹${product.price}`}</span>
    </Link>
  );
};

export default Product;